<template>
    <div class="viewBox">
        <PanelTitle>服务查询-性能</PanelTitle>
        <PanelBody>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="服务：" class="mr-20">
                    <el-select v-model="formInline.service" placeholder="请选择服务名称">
                        <el-option label="A服务" value="servA"></el-option>
                        <el-option label="B服务" value="servB"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="维度：" class="mr-20">
                    <el-select v-model="formInline.users" placeholder="请选择维度">
                        <el-option label="A维度" value="deviA"></el-option>
                        <el-option label="B维度" value="deviB"></el-option>
                        <el-option label="C维度" value="deviC"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间范围：" class="mr-20">
                    <el-date-picker
                            v-model="formInline.times"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                </el-form-item>
            </el-form>
            <p v-if="formInline.tip" class="tip">{{formInline.tip}}</p>
            <div id="disabilityChart" :style="{width: '100%', height: '360px'}"></div>
        </PanelBody>
    </div>
</template>

<script>
    import PanelTitle from "../../components/PanelTitle";
    import PanelBody from '../../components/PanelBody';

    export default {
        name: "Disability",
        components: {PanelTitle, PanelBody},
        data() {
            return {
                true:true,
                formInline: {
                    service: '',
                    users: '',
                    times: '',
                    tip:'',
                },
                chartDataX: [],
                chartDataY: [0],
            }
        },
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('disabilityChart'));
                let chartOption = {
                    title: {
                        text: '服务性能',
                        textStyle:{
                            fontSize:14
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        data: this.chartDataX,
                    },
                    yAxis: {},
                    series: [{
                        name: '性能分数',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: "#9ad6fc" },
                                    { offset: 0.5, color: "#a9eeec" },
                                    { offset: 1, color: "#ffffff" },
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
                        } ,//拐点的样式
                        data: this.chartDataY,
                    }]
                };
                // 绘制图表
                myChart.setOption(chartOption);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
            },
            getData() {
                if(this.formInline.service!==''&&this.formInline.times!==''&&this.formInline.users!==''){
                    this.formInline.tip='';
                    this.axios.get('/api/disability/charts/')
                        .then((res)=> {
                            this.chartDataX = res.data.data.mtime;
                            this.chartDataY = res.data.data.score;
                            this.drawLine();
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }else{
                    this.formInline.tip='请填入完成的查询条件';
                }
            }
        },
    }
</script>

<style scoped>

</style>