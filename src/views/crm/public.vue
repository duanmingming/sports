<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>客户筛选</span>
      </div>

      <el-form :inline="true" :model="goodsQuery">
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
        <el-button style="float: right;" type="primary" @click="handleMultipleDelete">批量删除</el-button>
      </div>
      <Table :options="options" @handleTable="handleTable" />
    </el-card>
    <Dialog :options="dialogOptions" @handleSubmit="handleSubmit"></Dialog>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { getPublicList as getList, addPrivateCommunication as add, editCustomer as edit, deleteCustomer as deleteData } from '@/api/crm'
import parameters from '@/utils/parameter'

export default {
  name: 'Public',
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
            name: '沟通记录',
            style: ''
          }
        ],
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30],
        multiple: true,
        multipleSelect: []
      },

      dialogOptions: {
        title: "沟通记录",
        labelWidth: "130px",
        labelPosition: "left",
        show:false,
        data: null,
        settings: [
          {
            type: 'input',
            label: '客户名称',
            disabled: true,
            name:'F0003'
          },
          {
            type: 'dateTime',
            label: '开始时间',
            width: 12,
            name: 'F0007'
          },
          {
            type: 'dateTime',
            label: '结束时间',
            width: 12,
            name: 'F0008'
          },
          { 
              type: 'select',
              label: '沟通方式',
              name: 'F0006',
              options: parameters.PA0053
          },
          {
            type: 'text',
            label: '沟通内容',
            rows: 6,
            name: 'F0010'
          },
          {
            type: 'input',
            label: '结论',
            name: 'F0011'
          },
          { 
              type: 'select',
              label: '下次沟通方式',
              width: 12,
              name: 'F0013',
              options: parameters.PA0053
          },
          {
            type: 'dateTime',
            label: '下次沟通时间',
            width: 12,
            name: 'F0012'
          }
          
        ]
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

      source: [
        {
          value:'活动',
          label:'活动'
        },
        {
          value:'转介绍',
          label:'转介绍'
        },
        {
          value:'地推',
          label:'地推'
        },
        {
          value:'赛事',
          label:'赛事'
        },
        {
          value:'线下其他',
          label:'线下其他'
        }
      ],

      source1: [
        {
          value:'大众点评',
          label:'大众点评'
        },
        {
          value:'抖音',
          label:'抖音'
        },
        {
          value:'快手',
          label:'快手'
        },
        {
          value:'其他',
          label:'其他'
        }
      ]

    }
  },

  created() {
    
    
  },

  mounted() {
    this.getListData()
  },

  methods: {
    handleQuery() {
      let { time, others} = this.goodsQuery
      this.historyQuery = 
      {
        time,others
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

    handleAdd() {
      this.dialogOptions.title = "添加沟通记录"
      this.dialogOptions.show = !this.dialogOptions.show
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
      } else if (data.type === '沟通记录') {
        this.dialogOptions.title = "沟通记录"
        let {F0002, F0003} = data.data
        this.dialogOptions.data = {F0002, F0003}
        this.dialogOptions.show = !this.dialogOptions.show
      }
    },

    handleSubmit(data, callback) {
      data.F0001 = localStorage.getItem('cid')
      if(this.dialogOptions.title === "沟通记录"){
        add(data).then(res => {
          callback({success:true})
          this.getListData()
        }).catch(err => {
          callback({success:false})
        })
      }else if(this.dialogOptions.title === "编辑客户信息"){
        let params = Object.assign({}, data, this.form)
        edit(params).then(res => {
          callback({success:true})
          this.getListData()
        }).catch(err => {
          callback({success:false})
        })
      }
        
    },

    handleMultipleDelete() {
      console.log(this.options.multipleSelect, 'OOOKJJHG');
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