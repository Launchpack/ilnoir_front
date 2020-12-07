<template>
  <div class="flex wrap">
    <i class="material-icons unselect full-width"
       :style="iconStyle"
       @click.stop.prevent="clickBtn">{{ isLike ? 'favorite' : 'favorite_border' }}</i>
    <div v-if="count!==undefined&&computedCount!==undefined"
         class="full-width" :style="countStyle">{{ computedCount }}</div>
  </div>
</template>

<script>
  export default {
    name: "IconBtnLike",

    props: {
      id: {
        type: Number,
        required: false
      },
      likeType: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: 'sub'
      },
      activeColor: {
        type: String,
        default: 'brand'
      },
      count: {          // 숫자표시
        type: Number,
        required: false
      },
      countCustomStyle: {
        type: Object,
        required: false
      },
      menuTitle: {
        type: String,
        default: '마이페이지 > 즐겨찾기'
      },
      hover: {
        type: Boolean,
        required: false,
        default: function() {
          return false;
        }
      }
    },

    data() {
      return {
        icon: 'favorite_border',
        isLike: false,
        url: '',
        computedCount: undefined
      }
    },

    mounted() {
      this.setUrl();
    },

    watch: {
      isLogin(n) {
        if (n) {
          this.setUrl();
        }
      }
    },

    computed: {
      iconStyle() {
        let color = this.isLike ? this.activeColor : this.color;
        let deco = {};
        deco.fontSize = (this.size).toString()+'px';
        deco.height = (this.size).toString()+'px';
        deco.textAlign = 'center';

        if(this.hover) {
          deco.color = 'white'
        }
        else {
          deco.color = this.brandColor[color].color;
        }

        return deco;
      },

      countStyle() {
        let deco = {};

        deco.color = this.brandColor.main.color;
        deco.fontSize = '11px';
        deco.textAlign = 'center';

        if (this.countCustomStyle) deco = this.countCustomStyle;

        return deco;
      },

    },

    methods: {
      setUrl() {
        if (this.count !== undefined) this.computedCount = this.count;

        if(!this.isLogin) return;

        let id = this.$route.query.id;
        if (this.id) id = this.id;
        this.url = `user/${this.$store.getters.user.user_id}/${this.likeType}/${id}/islike`;

        this.$axios.get(this.url).then(res => {
          this.isLike = res.data.is_liked;
        });
      },
      clickBtn() {
        if(!this.isLogin) {
          this.toast('찜하시려면 로그인이 필요합니다')
          return;
        }

        let computedUrl = this.url.replace('islike','like');

        this.$axios.post(computedUrl)
          .then(() => {
            this.isLike = !this.isLike;
            this.$emit('liked', this.isLike);

            if (this.isLike) {
              if (this.likeType === 'product')
                this.toast('상품을 찜하였습니다.\n' +
                  this.menuTitle + '에서 \n' +
                  '확인하실 수 있습니다._icon_favorite');
              else if (this.likeType === 'partner')
                this.toast('파트너를 찜하였습니다.\n' +
                  this.menuTitle + '에서 \n' +
                  '확인하실 수 있습니다._icon_favorite');
            }

            // 클릭 공통 emit
            this.$emit('click');

            // 카운트 숫자 있을 경우
            if (!this.isLike) this.computedCount -= 1;
            else this.computedCount += 1;

            if (this.computedCount<0) this.computedCount = 0;
          });
      }
    }

  }
</script>
