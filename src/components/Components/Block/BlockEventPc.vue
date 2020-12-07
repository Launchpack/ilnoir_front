<template>
<div class="flex-justify">
    <div style="padding:32px 0 100px" :style="pcMaxWidth" v-if="event"
  class="position-relative">
  <!--<div class="position-absolute" style="top:0">-->
  <!--  <bread-crumb-pc :breadcrumb="breadcrumb"></bread-crumb-pc>-->
  <!--</div>-->
  <tab :menu="menu" tabPosition="flex-end" :selectedTabStyle="selectedTabStyle"
    :unselectedTabStyle="unselectedTabStyle" :dividerStyle="{}" :wrapRadius="true">
    <div slot="0" style="margin-top:32px">
      <div class="size-20 weight-500 margin-bottom-6" :style="brandColor.main">진행중인 이벤트</div>
      <div class="size-14 margin-bottom-16" :style="brandColor.sub">{{ moment().locale('ko').format('LL') }}</div>
      <list-vertical v-if="$route.query.tab===0">
        <transition-group name="fade" slot="card" class="grid-box" tag="div">
        <div 
          v-for="(item,idx) in onList" class="col-6"
          :key="`card-prod-${item.id}-${idx}`"
          :style="cardStyle(idx)">
          <card-event-pc :card="item"
                      ></card-event-pc>
        </div>
        </transition-group>
      </list-vertical>
      <div v-if="onList&&onList.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:16px">진행중인 이벤트가 없습니다.</div>
    </div>
    
    <div slot="1" style="margin-top:32px">
     <div class="size-20 weight-500 margin-bottom-16" :style="brandColor.main">종료된 이벤트</div>
      <list-vertical v-if="$route.query.tab===1">
        <transition-group name="fade" slot="card" class="grid-box" tag="div">
        <div 
          v-for="(item,idx) in endList" class="col-6"
          :key="`card-prod-${item.id}-${idx}`"
          :style="cardStyle(idx)">
          <card-event-pc :card="item"
                      ></card-event-pc>
        </div>
        </transition-group>
      </list-vertical>
      <div v-if="endList&&endList.length===0" class="empty-view" :style="brandColor.sub"
          style="font-family: 'Arita Dotum Medium';font-size:16px">종료된 이벤트가 없습니다.</div>
    </div>
  </tab>
</div>
  </div>
</template>
<script>
import CardEventPc from "@/components/Components/Card/CardEventPc"
import BreadCrumbPc from "@/components/Components/Common/BreadCrumbPc"
import BlockMixin from "@/components/Mixins/BlockMixin"

export default {
  name: 'BlockEventPc',
  components: {
    CardEventPc,
    BreadCrumbPc
  },
  mixins: [
    BlockMixin
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
      "event": undefined,
      "breadcrumb": [
        {
          "link": "home",
          "name": "홈"
        },
        {
          "name": "이벤트"
        }
      ]
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
    },
    cardStyle(idx) {
      let obj = {}
      
      let gutters = 16;
      obj.paddingLeft = `${gutters/2}px`;
      obj.paddingRight = `${gutters/2}px`;
      obj.paddingBottom = `${gutters}px`;
      
      if(idx%2===0) obj.paddingLeft = 0;
      else if(idx%2===1) obj.paddingRight = 0;
      
      return obj;
    }
  },
  computed: {
    selectedTabStyle() {
      return {
        color: `${this.getColor('Primary Color')}`,
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: 'white',
        padding: '14px 16px',
        fontWeight: '500'
      }
    },
    unselectedTabStyle() {
      return {
        color: `${this.getColor('기본 내용 색상')}`,
        textAlign: 'center',
        fontSize: '14px',
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
        padding: '14px 16px',
        fontWeight: '500'
      }
    },
    onList() {
      let result = []
      if(this.event) {
        this.event.forEach(item => {
          if(this.moment().isBefore(item.end_date) || this.moment().isSame(item.end_date, 'day')) {
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


