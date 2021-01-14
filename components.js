
//  <my-select :options="bms" v-model="bm" :showsearch="true" :showicon="true" :multiple="true" @change="selectBM"></my-select>
//  options:下拉选择列表，普通数组或者[{label:any,value:any}]型的数组皆可
//  v-model:绑定的数据
//  showsearch:是否显示搜索框，默认不显示
//  showicon:是否显示最右侧的箭头，默认不显示
//  multiple:是否多选，默认否
//  @change:数据change触发的事件
Vue.component('my-select', {
    data: function () {
        return {
            showSelect: false,
            searchTxt: '',
            optionsShow: [],
            valueList: [],
            valueShow: null,
            valueOld: '',
            valueListOld: []
        }
    },
    props: {
        value: {
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        showsearch: {
            type: Boolean,
            default: false
        },
        showicon: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        searchTxt: function () {
            if (this.showSelect) {
                this.optionsShow = this.options.filter(c => c.indexOf(this.searchTxt) > -1);
            }
        }
    },
    methods: {
        open: function () {
            this.optionsShow = this.options;
            this.showSelect = true;
            this.valueList = [];
            this.valueOld = this.value;
            this.valueListOld = [];
            if (this.multiple) {
                if (this.value && this.value !== '') {
                    this.options.forEach(element => {
                        if (element.value) {
                            if (this.value.indexOf(element.value) > -1) {
                                this.valueList.push(element);
                                this.valueListOld.push(element);
                            }
                        } else {
                            if (this.value.indexOf(element) > -1) {
                                this.valueList.push(element);
                                this.valueListOld.push(element);
                            }
                        }
                    });
                }
            }
        },
        selectItem: function (item) {
            if (!this.multiple) {
                this.$emit('input', item.value ? item.value : item);
                this.$emit('change');
                this.valueShow = item.label ? item.label : item;
                this.showSelect = false;
            } else if (this.multiple) {
                if (item.value) {
                    if (!this.valueList.find(c => c.value == item.value)) {
                        this.valueList.push(item);
                        this.$emit('input', this.valueList.map(c => c.value).join(","));
                    } else {
                        this.valueList = this.valueList.filter(c => c.value !== item.value);
                        this.$emit('input', this.valueList.map(c => c.value).join(","));
                    }
                } else {
                    if (this.valueList.indexOf(item) == -1) {
                        this.valueList.push(item);
                        this.$emit('input', this.valueList.join(","));
                    } else {
                        this.valueList = this.valueList.filter(c => c !== item);
                        this.$emit('input', this.valueList.join(","));
                    }
                }
            }

        },
        ok: function () {
            this.valueShow = '';
            if (this.valueList.length > 0) {
                if (this.valueList[0].value) {
                    this.valueShow = this.valueList.map(c => c.label).join(",");
                } else {
                    this.valueShow = this.valueList.join(",");
                }
            }
            this.showSelect = false;
            this.$emit('change');
        },
        cancel: function () {
            this.$emit('input', this.valueOld);
            this.valueShow = '';
            if (this.valueListOld.length > 0) {
                if (this.valueListOld[0].value) {
                    this.valueShow = this.valueListOld.map(c => c.label).join(",");
                } else {
                    this.valueShow = this.valueListOld.join(",");
                }
            }
            this.showSelect = false;
        },
        clickoverlay: function () {
            this.$emit('input', this.valueOld);
            if (this.multiple) {
                this.valueShow = '';
                if (this.valueListOld.length > 0) {
                    if (this.valueListOld[0].value) {
                        this.valueShow = this.valueListOld.map(c => c.label).join(",");
                    } else {
                        this.valueShow = this.valueListOld.join(",");
                    }
                }
            } else {
                this.valueShow = this.valueOld;
            }
            this.showSelect = false;
        }
    },
    template: `
       <div>
         <input style="width:0;height:0;position: absolute;opacity: 0;z-index: -100;" v-bind:value="value" readonly>
         <input class="selectInput" v-bind:class="{ showIcon:showicon }" v-model="valueShow" readonly placeholder="请选择" @click="open()">
         <span v-if="showicon" style="color:rgb(209, 209, 209)" class="iconfont icon-right"></span>
         <van-popup v-model="showSelect" position="bottom" :close-on-click-overlay="false" @click-overlay="clickoverlay">
           <div class="searchbar" v-if="showsearch">
             <van-field v-model="searchTxt" left-icon="search" placeholder="请输入搜索名称搜索" />
           </div>
           <div class="selectlist">
             <van-list v-if="!multiple">
               <p v-for="item in optionsShow" class="s_list" v-bind:class="{selectcheck:(item.value==value||item==value)}" @click="selectItem(item)">
                 {{item.label?item.label:item}}
               </p>
             </van-list>
             <van-list v-if="multiple">
               <p v-for="item in optionsShow" class="s_list" 
                  v-bind:class="{selectcheck:(value.indexOf(item)>-1||value.indexOf(item.value)>-1)}" 
                  @click="selectItem(item)"
                >
                 {{item.label?item.label:item}}
               </p>
             </van-list>
           </div>
           <div class="selectBtn" v-if="multiple" @click="ok()">
             <span>确&nbsp;&nbsp;&nbsp;&nbsp;认</span>
           </div>
           <div class="selectBtn cancel" v-if="multiple" @click="cancel()">
             <span>取&nbsp;&nbsp;&nbsp;&nbsp;消</span>
           </div>
        </van-popup>
       </div>
     `
})


Vue.component('my-date', {
    data: function () {
        return {
            showTime: false,
            valueOld: ''
        }
    },
    props: {
        value: {
            required: true
        },
        showicon: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'datetime'
        }
    },
    methods: {
        open: function () {
            this.valueOld = this.value;
            this.showTime = true;
        },
        onConfirmTime: function (val) {
            var t = '';
            if (this.type == 'time') {
                t = val;
            } else {
                let year = val.getFullYear();
                let month = val.getMonth() + 1;
                let day = val.getDate();
                let hour = val.getHours();
                let minute = val.getMinutes();
                if (month >= 1 && month <= 9) { month = `0${month}` };
                if (day >= 1 && day <= 9) { day = `0${day}` };
                if (hour >= 0 && hour <= 9) { hour = `0${hour}` };
                if (minute >= 0 && minute <= 9) { minute = `0${minute}` };
                if (this.type == 'date') {
                    t = year + '-' + month + '-' + day;
                } else if (this.type == 'datetime') {
                    t = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                }
            }

            this.$emit('input', t);
            this.$emit('change');
            this.showTime = false;
        },
        cancel: function () {
            this.$emit('input', this.valueOld);
            this.showTime = false;
        }
    },
    template: `
       <div>
         <input class="selectInput" v-bind:class="{ showIcon:showicon }" v-bind:value="value" readonly placeholder="请选择时间" @click="open()">
         <span v-if="showicon" style="font-size:24px;color:rgb(28, 132, 227)" class="iconfont icon-rili"></span>
         <van-popup v-model="showTime" position="bottom" :close-on-click-overlay="false" @click-overlay="cancel">
            <van-datetime-picker :type="type" @confirm="onConfirmTime" @cancel="cancel" />
         </van-popup>
       </div>
     `
})