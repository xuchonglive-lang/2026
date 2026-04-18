<template>
  <view class="page-body">
    <!-- 仅显示列表查询，本模块一般不支持自定义添加和删除，底层预埋了白班/夜班 -->
    
    <vk-data-table
      ref="table1"
      size="small"
      :action="table1.action"
      :columns="table1.columns"
      :query-form-param="queryForm1"
      :right-btns="['update']"
      :selection="false"
      :row-no="true"
      :pagination="true"
      @update="updateBtn"
    ></vk-data-table>

    <!-- 编辑卡点时间的弹窗 -->
    <vk-data-dialog
      v-model="form1.props.show"
      :title="form1.props.title"
      width="450px"
      mode="form"
      :close-on-click-modal="false"
    >
      <vk-data-form
        v-model="form1.data"
        :rules="form1.props.rules"
        :action="form1.props.action"
        :form-type="form1.props.formType"
        :columns="form1.props.columns"
        label-width="120px"
        @success="
          form1.props.show = false;
          refresh();
        "
      ></vk-data-form>
    </vk-data-dialog>

  </view>
</template>

<script>
let that;
let vk = uni.vk;
let originalForms = {};

export default {
  data() {
    return {
      queryForm1: {
        formData: {},
        columns: []
      },
      table1: {
        // 由于没有针对这个表的独立 getList，但是其查询极为简单，这里临时利用基底查询。
        // （或者也可以手写，不过通常使用 vk.baseDao.selects 相关的自带通用口）
        // 若没有，暂时填一个通用路由请求。假设有 client 通用查询，这里填云函数的直连
        action: "admin/feedback/cron/setCronConfig", // 此为 update，列表我们依靠前端直查
        columns: [
          { key: "_id", title: "配置索引", type: "text", width: 220 },
          { key: "shift_type", title: "班次类型", type: "text", width: 150 },
          { key: "trigger_time", title: "每日触发卡点(HH:mm)", type: "text", width: 200 },
          { key: "update_time", title: "最近调整时间", type: "time", width: 200, valueFormat: "yyyy-MM-dd hh:mm:ss" }
        ],
        // 因这是一个特殊的设置表，我们重写其 action 加载方式
        action: (obj = {}) => {
            let { success, fail, complete } = obj;
            // 直接透传到底层抓取数据
            vk.callFunction({
                url: 'client/plugs/kh/getWeixinInfo', // 这里仅作示例，应当调用专门的查询功能
                name: 'vk-fun',
                data: {
                  action: "selects",
                  dbName: "key-point-cron-config"
                },
                success: (res) => {
					//由于防死亡转圈机制，严格遵守这里的回调！
					if (typeof success === "function") success({ rows: res.rows || [], total: res.rows ? res.rows.length : 0 });
                },
                fail: (err) => {
                    if (typeof fail === "function") fail(err);
                },
                complete: () => {
                    if (typeof complete === "function") complete();
                }
            });
        }
      },
      form1: {
        data: {},
        props: {
          action: "admin/feedback/cron/setCronConfig",
          columns: [
            { key: "shift_type", title: "班次", type: "text", disabled: true },
            { key: "trigger_time", title: "派发时点", type: "text", placeholder: "格式: HH:mm" }
          ],
          rules: {
            trigger_time: [{ required: true, message: "时点不能为空", trigger: "blur" }]
          },
          formType: "update",
          show: false,
          title: "调整自动派发时点"
        }
      }
    };
  },
  onLoad(options = {}) {
    that = this;
    vk = that.vk;
    that.init(options);
  },
  methods: {
    init(options) {
      originalForms["form1"] = vk.pubfn.copyObject(that.form1);
    },
    resetForm() {
      vk.pubfn.resetForm(originalForms, that);
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    updateBtn({ item }) {
      // 打开弹窗前硬注入防穿透
      that.form1.data = vk.pubfn.copyObject(item);
      that.form1.props.show = true;
    }
  }
};
</script>
