<template>
    <div class="overView">
        <div class="oracleView">
            <PanelTitle>DB性能监控</PanelTitle>
            <div class="panel mdBody">
                <el-row class="oracleRow">
                    <el-col :span="6">
                        <div><p>ORACLE</p>
                            <p class="red_lg_text">{{oracle.oracleNum}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>备份策略</p>
                            <p class="green_sm_text">{{oracle.backupStrategy}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>成功</p>
                            <p class="green_sm_text">{{oracle.success}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>运行中</p>
                            <p class="orange_sm_text">{{oracle.running}}</p></div>
                    </el-col>
                    <el-col :span="6">
                        <div id="oracleChart" :style="{width: '100%', height: '120px'}"></div>
                    </el-col>
                </el-row>
                <el-row class="mssqlRow">
                    <el-col :span="6">
                        <div><p>MSSQL</p>
                            <p class="red_lg_text">{{mssql.mssqlNum}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>备份策略</p>
                            <p class="green_sm_text">{{mssql.backupStrategy}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>成功</p>
                            <p class="green_sm_text">{{mssql.success}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>运行中</p>
                            <p class="orange_sm_text">{{mssql.running}}</p></div>
                    </el-col>
                    <el-col :span="6">
                        <div id="mssqlChart" :style="{width: '100%', height: '120px'}"></div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="nasView">
            <PanelTitle>Nas性能监控</PanelTitle>
            <div class="panel smBody">
                <el-row class="nasRow">
                    <el-col :span="6">
                        <div><p>ORACLE</p>
                            <p class="red_lg_text">{{nas.oracleNum}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>备份策略</p>
                            <p class="green_sm_text">{{nas.backupStrategy}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>成功</p>
                            <p class="green_sm_text">{{nas.success}}</p></div>
                    </el-col>
                    <el-col :span="4">
                        <div><p>失败</p>
                            <p class="orange_sm_text">{{nas.failed}}</p></div>
                    </el-col>
                    <el-col :span="6">
                        <div id="nasChart" :style="{width: '100%', height: '120px'}"></div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Ability",
        data() {
            return {
                oracle: {
                    oracleNum: 0,
                    backupStrategy: 0,
                    success: 0,
                    running: 0,
                },
                mssql: {
                    mssqlNum: 0,
                    backupStrategy: 0,
                    success: 0,
                    running: 0,
                },
                nas: {
                    oracleNum: 0,
                    backupStrategy: 0,
                    success: 0,
                    failed: 0,
                },
            }
        },
        methods: {
            initData() {
                this.axios.get('/api/service/abilityWatch')
                    .then( (res) => {
                        if(res.status===200){
                            this.oracle.oracleNum = res.data.oracle.oracle;
                            this.oracle.backupStrategy = res.data.oracle.backup_strategy;
                            this.oracle.success = res.data.oracle.success;
                            this.oracle.running = res.data.oracle.running;

                            this.mssql.mssqlNum = res.data.mssql.mssql;
                            this.mssql.backupStrategy = res.data.mssql.backup_strategy;
                            this.mssql.success = res.data.mssql.success;
                            this.mssql.running = res.data.mssql.running;

                            this.nas.oracleNum = res.data.nas.oracle;
                            this.nas.backupStrategy = res.data.nas.backup_strategy;
                            this.nas.success = res.data.nas.success;
                            this.nas.failed = res.data.nas.failed;

                            this.drawPie("oracleChart", "运行中", this.oracle.running, this.oracle.success);
                            this.drawPie("mssqlChart", "运行中", this.mssql.running, this.mssql.success);
                            this.drawPie("nasChart", "失败", this.nas.failed, this.oracle.success);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            drawPie(chartName, dataName, otherData, successData) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById(chartName));
                let chartOption = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c}({d}%)",
                    },
                    legend: {
                        orient: "vertical",
                        x: "right",
                        data: [dataName, "成功"]
                    },
                    series: [{
                        name: '备份策略',
                        type: 'pie',
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            formatter: "{b}\n{d}%",
                            position: "center",
                            lineHeight: 20,
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "14",
                                    color: "#e75213"
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            },
                        },
                        data: [
                            {value: otherData, name: dataName, itemStyle: {color: "#ffb071"}},
                            {value: successData, name: "成功", itemStyle: {color: "#74d5ac"}},
                        ],
                    }]
                };
                // 绘制图表
                myChart.setOption(chartOption);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
        },
        mounted() {
            this.initData();
        },
    }
</script>

<style scoped>
    .overView {
        padding: 0 22px;
    }

    .panel {
        border-radius: 0 0 4px 4px;
        border: 1px solid #92c9ec;
        font-size: 14px;
        padding: 10px;
        color: #666666;
        text-align: center;
    }

    .panel p {
        margin: 16px 0;
    }

    .mdBody {
        height: 240px;
    }

    .smBody {
        height: 120px;
    }

    .nasView {
        margin-top: 10px;
    }

    .oracleRow {
        border-bottom: 1px solid #e8e8e8;
    }

    .red_lg_text {
        font-size: 36px;
        color: #e75213;
    }

    .green_sm_text {
        font-size: 20px;
        color: #5ac058;
    }

    .orange_sm_text {
        font-size: 20px;
        color: #f57938;
    }
</style>
