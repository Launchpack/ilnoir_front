<template>
<div style="padding:32px 0 100px" :style="pagePadding">
  
  <tab :menu="menu" tabPosition="center" :selectedTabStyle="selectedTabStyle"
    :unselectedTabStyle="unselectedTabStyle" :dividerStyle="{}" :wrapRadius="true">
    
    <div slot="0" style="margin-top:32px">
      <div class="size-20 weight-500 margin-bottom-6" :style="brandColor.main">진행중인 이벤트</div>
      <div class="size-14 margin-bottom-16" :style="brandColor.sub">{{ moment().locale('ko').format('LL') }}</div>
      
      <list-vertical>
        <transition-group name="fade" slot="card" tag="div">
          <div
            v-for="(item,idx) in onList"
            :key="`event-${item.id}`">
            <card-event :card="item" :key="`event-${item.id}`"></card-event>
          </div>
        </transition-group>
      </list-vertical>
      
      <div v-if="onList&&onList.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:16px">진행중인 이벤트가 없습니다.</div>
    </div>
    
    <div slot="1" style="margin-top:32px">
     <div class="size-20 weight-500 margin-bottom-16" :style="brandColor.main">종료된 이벤트</div>
     
      <list-vertical style="opacity:0.3">
        <transition-group name="fade" slot="card" tag="div">
          <div
          v-for="(item,idx) in endList"
          :key="`event-end-${item.id}`">
          <card-event :card="item" :key="`event-end-${item.id}`"></card-event>
        </div>
        </transition-group>
      </list-vertical>
      
      <div v-if="endList&&endList.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:16px">종료된 이벤트가 없습니다.</div>
    </div>
  </tab>
</div>
</template>
<script>
import CardEvent from "@/components/Components/Card/CardEvent"

export default {
  name: 'BlockEvent',
  components: {
    CardEvent
  },
  mixins: [

  ],
  props: {

  },
  data() {
    return {
      "menu": [
        {
          "id": 0,
          "name": "진행중인 이벤트"
        },
        {
          "id": 1,
          "name": "종료된 이벤트"
        }
      ],
      "event": undefined
    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
  
  methods: {
    getData() {
      let url = 'public/board/event?page_num=1&page_length=10'
      this.$axios.get(url)
      .then(res => {
        this.event = res.data.data;
      })
    }
  },
  computed: {
    selectedTabStyle() {
      return {
        color: `${this.getColor('Primary Color')}`,
        width: '50%',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: 'white',
      }
    },
    unselectedTabStyle() {
      return {
        color: `${this.getColor('기본 내용 색상')}`,
        width: '50%',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      }
    },
    onList() {
      let result = []
      if(this.event) {
        this.event.forEach(item => {
          if(this.moment().isBefore(item.end_date) || this.moment().isSame(item.end_date, 'day')) {
            item.disabled = false;
            result.push(item)
          }
        })
      }
      return result;
    },
    endList() {
      let result = []
      if(this.event) {
        this.event.forEach(item => {
          if(this.moment().isAfter(item.end_date, 'day')) {
            item.disabled = true;
            result.push(item)
          }
        })
      }
      return result;
    }
  },
  watch: {
    
  }
}
</script>


