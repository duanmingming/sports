<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>课程筛选</span>
      </div>

      <el-form :inline="true" :model="goodsQuery">
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="goodsQuery.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="goodsQuery.others" placeholder="请输入商品名称或其他关键词" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>

    </el-card>

    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>课程列表</span>
        <el-button style="float: right;marginRight:10px;" type="primary" @click="handleAdd">添加课程</el-button>
      </div>
      <Table :options="options" />
    </el-card>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import Dialog from '@/components/Dialog/index'
import { getCampusList } from '@/api/campus'
import parameters from '@/utils/parameter'

export default {
  name: 'General',
  components: { Table, Dialog },
  data() {
    const checkEmail = (rule, value, callback) => {
      if (value) {
        const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        const flag = reg.test(value)
        if (flag) {
          return callback()
        } else {
          return callback(new Error('请填写正确的邮箱格式'))
        }
      } else {
        return callback()
      }
    }

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

    return {
      options: {
        data: [],
        border: false,
        maxHeight: window.innerHeight * 0.63,
        style: 'width: 100%; marginLeft:10px',
        columnDataInfo: [
          {
            name: '编号',
            value: 'number',
            width: '15%'
          },
          {
            name: '名称',
            value: 'userName',
            width: '15%'
          }, {
            name: '状态',
            value: 'tel',
            width: '10%'
          }, {
            name: '颜色',
            value: 'className',
            width: '30%'
          }, {
            name: '价格',
            value: 'amount',
            width: '10%'
          }, {
            name: '尺码',
            value: 'status',
            width: '10%'
          }, {
            name: '上传人',
            value: 'time',
            width: '10%'
          }, {
            name: '上传时间',
            value: 'time',
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
        multiple: true
      },
      goodsQuery: {
        status: '',
        time: '',
        others: ''
      },
      title: '添加校区',
      dialogVisible: false,
      createForm: {
        name: null,
        color: null,
        size: null,
        img: null,
        weight: null,
        unitPrice: null,
        discountedPrice: null,
        introduction: null,
        maker: null,
        status: null
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        unitPrice: [
          { required: true, message: '请输入单价', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入商品简介', trigger: 'blur' }
        ]
      },

      editFlag: false,

      imageUrl: '',

      goodsTree: [
        {
          label: '上海校区',
          value: 10000,
          children: [
            {
              label: '静安校区',
              value: 10001,
              children: [
                {
                  label: '静安训练中心',
                  value: 10002
                }
              ]
            },
            {
              label: '闵行校区',
              value: 10003,
              children: [{
                label: '闵行训练中心',
                value: 10004
              }]
            }
          ]
        },
        {
          label: '北京校区',
          value: 10005,
          children: [{
            label: '北京嘉里中心',
            value: 10006
          }
          ]
        },
        {
          label: '贵州省校区',
          value: 10007,
          children: [{
            label: '贵阳市校区',
            value: 10008,
            children: [
              {
                label: '贵州训练中心',
                value: 10009
              }
            ]
          }]
        },
        {
          label: '香港校区',
          value: 10010,
          children: [{
            label: '香港训练中心',
            value: 10011
          }]
        },
        {
          label: '测试校区（省)',
          value: 90000,
          children: [
            {
              label: '测试省属培训中心1',
              value: 90001
            },
            {
              label: '测试校区（市）',
              value: 90002,
              children: [
                {
                  label: '测试市属培训中心1',
                  value: 90003
                },
                {
                  label: '测试校区1（县)',
                  value: 90004,
                  children: [
                    {
                      label: '测试培训中心11',
                      value: 90005
                    },
                    {
                      label: '测试培训中心12',
                      value: 90006
                    }
                  ]
                },
                {
                  label: '测试校区2（县)',
                  value: 90007,
                  children: [{
                    label: '测试培训中心21',
                    value: 90008
                  },
                  {
                    label: '测试培训中心22',
                    value: 90009
                  }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '测试总部直营校区',
          value: 90010,
          children: [
            {
              label: '测试直营校区1',
              value: 90011
            },
            {
              label: '测试直营校区2',
              value: 90012
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
    
    },

    handleSubmit() {

    },

    handleAdd() {
      this.$router.push({path:'/curriculum/sign'})
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
