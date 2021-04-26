<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>商品筛选</span>
      </div>

      <el-form :inline="true" :model="goodsQuery">
        <el-form-item label="上架状态">
          <el-select v-model="goodsQuery.status" placeholder="">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传时间">
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
          <el-input v-model="goodsQuery.others" placeholder="请输入商品名称或其他关键词" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>普通商品列表</span>
        <el-button style="float: right;" type="primary" @click="handleMultipleDelete">批量删除</el-button>
        <el-button style="float: right;marginRight:10px;" type="primary" @click="handleAdd">添加商品</el-button>
      </div>
      <Table :options="options" @handleTable="handleTable" />
    </el-card>
    <Dialog :options="dialogOptions" @handleSubmit="handleSubmit" />
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { addNormalClass, getNormalClass, editNormalClass, deleteNormalClass } from '@/api/commodity'
import parameters from '@/utils/parameter'

export default {
  name: 'General',
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
        console.log(value, 'PPPPPPPP');
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
            name: '名称',
            value: 'F0003',
            width: '15%'
          }, {
            name: '状态',
            value: 'F0094',
            width: '10%'
          }, {
            name: '课时',
            value: 'F0009',
            width: '30%'
          }, {
            name: '价格',
            value: 'F0012',
            width: '10%'
          }, {
            name: '上传人',
            value: 'F0090',
            width: '10%'
          }, {
            name: '上传时间',
            value: 'F0091',
            width: '10%'
          }
        ],
        columnOpreationInfo: [
          {
            name: '编辑',
            style: ''
          },
          {
            name: '上/下架',
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
            label: '课程名称',
            rules: [
                { required: true, message: '请输入课程名称', trigger: 'blur'},
                { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
                ],
            name:'F0003'
          },
          {
            type: 'select',
            label: '运动类目',
            rules: [],
            name:'F0004',
            options:parameters.PA0045
          },
          {
            type: 'img',
            label: '课程封面',
            name: 'F0015'
          },
          {
            type: 'input',
            label: '课时数量',
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0009'
          },
          {
            type: 'input',
            label: '赠送课时',       
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0018'
          },
          {
            type: 'input',
            label: '课时有效期',     
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0019'
          },
          {
            type: 'input',
            label: '课程价格',
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0012'
          },
          {
            type: 'input',
            label: '优惠价格',
            rules: [{ validator: checkNum, trigger: 'blur' }],
            name: 'F0013'
          },
          {
            type: 'text',
            label: '课程简介',
            name: 'F0014',
            roew:3
          },
          {
            type: 'text',
            label: '授课教练',
            name: 'F0006'
          }
        ]
      },

      statusOptions: parameters.PA0049
    }
  },

  mounted() {
    this.getListData()
  },

  methods: {
    handleQuery() {
      let {status, time, others} = this.goodsQuery
      console.log(time, 'sdsdsd');
      this.historyQuery = 
      {
        status,time,others
      }
      this.getListData()
    },

    getListData() {
      console.log( this.historyQuery.status, this.historyQuery.hasOwnProperty('status'), ' this.historyQuery this.historyQuery');
      const params = {
        cid: localStorage.getItem('cid'),
        pageNum: this.options.pageNum,
        pageSize: this.options.pageSize,
        name: this.historyQuery.hasOwnProperty('others') ? this.historyQuery.others : "",
        time:  this.historyQuery.hasOwnProperty('time') ? this.historyQuery.time : null,
        status:  this.historyQuery.hasOwnProperty('status') ? this.historyQuery.status : null,
      }

      console.log(params, 'paramsparamsparamsparamsparams');

      getNormalClass(params).then(res => {
        this.options.data = this.changeFormat(res.data.items)
        this.options.total = res.data.total
      })
    },

    handleAdd() {
        this.dialogOptions.show = !this.dialogOptions.show
    },

    handleTable(data) {
      console.log(data, 'LLLLLLLLLLLLLLLLLLLLLLLLLLL');
      if (data.type === 'getTable') {
        this.getListData()
      } else if (data.type === 'pageSizeChange') {
        this.options.pageSize = data.pageSize
      } else if (data.type === 'pageNumChange') {
        this.options.pageNum = data.pageNum
      } else if (data.type === 'multipleSelect') {
        this.options.multipleSelect = data.data
      } else if (data.type === '编辑') {
        this.dialogOptions.title = "编辑课程"
        this.dialogOptions.data = data.data
        this.dialogOptions.show = !this.dialogOptions.show
      } else if (data.type === '删除') {
        deleteNormalClass(data.data.F0000).then(res => {
          this.getListData()
        })
      } else if (data.type === '上/下架') {
        if(data.data.F0094 === '已上架'){
          data.data.F0094 = '下架'
        }else{
          data.data.F0094 = '上架审核中'
        }

        editNormalClass(this.reverseChangeFormat(data.data)).then(res => {
          this.getListData()
        })
      } 
    },

    handleSubmit(data, callback) {
      console.log(data, 'YYYYYYYYY');
      data.F0001 = localStorage.getItem('cid')
      if(this.dialogOptions.title === "添加课程"){
        addNormalClass(this.reverseChangeFormat(data)).then(res => {
          callback({success:true})
          this.getListData()
        }).catch(err => {
          callback({success:false})
        })
      }else{
        editNormalClass(this.reverseChangeFormat(data)).then(res => {
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
