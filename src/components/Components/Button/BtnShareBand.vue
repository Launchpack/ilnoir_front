<template>
  <div class="position-relative">
    <btn
      :color="brandColor.white"
      :backgroundColor="{backgroundColor: 'rgb(0, 196, 28)'}"
      @clicked="clickShare"
    >
      <div class="btn-txt">밴드</div>
    </btn>
  </div>
</template>

<script>

export default {
  name: "BtnShareBand",
  props: {
    shareData: {
      type: Object,
      required: false
    }
  },

  computed: {
    domain() {
      return this.shareData.link;
    }
  },

  methods: {
    shareNaverBand(url, content) {
      let body = encodeURIComponent(this.literal`${content}\n${url}`);
      let route = encodeURIComponent(window.location.href);
      let link = this.literal`http://band.us/plugin/share?body=${body}&route=${route}`;
      window.open(link, 'share', 'width=500, height=500');
    },
    clickShare() {
      this.shareNaverBand(this.shareData.link, this.shareData.name);
      if (this.shareData.isProduct)
        this.$axios.post(`public/product/${this.$route.query.id}/share`);
      if (this.shareData.isPartner)
        this.$axios.post(`public/partner/${this.$route.query.id}/share`);
      if (this.shareData.isPost)
        this.$axios.post(`public/board/0/post/${this.$route.query.id}/share`);
      this.$emit('onShare');
    },
    literal(strings, content, url) {
      let str0 = strings[0];
      let str1 = strings[1];
      return `${str0}${content}${str1}${url}`;
    }
  }
};
</script>

<style lang="stylus" scoped>
.btn-txt {
  color: rgb(255, 255, 255);
  font-size: 14.25px;
  width: 100%;
  text-align: center;
}
</style>
