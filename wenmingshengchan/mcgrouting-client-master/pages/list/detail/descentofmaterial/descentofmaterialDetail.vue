<template>
	<view>
		
		<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">写实信息详情</block>
		</cu-custom>
    <view class="container">
      <view class="item">
          <view class="title">下井材料信息</view>
          <view class="content">
             <view class="row">
                 <view class="label">材料类型</view>
                 <view class="value">{{descentofmaterial.material_name}}</view>
             </view>
            <view class="row">
              <view class="label">下井数量(t)</view>
              <view class="value">{{descentofmaterial.num}}</view>
            </view>
			<view class="row">
			  <view class="label">下井日期</view>
			  <view class="value">{{descentofmaterial.d_date}} {{descentofmaterial.shift}}</view>
			</view>
          </view>

      </view>


      <view class="item">
        <view class="title">材料使用信息</view>
        <view class="content">
          <view class="row">
            <view class="label">使用单位</view>
            <view class="value">{{descentofmaterial.team_name}}</view>
          </view>
          <view class="row">
            <view class="label">下放点位</view>
            <view class="value">{{descentofmaterial.point_name}}</view>
          </view>
        </view>



      </view>

      <view class="item">
        <view class="title">写实信息</view>
        <view class="content">
          <view class="row">
            <view class="label">写实人</view>
            <view class="value">{{descentofmaterial.realName}}</view>
          </view>
          <view class="row">
            <view class="label">写实时间</view>
              <view class="value">{{descentofmaterial.d_date}} {{descentofmaterial.shift}}</view>
          </view>
        </view>

      </view>
	  
	  
	  <view class="item">
	    <view class="title">现场情况说明</view>
	    <view class="content">
			<u-parse :html="descentofmaterial.remark"></u-parse>
	   
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
				descentofmaterial: {},
			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
			this.id = options.id
			this.getDescentofmaterialById(options.id)		
		},
		
		methods: {		
			getDescentofmaterialById(id) {
				// 回调形式 success fail complete
				vk.callFunction({
				  url: 'client/user/kh/common/getDescentofmaterialById',
				  title:'请求中...',
				  data:{
				    _id:id
				  },
				  success:function(data){
				    console.log("得到的数据",data.item);
					that.descentofmaterial=data.item
					// 对文本进行转义
					that.descentofmaterial.remark=unescape(data.item.remark)
				  }
				});
				
				
			}
			
		}
	}
</script>


<style lang="scss">
@import "./descentofmaterialDetail.scss";
</style>

