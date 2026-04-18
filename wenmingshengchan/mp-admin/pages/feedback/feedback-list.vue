<template>
  <view class="page-body">
    <!-- 搜索部分 -->
    <vk-data-table-query
      v-model="queryForm1.formData"
      :columns="queryForm1.columns"
      @search="search"
      size="small"
    ></vk-data-table-query>

    <!-- 表格部分 -->
    <vk-data-table
      ref="table1"
      size="small"
      :action="table1.action"
      :columns="table1.columns"
      :query-form-param="queryForm1"
      :right-btns="['more']"
      :right-btns-more="table1.rightBtnsMore"
      :selection="true"
      :row-no="true"
      :pagination="true"
    ></vk-data-table>

    <!-- 督导核查/留痕的弹窗 -->
    <vk-data-dialog
      v-model="form1.props.show"
      :title="form1.props.title"
      width="500px"
      mode="form"
      :close-on-click-modal="false"
    >
      <vk-data-form
        v-model="form1.data"
        :rules="form1.props.rules"
        :action="form1.props.action"
        :form-type="form1.props.formType"
        :columns="form1.props.columns"
        label-width="100px"
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
        columns: [
          { key: "shift_date", title: "发生日期", type: "date", mode: "=" },
          { 
            key: "status", 
            title: "当前结案状态", 
            type: "select", 
            mode: "=",
            data: [
              { label: "待反馈[抢答中]", value: 0 },
              { label: "已顺利填报", value: 1 },
              { label: "发版流拍逾期", value: 2 }
            ]
          }
        ]
      },
      table1: {
        // 调用我们刚刚写好的 B端流水账专用下钻查询
        action: "admin/feedback/sys/getFeedbackList",
        columns: [
          { key: "point_info.name", title: "监控目标", type: "text", width: 140 },
          { key: "shift_date", title: "日限批次", type: "text", width: 110, sortable: true },
          { 
            key: "status", 
            title: "表态", 
            type: "tag", 
            width: 100,
            dict: { 
              0: { label: "挂牌抢险", type: "warning" }, 
              1: { label: "合规反馈", type: "success" }, 
              2: { label: "超期流拍", type: "danger" } 
            } 
          },
          { key: "submit_user_info.nickname", title: "承办人", type: "text", width: 100 },
          { 
            key: "main_image", 
            title: "核心勘测图", 
            type: "image", 
            width: 80 
          },
          { key: "photo_shoot_time", title: "[防伪]实际时空", type: "text", width: 160 },
          { key: "device_model", title: "[防伪]作图机型", type: "text", width: 130 },
          { key: "audit_user_info.nickname", title: "定责主管", type: "text", width: 100 },
          { key: "audit_mark", title: "违章定责事由", type: "text", width: 150 }
        ],
        // 右侧展开操作
        rightBtnsMore: [
          {
            title: "录入定责违章",
            onClick: function (item) {
              if (item.status === 0) {
                 vk.toast("尚未有人反馈，无法督导定责");
                 return;
              }
              that.auditBtn(item);
            }
          }
        ]
      },
      form1: {
        data: {},
        props: {
          action: "admin/feedback/sys/auditFeedback", // 调用后端的核查微服务
          columns: [
            { key: "point_name_fake", title: "稽查标的", type: "text", disabled: true },
            { 
               key: "main_image", 
               title: "留档底单", 
               type: "image", 
               disabled: true,
               placeholder: "照片勘样" 
            },
            { key: "photo_shoot_time", title: "鉴定日期", type: "text", disabled: true },
            { 
               key: "audit_mark", 
               title: "书面查处", 
               type: "textarea", 
               placeholder: "不改行原单形态（维持status），仅注入督办印记以供追溯",
               maxlength: 200
            }
          ],
          rules: {
            audit_mark: [{ required: true, message: "督查记号不能为空", trigger: "blur" }]
          },
          formType: "update",
          show: false,
          title: "定责与留痕督办"
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
    search() {
      that.$refs.table1.search();
    },
    refresh() {
      that.$refs.table1.refresh();
    },
    auditBtn(item) {
      that.vk.pubfn.resetForm(originalForms, that);
      that.form1.data = vk.pubfn.copyObject(item);
      that.form1.data.point_name_fake = item.point_info && item.point_info.name ? item.point_info.name : "未知重控点";
      that.form1.props.show = true;
    }
  }
};
</script>
