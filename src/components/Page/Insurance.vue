<template>
<div style="background-color:#f8f8f8" :style="pagePadding"
  v-if="list&&list.length>0">
    <div class="flex-between" style="padding:60px 0 20px;color:#212121">
      <div class="size-18 weight-500">가입 보험 조회 내역</div>
      <div class="position-relative">
        <div class="flex-align unselect size-14" style="color:#484848"
          @click.stop.prevent="clickDrop">
          <div><span class="weight-500">{{ list[0].user.name }}</span>님</div>
          <i class="material-icons">arrow_drop_down</i>
        </div>

        <div class="position-absolute dropdown-box" v-if="dropState"
          v-click-outside="clickOut">
            <div class="flex-align margin-bottom-10">
              <div class="name-btn text-center size-12"
                style="margin-right:8px">이름</div>
              <div class="size-14" style="color:#484848">{{ list[0].user.name }}</div>
            </div>

            <div class="flex-align margin-bottom-16">
              <div class="name-btn text-center size-12"
                style="margin-right:8px">휴대폰번호</div>
              <div class="size-14" style="color:#484848">{{ list[0].user.phone }}</div>
            </div>

            <div class="btn-back unselect size-14 text-center"
              @click="routerPush('insurance_search')">다른 이름으로 조회</div>
        </div>
      </div>
    </div>

    <div v-for="(item,idx) in list" :key="'key-'+idx">
      <div class="size-14 weight-400 margin-bottom-24" style="color:#212121">
        <div :style="[item.status===5 ? {backgroundColor: '#8f8f8f'} : {backgroundColor: '#4f76ff'}]"
          class="title-bar">{{ insuranceProductName(item.total_product_price) }}</div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">피보험자명</div>
          <div class="col-7" style="padding:0 8px">{{ item.user.name }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">보험증권번호</div>
          <div class="col-7" style="padding:0 8px">{{ item.stock_number }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">보험개시일</div>
          <div class="col-7" style="padding:0 8px">{{ computedDate(item) }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">보험가입금액</div>
          <div class="col-7" style="padding:0 8px">{{ item.total_product_price | currency }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">가입 보험 현황</div>
          <div class="col-7" style="padding:0 8px">{{ statusKor(item) }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">보험금 청구</div>
          <div class="col-7" style="padding:0 8px">
            <template v-if="item.status===4">
              <div class="btn-request size-14 unselect text-center weight-400"
                @click="clickBtn(item)">청구하기</div>
            </template>
          </div>
        </div>

      </div>
    </div>

    <div class="position-fixed flex-center" :style="modalStyle" v-if="modalState">
    <div style="width:calc(100% - 32px)">
      <div class="modal-white size-14 weight-400">
        <div>-일디랩은 고객의 보험금 청구 서비스를 제공할 뿐 보험금을 지급하는 보험회사는 아닙니다.</div>
        <div>-보험금 지급의 역할은 보험회사에 있으며 <span style="color:#4f76ff">보험금 지급</span>과 관련해서는
          알림 메시지에 기재된 <span style="color:#4f76ff">보험회사 연락처를 통해 진행</span>해주시기 바랍니다.</div>
      </div>
      <div class="flex-align weight-400 text-center">
        <div class="modal-btn size-15 unselect" style="background-color:#8a8a8a"
          @click.stop.prevent="clickModal">닫기</div>
        <div class="modal-btn size-15 unselect" style="background-color:#4f76ff"
          @click.stop.prevent="clickRequest">보험금 청구하기</div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
export default {
  name: "Insurance",
  data() {
    return {
      modalState: false,
        list: [
        ],
        dropState: false,
        selectedItem: undefined
    }
  },
  created() {
    this.getData();
  },
  methods: {
    insuranceProductName(price) {
      let insurance_product = '';
      if (price <= 1000000) {
          insurance_product = 'Chubb\n구매물품\n보상보험';
      } else if (price > 1000000 && price < 5000000) {
          insurance_product = 'Chubb\n카고플러스';
      }
      return insurance_product;
    },
    getData() {
      this.$axios.get(`/user/order/${this.$route.query.id}`).then(res => {
        if(res.status===200) {
          if (res.data.data.length > 0) {
            this.list = res.data.data;
            this.filtered.page_length = res.data.page_length;
            this.filtered.total_page = res.data.total_page;
            this.filtered.cur_page = res.data.cur_page;
          }
        }
      })
    },
    statusKor(item) {
      return {
        0: '검토대기',
        1: '검토중',
        2: '검토중',
        3: '보험사 전달 및 검토 완료',
        4: '검토대기',
        5: '면책'
      }[item.status];
    },
    computedDate(item) {
      if(item.invoice_date.length>0) {
        return item.invoice_date.split('T')[0];
      }
      else {
        return ''
      }
    },
    clickBtn(item) {
      this.selectedItem = item;
      this.modalState = true;
    },
    clickRequest() {
      this.routerPush(`insurance_request?id=${this.selectedItem.id}&user=${this.selectedItem.user.id}`);
    },
    clickModal() {
      this.modalState = false;
    },
    clickDrop() {
      this.dropState = !this.dropState;
    },
    clickOut() {
      this.dropState = false;
    }
  },
  computed: {
    modalStyle() {
      return {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: '9999'
      }
    }
  }
}
</script>

<style scoped>
.btn-back {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: white;
  background-color: #7e7e7e;
}
.btn-request {
  color: #4f76ff;
  border: 1px solid #4f76ff;
  width: 78px;
  height: 32px;
  line-height: 32px;
}
.title-bar {
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: white;
  padding: 0 8px;
}
.list-content {
  border-bottom: 1px solid #eeeeee;
  background-color: white;
  padding: 8px 0;
}
.dropdown-box {
  background-color: white;
  border: 1px solid #e9e9e9;
  padding: 16px;
  width: 220px;
  height: 152px;
  bottom: -160px;
  right: 0;
}
.name-btn {
  width: 72px;
  height: 28px;
  border-radius: 14px;
  border: 1px solid #4f76ff;
  line-height: 28px;
  color: #0190ff;
}
.modal-white {
  width: 100%;
  height: 200px;
  padding: 28px 20px;
  font-size: 14px;
  line-height: 28px;
  background-color: white;
}
.modal-btn {
  width: 50%;
  height: 52px;
  line-height: 52px;
  color: white;
}
</style>
