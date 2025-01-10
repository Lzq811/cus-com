import CusTable from './cus-table/index.vue'

// 使用数组，方便后续更多组件进行注册时使用
const coms = [CusTable]

const install = (App:any/* , options:any */) => {
  coms.forEach(com => {
    App.component(com.name, com)
  })
}

export default { install }