<!--
 * @Author: your name
 * @Date: 2021-04-25 15:10:08
 * @LastEditTime: 2021-05-10 16:18:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sports/src/views/curriculum/schedule.vue
-->
<template>
  <div>
    <div class="content" style="marginTop:30px">
      <el-form :inline="true" :model="formInline" label-width="70px">
        <el-form-item label="班名">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课频次">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item style="width:100%" label="教练">
          <el-select style="width:100%"  v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:100%" label="学员">
          <el-select style="width:100%"  v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:43%">保存</el-button>
          <el-button style="width:43%" @click="handleGoback">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content">
      <el-calendar v-model="value" :key='key'>
        <template
          slot="dateCell"
          slot-scope="{date, data}"
        >
          <div @click="handleClick(date, data)">
            <p :class="data.isSelected ? 'is-selected' : ''" style="fontSize:14px">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
            </p>
            <template v-if="schedle[data.day]">
              <span class="text">{{schedle[data.day].time[0]}}--{{schedle[data.day].time[1]}}</span>
              <span class="text">未开始</span>
            </template>
            
          </div>
        </template>
      </el-calendar>
    </div>
    


    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="666px"
      :before-close="handleClose">

      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="时间">
          <el-time-picker
            is-range
            arrow-control
            v-model="formLabelAlign.time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            style="width:100%"
            value-format="HH:mm:ss"
            >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formLabelAlign.status">
            <el-radio :label="3">已结束</el-radio>
            <el-radio :label="6">进行中</el-radio>
            <el-radio :label="9">未开始</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="formLabelAlign.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:'',
      schedle:{
        '04-02': {
          status: '',
          start: '',
          end: ''
        }
      },

      dialogVisible: false,
      formLabelAlign: {
        time:null,
        note:'',
        status:''
      },
      now: '',
      key: 0,

      formInline: {
        user: '',
        region: ''
      }
    }
  },

  watch: {
    value(newValue, oldValue) {
      if(oldValue && (newValue.getMonth() === oldValue.getMonth())){
        this.dialogVisible = true
        let year = newValue.getFullYear(),
            month = (newValue.getMonth() + 1) > 9 ? (newValue.getMonth() + 1) : ('0' + (newValue.getMonth() + 1)),
            date = newValue.getDate() > 9 ?  newValue.getDate() : ('0' + newValue.getDate())
        let now = year + '-' + month + '-' + date
        this.now = now
      }
      
    }
  },

  methods: {
    handleClick(a,b) {
    },

    handleClose() {
      
    },

    handleSubmit() {
      let {time, note, status} = this.formLabelAlign
      if(time){
        this.schedle[this.now] = {
          time,
          note,
          status
        }
      }else{
        if(this.schedle.hasOwnProperty(this.now)){
          delete this.schedle[this.now]
        }
      }
      
      this.dialogVisible = false
      this.key = this.key  + 1
    },

    onSubmit() {
      console.log('submit!');
    },

    handleGoback() {
      console.log('===========this.$routerthis.$routerthis.$router=========================');
      console.log(this.$router);
      console.log('====================================');
      this.$router.back(-1)
    }
  }

}
</script>

<style scoped>
  .text {
    font-size: 14px;
    display: block;
    color:chartreuse;
  }

  .el-form--inline .el-form-item {
    width: 36%
  }

  .content {
    width: 90%;
    margin: 0 auto;
  }

  >>>.el-form-item__content {
    width: 60%
  }

</style>