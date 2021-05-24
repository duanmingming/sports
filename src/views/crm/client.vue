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
    <Dialog :options="dialogOptions" @handleSubmit="handleSubmit" />
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { getCustomerList as getList,  } from '@/api/crm'
import parameters from '@/utils/parameter'

export default {
  name: 'Match',
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
            type: 'input',
            label: '年龄',
            width: 8,
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0005'
          },
          {
              type: 'radio',
              label: '性别',
              width: 8,
              name: 'F0006',
              options: [{
                value:0,
                label:'男'
              },{
                value: 1,
                label: '女'
              }]
          },
          {
            type: 'img',
            label:'上传图片',
            name:'F0012'
          },
          
          {
              type: 'radio',
              label: '意向项目',
              name: 'F0006',
              options: [{
                value:0,
                label:'球队'
              },{
                value: 1,
                label: '个人'
              }]
          },{
            type: 'input',
            label: '证件类型',
            width: 12,
            name: 'F0021'
          },
          {
            type: 'input',
            label: '国籍',
            width: 12,
            name: 'F0015'
          },
          {
            type: 'input',
            label: '证件号码',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '意向校区',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '家庭住址',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '所在学校',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '家长姓名',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '与家长关系',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '家长联系电话',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '微信号',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '国籍',
            name: 'F0016'
          },
          {
            type: 'input',
            label: '状态',
            name: 'F0016'
          },






          {
            type: 'date',
            label: '举办时间',
            width: 12,
            name: 'F0013'
          },
          {
            type: 'input',
            label: '地点',
            width: 12,
            name: 'F0007'
          },
          {
            type: 'text',
            label: '赛事简介',
            name: 'F0011',
            roew:3
          },
          {
            type: 'input',
            label: '保证金',
            width: 8,
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0008'
          },
          {
            type: 'input',
            label: '报名费',
            width: 8,
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0009'
          },
          {
            type: 'input',
            label: '保险',
            width: 8,
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0010'
          },
          {
            type: 'input',
            label: '联系人',
            width: 8,
            name: 'F0017'
          },
          {
            type: 'input',
            label: '联系电话',
            width: 8,
            rules: [{ validator: checkTel, trigger: 'blur' }],
            name: 'F0018'
          },
          {
            type: 'input',
            label: '微信号',
            width: 8,
            name: 'F0019'
          },
          {
            type: 'input',
            label: '上架有效期',
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0020'
          },
        ]
      },

      statusOptions: parameters.PA0030
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
      this.dialogOptions.title = "添加课程"
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
      } else if (data.type === '审核') {
        this.dialogOptions.title = "审核课程"
        this.dialogOptions.data = data.data
        this.dialogOptions.show = !this.dialogOptions.show
      }else if (data.type === '编辑') {
        this.dialogOptions.title = "编辑课程"
        this.dialogOptions.data = data.data
        this.dialogOptions.show = !this.dialogOptions.show
      } else if (data.type === '删除') {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteClass(data.data.F0000).then(res => {
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
       
      } else if (data.type === '上/下架') {
        if(data.data.F0094 === '已上架'){
          data.data.F0094 = '下架'
        }else{
          data.data.F0094 = '上架审核中'
        }

        editClass(this.reverseChangeFormat(data.data)).then(res => {
          this.getListData()
        })
      } 
    },

    handleSubmit(data, callback) {
      data.F0001 = localStorage.getItem('cid')
      if(this.dialogOptions.title === "添加课程"){
        addClass(this.reverseChangeFormat(data)).then(res => {
          callback({success:true})
          this.getListData()
        }).catch(err => {
          callback({success:false})
        })
      }else if(this.dialogOptions.title === "审核课程"){
        console.log(data, 'PPPPPP');
        let params = {
          cid: localStorage.getItem('cid'),
          type: 140,
          F0000: data.F0000,
          F0094: data.checkStatus,
          F0095: data.checkNote,
          F0001: 1
        }
        checkClass(params).then(res => {
          callback({success:true})
          this.getListData()
        }).catch(err => {
          callback({success:false})
        })
      }else{
        editClass(this.reverseChangeFormat(data)).then(res => {
          callback({success:true})
          this.dialogOptions.title = "添加课程"
          this.getListData()
        }).catch(err => {
          callback({success:false})
          this.dialogOptions.title = "添加课程"
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