import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { setupStore } from './store';
import { globalRegister } from '@/global';
import 'normalize.css';
import '@/assets/css/index.scss';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-form.css';
import 'element-plus/theme-chalk/el-image.css';
import 'element-plus/theme-chalk/el-image-viewer.css';
import * as Icons from '@element-plus/icons-vue';
const app = createApp(App);

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
// app.config.globalProperties.$filters全局挂载过滤器方法，模板中使用ts报错找不到名称（找不到名称“$filters”），
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any;
  }
}
app.use(store);
setupStore();
app.use(router);
app.use(globalRegister);
// 从缓存中获取数据

app.mount('#app');
