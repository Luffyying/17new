<template>
    <div class="clock_record">
        <div class="clock_record_nothing" v-if = "!list.length">没有记录</div>
        <div class="clock_record_item" v-else-if = "list.length > 0" v-for = "(item, index) in list">
            <div class="clock_record_name"><i>{{index + 1}}</i>{{ item.date }}</div>
            <div class="clock_record_desc">计时开始 {{ item.gotowork }}</div>
            <div class="clock_record_desc">计时结束 {{ item.gooffwork }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            list () {
                return this.$store.getters.switchTime
            }
        }
    }
</script>
