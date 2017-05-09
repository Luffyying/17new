<template>
   <app-header :title="title"></app-header>
   <div id="app">
     <list-box :list="list" :train_types="train_types"></list-box>
   </div>
</template>
<script>
  import AppHeader from './components/appHeader'
  import ListBox from './components/ListBox'
  export default{
    data(){
      return {
        title:'组件化',
        list:[],
        train_types:[
        {name:'全部车次',key:''},
        {name:'高铁',key:'g'},
        {name:'动车',key:'d'},
        {name:'绿皮',key:'l'}]
      }
    },
    components:{
      AppHeader,
      ListBox
    },

    ready(){
      fetch('/static/data.json')
        .then(res => res.json())
        .then(json =>{
          let train_types = {};
          let from_stations = {};
          this.list = json.map(it => {
            let train_type = it.train_number[0].toLowerCase() // 车次类型

            train_types[train_type] = 1; // 添加类型
            from_stations[it.from_station] = 1; // 添加出发站

            let data = {
              train_type: train_type, // 车次类型
              train_number: it.train_number, // 车次
              from_station: it.from_station, // 始发站
              to_station: it.to_station, // 终点站
              from_time: it.from_time, // 发车时间
              to_time: it.to_time, // 到达时间
              use_time: it.use_time, // 耗时
              ticket_number: 0, // 总票数
              min_price: 0, // 最低票价
              seats: [] // 座位类型及数量
            }

            let seat_type = {}

            it.seats.forEach(seat => { // 座位
              data.ticket_number += seat.seat_yupiao

              if (data.min_price === 0 || data.min_price > seat.seat_price) {
                data.min_price = seat.seat_price
              }

              let type = seat.seat_name.replace(/上中下/, '')
              if (!seat_type[type]) {
                seat_type[type] = parseInt(seat.seat_yupiao, 10)
              } else {
                seat_type[type] += parseInt(seat.seat_yupiao, 10)
              }
            })

            // 座位排序
            let seatSort = ['二等座', '一等座', '硬座', '硬卧', '软卧', '商务座', '无座', '动卧', '特等座', '软座']
            seatSort.forEach(el => {
              if (seat_type[el]) {
                data.seats.push({
                  name: el,
                  number: seat_type[el],
                })
              }
            });

            return data
          })

          Object.keys(from_stations).forEach(name => {
          this.from_stations.push({name: name, key: name})
          })
          })
    }
  }
</script>
<style>
  html,
body {
  margin: 0;
  padding: 0;
}

html {
  font: 400 14px/1.5 Arial, "Lucida Grande", Verdana, "Microsoft YaHei", hei;
}

body {
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  background-color: #efefef;
  overflow-x: hidden;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.fl {
  float: left;
}
.fr {
  float: right;
}

.icon-sort {
  position: relative;
  margin: 0 0 0 8px;
  border-top: 4px solid #c3c3c3;
  border-right: 4px solid #c3c3c3;
  border-bottom: 4px solid #c3c3c3;
  border-left: 4px solid #c3c3c3;
  bottom: 1px;
  display: inline-block;
   -webkit-transform: rotate(-225deg);
  transform: rotate(-225deg);
}
.icon-sort.up {
  display: inline-block;
   -webkit-transform: rotate(-225deg);
  transform: rotate(-225deg);
     border-bottom: 4px solid #02ad56;
  border-left: 4px solid #02ad56;
}

.icon-sort.down {
  display: inline-block;
   -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
     border-bottom: 4px solid #02ad56;
  border-left: 4px solid #02ad56;
}

.icon-sort::before {
  content: '';
  position: absolute;
  top: 0px;
  left: -8px;
  width: 18px;
  height: 2px;
  background-color: #fff;
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

.icon-circle {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid
}

.icon-sec {
  position: relative;
  top: -4px;
  display: inline-block;
  width: 8px;
  height: 8px;
  vertical-align: middle;
  border-left: 1px solid;
  border-bottom: 1px solid;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-left: 5px;
}
.active .icon-sec {
  top: 1px;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}

#app {
  padding: 86px 0 50px 0;
}
</style>