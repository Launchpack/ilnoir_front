<template>
<portal to="share" :disabled="disabled">
  <sweet-modal ref="shareModal" overlay-theme="dark" @close="share=false">
    <div style="padding:20px">
      <div class="text-center p-modal-title" style="margin-bottom:24px">{{ title }}</div>
      <div class="grid-box">
        <div class="col-6">
          <div style="padding:6px">
            <btn-share-kakao :shareData="sharedData" @onShare="$refs.shareModal.close()"></btn-share-kakao>
          </div>
        </div>
        <div class="col-6">
          <div style="padding:6px">
            <btn-share-kakaostory :shareData="sharedData" @onShare="$refs.shareModal.close()"></btn-share-kakaostory>
          </div>
        </div>
        <div class="col-6">
          <div style="padding:6px">
            <btn-share-facebook :shareData="sharedData" @onShare="$refs.shareModal.close()"></btn-share-facebook>
          </div>
        </div>
        <div class="col-6">
          <div style="padding:6px">
            <btn-share-line :shareData="sharedData" @onShare="$refs.shareModal.close()"></btn-share-line>
          </div>
        </div>
        <div class="col-12" style="margin-top:24px;padding:0 6px">
          <btn-url-copy :url="sharedData.link" @onShare="$refs.shareModal.close()"></btn-url-copy>
        </div>
      </div>
    </div>
  </sweet-modal>
</portal>
</template>

<script>
  import { SweetModal } from 'sweet-modal-vue';
  import BtnShareKakao from "../Button/BtnShareKakao";
  import BtnShareKakaostory from "../Button/BtnShareKakaostory";
  import BtnShareFacebook from "../Button/BtnShareFacebook";
  import BtnShareLine from "../Button/BtnShareLine";
  import BtnUrlCopy from "../Button/BtnUrlCopy";
  export default {
    name: "Share",
    components: {
      BtnUrlCopy,
      BtnShareLine,
      BtnShareFacebook,
      BtnShareKakaostory,
      BtnShareKakao,
      SweetModal
    },
    props: {
      title: {
        type: String,
        default: '공유하기'
      },
      product: {
        type: Object,
        required: false
      },
      shareData: {
        type: Object,
        default: function() {
          return {
            name: '',
            desc: '',
            img: '',
            link: '',
            isProduct: false,
            isPartner: false
          }
        }
      }
    },
    created() {
      if(this.product) {
        let img = this.product.img;
        if(img === undefined && this.product.imgs && this.product.imgs.length>0) {
          img = this.product.imgs[0];
        }
        this.sharedData = {
          name: this.product.name,
          desc: this.product.simple_desc,
          img: img,
          link: location.href,
          isProduct: true
        };
      } else {
        this.sharedData = this.shareData;
        this.sharedData.desc = this.shareData.simple_desc;
        this.sharedData.link = location.href;
        this.sharedData.isPartner = true;
      }
    },
    data() {
      return {
        share: false,
        sharedData: {
          name: '',
          desc: '',
          img: '',
          link: ''
        },
        disabled: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.disabled = false;
      })
    },
    watch: {
      share(n) {
        if(n) {
          this.$refs.shareModal.open();
        } else {
          this.$refs.shareModal.close();
        }
      }
    }
  }
</script>

<style scoped>

</style>