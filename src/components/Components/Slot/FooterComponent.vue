<template>
  <footer-comp></footer-comp>
</template>

<script>
  import Vue from 'vue'
  import uuidv4 from "uuid/v4";
  import CommonApiMixin from "@/components/Mixins/CommonApiMixin";
  var css = require('css');

  export default {
    name: "FooterComponent",
    mixins: [
      CommonApiMixin
    ],
    
    created() {
      this.setInit();
    },

    data() {
      return {
        key: '',
        props: undefined,
        toggle:false,
        jsonData: undefined
      }
    },

    computed: {
    },

    methods: {
      setInit() {
        Vue.component(
          'FooterComp',
          (resolve) => this.getAsync(resolve)
        );
      },
      setStyles(value) {
        value = value.replace(/<br>/gi, '\n');
        let el = document.getElementById("lp_style");
        if(el === null) {
          el = document.createElement("style");
          el.setAttribute("type", "text/css");
          el.setAttribute('id', 'lp_style');
          let head = document.getElementsByTagName('head')[0];
          head.appendChild(el);
        }
        if(el.innerText.indexOf(value)===-1)
          el.innerText += value;
      },
      getAsync(resolve) {
        let footer = this.$store.getters.device==='mobile' ? 'FooterMobile' : 'FooterPc';
        this.request.common.get(`https://launchpack-${this.$store.getters.service.service_key}.s3.ap-northeast-2.amazonaws.com/json_file/Footer/${footer}`)
        .then(res=> {
          let component = res.data;

          let props = component.props;
          Object.keys(props).forEach(key => {
            if(props[key].type && typeof(props[key].type) === "string") {
              props[key].type = eval(`(${props[key].type})`);
            }
            if(props[key].default && typeof(props[key].default) === "string"
              && props[key].default.indexOf('function()')>-1) {
              props[key].default = Function(props[key].default.replace('function()', ''));
            }
          });

          let data = component.data;
          Object.keys(data).forEach(key=> {
            if(data[key] === 'undefined') {
              data[key] = undefined;
            }
          });

          let methods = this.getMethods(component.methods);
          let computed = this.getMethods(component.computed);
          let watches = this.getMethods(component.watch);
          let mixins = component.mixins;
          let lifeCycles = {};
          Object.keys(component.lifeCycles).forEach(item => {
            lifeCycles[item] = Function(component.lifeCycles[item].replace(/\$store/gi, '$store'));
          });

          let templates = component.templates.replace(/\$store/gi, '$store');

          let scopeId = `data-v-${uuidv4().substring(0,8)}`;


          let styles = component.styles_scoped;

          if(styles) {
            let parsedCss = css.parse(styles);
            parsedCss.stylesheet.rules.forEach(rule => {

              if (rule.media) {
                rule.rules.forEach(inRule => {
                  for (let i = 0; i < inRule.selectors.length; i++) {
                    let sels = '';
                    inRule.selectors[i].split(' ').forEach(sel => {
                      if (sel !== '&' && sel !== '>') {
                        sel += `[${scopeId}]`;
                      }
                      sels += sel + ' ';
                    });
                    inRule.selectors[i] = sels;
                  }
                });
              }

              else {
                for (let i = 0; i < rule.selectors.length; i++) {
                  let sels = '';
                  rule.selectors[i].split(' ').forEach(sel => {
                    if (sel !== '&' && sel !== '>') {
                      sel += `[${scopeId}]`;
                    }
                    sels += sel + ' ';
                  });
                  rule.selectors[i] = sels;
                }
              }
            });

            //this.$store.commit('setHeadStyles', css.stringify(parsedCss) + '\n');
            this.setStyles(css.stringify(parsedCss)+'\n');
          }

          
          let vueValues = {
            name: `${footer}`,
            template: templates,
            props: props,
            data() { return data },
            computed: computed,
            methods: methods,
            watch: watches,
            mixins: mixins,
            _scopeId: scopeId
          };
          
          Object.keys(lifeCycles).forEach(item => {
            vueValues[item] = lifeCycles[item];
          });

          resolve(vueValues);
          this.toggle = true
        }).catch(()=> {
          resolve({
            template: '',
          });
          this.toggle = false;
        });
      },
      getMethods(methods) {
        let result = {};
        methods.forEach(code => {
          code.name = code.name.replace(/'/g, '');

          // code 내에 vuex 치환
          //this.$store.commit('setUser', val)
          code.code = code.code.replace(/\$store/gi, '$store');

          if(code.name.indexOf('/*') === 0 || code.name.indexOf('//') === 0) {
            let names = code.name.split('\n');
            code.name = names[names.length-1].trim();
          }

          result[code.name] = code.params ? Function(code.params, code.code) : Function(code.code);
        });
        return result;
      },
    }
  }
</script>