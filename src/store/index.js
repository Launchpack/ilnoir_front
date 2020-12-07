import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });
Vue.use(Vuex);


export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
      reducer: state => (
        {
          user: state.user,
          currentPosition: state.currentPosition,
          recentSearch: state.recentSearch,
          loginTeam: state.loginTeam,
          hidePopup: state.hidePopup
        }
      )
    })
  ],
  state: {
    alivePage: [],
    brand: undefined,
    grade: undefined,               // 등급 스타일
    commonStyle: {
      /*  예시  */
      /* borderRadius: '6px',
      blockMarginBottom: '8px',
      blockMarginBottomPc: '8px',
      dummyImage: {
        bg: 'https://s3.ap-northeast-2.amazonaws.com/launchpack-dessertplace/media/img_dummy.png'
      },
      filter: {
        radio: 'full'   // 'default', 'full'
      } */
    },
    commonFilter: {},               // 필터 ID
    user: { user_id: 0, name: '' },
    partner: {
      session:''
    },
    service: undefined,
    pcMode: true,
    social_key: undefined,
    device: 'mobile',
    browserType: 'mobile',
    deviceWidth: 416,
    filtered: [],
    sorted: {},
    previousPath: '',              // 로그인 후 돌아갈 페이지

    currentPosition: undefined,
    currentAddress: undefined,

    team: undefined,                // 팀(선택된 팀 정보 저장)
    loginTeam: '',                  // 로그인된 팀 도메인
    teamMyInfo: undefined,          // 팀 내 내 정보
    recentSearch: [],

    dragEnd: false,        // 드래그 끝 (cf.가로형리스트)

    fullImage: [],         // full-image src 배열

    hidePopup: undefined,          // 팝업 숨길 날짜
    exposuredPopup: false,     // 팝업 노출여부 (이미 노출되었으면 숨기기 위함)

    loadingSpinner: false,
    
    category: undefined
  },
  mutations: {
    setAlivePage(state, value) {
      state.alivePage = value;
    },
    setBrand(state, value) {
      state.brand = value;
    },
    setGrade(state, value) {
      state.grade = value;
    },
    setCommonStyle(state, value) {
      state.commonStyle = value;
    },
    setUserPartner(state, value) {
      state.partner_id = value.partner_id;
      state.partner_grade_id = value.partner_grade_id;
    },
    setUser(state, value) {
      state.user = value;

      if(state.user.profile === '' || !state.user.profile)
        state.user.profile = 'https://s3.ap-northeast-2.amazonaws.com/launchpack-storage/media/img/default/img_person.png';

      if(value.partner_id && value.partner_id > 0) {
        state.partner = {
          token: value.token,
          id: value.partner_id,
          email: value.email,
          name: value.email,
          partner_id: value.partner_id,
          phone: value.phone,
          profile: value.profile,
          user_id: value.user_id,
          username: value.username
        };
        state.mode = 'partner';
      }

      if(window.Android)
        window.Android.sendMessage(state.user.username, state.user.token, state.user.user_id);

      let params = JSON.stringify({
        username: state.user.username,
        token: state.user.token,
        user_id: state.user.user_id,
      });
      window.postMessage(params, '*');
    },
    setUserParam (state, value) {
      state.user.param = value;
    },
    setUserGrade (state, value) {
      state.user.grade = value;
    },
    logout(state) {
      state.user = { user_id:0, name: '' };
    },
    setPreviousPath(state, value) {
      state.previousPath = value;
    },
    setServiceInfo(state, value) {
      state.service = value;
    },
    setPcMode(state, value) {
      state.pcMode = value;
    },
    setSocialKey(state, value) {
      state.social_key = value;
    },
    setDevice(state, value) {
      state.device = value;
    },
    setBrowserType(state, value) {
      state.browserType = value;
    },
    setDeviceWidth(state, value) {
      state.deviceWidth = value;
    },
    setFilter(state, value) {
      let result = [];
      value.forEach(item => {
        result.push({
          set: item.set,
          keyword: item.keyword,
          param_id: item.param_id,
          is_param: item.is_param,
          is_active: item.is_active
        });
      });
      state.filtered = result;
    },
    setSorted(state, value) {
      state.sorted = value;
    },
    setCurrentPosition(state, value) {
      state.currentPosition = value;
    },
    setCurrentAddress(state, value) {
      state.currentAddress = value;
    },
    setTeam(state, value) {
      state.team = value;
    },
    addRecentSearch(state, value) {
      if(find(state.recentSearch, 'title', value.title) === undefined) {
        state.recentSearch.splice(0,0, value);
        state.recentSearch = state.recentSearch.slice(0,20);
      }
    },
    setTeamMyInfo(state, value) {
      state.teamMyInfo = value;
    },
    setLoginTeam(state, value) {
      state.loginTeam = value;
    },
    setDragEnd(state, value) {
      state.dragEnd = value;
    },
    setCommonFilter(state, value) {
      state.commonFilter = value;
    },
    setFullImage(state, value) {
      state.fullImage = value;
    },
    setHidePopup(state, value) {
      state.hidePopup = value;
    },
    setExposuredPopup(state, value) {
      state.exposuredPopup = value;
    },
    setLoadingSpinner(state, value) {
      state.loadingSpinner = value;
    },
    setCategory(state, value) {
      state.category = value;
    },
  },
  getters: {
    alivePage: state => {
      return state.alivePage;
    },
    brand: state => {
      return state.brand;
    },
    grade: state => {
      return state.grade;
    },
    favicon: state => {
      if(state.brand)
        return state.brand.favicon;
    },
    commonStyle: state => {
      return state.commonStyle;
    },
    user: state => {
      return state.user;
    },
    previousPath: state => {
      return state.previousPath;
    },
    pcMode: state => {
      return state.pcMode;
    },
    service: state => {
      return state.service;
    },
    social_key: state => {
      return state.social_key;
    },
    device: state => {
      return state.device;
    },
    browserType: state => {
      return state.browserType;
    },
    deviceWidth: state => {
      return state.deviceWidth;
    },
    filtered: state => {
      return state.filtered;
    },
    sorted: state => {
      return state.sorted;
    },
    currentPosition: state => {
      return state.currentPosition;
    },
    currentAddress: state => {
      return state.currentAddress;
    },
    team: state => {
      return state.team;
    },
    recentSearch: state => {
      return state.recentSearch;
    },
    teamMyInfo: state => {
      return state.teamMyInfo;
    },
    loginTeam: state => {
      return state.loginTeam;
    },
    dragEnd: state => {
      return state.dragEnd;
    },
    commonFilter: state => {
      return state.commonFilter;
    },
    fullImage: state => {
      return state.fullImage;
    },
    hidePopup: state => {
      return state.hidePopup;
    },
    exposuredPopup: state => {
      return state.exposuredPopup;
    },
    loadingSpinner: state => {
      return state.loadingSpinner;
    },
    category: state => {
      return state.category;
    }
  }
})
