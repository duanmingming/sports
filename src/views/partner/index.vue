
<template>
  <div class="container">
    <el-card class="boxHeader">
      <div slot="header" class="clearfix">
        <span>合作伙伴列表</span>
        <el-button style="float: right;marginRight:10px;" type="primary" @click="handleAdd">添加合作伙伴</el-button>
      </div>
      <Table :options="options" />
    </el-card>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >

      <el-form ref="createForm" :model="createForm" :rules="rules" label-width="100px">
        <el-form-item label="合作伙伴名称" prop="campusName">
          <el-input v-model="createForm.campusName" placeholder="校区名称" />
        </el-form-item>
        <el-form-item label="校区封面：" prop="campusImg">
          <el-cascader
            v-model="createForm.campusImg"
            :options="goodsTree"
          />
        </el-form-item>
        <el-form-item label="可运营商品：" prop="goods">
          <div class="goodsSelect">
            <el-tree
              :data="goodsTree"
              show-checkbox
              node-key="id"
              :props="defaultProps"
            />
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from '@/components/Table/index'
import { getCampusList } from '@/api/campus'

export default {
  name: 'Partner',
  components: { Table },
  data() {
    return {
      options: {
        data: [],
        border: true,
        maxHeight: window.innerHeight * 0.63,
        style: 'width: 100%; marginLeft:10px',
        columnDataInfo: [
          {
            name: '地址',
            value: 'orderNo',
            width: '60%'
          },
          {
            name: '数量',
            value: 'userName',
            width: '15%'
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
        pageSizes: [10, 20, 30]
      },
      formInline: {
        user: '',
        region: ''
      },
      title: '添加校区',
      dialogVisible: false,
      createForm: {
        userName: null,
        showName: null,
        organization: null,
        email: null,
        tel: null,
        expireTime: null,
        remark: null,
        id: null,
        jobNo: null
      },
      rules: {
        campusName: [
          { required: true, message: '请输入校区名称', trigger: 'blur' }
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
      const params = {
        cid: 1
      }

      getCampusList(params).then(res => {
        console.log('===========resresres=========================')
        console.log(res)
        console.log('====================================')
      })
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
    },

    handleClose() {
      this.dialogVisible = false
      // this.editFlag = false
      // this.$refs['createForm'].resetFields()
      // this.resetTree = !this.resetTree
      // this.defaultText = ''
      this.createForm = {
        userName: null,
        showName: null,
        organization: null,
        email: null,
        tel: null,
        expireTime: null,
        remark: null,
        id: null,
        jobNo: null
      }
    },

    handleSubmit() {

    },

    handleAdd() {
      this.dialogVisible = true
    },

    beforeAvatarUpload(file) {
      console.log('==========filefilefilefile==========================')
      console.log(file)
      console.log('====================================')
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      this.imageUrl = URL.createObjectURL(file.raw)
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isJPG && isLt2M
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
