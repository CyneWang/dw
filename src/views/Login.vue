<template>
    <div class="login">
        <el-row>
            <el-col :span="12">
                <div class="imgBox">
                    <img src="../assets/img/numberList.png" alt="" class="numberList">
                    <img src="../assets/img/lightTop(1).png" alt="" class="lightTop">
                    <img class="building" src="../assets/img/building.png"/>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="loginBox">
                    <h4>登录</h4>
                    <div class="demo-input-suffix">
                        <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" class="loginInput"
                                  v-model="userName"></el-input>
                        <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" type="password" class="loginInput"
                                  v-model="password"></el-input>
                        <button type="button" class="loginBtn" @click="login">登录</button>
                        <p class="tip">{{tip}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="bottomHeight">
                <img src="../assets/img/wave.png" alt="" class="wave">
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import store from '@/store';


    export default {
        name: "Login",
        store,
        data: function () {
            return {
                userName: "",
                password: '',
                tip: "",
            }
        },
        methods: {
            login: function () {
                if (this.userName !== '' && this.password !== '') {
                    store.commit('getUserName',this.userName);
                    this.$router.push('/home/report/budgetAdjust');
                    this.tip = '';
                } else {
                    this.tip = '用户名或密码不能为空！'
                }
            }
        },
        watch:{
            userName:function (newData, oldData) {
                if(newData!==""){
                    this.tip="";
                }
            },
            password:function (newData, oldData) {
                if(newData!==""){
                    this.tip="";
                }
            }
        },
    }
</script>

<style>
    .login {
        background-color: #070c41;
        height: 100vh;
    }

    .imgBox {
        position: relative;
        height: 80vh;
    }

    .building {
        width: 80%;
        position: absolute;
        left: 40px;
        top: 50%;
        margin-top: -160px;
    }

    .numberList {
        position: fixed;
        top: -360px;
        width: 48%;
        left: 30px;
    }

    .lightTop {
        position: fixed;
        top: -26px;
        left: 200px;
        width: 100%;
    }

    .wave {
        width: 100%;
        position: absolute;
        bottom: 0;
    }

    .bottomHeight {
        height: 20vh;
    }

    .loginBox {
        width: 290px;
        height: 333px;
        padding: 0 36px;
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid #244390;
        margin-left: 45px;
        position: absolute;
        top: 50%;
        margin-top: -125px;
    }

    .loginBox h4 {
        text-align: center;
        color: #ffffff;
        font-weight: 400;
    }

    .loginBtn {
        width: 100%;
        height: 40px;
        border-radius: 4px;
        background-image: linear-gradient(to top, #0177e4, #00b8ff);
        border: none;
        color: #ffffff;
        margin: 12px 0;
    }

    .loginInput {
        margin: 12px 0;
    }

    .loginBox input.el-input__inner {
        background: rgba(255, 255, 255, 0.03) !important;
        border: 1px solid #244390;
        color: #fff;
    }

    .loginBox input.el-input__inner:focus {
        border: 1px solid #0b8ab9;
    }

    .tip {
        margin-top: 0;
        font-size: 14px;
        color: #bf0404;
    }
</style>