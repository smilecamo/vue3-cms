const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
// const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置方式1 cli提供的属性
  outputDir: './build',
  // // 配置方式2 和webpack一样 ============到最后合并配置
  configureWebpack: {
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://152.136.185.210:5000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': '',
          },
        },
      },
    },
    resolve: {
      alias: {
        components: '@/components',
        utils: '@/utils',
      },
    },
    plugins: [
      AutoImport({
        /**
         * 解决loading组件加载样式失效：
         * 1. 添加 { importStyle: false })
         * 2. 项目入口文件添加全局样式：
         * import 'element-plus/theme-chalk/el-loading.css'
         */
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  // 配置方式2 通过函数重新写配置    =======覆盖掉
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components',
  //   };
  // },
  // 配置方式2 通过chainWebpack 链式操作    =======覆盖掉
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components');
  // },
});
