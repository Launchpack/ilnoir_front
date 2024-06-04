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
          <div class="col-7" style="padding:0 8px">{{ insuranceProductName(detail.total_product_price) }}</div>
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
          <div class="col-7" style="padding:0 8px">{{ detail.total_product_price | currency }}</div>
        </div>

      </div>
  </div>

    <div class="margin-bottom-30">
      <div class="size-15 margin-bottom-16 bold" style="color:#4f76ff">공통 구비서류</div>
      <div class="size-14" style="border-top:1px solid #696969">
        <div class="table-contents">
          <div class="flex-align margin-bottom-10">
            <i class="material-icons" style="margin-right:8px;font-size:18px"
              :style="params['privacy'] ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">보험금청구서/개인정보처리동의서</div>
          </div>

            <div v-if="params['privacy']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['privacy'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
                @click="clickDelete('privacy')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="privacy" class="input-hidden"
                @change="e => onFileChange(e,'privacy')">
              <label class="btn-upload unselect weight-400" style="margin-right:12px"
                for="privacy">파일첨부</label>
              <a class="btn-download unselect weight-400"
                href="https://ilnoir.s3.ap-northeast-2.amazonaws.com/claim/static/form/privacy240604.docx"
                download
                target="_blank"
                @click="clickDown('privacy')">양식 다운로드</a>
            </div>
        </div>

        <div class="table-contents">
          <div class="flex margin-bottom-10" style="gap:8px">
            <i class="material-icons" style="font-size:18px"
               :style="params['identification'] ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div>
              <div class="size-14 weight-400 margin-bottom-4">거래금액을 입증할 서류 및 인터넷화면캡쳐</div>
              <div class="size-13 weight-400" style="color:#9e9e9e">구매 영수증 및 구매확인 화면캡쳐</div>
            </div>
          </div>

            <div v-if="params['identification']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['identification'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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
              :style="params['bank_book'] ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">통장사본</div>
          </div>

            <div v-if="params['bank_book']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['bank_book'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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
          <div class="flex margin-bottom-10" style="gap:8px">
            <i class="material-icons" style="font-size:18px"
               :style="params['invoice'] ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div>
              <div class="size-14 weight-400 margin-bottom-4">유니패스 조회 화면 캡처</div>
              <div class="size-13 weight-400" style="color:#9e9e9e">수입화물진행정보 창에서 상위 첫번째 테이블만 캡처 첨부</div>
            </div>
          </div>

            <div v-if="params['invoice']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['invoice'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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
              :style="params['delivery'] ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">택배사 배송이력화면 캡쳐</div>
          </div>

            <div v-if="params['delivery']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['delivery'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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
              :style="params['seller'] ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
            <div class="size-14 weight-400">구매 당시 판매자가 등재한 물품사진</div>
          </div>

            <div v-if="params['seller']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['seller'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
                @click="clickDelete('seller')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="seller" class="input-hidden"
                @change="e => onFileChange(e,'seller')">
              <label class="btn-upload unselect weight-400"
                for="seller">파일첨부</label>
            </div>
        </div>

        <!--<div class="table-contents">
          <div class="margin-bottom-10">
            <div class="flex-align margin-bottom-4">
              <i class="material-icons" style="margin-right:8px;font-size:18px"
                :style="params['capture'] ? {color:'#4f76ff'} : {color:'#dddddd'} ">check</i>
              <div class="size-14 weight-400" style="margin-right:12px">거래금액을 입증할 서류 및 인터넷화면캡쳐</div>
            </div>
            <div class="size-13 weight-400" style="color:#9e9e9e;margin-left:24px">구매 영수증 및 구매확인 화면캡쳐</div>
          </div>

            <div v-if="params['capture']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['capture'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
                @click="clickDelete('capture')">삭제</div>
            </div>
            <div v-else class="size-13 flex-align">
              <input type="file" id="capture" class="input-hidden"
                @change="e => onFileChange(e,'capture')">
              <label class="btn-upload unselect weight-400"
                for="capture">파일첨부</label>
            </div>
        </div>-->
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
            <div class="size-14 weight-400 margin-bottom-4">1. 파손시</div>
            <div class="size-13 weight-400" style="color:#bbbbbb">파손물품사진 / 수리비내역서 (파손품 수리시) / 화물수령확인서 (수리불가로 전손시)</div>
          </div>

            <div v-if="params['damage']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['damage'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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

            <div v-if="params['misdelivery']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['misdelivery'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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

            <div v-if="params['theft']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['theft'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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
                href="https://ilnoir.s3.ap-northeast-2.amazonaws.com/claim/static/form/theft240604.docx"
                download
                target="_blank"
                @click="clickDown('theft')">양식 다운로드</a>
            </div>
        </div>

        <div class="table-contents">
          <div class="margin-bottom-10">
            <div class="size-14 weight-400 margin-bottom-4">4. 분실</div>
            <div class="size-13 weight-400" style="color:#bbbbbb">운송인(택배기사 등)이 작성한 분실확인증명서 첨부</div>
          </div>

            <div v-if="params['lost']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['lost'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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
                href="https://ilnoir.s3.ap-northeast-2.amazonaws.com/claim/static/form/lost240604.docx"
                download
                target="_blank"
                @click="clickDown('lost')">양식 다운로드</a>
            </div>
        </div>

        <div class="table-contents">
          <div class="margin-bottom-10">
            <div class="size-14 weight-400 margin-bottom-4">5. 반송시</div>
            <div class="size-13 weight-400" style="color:#bbbbbb">반품운송장과 반품배송비용 영수증 첨부</div>
          </div>

            <div v-if="params['return']" class="flex-between size-13"
              style="color:#696969;padding:0 12px 0 28px">
              <div class="col-9">{{ params['return'].name }}</div>
              <div class="btn-delete unselect weight-400 col-3 text-center"
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
          <p>주식회사 일루와디지털랩 (이하 &quot;회사&quot;라 함)은 아래와 같이 개인정보취급방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다. 본 개인정보취급방침은 당사가 본
            웹사이트(http://ilnoir.us)에서 이용자의 정보를 수집 및 활용하는 방법과 범위를 알려 드리기 위한 내용을 담고 있습니다. 본 웹사이트를 이용하시거나 개인정보를 제출하시기 전에 아래
            내용을 먼저 확인 바랍니다.<br>
          </p>
          <div><strong><span>[</span></strong><strong><span>수집하는 개인 정보의 항목 및 수집 방법<span>]</span></span></strong></div>
          <div>
            <span><span>&nbsp;</span>1. 회사는 보험가입 회원의 보험금 청구 서비스 제공<span>, </span>원활한 고객상담을 위해 이용자의 동의 하에 아래와 같은 정보를 <span>API</span>의 방법으로 필수항목으로 수집하고 있습니다<span>.&nbsp;</span></span>
          </div>
          <div><span><span>&nbsp;</span>2. </span><span>회사가 제공하는 클레임 서비스를 이용하는 고객</span></div>
          <div><span>&nbsp; &nbsp; - </span><span>성명<span>(</span>국문<span>, </span>영문<span>), </span>이메일<span>, </span>휴대폰번호<span>, </span>신분증사본<span>, </span>보험금 수령 계좌정보<span>, </span>보험 가입시 제공 동의한 보험청약정보</span>
          </div>
          <div>
            <span><span>&nbsp;</span>3. </span><span>서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다<span>.</span></span>
          </div>
          <div><span>&nbsp; &nbsp;- </span><span>쿠키<span>, </span>서비스 이용 기록<span>, </span>불량 이용 기록</span></div>
          <div><span><span>&nbsp;</span>4. </span><span>개인정보 수집방법</span></div>
          <div><span>&nbsp; &nbsp; </span><span>회사는 다음과 같은 방법으로 개인정보를 수집합니다<span>.</span></span></div>
          <div><span>&nbsp; &nbsp;- </span><span>이용하신 플랫폼에서 보험계약가입시 회사로 정보제공을 동의하신 내용<span>(</span>보험청약정보<span>)</span></span>
          </div>
          <div><span>&nbsp; &nbsp;- </span><span>보험금 청구 서비스를 사용할 경우 제공에 동의하신 내용</span></div>
          <p><span>&nbsp;</span></p>
          <div><span>▶개인정보의 수집 목적<span>&nbsp;</span></span></div>
          <div><span><span>&nbsp;</span>1. </span><span>서비스 제공 이행</span></div>
          <div><span>&nbsp; &nbsp;</span><span>보험가입에 따른 중요 가입안내 보험계약사실 내용 전달<span>, </span>보험금 청구 시 원활한 청구 서비스 제공</span>
          </div>
          <p><span>&nbsp;</span></p>
          <div><span>▶개인정보 수집의 동의</span></div>
          <div><span>&nbsp;</span>1. 회사는 귀하의 개인정보 수집에 대한 동의를 받고 있습니다<span>. </span>귀하의 개인정보 수집과 관련하여 본 웹사이트의 개인정보취급방침 또는
            이용약관의 내용에 대한 『동의』버튼 또는 『동의 안함』 버튼을 클릭할 수 있는 절차를 마련하고 있으며<span>, </span>귀하가 『동의』버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로
            봅니다<span>.</span></div>
          <p><span>&nbsp;</span></p>
          <div><span>▶개인정보 보유 및 이용기간</span></div>
          <div><span>&nbsp;</span>1. 보험금청구 서비스 이용 시 제공에 동의하신 정보 중<span>, </span>고유식별정보 및 계좌관련 정보는 보험사 제출 이후 즉시
            파기합니다<span>.</span></div>
          <div><span>&nbsp;</span>2. 고유식별정보를 제외한<span>, </span>보험계약과 관련된 정보는 계약종료 후 최대 <span>5</span>년간 보관하며 보험계약과 관련이
            없는 비필수 정보는 즉시 파기합니다<span>.</span></div>
          <p><span>&nbsp;</span></p>
          <div><span>▶개인정보의 파기절차 및 방법</span></div>
          <div><span>&nbsp;</span>1. 종이에 출력한 개인정보<span>: </span>분쇄기로 분쇄하거나 소각</div>
          <div><span>&nbsp;</span>2. 전자적 파일로 저장한 개인정보<span>: </span>기록을 재생할 수 없는 기술적 방법을 사용하여 삭제</div>
          <p><span>&nbsp;</span></p>
          <div><span>▶개인정보 자동수집 장치<span>(</span>쿠키<span>-cookie)</span>의 설치<span>, </span>운영 및 그 거부에 관한 사항</span></div>
          <div><span>&nbsp;</span>1. 회사는 개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 수시로
            불러오는<span> ‘</span>쿠키<span>(cookie)’ </span>등을 운용합니다<span>. </span>쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에
            보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터 하드디스크에 저장됩니다<span>.</span></div>
          <p><span>&nbsp;</span></p>
          <div><span>▶ 쿠키 등 사용 목적</span></div>
          <div><span>&nbsp;</span>1. 회원과 비회원의 접속 빈도나 방문 시간 등을 분석<span>, </span>이용자의 취향과 관심분야를 파악 및 자취 추적<span>, </span>각종
          </div>
          <div><span>이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공</span></div>
          <div><span>&nbsp;</span>2. 귀하는 쿠키 설치에 대한 선택권을 가지고 있습니다<span>. </span>따라서<span>, </span>귀하는 웹 브라우저에서 옵션을 설정함으로써
            모든 쿠키를 허용하거나<span>, </span>쿠키가 저장될 때마다 확인을 거치거나<span>, </span>아니면 모든 쿠키의 저장을 거부할 수도
            있습니다<span>.</span></div>
          <div><span>▶ 쿠키 설정 거부 방법</span></div>
          <div><span>&nbsp;</span>1. 쿠키 설정을 거부하는 방법으로는 이용자가 사용하시는 웹 브라우저의 옵션을 택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을
            거치거나<span>, </span>모든 쿠키의 저장을 거부할 수 있습니다<span>. </span>단<span>, </span>이용자께서 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을
            수 있습니다<span>.</span></div>
          <div><span>&nbsp;</span>2. 설정방법 예<span>(</span>인터넷 익스플로어의 경우<span>) : </span>웹 브라우저 상단의 도구<span> &gt; </span>인터넷
            옵션<span> &gt; </span>개인정보
          </div>
          <p><strong><span>&nbsp;</span></strong></p>
          <div><strong><span>[</span></strong><strong><span>개인정보의 공유 및 제공<span>]</span></span></strong></div>
          <div><span>&nbsp;</span>1. 회사는 이용자들의 개인정보를 ‘개인정보의 수집목적’에서 고지한 범위내에서 사용하며<span>, </span>이용자의 사전 동의 없이는 동 범위를
            초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 공개하지 않습니다<span>. </span>다만<span>, </span>이용자들이 사전에 공개에 동의 경우 및 법령의 규정에 의거하거나<span>, </span>수사
            목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우는 예외로 합니다<span>.</span></div>
          <div><span>&nbsp;</span>2. 회사는 서비스 제공을 위해 회원의 동의를 얻는 등 적법한 절차를 통하여 아래와 같이 개인정보를 제공할 수
            있습니다<span>.</span></div>
          <div class="t-wrap">
            <div class="t-title">공유받는 자</div>
            <div class="t-content">에이스아메리칸화재해상보험</div>
          </div>

          <div class="t-wrap">
            <div class="t-title">공유받는 항목</div>
            <div class="t-content">보험을 가입하고, 보험금청구 서비스 이용에 동의한 회원의 성명, 휴대전화번호, 이메일, 상품구매정보 등 보험청구 서비스 이용에 필요한 정보</div>
          </div>

          <div class="t-wrap">
            <div class="t-title">공유받는자의 이용목적</div>
            <div>
              <div class="t-content">- 보험사고 손해사정심사</div>
              <div class="t-content">- 보험금 지급</div>
              <div class="t-content">- 관련된 클레임 업무</div>
            </div>
          </div>

          <div class="t-wrap">
            <div class="t-title">보유 및 이용기간</div>
            <div>
              <div class="t-content">- 법령에 따라 보험계약과 관련된 정보는 계약종류 후 최대 5년간 보관</div>
              <div class="t-content">- 보험계약과 관련이 없는 비필수 정보는 즉시 파기</div>
            </div>
          </div>
          <p><span>&nbsp;</span>3. 회원은 개인정보의 제<span>3</span>자 제공에 대하여 동의를 하지 않을 수 있고<span>, </span>언제든지 제<span>3</span>자
            제공 동의를 철회할 수 있습니다<span>. </span>동의를 거부하시는 경우에 제<span>3</span>자 제공에 기반한 관련 서비스의 이용제공이 제한될 수
            있습니다<span>.</span></p>
          <div><span>[</span><span>개인정보의 보호<span>]</span></span></div>
          <div>
            <span>회사는 이용자의 개인정보의 취급에 있어 분실<span>, </span>도난<span>, </span>누출<span>, </span>변조 또는 훼손이 일어나지 않도록 각종 기술적<span>/</span>관리적 대책을 강구하고 있습니다<span>. </span>다만<span>, </span>비밀번호 등 주요 개인정보를 이용자 스스로가 관리를 허술하게 하여 분실<span>, </span>도난<span>, </span>누출시켰을 경우 그 책임은 이용자에게 있으므로<span>, </span>관리에 유의하시기 바랍니다<span>.</span></span>
          </div>
          <p><span>&nbsp;</span></p>
          <div><span>[</span><span>개인정보관리책임자 및 담당자의 연락처<span>]</span></span></div>
          <div><span>귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자에게 신고하실 수 있습니다<span>.</span></span></div>
          <div><span>회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다<span>.&nbsp;</span></span></div>
          <p><span>&nbsp;</span></p>
          <div><span>[</span><span>개인정보 관리책임자<span>]</span></span></div>
          <div><span>- </span><span>이름<span> : </span>고경엽</span></div>
          <div><span>- </span><span>전화<span> : 02-6291-9600</span></span></div>
          <div><span>- </span><span>메일<span> : eder.ko@ilnoir.us</span></span></div>
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
  <transition name="fade">
  <div class="position-fixed flex-center" :style="modalStyle" v-if="popup && modalPopupState">
    <div style="width:calc(100% - 32px)">
      <div class="popup-content" v-html="popup.claim"></div>
      <div class="flex-align weight-400 text-center">
        <div class="modal-btn size-15 unselect" style="background-color:#8a8a8a"
             @click.stop.prevent="modalPopupState=false">닫기</div>
      </div>
    </div>
  </div>
  </transition>
</div>
</template>
<script>
export default {
  name: "InsuranceRequest",
  data() {
    return {
      detail: undefined,
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
        identification: undefined,
        bank_book: undefined,
        invoice: undefined,
        delivery: undefined,
        seller: undefined,
        damage: undefined,
        misdelivery: undefined,
        theft: undefined,
        lost: undefined,
        return: undefined,
        privacy: undefined,
        send_back: undefined,
        accident: undefined
      },
      commonList: ['privacy', 'identification', 'bank_book', 'invoice', 'delivery', 'seller'],
      acciList: ['damage', 'misdelivery', 'theft', 'lost', 'return'],
      selectedAcci: undefined,
      popup: undefined,
      modalPopupState: false
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
      this.$axios.get(`/user/${this.$route.query.user}/order/${this.$route.query.id}`).then(res => {
        if(res.status===200) {
          this.detail = res.data;

          this.$axios.get('public/popup').then(res=>{
            this.popup = res.data;
            this.modalPopupState = this.popup.claim !== null && this.popup.claim !== '';
          })
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
      let file = e.target.files[0];
      // let file = e.target.files;
      //this.params[val].push(file);
      if(this.acciList.indexOf(val)>-1) {
        this.selectedAcci = val;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (f) => {
        let ext = file.name.split('.')[file.name.split('.').length-1];
        this.params[val] = {
          name: file.name,
          file : f.srcElement.result,
          size: file.size,
          extention: ext
        }
      }
    },
    clickDelete(val) {
      this.params[val] = undefined;
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
          if(!item[1]) {
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
              param['accident'] = item[1]['file'];
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
              param[item[0]] = item[1]['file'];
            }
          }
        });
      }
      param['order_id'] = this.detail.id

      if(accident.indexOf(true)===-1) {
        this.acciInvalid = true;
      }

      if(this.commonInvalid | this.acciInvalid | this.privacyInvalid) return;

      this.$store.commit('setLoadingSpinner', true);
      this.$axios.post(`/user/claim`, param).then(res => {
        this.$store.commit('setLoadingSpinner', false);
        if(res.status===200) {
          this.routerPush('request_done')
        }
      }).catch(()=>{
        this.toast('서버 오류로 청구하기 실패하였습니다.');
        this.$store.commit('setLoadingSpinner', false);
      });
    },
    addFormData (formData, param) {
      for (let [key, value] of Object.entries(param)) {
        if(key === 'accident_type') {
          formData.append(key, value);
        }
        else {
          for (let item of value) {

              formData.append(key, item);
              console.log(key, value, item)
              console.log('formData',formData)
          }
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
      else if(val==='lost') {
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
.t-wrap {
  margin-bottom: 28px;
}
.t-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.t-content {
  margin-bottom: 4px;
}
</style>
<style lang="stylus" scoped>
  @import '~assets/css/lp_main';
  .popup-content
    max-height 500px
    overflow-y auto
    background-color white
    padding 36px 20px
    line-height 1.5
</style>
<style lang="stylus">
  .popup-content ol
  .popup-content ul
    list-style unset
  .popup-content ul
    padding-inline-start 40px
</style>
