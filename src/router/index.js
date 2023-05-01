import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const scrollBehavior = function(to, from, savedPosition) {
  if (from.query.tab !== undefined && to.query.tab !== undefined) {
    return;
  }
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

const route = require(`./service_router.js`);
const route_pc = require(`./service_router_pc.js`);
let routes = route_pc.default.routes;

// 모바일인 경우 routes 변경
let isMobile = false;
if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
)
{
  routes = route.default.routes;
  isMobile = true;
}

const index = new Router({
    mode: 'history',
    //base: process.env.BASE_URL,
    base: '/',
    scrollBehavior,
    routes: routes
})

index.afterEach((to) => {
  if((to.path === '/claim_real/' || to.path === '/claim_real') && to.params.id === undefined) {
    if(isMobile) {
      index.replace(`/claim_real/${process.env.VUE_APP_SPLASH_PAGE}`);
    } else {
      index.replace(`/claim_real/${process.env.VUE_APP_START_PAGE}`);
    }
  }
})

index.beforeEach((to, from, next) => {
  if(from.meta.clickPush) {
    to.meta.isRefresh = true;
    from.meta.clickPush = false;
  } else {
    to.meta.isRefresh = false;
  }
  next()
})

export default index
