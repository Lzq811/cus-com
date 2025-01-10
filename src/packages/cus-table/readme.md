### 1. 初步想法

1.  自定义组件放入 npm 平台。
2.  在 vite + vue3 + ts + elementPlus 的基础上封装组件放入 npm 平台。
3.  npm 平台 组件多了以后 放入 npm组中管理。
4. 至少公司或个人项目可以随时方便调用，方便管理。

### 2. 使用 Vite 初始化代码

1.  初始化指令  [文档地址](https://cn.vite.dev/guide/#scaffolding-your-first-vite-project)

   ```bash
   yarn create vite
   # OR
   yarn create vite my-cus-com --template vue-ts # 使用该模板
   
   >>> 
   yarn
   >>>
   yarn dev # 启动项目
   ```

   按照提示 运行起来。

2.  安装 elementPlus 

   ```bash
   yarn add element-plus
   ```

   使用全局引入方式 [官方文档](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)

### 3. 编写代码

1.  在 *src* 目录下 新增 *packages* 目录。并新增文件*index.ts* 作为打包时候的入口文件。新增 *cus-table* 目录用来存放自定义的 table 组件。

   ```vue
   # pacages/cus-table/index.vue
   <script setup lang='ts'>
   /**
    * ! 注意：name 属性一点要定义
    * 这个是你最后引入插件的时候，使用的全局组件的名称
    */
     defineOptions({
       name: 'cusTable'
     })
     import { ref } from 'vue'
     import type { Ref } from 'vue'
     const msg:Ref<string> = ref('hello vue3 component')
   </script>
   <template>
     <div>{{ msg }}</div>
   </template>
   <style lang="less" scoped>
   </style>
   
   ```

   ```tsx
   # packages/index.ts
   
   import CusTable from './cus-table/index.vue'
   
   // 使用数组，方便后续更多组件进行注册时使用
   const coms = [CusTable]
   
   const install = (App:any/* , options:any */) => {
     coms.forEach(com => {
       App.component(com.name, com)
     })
   }
   
   export default { install }
   ```

   

2.  完整的代码 [参考代码](https://github.com/Lzq811/cus-com/tree/init-demo)

### 4. 修改配置文件

- 修改 *vite.config.ts* 文件。

  ```tsx
  // @ts-nocheck
  import { fileURLToPath, URL } from "node:url"
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  
  // 这里不让用 require('path')，所以使用下面的方法
  import { resolve } from 'path'
  
  export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/packages/index.ts"),
        name: "cusTable",
        fileName: (format) => `cus-table.${format}.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue"],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: "Vue"
          }
        }
      }
    }
  })
  
  ```

  

- 修改 *package.json* 文件。 添加描述，主体，关键字，作者，版权等信息。参考代码 [参考代码](https://github.com/Lzq811/cus-com/tree/init-demo)

### 5.  打包插件

打包指令

```bash
yarn build
```

会在根目录生成 *dist* 目录。按照上面的配置 会生成如下文件：

```bash
dist
>>> cus-table.es.js # 即为要使用的文件
>>> cus-table.umd.js
```



### 6. 测试插件

##### 测试方式1:

- 在 *main.ts* 文件中 引入 组件，并全局注册。

  ```tsx
  import cusTable from '../dist/cus-table.es.js'
  
  app.use(cusTable)
  
  ```

- 在 *App.vue* 调用 组件。

  ```vue
  <cusTable />
  ```

##### 测试方式2： 

​	等把组件上传到 *npm* 后，执行安装来进行测试。

```basic
yarn add cus-table-com
```



### 7. 发布插件

1. 注册 *npm* 平台账号，[参考文档](https://www.jianshu.com/p/97c87a11d534)

2.  进入 *dist* 目录下

   ```basic
   npm init
   # 按照提示生成 *package.json* 文件。 具体参考 git [参考代码](https://github.com/Lzq811/cus-com/tree/init-demo)
   npm login # 如果登录过可以不用再次登录。
   npm publish
   ```

   **注意事项：**

   - **一定要使用 官方源 * https://registry.npmjs.org/*。**
   - **package.json的name名称一定要 整个 *npm* 平台唯一。**
   - ***package.json的private要 false。***

3.  可以去 *npm* 平台查看自己的插件，发布完成。

   

### 8. 本文档对应代码Git

​	[参考代码](https://github.com/Lzq811/cus-com/tree/init-demo)

​	















