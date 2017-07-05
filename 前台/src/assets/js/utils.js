
import Vue from "vue"
import VueHttp from "vue-resource"
import { hex_md5 }from "./md5"
import router from '../../Router'

// 引入store中操作加载组件的mutations
import store from "../../store/index"
import {
  LOADER_SET_AJAX_NUM,
  LOADER_SHOWHide,
  LOADER_ERROR_SHOWHide,
  DYNAMICPIC_DETAILS_SET } from "../../store/types"

Vue.use(VueHttp);

// vue-resource 自带的超时有bug
Vue.http.interceptors.push((request, next) => {
  var timeout;

  // 這裡改用 _timeout ，就不會觸發原本的
  if (request._timeout) {

    // 一樣綁定一個定時器，但是這裡是只要觸發了，就立即返回 response ， 並且這邊自定義了 status 和 statusText
    timeout = setTimeout(() => {
      if(request.onTimeout) request.onTimeout(request);
      //request.abort();
    }, request._timeout);
  }

  next((response) => {
    clearTimeout(timeout);
  });
})

/*
 * @method ajax 对vue-resource的ajax封装 应对线上线下环境
 * @param { Object } option 请求参数
 * */
export function ajax(option) {

  let url = option.url;
    let token = sessionStorage.token;
    let headers = token ?
        {'X-Requested-With': 'XMLHttpRequest', 'Token': token } :
        { 'X-Requested-With': 'XMLHttpRequest' }
  let loading = option.loading === false ? false : true; // 针对部分请求不需要loading效果

  let loaderState = store.state.loader;

  delete option.loading;

  // 1. 请求默认配置
  let defaultConfig = {
    headers,
    emulateJSON: true,
    emulateHTTP: true,
    _timeout: 20000,
    body: {},
    params: {},
    before(){
      if(loading) {
        !loaderState.ajaxNum && store.commit(LOADER_SHOWHide, true); // 已有请求 就不用loading
        store.commit(LOADER_SET_AJAX_NUM, 1);
      }
    },
    onTimeout: timeoutCallback // 超时触发
  };

  // 2. 所有接口统一带token
  switch (true) {

    // 登录时 不需要带token
    case  url === "/login.do":
      break;

    default:
        option.params = Object.assign({}, option.params); break;
      break;
  }

  // 3. 线下开发时请求地址
    if (process.env['NODE_ENV'] === 'development') {
        // let devBaseUrl = `http://127.0.0.1:8888${option.url}.json`; // 开发
        // let devBaseUrl = `http://10.10.20.155:8080${option.url}`; // 测试
        // let devBaseUrl = `http://127.0.0.1:8888${option.url}`; // 测试
        // let devBaseUrl = `http://192.168.96.124:8080${option.url}`; // 测试
        //http://192.168.20.105:8080/
        let devBaseUrl = `http://10.10.20.155:8080${option.url}`; // 测试
        //let devBaseUrl = `http://192.168.16.56:8080${url}`; // 测试
        option.url = devBaseUrl;
    }


  // 4. 合并请求参数
  let targetObj = Object.assign({}, defaultConfig, option);

  // 5. 发起ajax请求
  Vue.http(targetObj)
    .then(

      // 请求成功时
      response => {
          let data = response.data;

          // if (url === '/indexData/getAreaList.do') {
          //     setTimeout(() => {
          //         // router.push('/login')
          //         location.hash = 'login' // 也可以的嘛 ？！
          //         return
          //     }, 2000)
          // }

        switch (true){

          // token 失效
            case data.msg === "error.access.session.invalid" :
                store.commit(LOADER_SET_AJAX_NUM, 0);
                // TODO location.hash 竟然不能凑效
                router.push('/login')
                break;

          // 请求成功 数据可能不合理
          // 针对登录 错误特殊处理
          case data.success === false :
            timeoutCallback(); break;

          // 请求成功 数据也合理
          default:
            targetObj.success(data);

            if(loading) {
              store.commit(LOADER_SET_AJAX_NUM, -1);
              // 只有所有请求都完毕时 才取消loading
              !loaderState.ajaxNum && store.commit(LOADER_SHOWHide, false);
            }

            break;
        }
      },

      // 请求失败时
      timeoutCallback
    );

  // 6. 统一错误处理
  function error() {
    console.log(`${url} 有问题找后台`);

    if(!loading) return ;

    // 已经有请求报错
    // 表示不需要再更新showError 且这个请求完毕
    if(loaderState.showError) {
      store.commit(LOADER_SET_AJAX_NUM, -1);

    }else {
      // 否则就是 更新showError 且 需要手动设置请求完毕
      store.commit(LOADER_ERROR_SHOWHide, true);
    }
  }

  // 7. 超时处理
  function timeoutCallback() {
    console.log(`这个API ${url} 错误或者超时，请找后台，前端很无辜的！`);

    if(!loading) return ;

    store.commit(LOADER_ERROR_SHOWHide, true);
    // store.commit(LOADER_SET_AJAX_NUM, -1);
    // !loaderState.ajaxNum && store.commit(LOADER_SHOWHide, false);
  }
}

