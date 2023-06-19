<template>
  <div class="flex-justify" style="background-color:#f8f8f8"
       v-if="list&&list.length>0">
    <div :style="pcMaxWidth">
      <div class="flex-between" style="padding:60px 0 20px;color:#212121">
        <div class="size-26 weight-500">가입 보험 조회 내역</div>
        <div class="flex-align size-14">
          <div class="weight-500">{{ list[0].user.name }} ({{ list[0].user.phone }})</div>
          <div class="btn-back unselect" style="margin-left:12px"
               @click="routerPush('insurance_search')">다른 이름으로 조회
          </div>
        </div>
      </div>

      <div class="list-title flex-align text-center size-15 weight-400" style="color:#212121">
        <div class="col-1">주문번호</div>
        <div class="col-2">보험상품명</div>
        <div class="col-1">피보험자명</div>
        <div class="col-2">보험증권번호</div>
        <div class="col-1">보험개시일</div>
        <div class="col-1">보험가입금액</div>
        <div class="col-2">가입 보험 현황</div>
        <div class="col-2">보험금 청구</div>
      </div>

      <div v-for="(item,idx) in list" :key="'key-'+idx">
        <div class="list-content flex-align text-center size-14 weight-400" style="color:#212121"
             :style="[item.status===5 ? {color: '#aaaaaa'} : {color: '#212121'}]">
          <div class="col-1" style="word-break: break-all">{{ item.order_number }}</div>
          <div class="col-2">{{ insuranceProductName(item.total_product_price) }}</div>
          <div class="col-1">{{ item.user.name }}</div>
          <div class="col-2" style="word-break: break-all">{{ item.stock_number }}</div>
          <div class="col-1">{{ computedDate(item) }}</div>
          <div class="col-1">{{ item.total_product_price | currency }}</div>
          <div class="col-2">{{ statusKor(item) }}</div>
          <div class="col-2 flex-justify" v-if="item.status===4">
            <div class="btn-request size-14 unselect text-center weight-400"
                 @click="clickBtn(item)">청구하기
            </div>
          </div>
        </div>
      </div>
      <pagination :filtered="filtered" @getData="getData"></pagination>

    </div>

    <div class="position-fixed flex-center" :style="modalStyle" v-if="modalState">
      <div>
        <div class="modal-white size-14 weight-400">
          <div>-일디랩은 고객의 보험금 청구 서비스를 제공할 뿐 보험금을 지급하는 보험회사는 아닙니다.</div>
          <div>-보험금 지급의 역할은 보험회사에 있으며 <span style="color:#4f76ff">보험금 지급</span>과 관련해서는
            알림 메시지에 기재된 <span style="color:#4f76ff">보험회사 연락처를 통해 진행</span>해주시기 바랍니다.
          </div>
        </div>
        <div class="flex-align weight-400 text-center">
          <div class="modal-btn size-16 unselect" style="background-color:#8a8a8a"
               @click.stop.prevent="clickModal">닫기
          </div>
          <div class="modal-btn size-16 unselect" style="background-color:#4f76ff"
               @click.stop.prevent="clickRequest">보험금 청구하기
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import Pagination from "../Components/Common/Pagination";

  export default {
    name: "Insurance",
    components: {Pagination},
    data() {
      return {
        modalState: false,
        list: [],
        selectedItem: undefined,
        filtered: {}
      }
    },
    created() {
      this.filtered = {
        cur_page: 1,
        total_page:1,
        page_length: 10
      };
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
        this.$axios.get(`/user/order/${this.$route.query.id}`, {
          params: this.filtered
        }).then(res => {
          if (res.status === 200) {
            if (res.data.data.length > 0) {
              // 임시
              /*res.data.data.forEach(i => {
                if(i.status === 5) {
                  i.status = 4;
                }
              });*/
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
          2: '검토완료',
          3: '검토완료',
          4: '검토대기',
          5: '면책'
        }[item.status];
      },
      computedDate(item) {
        if (item.invoice_date.length > 0) {
          return item.invoice_date.split('T')[0];
        } else {
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
    padding: 8px 12px;
    color: white;
    background-color: #7e7e7e;
  }

  .btn-request {
    color: #4f76ff;
    border: 1px solid #4f76ff;
    width: 80px;
    height: 32px;
    line-height: 32px;
  }

  .list-title {
    border-top: 1px solid #696969;
    border-bottom: 1px solid #696969;
    background-color: white;
    padding: 8px 0;
  }

  .list-content {
    border-bottom: 1px solid #eeeeee;
    background-color: white;
    padding: 12px 0;
  }

  .modal-white {
    width: 600px;
    height: 160px;
    padding: 36px 20px;
    font-size: 14px;
    line-height: 28px;
    background-color: white;
  }

  .modal-btn {
    width: 300px;
    height: 54px;
    line-height: 54px;
    color: white;
  }
</style>
