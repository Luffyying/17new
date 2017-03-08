<template>
    <div class="clock_time">
        <!-- <div class="clock_time_inner" v-html = "time"> -->
        <div class="clock_time_inner">
            <i>{{hour}}</i>
            <span>:</span>
            <i>{{minute}}</i>
            <span>:</span>
            <i>{{second}}</i>
        </div>
        <div class="clock_time_btn">
            <span @click = 'doClock' v-bind:id="clockId">开始计时</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //time: '',
                hour: '',
                minute: '',
                second: '',
                clockId: 'clock_time'
            }
        },
        mounted () {
            this.nowTime()
        },
        methods: {
            nowTime () {
                const t = new Date(),
                    h = t.getHours(),
                    m = t.getMinutes(),
                    s = t.getSeconds()
                //this.$data.time =  '<i>' + h +'</i><span>:</span><i>' + m +'</i><span>:</span><i>' + s + '</i>'
                this.$data.hour = h
                this.$data.minute = m
                this.$data.second = s

                setTimeout(() => {
                    this.nowTime()
                }, 1000)
            },
            doClock () {
                const nowTime = new Date()

                //状态
                this.$store.dispatch('changeStatus')
                //时长
                this.$store.dispatch('addDuration')
                //计时列表
                this.$store.dispatch('saveClockList', nowTime)
            }
        }
    }
</script>

