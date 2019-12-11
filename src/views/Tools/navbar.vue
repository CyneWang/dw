<template>
    <div class="home">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-box white"></i>服务</template>
                <el-submenu index="1-2">
                    <template slot="title">性能查询</template>
                    <el-menu-item index="1-2-1">
                        <router-link to="/home/service/disability/a">维度查询</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="1-3">
                    <router-link to="/home/service/ability">性能监控</router-link>
                </el-menu-item>
                <el-submenu index="1-4">
                    <template slot="title">性能对比</template>
                    <el-menu-item index="1-4-1"><router-link to="/home/construction">A维度</router-link></el-menu-item>
                    <el-menu-item index="1-4-2"><router-link to="/home/construction">B维度</router-link></el-menu-item>
                    <el-menu-item index="1-4-3"><router-link to="/home/construction">C维度</router-link></el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-document white"></i>报告</template>
                <el-submenu index="2-1">
                    <template slot="title">预算</template>
                    <el-menu-item index="2-1-6">
                        <router-link to="/home/report/budgetAdjust">调整</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-1-1"><router-link to="/home/construction">详情</router-link></el-menu-item>
                    <el-menu-item index="2-1-2"><router-link to="/home/construction">趋势</router-link></el-menu-item>
                    <el-menu-item index="2-1-3"><router-link to="/home/construction">差额</router-link></el-menu-item>
                    <el-menu-item index="2-1-4"><router-link to="/home/construction">制定</router-link></el-menu-item>
                    <el-menu-item index="2-1-5"><router-link to="/home/construction">导入</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="2-2">
                    <template slot="title">报告详情</template>
                    <el-menu-item index="2-2-1"><router-link to="/home/construction">A维度</router-link></el-menu-item>
                    <el-menu-item index="2-2-2"><router-link to="/home/construction">B维度</router-link></el-menu-item>
                    <el-menu-item index="2-2-3"><router-link to="/home/construction">C维度</router-link></el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting white"></i>常用工具</template>
                <el-submenu index="3-1">
                    <template slot="title">管理</template>
                    <el-menu-item index="3-1-1"><router-link to="/home/construction">备份信息查询</router-link></el-menu-item>
                    <el-menu-item index="3-1-2"><router-link to="/home/construction">事件管理</router-link></el-menu-item>
                    <el-menu-item index="3-1-3"><router-link to="/home/construction">订单管理</router-link></el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-menu white"></i>方案</template>
                <el-submenu index="4-1">
                    <template slot="title">架构</template>
                    <el-menu-item index="4-1-1"><router-link to="/home/construction">专家支持</router-link></el-menu-item>
                    <el-menu-item index="4-1-2"><router-link to="/home/construction">方案分享</router-link></el-menu-item>
                    <el-menu-item index="4-1-3"><router-link to="/home/construction">团队介绍</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="4-2">
                    <template slot="title">服务介绍</template>
                    <el-menu-item index="4-2-1"><router-link to="/home/construction">服务一</router-link></el-menu-item>
                    <el-menu-item index="4-2-2"><router-link to="/home/construction">服务二</router-link></el-menu-item>
                    <el-menu-item index="4-2-3"><router-link to="/home/construction">服务三</router-link></el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="user" class="el-right">
                <template slot="title"><i class="el-icon-user white"></i>{{userName}}</template>
                <el-menu-item index="user"><a href="/" target="_self">退出</a></el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="breadNav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>{{currentNav.firstNav}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{currentNav.secNav}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{currentNav.thirdNav}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    import store from '@/store';
    import {navList} from '@/navList';

    export default {
        name: "navbar",
        store,
        data() {
            return {
                activeIndex: '2-1-6',
                userName: store.state.userName,
                currentNav: {
                    firstNav: "报告",
                    secNav: "预算",
                    thirdNav: "调整",
                },
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.currentNav.firstNav = navList[keyPath[0]];
                this.currentNav.secNav = navList[keyPath[1]];
                this.currentNav.thirdNav = navList[keyPath[2]];
            }
        },
    }
</script>

<style>
    .el-right{
        float: right !important;
    }
    .home .el-menu--horizontal>.el-submenu .el-submenu__title{
        height: 50px;
        line-height: 50px;
        color: white;
    }
    .home .el-menu.el-menu--horizontal{
        background-color: #070c41;
        color: #ffffff;
    }
    .home .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
    .home .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
    .home .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
        background-color: #073e77;
    }
    .white{
        color: white !important;
    }
    .breadNav{
        padding: 14px 22px;
    }
</style>
