<template>
    <div>
        <div class="panel_body"><slot></slot></div>
    </div>
</template>

<script>
    export default {
        name: "PanelBody"
    }
</script>

<style scoped>
.panel_body{
    border-radius: 0 0 4px 4px;
    border:1px solid #92c9ec;
    font-size: 14px;
    padding: 10px;
    min-height: 386px;
}
</style>