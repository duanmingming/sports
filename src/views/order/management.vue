<!--
 * @Author: your name
 * @Date: 2021-04-07 13:40:21
 * @LastEditTime: 2021-04-07 14:57:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/views/order/management.vue
-->
<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>订单筛选</span>
      </div>

      <el-form :inline="true" :model="formInline">
        <el-form-item label="订单状态">
          <el-select v-model="formInline.status" placeholder="订单状态">
            <el-option v-for="(value, key) in statusOptions" :key="key" :label="value" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-date-picker
            v-model="formInline.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formInline.others" placeholder="请输入商品名称或其他关键词" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>

    </el-card>
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>订单列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">批量导出</el-button>
      </div>
      <Table :options="options"  @handleTable="handleTable" />
    </el-card>

    <Dialog :options="dialogOptions" />
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import { getList as getQueryList, getQueryDetail } from '@/api/order'
import Dialog from '@/components/Dialog/index'
import parameters from '@/utils/parameter'


export default {
  name: 'Management',
  components: { Table, Dialog },
  data() {
    return {
      options: {
        data: [],
        border: false,
        maxHeight: window.innerHeight * 0.63,
        style: 'width: 100%; marginLeft:10px',
        columnDataInfo: [
          {
            name: '订单编号',
            value: 'F0002',
            width: '15%'
          },
          {
            name: '用户',
            value: 'F0003',
            width: '15%'
          }, {
            name: '手机号',
            value: 'F0028',
            width: '10%'
          }, {
            name: '会员姓名',
            value: 'F0022',
            width: '30%'
          }, {
            name: '商品名称',
            value: 'F0011',
            width: '10%'
          }, {
            name: '订单金额',
            value: 'F0014',
            width: '10%'
          }, {
            name: '订单状态',
            value: 'F0007',
            width: '10%'
          }, {
            name: '提交时间',
            value: 'F0032',
            width: '10%'
          }
        ],
        columnOpreationInfo: [
          {
            name: '查看',
            style: ''
          }
        ],
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        multiple: true,
        multipleSelect: []
      },
      formInline: {
        status: '',
        time: '',
        others: ''
      },

      historyFormInline: {
        status: '',
        time: '',
        others: ''
      },
      
      dialogOptions: {
        title: "订单详情",
        labelWidth: "130px",
        labelPosition: "left",
        check: false,
        show:false,
        data: null,
        footer: true,
        settings: [
          {
            type: 'input',
            label: '订单编号',
            name:'F0002',
            disabled: true,
          },
          {
            type: 'input',
            label: '学员姓名',
            disabled: true,
            name:'F0015s'
          },
          {
            type: 'input',
            label: '商品编号',
            disabled: true,
            name:'F0004'
          },
          {
            type: 'input',
            label:'商品名称',
            disabled: true,
            name:'F0006',
            width: 12
          },
          {
            type: 'input',
            label: '商品分类',
            disabled: true,
            name: 'F0005',
            width: 12
          },
          {
            type: 'input',
            label: '商品单价',
            disabled: true,
            width: 12,
            name: 'F0010'
          },
          {
            type: 'input',
            label: '保证金',
            disabled: true,
            width: 6,
            name: 'F0016'
          },
          {
            type: 'input',
            label: '保险',
            disabled: true,
            width: 6,
            name: 'F0017'
          },
          {
            type: 'input',
            label: '课时/数量',
            disabled: true,
            name: 'F0009',
          },
          {
            type: 'input',
            label: '商品总价',
            disabled: true,
            name: 'F0014',
          },
          {
            type: 'date',
            label: '购买日期',
            disabled: true,
            name: 'F0091'
          }, 
          {
              type: 'radio',
              label: '课程状态',
              disabled: true,
              name: 'F0094',
              options: parameters.PA0051
          },
         
        ]
      },

      statusOptions: parameters.PA0011

    }
  },

  mounted() {
   this.getListData()
  },

  methods: {
    onQuery() {
      this.historyFormInline = Object.assign({}, this.formInline)
      this.getListData()
    },

    getListData() {
      let params = {
        cid: 90018,
        pageNum: this.options.pageNum,
        pageSize: this.options.pageSize,
        status: this.historyFormInline.status,
        time: this.historyFormInline.time,
        name: this.historyFormInline.others
      }

      getQueryList(params).then(res => {
        this.options.data = res.data.items
        this.options.total = res.data.total
      })

    },

    handleTable(data) {
      if (data.type === 'getTable') {
        this.getListData()
      } else if (data.type === 'pageSizeChange') {
        this.options.pageSize = data.pageSize
      } else if (data.type === 'pageNumChange') {
        this.options.pageNum = data.pageNum
      } else if (data.type === 'multipleSelect') {
        this.options.multipleSelect = data.data
      } else if (data.type === '查看') {
        let poarams = {
          cid: localStorage.getItem('cid'),
          sid: data.data.F0000
        }
        getQueryDetail(poarams).then(res => {
          this.dialogOptions.data = res.data.items[0]
          this.dialogOptions.show = !this.dialogOptions.show
        })
        
      } 
    },


  }
}
</script>

<style>
  .container{
    height: calc(100vh - 84px)
  }

  .boxHeader{
    width: 96%;
    margin: 10px auto;
  }

</style>
