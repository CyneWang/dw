<template>
    <div>
        <div class="panel_title"><slot></slot></div>
    </div>
</template>

<script>
    export default {
        name: "PanelTitle"
    }
</script>

<style scoped>
.panel_title{
    background-color: #e1efff;
    border:1px solid #92c9ec;
    border-radius: 4px 4px 0 0;
    font-size: 14px;
    padding: 6px 10px;
    color: #3470bb;
}
</style>