/*
 * @method clickOtherClose 点击其他区域关闭指定的dom
 * @param { Object }   targetDom 需要关闭的dom
 * @param { Function } callback  回调函数
 * todo 被阻止冒泡的情况
 * */
export function clickOtherClose(targetDom, callback){

  let isInnerTargetDom = false;

  // 检测 表示target是否位于targetDom内
  targetDom.addEventListener("click", () => { isInnerTargetDom = true; })

  document.body.addEventListener("click", (e) => {
    isInnerTargetDom ? (isInnerTargetDom = false) : callback();

    // todo 针对存在阻止冒泡的情况，使用递归判断
    // let tmpTarget = e.target;
    // for(let i=0 ; 1; i++){
    //
    //     if(!tmpTarget){
    //         callback();break;
    //
    //     }else {
    //         if(targetDom == tmpTarget){
    //             break;
    //         }else {
    //             tmpTarget = tmpTarget.parentNode;
    //         }
    //     }
    // }
  });
}

/*
* @method setRootFontSize 根据屏幕分辨率自动调整根元素的字体大小
* 除开滚动条宽度
* */
export function setRootFontSize() {

  let psWidth = 1440;
  let baseRootFontSize = 16;
  let clientWidth = document.body.clientWidth;
  let ratio = clientWidth / psWidth;

  document.querySelector("html").style.fontSize = `${baseRootFontSize * ratio}px`;
}

/*
* @method setDynamicPicData 设置动态图谱数据
* */
export function setDynamicPicData() {
  //let tmpDynamicPicData = {};
  window.DynamicPicData = {};

  Object.defineProperty(DynamicPicData, "data", {
    set: function (data) {
      //tmpDynamicPicData = data;

      // 针对获取动态图谱失败
      if (!data) {
        store.commit(LOADER_ERROR_SHOWHide, true);

      }else {

        store.commit(DYNAMICPIC_DETAILS_SET, data);
      }

    },
    get: function () {
      //return tmpDynamicPicData;
    }
  })
}

/*
 * @method getNewToken 获取最新token
 * */
export function getNewToken() {

  let lastGetTokenTime = new Date(); // 上一次获取token时间

  window.onmousemove = function () {

    let newTime = new Date(); // 鼠标移动时的当前时间
    let timeGap = newTime - lastGetTokenTime; // 两次时间差

    // 用户在 1h 内无任何交互 便认为登录失效
    if(timeGap > 1000 * 60 * 10 && timeGap < 1000 * 60 * 60) {
      lastGetTokenTime = newTime;
      let username = sessionStorage.account;
      let password = sessionStorage.pwd;
      let pwdMd5 = hex_md5(`${location.hostname}${username}${password}`);

      ajax({
        method: "POST",
        url: "/login.do",
        loading: false,
        body: {
          username,
          password,
          pwdMd5
        },

        success: (res) => {
          if( res.success ) return sessionStorage.token = res.content.accessToken;
        }
      })
    }
  }
}
