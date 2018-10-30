<template>
    <div class="header">

        <img class="logoimage" src="@/assets/searchAll.jpg"/>
        <div class="logo">Global Search</div>
        <div class="login-name"><span>登录人:</span>&nbsp;<span>{{currUserName}}</span></div>
        <!--<div class="login-name"><span>当前部门:</span>&nbsp;<span>{{currDeptName}}</span></div>-->
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                   <img src="@/assets/loginOut.png" alt="" width="25">
                </span>
                <el-dropdown-menu slot="dropdown" placement="top-end">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                  <!--  <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>-->
                    <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="headerTimer">
        </div>
         <el-dialog title="重置密码" width="500px" :visible.sync ="changePasswordVisable" :close-on-click-modal="false">
        <el-form :model="addForm"  status-icon label-width="80px" :rules="addFormRules" ref="addForm" >
           <el-form-item label="新密码" prop="p1" >
            <el-input type="password" v-model="addForm.p1" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="重复输入" prop="p2" >
            <el-input type="password" v-model="addForm.p2" auto-complete="off"></el-input>
          </el-form-item>
        
        </el-form>
        
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="changePasswordVisable = false">取消</el-button>
           <el-button @click="resetForm('addForm')">重置</el-button>
          <el-button type="primary" @click.native="addSubmitPassword" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>

    export default {
        data(){
            let validatePass = (rule,value, callback) => {
               
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.addForm.p2 !== '') {
            this.$refs.addForm.validateField('p2');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
          
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addForm.p1) {
           
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
            
            
      return {
        
          addForm:
          {
              p1:'',
              p2:''
          },
          changePasswordVisable:false,
          addFormRules:
          {
           
            p1: [
            {  required:true,validator: validatePass,  trigger: 'blur'    }
                     ],
           p2: [
            {
                required:true,validator: validatePass2,
                trigger:'blur'
                }
                    ],
          }
      }
        },
        computed:{
            currUserName(){
               // console.log(this)
                if(this.getUserInfo() == null)
                    return ''
                return this.getUserInfo().userName;
            },
            currDeptName(){
                return this.getUserInfo().deptName;
            }
        },
        methods:{

           resetForm(form)
           {
                this.$refs[form].resetFields();
           },
            addSubmitPassword()
            {
                console.log("enter addsubmitpassword")
                this.$refs.addForm.validate((valid) => {
                if (valid) {
                    
                    this.changePasswordVisable = false
                    let param = {}
                    param.userInfoDTO = JSON.parse(sessionStorage.getItem('userInfo'))
                    console.log("user info:"+param.userInfoDTO)
                    param.userInfoDTO.password= this.addForm.p1;
                    this.$http.post(this.$global.remote().userUpdatePWD, param, response => {
                   this.$message("修改密码成功")
                }, fail => {
                    this.$message.error(fail.message);
                })
                } else {
                   
                    this.$message("输入有错")
                    return false;
                }
                });
               

                // this.changePasswordVisable=false;

            },
            getUserInfo(){
                this.$global.logInfo("enter getuserInfo")
                var userinfo = sessionStorage.getItem('userInfo');
                
                return JSON.parse(sessionStorage.getItem('userInfo'));
            },
            handleCommand(command) {
                if(command == 'logout'){
                    this.$http.get(this.$global.remote().logout,null,response => {
                        this.clearCookie();
                        this.clearStore();
                        //不需要routergit 
                        // sessionStorage.removeItem('routers');
                        // this.$router.push('/login');
                        //flash
                        window.location.reload();
                    });
                } else if (command == 'userInfo') {

                } else if (command == 'updatePassword'){
                    console.log("call change password")
                    this.addForm.p1 = ''
                    this.addForm.p2 = ''
                    this.changePasswordVisable = true;

                }

            },
            clearCookie : function(){
                this.$cookie.set('userName','',-1);
                // this.$cookie.set('userInfo','',-1);
                // this.$cookie.set('userMenu','',-1);
                sessionStorage.removeItem('userInfo');
                sessionStorage.removeItem('userMenu');
                localStorage.Authorization = ''
                
            },
            clearStore : function(){
                this.$store.commit("clearStore");
            },
            autoTime(){
                var timeEle=document.querySelector('.headerTimer');
                if(timeEle === null ||timeEle === undefined)
                    console.log("error happened for autotime")
                setInterval(function () {
                    let time=new Date();
                    var year=time.getFullYear();
                    var month=time.getMonth()>=9?(time.getMonth()+1):("0"+(time.getMonth()+1));
                    var day=time.getDate()>9?time.getDate():"0"+(time.getDate());
                    var hour=time.getHours()>9?time.getHours():"0"+(time.getHours());
                    var minute=time.getMinutes()>9?time.getMinutes():"0"+(time.getMinutes());
                    var second=time.getSeconds()>9?time.getSeconds():"0"+(time.getSeconds());
                    timeEle.innerHTML=year+"-"+month+"-"+day+" "+hour+"-"+minute+"-"+second;
                },1000)
            }
        },
        mounted:function () {
           // this.autoTime();
        
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:500px;
        text-align: center;
    }
    .header .logoimage
    {
        float: left;
        padding-left:10px;
        padding-top:20px;
        top: 60px;
        width: 130px;
        height: 30px;
        
    }
    .user-info {
        float: right;
        padding-right: 10px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .el-dropdown-link>img{
        vertical-align: middle;
        margin-top:-5px;
    }
    .login-name{
        float: right;
        padding-right: 10px;
        font-size:18px;
        vertical-align: middle;
    }
    .login-name>span:nth-child(1){
        font-weight: bold;
    }
    .login-name>span:nth-child(2){
        color:#F15B23;
    }
    .header>.login-name:nth-child(3){
        margin-left: 20px;
    }
    .headerTimer{
        float:right;
        padding-right: 10px;
        font-weight: 300;
        font-size:20px;
    }
</style>
