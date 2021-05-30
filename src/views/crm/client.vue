<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>商品筛选</span>
      </div>

      <el-form :inline="true" :model="goodsQuery">
        <el-form-item label="状态">
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
        <el-button style="float: right;" type="primary" @click="handleMultipleDelete">批量删除</el-button>
        <el-button style="float: right;marginRight:10px;" type="primary" @click="handleAdd">添加客户信息</el-button>
      </div>
      <Table :options="options" @handleTable="handleTable" />
    </el-card>
    <Dialog :options="dialogOptions" @handleSubmit="handleSubmit">
      <el-form-item  label="采集方式">
          <el-radio-group v-model="form.F0032">
            <el-radio v-for="radioOption in radioOPtions" :key="radioOption.value"  :label="radioOption.value">{{ radioOption.label }}</el-radio>
          </el-radio-group>
      </el-form-item>
      <template v-if="form.F0032 === '线下'">
        <el-form-item  label="采集人">
            <el-input v-model="form.F0033" />
        </el-form-item>
        <el-form-item  label="采集地点">
            <el-input v-model="form.F0035" />
        </el-form-item>
        <el-form-item  label="采集时间">
            <el-date-picker
              v-model="form.F0034"
              type="date"
              placeholder="选择日期"
              style="width:100%"
              value-format="yyyy-MM-dd"
            />
        </el-form-item>
        <el-form-item  label="来源">
            <el-radio-group v-model="form.F0036">
              <el-radio v-for="radioOption in source" :key="radioOption.value"  :label="radioOption.value">{{ radioOption.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item  label="推送时间">
            <el-date-picker
              v-model="form.F0034"
              type="date"
              placeholder="选择日期"
              style="width:100%"
              value-format="yyyy-MM-dd"
            />
        </el-form-item>
        <el-form-item  label="来源">
            <el-radio-group v-model="form.F0036">
              <el-radio v-for="radioOption in source1" :key="radioOption.value"  :label="radioOption.value">{{ radioOption.label }}</el-radio>
            </el-radio-group>
        </el-form-item>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { getCustomerList as getList, addCustomer as add, editCustomer as edit, deleteCustomer as deleteData } from '@/api/crm'
import parameters from '@/utils/parameter'

export default {
  name: 'Client',
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
            name: '编辑',
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
        multiple: true,
        multipleSelect: []
      },

      dialogOptions: {
        title: "添加课程",
        labelWidth: "130px",
        labelPosition: "left",
        show:false,
        data: null,
        settings: [
          {
            type: 'input',
            label: '姓名',
            width: 8,
            rules: [
                { required: true, message: '请输入名称', trigger: 'blur'},
                { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
                ],
            name:'F0003'
          },
          {
            type: 'date',
            label: '出生日期',
            width: 8,
            name: 'F0007'
          },
          {
              type: 'radio',
              label: '性别',
              width: 8,
              name: 'F0006',
              options: [{
                value:'男',
                label:'男'
              },{
                value: '女',
                label: '女'
              }]
          },
          {
            type: 'img',
            label:'图片',
            name:'F0021'
          },
          
          { 
              type: 'select',
              label: '意向项目',
              name: 'F0012',
              options: parameters.PA0045
          },
          {
            type: 'input',
            label: '国籍',
            width: 12,
            name: 'F0010'
          },
          {
            type: 'input',
            label: '证件号码',
            width: 12,
            name: 'F0011'
          },
          {
            type: 'input',
            label: '意向校区',
            name: 'F0013'
          },
          {
            type: 'input',
            label: '家庭住址',
            name: 'F0015'
          },
          {
            type: 'input',
            label: '所在学校',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '家长姓名',
            width: 12,
            name: 'F0017'
          },
          {
            type: 'input',
            label: '与家长关系',
            width: 12,
            name: 'F0019'
          },
          {
            type: 'input',
            label: '家长联系电话',
            width: 12,
            name: 'F0018'
          },
          {
            type: 'input',
            label: '微信号',
            width: 12,
            name: 'F0026'
          },
          {
            type: 'input',
            label: '校区状态',
            width: 12,
            name: 'F0040'
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

    handleAdd() {
      this.dialogOptions.data = null
      this.dialogOptions.title = "添加客户信息"
      this.form = {
        F0032: '',
        F0033: '',
        F0034:'',
        F0035:'',
        F0036:''
      }
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
      } else if (data.type === '编辑') {
        this.dialogOptions.title = "编辑客户信息"
        this.dialogOptions.data = data.data
        let { F0032, F0033, F0034, F0035, F0036} = data.data
        this.form = {
           F0032, F0033, F0034, F0035, F0036
        }
        this.dialogOptions.show = !this.dialogOptions.show
      } else if (data.type === '删除') {
        this.$confirm('此操作将永久删除该客户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteData(data.data.F0000).then(res => {
             this.getListData()
             this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      }
    },

    handleSubmit(data, callback) {
      data.F0001 = localStorage.getItem('cid')
      if(this.dialogOptions.title === "添加客户信息"){
        let params = Object.assign({}, data, this.form)
        add(params).then(res => {
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