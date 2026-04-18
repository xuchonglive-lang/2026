<template>
	<view>
		
		<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">写实信息详情</block>
		</cu-custom>
    <view class="container">
      <view class="item">
          <view class="title">进场材料信息</view>
          <view class="content">
             <view class="row">
                 <view class="label">材料类型</view>
                 <view class="value">{{entryofmaterial.material_name}}</view>
             </view>
            <view class="row">
              <view class="label">进场数量(t)</view>
              <view class="value">{{entryofmaterial.num}}</view>
            </view>
			<view class="row">
			  <view class="label">进场日期</view>
			  <view class="value">{{entryofmaterial.e_date}} {{entryofmaterial.shift}}</view>
			</view>
          </view>

      </view>


      <view class="item">
        <view class="title">材料使用信息</view>
        <view class="content">
          <view class="row">
            <view class="label">使用单位</view>
            <view class="value">{{entryofmaterial.team_name}}</view>
          </view>
          <view class="row">
            <view class="label">进场井名</view>
            <view class="value">{{entryofmaterial.rock_name}}</view>
          </view>
        </view>



      </view>

      <view class="item">
        <view class="title">写实信息</view>
        <view class="content">
          <view class="row">
            <view class="label">写实人</view>
            <view class="value">{{entryofmaterial.realName}}</view>
          </view>
          <view class="row">
            <view class="label">写实时间</view>
              <view class="value">{{entryofmaterial.e_date}} {{entryofmaterial.shift}}</view>
          </view>
        </view>

      </view>
	  
	  
	  <view class="item">
	    <view class="title">现场情况说明</view>
	    <view class="content">
			<u-parse :html="entryofmaterial.remark"></u-parse>
	   
	    </view>
	  
	  </view>


    </view>




	</view>
</template>

<script>
	var that;		// 当前页面对象
	var vk;			// vk依赖
	
	export default {
	
		filters:{
			 slice(item) {
				 if(item){
					  return item.slice(0,16)
				 } else{
					return '' 
				 }
			   
			 },
		},
		data() {
			return {
				
				id: '',
				entryofmaterial: {},
			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
			this.id = options.id
			this.getentryofmaterialById(options.id)		
		},
		
		methods: {		
			getentryofmaterialById(id) {
				// 回调形式 success fail complete
				vk.callFunction({
				  url: 'client/user/kh/common/getEntryofmaterialById',
				  title:'请求中...',
				  data:{
				    _id:id
				  },
				  success:function(data){
				    console.log("得到的数据",data.item);
					that.entryofmaterial=data.item
					// 对文本进行转义
					that.entryofmaterial.remark=unescape(data.item.remark)
				  }
				});
				
				
			}
			
		}
	}
</script>


<style lang="scss">
@import "./entryofmaterialDetail.scss";
</style>

