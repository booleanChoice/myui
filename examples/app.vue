<style lang="less">
    @import "../src/styles/index.less";
</style>
<style scoped>
    nav { margin-bottom: 40px; }
    ul { display: flex; flex-wrap: wrap; }
    li { display: inline-block; }
    li + li { border-left: solid 1px #bbb; padding-left: 10px; margin-left: 10px; }
    .container{ padding: 10px 40px; }
    .v-link-active { color: #bbb; }
</style>
<template>
    <div class="container">
        <nav>
            <ul>
                <li><router-link to="/button">Button</router-link></li>
                <li><router-link to="/input">Input</router-link></li>
                <li><router-link to="/loading-bar">loading-bar</router-link></li>
                <li><router-link to="/message">message</router-link></li>
                <li><router-link to="/notice">notice</router-link></li>
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        mounted: function() {

        },
        beforeDestroy: function() {

        },
        methods: {

        }
    }
</script>
