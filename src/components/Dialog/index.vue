<template>
  <div>
    <el-dialog
      :title="options.title"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >

      <el-form ref="form" :model="form" :label-width="options.labelWidth" :label-position="options.labelPosition" :style="options.style">
        <template v-for="item in options.settings">
          <el-form-item :key="item.name" :label="item.label" :prop="item.name" :rules="item.rules ? item.rules : []">

            <template v-if="item.type === 'text'">
              <el-input v-model="form[item.name]" type="textarea" :rows="item.rows ? item.rows : 3" :disabled="item.disabled ? item.disabled : false" />
            </template>

            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="form[item.name]"
                placeholder="请选择"
                :disabled="item.disabled ? item.disabled : false"
                style="width:100%"
              >
                <el-option
                  v-for="selectOption in item.options"
                  :key="selectOption.label"
                  :label="selectOption.label"
                  :value="selectOption.value"
                />
              </el-select>
            </template>

            <template v-else-if="item.type === 'cascader'">
              <el-cascader
                v-model="form[item.name]"
                :options="item.options"
                :props="item.props"
                :disabled="item.disabled ? item.disabled : false"
              />
            </template>

            <template v-else-if="item.type === 'switch'">
              <el-switch
                v-model="form[item.name]"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-text="item.activeText"
                :inactive-text="item.inactivetext"
                :disabled="item.disabled ? item.disabled : false"
              />
            </template>

            <template v-else-if="item.type === 'date'">
              <el-date-picker
                v-model="form[item.name]"
                type="date"
                :disabled-date="item.disabled ? item.disabled : false"
                placeholder="选择日期"
                style="width:100%"
                value-format="yyyy-MM-dd"
              />
            </template>

            <template v-else-if="item.type === 'radio'">
              <el-radio-group v-model="form[item.name]">
                <el-radio v-for="radioOption in item.options" :key="radioOption" :label="radioOption">{{ radioOption }}</el-radio>
              </el-radio-group>
            </template>

            <template v-else-if="item.type === 'img'">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="beforeAvatarUpload"
                :auto-upload="false"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </template>

            <template v-else>
              <el-input v-model="form[item.name]" :disabled="item.disabled ? item.disabled : false" />
            </template>

          </el-form-item>
        </template>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          title: '',
          labelWidth: '130px',
          labelPosition: 'left',
          style: '',
          show: false,
          settings: [
            {
              type: 'input',
              label: 'aaa',
              rules: [],
              name: '',
              disabled: false
            }, {
              type: 'select',
              label: 'aaa',
              rules: [],
              name: '',
              disabled: false,
              multiple: false,
              options: []
            }, {
              type: 'text',
              label: 'aaa',
              rules: [],
              name: '',
              disabled: false,
              rows: 3
            }, {
              type: 'cascader',
              label: 'aaa',
              rules: [],
              name: '',
              disabled: false,
              options: [],
              props: {}
            }, {
              type: 'img',
              label: 'aaa',
              prop: '',
              rules: [],
              name: '',
              disabled: false
            }, {
              type: 'switch',
              label: 'aaa',
              rules: [],
              name: '',
              disabled: false,
              activeText: '',
              inactivetext: ''
            }, {
              type: 'date',
              label: 'aaa',
              rules: [],
              name: '',
              disabled: false
            }, {
              type: 'radio',
              label: 'aaa',
              rules: [],
              name: '',
              disabled: false,
              options: []
            }
          ],
          img: {
            name: '',
            url: ''
          },
          data: {}
        }
      }
    }
  },

  data() {
    return {
      dialogVisible: false,
      form: null,
      initFrom: null,
      loading: false,
      imageUrl: null,
      file: null
    }
  },

  computed: {
    show() {
      return this.options.show
    },

    formData() {
      return this.options.data
    }
  },

  watch: {
    show(val) {
      this.dialogVisible = true
    },

    formData(val) {
      if (val) {
        this.form = val
        this.imageUrl = this.options.img.url
      } else {
        this.form = this.initFrom
      }
    }
  },

  created() {
    const arr = this.options.settings; const obj = {}
    for (const item of arr) {
      obj[item.name] = null
    }
    this.form = obj
    this.initFrom = obj
  },

  methods: {
    handleClose() {
      this.$refs['form'].resetFields()
      this.form = this.initFrom
      this.loading = false
      this.dialogVisible = false
    },

    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.file) {
            const fd = new FormData()
            fd.append('file', this.file.raw, this.file.name)
            uploadImage(fd).then(res => {
              this.form[this.options.img.name] = res.data.file
              this.loading = true
              this.$emit('handleSubmit', this.form, res => {
                if (this.dialogVisible) {
                  this.loading = false
                  if (res.success) {
                    this.$refs['form'].resetFields()
                    this.form = this.initFrom
                    this.dialogVisible = false
                  } else {
                    this.$message.error(res.error)
                  }
                }
              })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    beforeAvatarUpload(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.file = file
    }
  }

}
</script>

<style scoped>
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
</style>
