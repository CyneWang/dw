<template>
    <div>
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import Navbar from "../views/Tools/navbar";
    export default {
        name: 'home',
        components:{
            Navbar,
        },
    }
</script>
