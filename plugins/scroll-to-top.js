import Vue from 'vue';
Vue.prototype.$scrollToTop = () => {
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 200);
};
Vue.prototype.$scrollToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 200);
};
