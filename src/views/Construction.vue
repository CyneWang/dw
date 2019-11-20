<template>
    <div>
        <div class="bac"></div>
        <div class="constructTip">页面建设中，敬请期待</div>
    </div>
</template>

<script>
    export default {
        name: "Construction"
    }
</script>

<style scoped>
    .bac {
        background-image: url("../assets/img/construction.png");
        width: 160px;
        height: 132px;
        position: absolute;
        top: 166px;
        left: 50%;
        margin-left: -80px;
    }

    .constructTip {
        position: absolute;
        top: 312px;
        left: 50%;
        margin-left: -84px;
        color: gray;
    }
</style>