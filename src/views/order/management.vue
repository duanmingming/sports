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
          <el-select v-model="formInline.region" placeholder="订单状态">
            <el-option label="未付款" value="shanghai" />
            <el-option label="已付款" value="beijing" />
            <el-option label="已排课" value="shanghai1" />
            <el-option label="已结课" value="shanghai2" />
            <el-option label="已转课" value="shanghai3" />
          </el-select>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-date-picker
            v-model="formInline.user"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

    </el-card>
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>订单列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">批量导出</el-button>
      </div>
      <Table :options="options" />
    </el-card>
  </div>
</template>

<script>
import Table from '@/components/Table/index'

export default {
  name: 'Management',
  components: { Table },
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
            value: 'orderNo',
            width: '15%'
          },
          {
            name: '用户昵称',
            value: 'userName',
            width: '15%'
          }, {
            name: '手机号',
            value: 'tel',
            width: '10%'
          }, {
            name: '课程名称',
            value: 'className',
            width: '30%'
          }, {
            name: '订单金额',
            value: 'amount',
            width: '10%'
          }, {
            name: '订单状态',
            value: 'status',
            width: '10%'
          }, {
            name: '提交时间',
            value: 'time',
            width: '10%'
          }
        ],
        columnOpreationInfo: [
          {
            name: '查看',
            style: ''
          },
          {
            name: '删除',
            style: 'color:red'
          }
        ],
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        multiple: true
      },
      formInline: {
        user: '',
        region: ''
      }
    }
  },

  mounted() {
    this.getListData()
  },

  methods: {
    onSubmit() {
      console.log('submit!')
    },

    getListData() {
      const arr = this.options.columnDataInfo
      const result = []

      for (let i = 0; i < 10; i++) {
        const obj = {}
        for (const item of arr) {
          obj[item.value] = Math.random() * 10
        }
        result.push(obj)
      }

      this.options.data = result
      this.options.total = 30
    }
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
