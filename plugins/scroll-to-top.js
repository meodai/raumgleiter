import Vue from 'vue';
Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0);
Vue.prototype.$scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);
