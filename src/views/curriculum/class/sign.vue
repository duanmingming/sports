<!--
 * @Author: your name
 * @Date: 2021-04-25 15:10:08
 * @LastEditTime: 2021-05-10 17:50:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sports/src/views/curriculum/schedule.vue
-->
<template>
  <div>
    <div class="content" style="marginTop:30px">
      <el-form :inline="true" :model="formInline" label-width="70px">
        <el-form-item label="班名">
          <el-input v-model="formInline.user" :disabled="true" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-select v-model="formInline.region" :disabled="true" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-input v-model="formInline.user" :disabled="true" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-select v-model="formInline.region" :disabled="true" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:100%" label="教练">
          <el-select style="width:100%" :disabled="true"  v-model="formInline.region" placeholder="活动区域">
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

    <div class="content" style="marginBottom:300px">
      <template v-for="(item, index) in studentInfo">
        <el-row :key="index"  style="lineHeight:43px;height:43px">
          <el-col :span="3"><div class="grid-content bg-purple"><span>{{item.name}}</span></div></el-col>
          <el-col :span="13">
            <div class="grid-content bg-purple">
              <el-radio-group v-model="item.status">
                <el-radio :label="0">已上课</el-radio>
                <el-radio :label="1">事假</el-radio>
                <el-radio :label="2">病假</el-radio>
                <el-radio :label="3">旷课</el-radio>
                <el-radio :label="4">停课</el-radio>
                <el-radio :label="5">其他</el-radio>
              </el-radio-group>
            </div>
          </el-col>
          <el-col :span="4"><div class="grid-content bg-purple"><span>剩余课时：{{item.rest}}</span></div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple"><span>已上课时：{{item.done}}</span></div></el-col>
        </el-row>
      </template>
    </div>
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
      },

      studentInfo: [{
        name: '张三',
        status: 1,
        rest: 3,
        done: 2
      },
      {
        name: '张三',
        status: 1,
        rest: 3,
        done: 2
      },{
        name: '张三',
        status: 1,
        rest: 3,
        done: 2
      },
      {
        name: '张三',
        status: 1,
        rest: 3,
        done: 2
      }]
    }
  },

  watch: {
    value(newValue, oldValue) {
      
      
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

  .calender {

  }

  .grid-content {
   border-bottom: 1px solid black;
  }

</style>