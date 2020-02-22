<template>
    <div class="viewBox">
        <PanelTitle>性能对比-C维度</PanelTitle>
        <PanelBody>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="ruleForm">
                <el-form-item label="实例名称：" class="mr-20" prop="resourceName">
                    <el-input v-model="formInline.resourceName" placeholder="请输入实例名称">
                    </el-input>
                </el-form-item>
                <el-form-item label="时间：" class="mr-20" prop="resourceTime">
                    <el-select v-model="formInline.resourceTime" placeholder="请选择时间" style="width: 140px;">
                        <el-option label="最近3小时" value="3"></el-option>
                        <el-option label="最近1天" value="24"></el-option>
                        <el-option label="最近3天" value="72"></el-option>
                        <el-option label="自定义" value="custom"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="自定义时间：" class="mr-20" prop="customTime" v-if="formInline.resourceTime==='custom'">
                    <el-date-picker
                            v-model="formInline.customTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getCharts">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="chooseItems">
                <span>指标选择：</span>
                <el-checkbox-group v-model="checkboxGroup" size="small" style="margin-top: 10px">
                    <el-checkbox label="chart1" border></el-checkbox>
                    <el-checkbox label="chart2" border></el-checkbox>
                    <el-checkbox label="chart3" border></el-checkbox>
                    <el-checkbox label="chart4" border></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="charts">
                <div id="chart1" v-show="checkboxGroup.indexOf('chart1')>=0"></div>
                <div id="chart2" v-show="checkboxGroup.indexOf('chart2')>=0"></div>
            </div>
            <div class="charts">
                <div id="chart3" v-show="checkboxGroup.indexOf('chart3')>=0"></div>
                <div id="chart4" v-show="checkboxGroup.indexOf('chart4')>=0"></div>
            </div>
        </PanelBody>
    </div>
</template>

