
// @ts-nocheck
import { createApp } from 'vue'
import ElementPlus from 'element-plus'

// import cusTable from '../dist/cus-table.es.js' // 本地测试法
import cusTable from 'cus-table-com' // npm包测试法

import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(cusTable)

app.mount('#app')
