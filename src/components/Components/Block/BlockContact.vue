<template>
<div>
  <div class="flex-between margin-bottom-16">
    <div>
      <div class="size-20 weight-500 margin-bottom-4" :style="brandColor.main">1:1 문의</div>
      <div class="flex" style="font-size:16px;align-items:baseline">
        <div class="size-14" style="color:#9b9b9b">{{ count }}개의 사용자 문의</div>
      </div>
    </div>
    
    <div :style="[brandColor.main, brandBgColor.white]" style="padding:9px 14px;border-radius:4px" 
      class="size-12 unselect" @click="routerPush(`contact_reg`)">
      문의 작성
    </div>
  </div>
  
  <list-vertical>
    <transition-group name="fade" slot="card" tag="div">
      <card-contact
        v-for="item in list"
        :key="item.id"
        :card="item"></card-contact>
    </transition-group>
  </list-vertical>
  <div v-if="list && list.length===0" class="empty-view" :style="brandColor.sub">
    문의 내역이 없습니다.
  </div>
</div>
</template>
<script>
import CardContact from "@/components/Components/Card/CardContact"

export default {
  name: 'BlockContact',
  components: {
    CardContact
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "list": undefined,
      "count": undefined
    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      this.$axios(`user/${this.$store.getters.user.user_id}/inquiry/personal`)
      .then(res => {
        this.list = res.data.data;
        this.count = res.data.count
      })
    }
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>


