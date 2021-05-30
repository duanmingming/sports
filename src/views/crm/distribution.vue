<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>客户筛选</span>
      </div>

      <el-form :inline="true" :model="goodsQuery">
        <el-form-item label="分配状态">
          <el-select v-model="goodsQuery.status" placeholder="">
            <el-option v-for="(value, key) in statusOptions" :key="key" :label="value" :value="key" />
          </el-select>
        </el-form-item>
        <el-form-item label="建立时间">
          <el-date-picker
            v-model="goodsQuery.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="goodsQuery.others" placeholder="请输入客户名称或联系电话" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>客户列表</span>
      </div>
      <Table :options="options" @handleTable="handleTable" />
    </el-card>


    <el-dialog
        title="选择课程顾问"
        :visible.sync="dialogVisible"
        width="30%"
        center
        :before-close="handleClose">
             <!-- <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="F0000"
                label="编号"
                width="120">
                </el-table-column>
                <el-table-column
                prop="F0005"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="F0007"
                label="性别"
                width="120">
                </el-table-column>
                <el-table-column
                prop="F0027"
                label="联系电话"
                width="120">
                </el-table-column>
            </el-table> -->

            <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                @current-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                property="F0000"
                label="编号"
                >
                </el-table-column>
                <el-table-column
                property="F0005"
                label="姓名"
                >
                </el-table-column>
                <el-table-column
                property="F0007"
                label="性别"
                >
                </el-table-column>
                <el-table-column
                property="F0027"
                label="联系电话"
                >
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSubmit">完 成</el-button>
                <el-button @click="handleClose">取 消</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { getDistributionList as getList, addCustomer as add, editCustomer as edit, deleteCustomer as deleteData, getConsulant, allocate } from '@/api/crm'
import parameters from '@/utils/parameter'

export default {
  name: 'Distribution',
  components: { Table, Dialog },
  data() {
    const checkTel = (rule, value, callback) => {
      if (value) {
        const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
        const flag = reg.test(value)
        if (flag) {
          return callback()
        } else {
          return callback(new Error('请填写正确的手机号'))
        }
      } else {
        return callback()
      }
    }

    const checkNum = (rule, value, callback) => {
      if (value) {
        const reg = /\D/
        const flag = (value + '').match(reg)
        if (flag) {
          return callback(new Error('请只输入数字'))
        } else {
          return callback()
        }
      } else {
        return callback()
      }
    }

    return {
      goodsQuery: {
        status: '',
        time: '',
        others: ''
      },

      historyQuery: {

      },

      options: {
        data: [],
        border: false,
        maxHeight: window.innerHeight * 0.63,
        style: 'width: 100%; marginLeft:10px',
        columnDataInfo: [
          {
            name: '编号',
            value: 'F0002',
            width: '15%'
          },
          {
            name: '姓名',
            value: 'F0003',
            width: '15%'
          }, {
            name: '生日',
            value: 'F0007',
            width: '10%'
          }, {
            name: '住址',
            value: 'F0015',
            width: '30%'
          }, {
            name: '联系人',
            value: 'F0017',
            width: '10%'
          },{
            name: '联系电话',
            value: 'F0018',
            width: '10%'
          }, {
            name: '建立日期',
            value: 'F0091',
            width: '10%'
          }, {
            name: '状态',
            value: 'F0094',
            width: '10%'
          }
        ],
        columnOpreationInfo: [
          {
            name: '分配',
            style: ''
          }
        ],
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        multiple: true,
        multipleSelect: []
      },

      statusOptions: parameters.PA0030,

      form:{
        F0032: '',
        F0033: '',
        F0034:'',
        F0035:'',
        F0036:''
      },

      radioOPtions: [
        {
          value:'线上',
          label:'线上'
        },
        {
          value:'线下',
          label:'线下'
        }
      ],

      dialogVisible: false,
      tableData:[],
      selectData: null,
      selectListData: null

    }
  },

  created() {
    let params = {
        cid: localStorage.getItem('cid')
    }
    getConsulant(params).then(res => {
        this.tableData = res.data.items
    })
  },

  mounted() {
    this.getListData()
  },

  methods: {
    handleQuery() {
      let {status, time, others} = this.goodsQuery
      this.historyQuery = 
      {
        status,time,others
      }
      this.getListData()
    },

    getListData() {
      let role = parseInt(localStorage.getItem('role'))
      const params = {
        cid: localStorage.getItem('cid'),
        pageNum: this.options.pageNum,
        pageSize: this.options.pageSize,
        name: this.historyQuery.hasOwnProperty('others') ? this.historyQuery.others : "",
        time:  this.historyQuery.hasOwnProperty('time') ? this.historyQuery.time : null,
        status:  role === 1 ? 10 : (this.historyQuery.hasOwnProperty('status') ? this.historyQuery.status : null),
      }

      getList(params).then(res => {
        this.options.data = this.changeFormat(res.data.items)
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
      } else if (data.type === '分配') {
        this.dialogVisible = true
        this.selectListData = data.data
      }
    },

    handleSubmit(data) {
        this.dialogVisible = false
        console.log(this.selectListData, 'this.selectListData');
        let params = {
            F0000: this.selectListData.F0000,
            F0001: this.selectListData.F0001,
            F0038: this.selectData.F0000
        }
        
        allocate(params).then(res => {
            this.dialogVisible = false
            this.getListData()
        })
    },

    
    changeFormat(data) {
      let obj = parameters.PA0011
      for(let item of data){
        item.F0094 = obj[item.F0094]
      }
      return data
    },

    reverseChangeFormat(data) {
      if(data.F0094){
        let obj = parameters.PA0048
        data.F0094 = obj[data.F0094]
      }
      return data
    },

    handleClose() {
        this.dialogVisible = false
         this.$refs.singleTable.setCurrentRow()
    },

    handleSelectionChange(val) {
        this.selectData = val
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .goodsSelect {
    height: 160px;
    border: 1px dashed #d9d9d9;
    overflow: scroll;
  }

</style>