<script>
    import PanelTitle from "../../components/PanelTitle";
    import PanelBody from '../../components/PanelBody';

    export default {
        name: "abilityCompareA",
        components: {
            PanelTitle,
            PanelBody,
        },
        data() {
            return {
                formInline: {
                    resourceName: "",
                    resourceTime: undefined,
                    customTime: undefined,
                },

                checkboxGroup: ["chart1", "chart2", "chart3", "chart4"],
                rules: {
                    resourceName: [
                        {required: true, message: '请输入实例名称', trigger: 'blur'},
                        {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
                    ],
                    resourceTime: [
                        {required: true, message: '请选择时间', trigger: 'change'}
                    ],
                },
                charts: {
                    ipos: {
                        title: "chart1",
                        legend: ["chart1Data"],
                        id: "ipos",
                        seriesData: [{
                            name: "chart1Data",
                            type: "line",
                            smooth: true,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#9ad6fc"},
                                        {offset: 0.5, color: "#a9eeec"},
                                        {offset: 1, color: "#ffffff"},
                                    ])
                                }
                            }, //填充区域样式
                            lineStyle: {
                                color: "#359bfc",
                                width: 1
                            }, //线条的样式
                            itemStyle: {
                                color: "#359bfc",
                                opacity: 1 //为0不会绘制图形拐点消失
                            },//拐点的样式
                            stack: 'chart1',
                            data: [],
                        }],
                    },
                    throughput: {
                        title: "chart2",
                        legend: ["chart2Data"],
                        id: "throughput",
                        xData: [],
                        seriesData: [{
                            name: "chart2Data",
                            type: "line",
                            smooth: true,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#dcd4fc"},
                                        {offset: 0.5, color: "#d9cdee"},
                                        {offset: 1, color: "#ffffff"},
                                    ])
                                }
                            }, //填充区域样式
                            lineStyle: {
                                color: "#c77bfc",
                                width: 1
                            }, //线条的样式
                            itemStyle: {
                                color: "#c77bfc",
                                opacity: 1 //为0不会绘制图形拐点消失
                            },//拐点的样式
                            stack: 'chart2',
                            data: [],
                        }],
                    },
                    write: {
                        title: "chart3",
                        legend: ["chart3Data"],
                        id: "write",
                        xData: [],
                        seriesData: [{
                            name: "chart3Data",
                            type: "line",
                            smooth: true,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: "#fcccea"},
                                        {offset: 0.5, color: "#eeb1d6"},
                                        {offset: 1, color: "#ffffff"},
                                    ])
                                }
                            }, //填充区域样式
                            lineStyle: {
                                color: "#fc78fc",
                                width: 1
                            }, //线条的样式
                            itemStyle: {
                                color: "#fc78fc",
                                opacity: 1 //为0不会绘制图形拐点消失
                            },//拐点的样式
                            stack: 'chart3',
                            data: [],
                        }],
                    },
                    CPU: {
                        title: "chart4",
                        legend: ["data1", "data2", "data3", "data4"],
                        id: "CPU",
                        seriesData: [
                            {
                                name: "data1",
                                type: "line",
                                smooth: true,
                                lineStyle: {
                                    color: "#fc78fc",
                                    width: 1
                                }, //线条的样式
                                itemStyle: {
                                    color: "#fc78fc",
                                    opacity: 1 //为0不会绘制图形拐点消失
                                },//拐点的样式
                                stack: 'data1',
                                data: [],
                            },
                            {
                                name: "data2",
                                type: "line",
                                smooth: true,
                                lineStyle: {
                                    color: "#359bfc",
                                    width: 1
                                }, //线条的样式
                                itemStyle: {
                                    color: "#359bfc",
                                    opacity: 1 //为0不会绘制图形拐点消失
                                },//拐点的样式
                                stack: 'data2',
                                data: [],
                            },
                            {
                                name: "data3",
                                type: "line",
                                smooth: true,
                                lineStyle: {
                                    color: "#c77bfc",
                                    width: 1
                                }, //线条的样式
                                itemStyle: {
                                    color: "#c77bfc",
                                    opacity: 1 //为0不会绘制图形拐点消失
                                },//拐点的样式
                                stack: 'data3',
                                data: [],
                            },
                            {
                                name: "data4",
                                type: "line",
                                smooth: true,
                                lineStyle: {
                                    color: "#fcc579",
                                    width: 1
                                }, //线条的样式
                                itemStyle: {
                                    color: "#fcc579",
                                    opacity: 1 //为0不会绘制图形拐点消失
                                },//拐点的样式
                                stack: 'data4',
                                data: [],
                            },
                        ],
                    },
                },
            }
        },
        mounted() {
            this.drawLine("chart1", this.charts.ipos.legend, this.charts.ipos.seriesData);
            this.drawLine("chart2", this.charts.throughput.legend, this.charts.throughput.seriesData);
            this.drawLine("chart3", this.charts.write.legend, this.charts.write.seriesData);
            this.drawLine("chart4", this.charts.CPU.legend, this.charts.CPU.seriesData);
        },
        methods: {
            getCharts() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.axios.get('/api/service/abilityCompare')
                            .then((res) => {
                                if (res.status === 200) {
                                    this.refreshData("chart1", res.data.chart1.data);
                                    this.refreshData("chart2", res.data.chart2.data);
                                    this.refreshData("chart3", res.data.chart3.data);
                                    this.refreshDataArray("chart4", res.data.chart4, 4);

                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            drawLine(chartID, legend, data) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById(chartID));
                let chartOption = {
                    title: {
                        text: chartID,
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: legend,
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: data,
                };
                // 绘制图表
                myChart.setOption(chartOption);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
            refreshData(chartID, data) {
                let myChart = this.$echarts.init(document.getElementById(chartID));
                let option = myChart.getOption();
                option.series[0].data = data;
                myChart.setOption(option);
            },
            refreshDataArray(chartID, data, numOfLines) {
                let myChart = this.$echarts.init(document.getElementById(chartID));
                let option = myChart.getOption();
                for (let i = 0; i < numOfLines; i++) {
                    option.series[i].data = data[`data${i + 1}`];
                }

                myChart.setOption(option);
            },
        }
    }
</script>

<style scoped>
    .charts {
        display: flex;
        margin-top: 14px;
    }

    .charts div {
        width: 50%;
        height: 300px;
    }
</style>
