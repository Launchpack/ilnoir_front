<template>
<div style="color:#212121;background-color:#f8f8f8" :style="pagePadding"
  v-if="detail">
    <div class="size-18 weight-500" style="padding:26px 0 20px">보험금 청구</div>
  <div class="margin-bottom-30">
    <div class="flex-between margin-bottom-16" style="color:#212121">
      <div class="size-15 bold" style="color:#4f76ff">가입 내용</div>
      <div class="position-relative">
        <div class="flex-align unselect size-14" style="color:#484848"  
          @click.stop.prevent="clickName">
          <div><span class="weight-500">{{ detail.user.name }}</span>님</div>
          <i class="material-icons">arrow_drop_down</i>
        </div>

        <div class="position-absolute dropdown-box" v-if="nameDrop"
          v-click-outside="clickOut">
            <div class="flex-align margin-bottom-10">
              <div class="name-btn text-center size-12"
                style="margin-right:8px">이름</div> 
              <div class="size-14" style="color:#484848">{{ detail.user.name }}</div>
            </div>

            <div class="flex-align margin-bottom-16">
              <div class="name-btn text-center size-12"
                style="margin-right:8px">휴대폰번호</div> 
              <div class="size-14" style="color:#484848">{{ detail.user.phone }}</div>
            </div>

            <div class="btn-back unselect size-14 text-center"
              @click="routerPush('insurance_search')">다른 이름으로 조회</div>
        </div>
      </div>
    </div>

      <div class="size-14 weight-400 margin-bottom-24" 
        style="color:#212121;border-top:1px solid #696969">
        
        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">보험상품</div>
          <div class="col-7" style="padding:0 8px">{{ detail.insurance.name }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">피보험자명</div>
          <div class="col-7" style="padding:0 8px">{{ detail.user.name }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">보험증권번호</div>
          <div class="col-7" style="padding:0 8px">{{ detail.stock_number }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">보험개시일</div>
          <div class="col-7" style="padding:0 8px">{{ computedDate() }}</div>
        </div>

        <div class="flex-align list-content">
          <div class="col-5" style="color:#7e7e7e;padding:0 8px">보험가입금액</div>
          <div class="col-7" style="padding:0 8px">{{ detail.insurance_price | currency }}</div>
        </div>

      </div>
  </div>

    <div class="margin-bottom-30">
      <div class="size-15 margin-bottom-16 bold" style="color:#4f76ff">공통 구비서류</div>
      <div class="size-14" style="border-top:1px solid #696969">
        <div class="table-contents">
          <div class="flex-align margin-bottom-10">
            <i class="material-icons" style="margin-right:8px;font-size:18px"
              :style="params['privacy'].length>0 ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">보험금청구서/개인정보처리동의서</div>
          </div>

            <div v-if="params['privacy'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['privacy'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('privacy')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="privacy" class="input-hidden"
                @change="e => onFileChange(e,'privacy')">
              <label class="btn-upload unselect weight-400" style="margin-right:12px"
                for="privacy">파일첨부</label>
              <a class="btn-download unselect weight-400"
                href="static/image/icon/ic_apple.png" download
                @click="clickDown('privacy')">양식 다운로드</a>
            </div>
        </div>

        <div class="table-contents">
          <div class="flex-align margin-bottom-10">
            <i class="material-icons" style="margin-right:8px;font-size:18px"
              :style="params['identification'].length>0 ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400" style="margin-right:12px">신분증 사본</div>
            <div class="size-13 weight-400" style="color:#9e9e9e">사업자인 경우 사업자등록증 사본</div>
          </div>

            <div v-if="params['identification'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['identification'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('identification')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="identification" class="input-hidden"
                @change="e => onFileChange(e,'identification')">
              <label class="btn-upload unselect weight-400"
                for="identification">파일첨부</label>
            </div>
        </div>

        <div class="table-contents">
          <div class="flex-align margin-bottom-10">
            <i class="material-icons" style="margin-right:8px;font-size:18px"
              :style="params['bank_book'].length>0 ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">통장사본</div>
          </div>

            <div v-if="params['bank_book'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['bank_book'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('bank_book')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="bank_book" class="input-hidden"
                @change="e => onFileChange(e,'bank_book')">
              <label class="btn-upload unselect weight-400"
                for="bank_book">파일첨부</label>
            </div>
        </div>

        <div class="table-contents">
          <div class="flex-align margin-bottom-10">
            <i class="material-icons" style="margin-right:8px;font-size:18px"
              :style="params['invoice'].length>0 ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">운송장</div>
          </div>

            <div v-if="params['invoice'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['invoice'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('invoice')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="invoice" class="input-hidden"
                @change="e => onFileChange(e,'invoice')">
              <label class="btn-upload unselect weight-400"
                for="invoice">파일첨부</label>
            </div>
        </div>

        <div class="table-contents">
          <div class="flex-align margin-bottom-10">
            <i class="material-icons" style="margin-right:8px;font-size:18px"
              :style="params['delivery'].length>0 ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">택배시 배송이력화면 캡쳐</div>
          </div>

            <div v-if="params['delivery'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['delivery'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('delivery')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="delivery" class="input-hidden"
                @change="e => onFileChange(e,'delivery')">
              <label class="btn-upload unselect weight-400"
                for="delivery">파일첨부</label>
            </div>
        </div>

        <div class="table-contents">
          <div class="flex-align margin-bottom-10">
            <i class="material-icons" style="margin-right:8px;font-size:18px"
              :style="params['seller'].length>0 ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">구매 당시 판매자가 등재한 물품사진</div>
          </div>

            <div v-if="params['seller'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['seller'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('seller')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="seller" class="input-hidden"
                @change="e => onFileChange(e,'seller')">
              <label class="btn-upload unselect weight-400"
                for="seller">파일첨부</label>
            </div>
        </div>

      </div>
    </div>

    <div class="margin-bottom-30">
      <div class="margin-bottom-16">
        <div class="size-14 bold margin-bottom-4" style="color:#4f76ff;">사고 유형별 구비서류</div>
        <div class="size-14 weight-500" style="color:#696969">아래 사고 유형 중 한가지를 선택하여 입력해 주세요.</div>
       </div> 
      <div class="size-14" style="border-top:1px solid #696969">
        <div class="table-contents">
          <div class="margin-bottom-10">
            <div class="size-14 weight-400">1. 파손시</div>
          </div>

            <div v-if="params['damage'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['damage'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('damage')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="damage" class="input-hidden"
                @change="e => onFileChange(e,'damage')">
              <label class="btn-upload unselect weight-400"
                for="damage"
                v-if="acciState('damage')">파일첨부</label>
            </div>
        </div>

        <div class="table-contents">
          <div class="margin-bottom-10">
            <div class="size-14 weight-400 margin-bottom-4">2. 망실(오배송)</div>
            <div class="size-13 weight-400" style="color:#bbbbbb">경찰서사고접수확인서 등 판매자 사기신고서류 첨부</div>
          </div>

            <div v-if="params['misdelivery'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['misdelivery'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('misdelivery')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="misdelivery" class="input-hidden"
                @change="e => onFileChange(e,'misdelivery')">
              <label class="btn-upload unselect weight-400"
                for="misdelivery"
                v-if="acciState('misdelivery')">파일첨부</label>
            </div>
        </div>

        <div class="table-contents">
          <div class="margin-bottom-10">
            <div class="size-14 weight-400 margin-bottom-4">3. 배송이 완료되었으나 물품 도난시</div>
            <div class="size-13 weight-400" style="color:#bbbbbb">운송인(택배기사 등)이 작성한 도난확인증명서 첨부</div>
          </div>

            <div v-if="params['theft'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['theft'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('theft')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="theft" class="input-hidden"
                @change="e => onFileChange(e,'theft')">
              <label class="btn-upload unselect weight-400" style="margin-right:12px"
                for="theft"
                v-if="acciState('theft')">파일첨부</label>
              <a class="btn-download unselect weight-400"
                v-if="acciState('theft')"
                href="static/image/icon/ic_apple.png" download
                @click="clickDown('theft')">양식 다운로드</a>
            </div>
        </div>

        <div class="table-contents">
          <div class="margin-bottom-10">
            <div class="size-14 weight-400 margin-bottom-4">4. 분실</div>
            <div class="size-13 weight-400" style="color:#bbbbbb">운송인(택배기사 등)이 작성한 분실확인증명서 첨부</div>
          </div>

            <div v-if="params['lost'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['lost'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('lost')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="lost" class="input-hidden"
                @change="e => onFileChange(e,'lost')">
              <label class="btn-upload unselect weight-400" style="margin-right:12px"
                for="lost"
                v-if="acciState('lost')">파일첨부</label>
              <a class="btn-download unselect weight-400"
                v-if="acciState('lost')"
                href="static/image/icon/ic_apple.png" download
                @click="clickDown('lost')">양식 다운로드</a>
            </div>
        </div>

        <div class="table-contents">
          <div class="margin-bottom-10">
            <div class="size-14 weight-400 margin-bottom-4">5. 반송시</div>
            <div class="size-13 weight-400" style="color:#bbbbbb">반품운송장과 반품배송비용 영수증 첨부</div>
          </div>

            <div v-if="params['return'].length>0" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div>{{ params['return'][0][0].name }}</div>
              <div class="btn-delete unselect weight-400"
                @click="clickDelete('return')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="return" class="input-hidden"
                @change="e => onFileChange(e,'return')">
              <label class="btn-upload unselect weight-400"
                for="return"
                v-if="acciState('return')">파일첨부</label>
            </div>
        </div>

      </div>
    </div>

    <div style="margin-bottom:40px">
      <div class="flex-align margin-bottom-16">
        <div class="size-14 bold" style="color:#4f76ff;margin-right:20px">개인 정보 제공 동의</div>
       </div> 
      <div class="size-15" style="border-top:1px solid #696969">
        <div class="table-privacy flex-between">
          <div class="flex-align unselect" @click="clickAgree">
            <i class="material-icons" :style="agreeState ? agreeStyle : disStyle"
              style="margin-right:8px">check</i>
            <div class="size-14">정보 제공 동의 확인</div>
          </div>
        </div>

        <div class="table-privacy flex-between">
          <div class="flex-align unselect" @click="clickDrop">
            <i class="material-icons" 
              style="margin-right:6px;color:#4f76ff;font-size:15px">{{ dropState ? 'remove' : 'add'}}</i>
            <div class="size-14 weight-400" style="margin-right:16px">개인 정보 수집·이용에 관한 동의사항</div>
          </div>
        </div>
        <div v-if="dropState" class="drop-box size-14">
          개인정보 처리방침
        </div>

      </div>
    </div>

    <div class="flex-justify">
      <div class="btn-request size-16 weight-400 unselect"
        @click="clickRequest">제출하기</div>
    </div>


  <div class="position-fixed flex-center" :style="modalStyle" v-if="commonInvalid">
    <div class="text-center col-11">
      <div class="modal-white size-14">공통 구비서류를 모두 첨부해 주시기 바랍니다.</div>
      <div class="modal-btn size-16 unselect"
        @click.stop.prevent="clickModal">확인</div>
    </div>
  </div>

  <div class="position-fixed flex-center" :style="modalStyle" v-if="acciInvalid">
    <div class="text-center col-11">
      <div class="modal-white size-14">사고유형별 구비서류를 첨부해 주시기 바랍니다.</div>
      <div class="modal-btn size-16 unselect"
        @click.stop.prevent="clickModal">확인</div>
    </div>
  </div>

  <div class="position-fixed flex-center" :style="modalStyle" v-if="privacyInvalid">
    <div class="text-center col-11">
      <div class="modal-white size-14">개인 정보 제공에 동의해 주시기 바랍니다.</div>
      <div class="modal-btn size-16 unselect"
        @click.stop.prevent="clickModal">확인</div>
    </div>
  </div>

</div>
</template>
<script>
export default {
  name: "InsuranceRequest",
  data() {
    return {
      detail: {
      },
      checkState: false,
      agreeState: false,
      nameDrop: false,
      dropState: false,
      commonInvalid: false,
      acciInvalid: false,
      privacyInvalid: false,
      agreeStyle: {
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#4f76ff',
        border: '1px solid #4f76ff'
      },
      disStyle: {
        fontSize: '16px',
        color: 'white',
        backgroundColor: 'white',
        border: '1px solid #dddddd'
      },
      params: {
        order_id: '',
        identification: [],
        bank_book: [],
        invoice: [],
        delivery: [],
        seller: [],
        damage: [],
        misdelivery: [],
        theft: [],
        lost: [],
        return: [],
        privacy: [],
        send_back: [],
        accident: []
      },
      commonList: ['privacy', 'identification', 'bank_book', 'invoice', 'delivery', 'seller'],
      acciList: ['damage', 'misdelivery', 'theft', 'lost', 'return'],
      selectedAcci: undefined
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get(`/api/user/${this.$route.query.user}/order/${this.$route.query.id}`).then(res => {
        if(res.status===200) {
          this.detail = res.data;
        }
      });
    },
    acciState(val) {
      if(this.selectedAcci===undefined) {
        return true;
      }
      else {
        if(this.selectedAcci===val) {
          return true;
        }
        else {
          return false;
        }
      }
    },
    computedDate() {
      if(this.detail.invoice_date.length>0) {
        return this.detail.invoice_date.split('T')[0];
      }
      else {
        return ''
      }
    },
    onFileChange(e, val) {
      let file = e.target.files;
      this.params[val].push(file);
      if(this.acciList.indexOf(val)>-1) {
        this.selectedAcci = val;
      }
      console.log(file)
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = (f) => {
      //   let ext = file.name.split('.')[file.name.split('.').length-1];
      //   this.params[val].push({
      //     name: file.name,
      //     file : f.srcElement.result,
      //     size: file.size,
      //     extention: ext
      //   })
      // }
    },
    clickDelete(val) {
      this.params[val] = [];
      if(this.acciList.indexOf(val)>-1) {
        this.selectedAcci = undefined;
      }
    },
    clickBtn() {
      this.routerPush('insurance_search');
    },
    clickAgree() {
      this.agreeState = !this.agreeState;
    },
    clickDrop() {
      this.dropState = !this.dropState;
    },
    async clickRequest() {
      let accident = [];
      let params = Object.entries(this.params);
      let param = {};
      if(this.agreeState === false) {
        this.privacyInvalid = true;
      }
      else {
        await params.forEach(item => {
          if(item[1].length===0) {
            if(this.commonList.indexOf(item[0])>-1) {
              this.commonInvalid = true;
            }
            else if(this.acciList.indexOf(item[0])>-1) {
              accident.push(false);
            }
          }
          else {
            if(this.acciList.indexOf(item[0])>-1) {
              accident.push(true);
              param['accident'] = item[1][0];
              if(item[0]==='damage') {
                param['accident_type'] = '파손시'
              }
              else if(item[0]==='misdelivery') {
                param['accident_type'] = '오배송'
              }
              else if(item[0]==='theft') {
                param['accident_type'] = '물품 도난'
              }
              else if(item[0]==='lost') {
                param['accident_type'] = '분실'
              }
              else if(item[0]==='return') {
                param['accident_type'] = '반송'
              }
            }
            else {
              param[item[0]] = item[1][0];
            }
          }
        });
      }

      if(accident.indexOf(true)===-1) {
        this.acciInvalid = true;
      }
      
      if(this.commonInvalid | this.acciInvalid | this.privacyInvalid) return;

      let formData = new FormData();
      let headers = { 'Content-Type': 'multipart/form-data' }
      // param.order_id = this.detail._id;
      formData.append('order_id', this.detail._id);
      this.addFormData(formData, param);
      console.log('formdata',formData,'param',param)
      // params.order_id = this.detail._id;
      this.$axios.post(`/api/user/claim`, formData, headers).then(res => {
        console.log('res',res)
        if(res.status===200) {
          this.routerPush('request_done')
        }
      });

      console.log('done')
    },
    addFormData (formData, param) {
      for (let [key, value] of Object.entries(param)) {
          for (let item of value) {

              formData.append(key, item);
              console.log(key, value, item)
              console.log('formData',formData)
          }
      }
      // for (let file of this.value[]) {
      //     formData.append(`file${i}`, file) // note, no square-brackets
      // }
    },
    clickModal() {
      this.commonInvalid = false;
      this.acciInvalid = false;
      this.privacyInvalid = false;
    },
    clickOut() {
      this.nameDrop = false;
    },
    clickName() {
      this.nameDrop = !this.nameDrop;
    },
    clickDown(val) {
      if(val==='privacy') {
        // let filename = "https://launchpack-storage.s3.ap-northeast-2.amazonaws.com/media/grit12/non-path/12371331_thumb.png";
        // var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = function () {
        //     var a = document.createElement('a');
        //     a.href = window.URL.createObjectURL(xhr.response); 
        //     a.download = filename; 
        //     a.style.display = 'none';
        //     document.body.appendChild(a);
        //     a.click();
        //     delete a;
        // };
        // xhr.open('GET', filename);
        // xhr.send();
        console.log('privacy down')
      }
      else if(val==='theft') {
        console.log('theft')
      }
      else if(val='lost') {
        console.log('lost')
      }
      else {
        console.log('else')
      }
    }
  },
  computed: {
    modalStyle() {
      return {
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
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
.table-title {
  background-color: white;
  padding: 8px 0;
  border-top: 2px solid #696969;
  border-bottom: 2px solid #696969;
}
.table-content {
  background-color: white;
  padding: 12px 0;
  border-bottom: 1px solid #eeeeee;
}
.table-contents {
  background-color: white;
  padding: 10px 12px;
  border-bottom: 1px solid #eeeeee;
}
.table-privacy {
  background-color: white;
  padding: 12px 12px;
  border-bottom: 1px solid #eeeeee;
}
.btn-delete {
  border: 1px solid #dddddd;
  padding: 8px 12px;
}
.btn-upload {
  border: 1px solid #4f76ff;
  color: #4f76ff;
  padding: 8px 0;
  width: 120px;
  text-align: center;
}
.btn-download {
  border: 1px solid #dddddd;
  color: #696969;
  padding: 8px 0;
  width: 120px;
  text-align: center;
}
.drop-box {
  padding: 16px;
  background-color: #eeeeee;
  max-height: 420px;
  overflow-y: auto;
}
.btn-request {
  width: 160px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  background-color: #4f76ff;
  color: white;
}
.modal-white {
  width: 100%;
  height: 140px;
  line-height: 140px;
  background-color: white;
}
.modal-btn {
  width: 100%;
  height: 54px;
  line-height: 54px;
  background-color: #4f76ff;
  color: white;
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
.list-content {
  border-bottom: 1px solid #eeeeee;
  background-color: white;
  padding: 12px 0;
}
.btn-uploads {
  color: #4f76ff;
  border: 1px solid #4f76ff;
  width: 78px;
  height: 32px;
  line-height: 32px;
}
.input-hidden {
  width: 0;
  height: 0;
  position: fixed;
  top: -100px;
  left: -100px;
}
</style>