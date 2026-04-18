<template>
	<view>
		
		<cu-custom bgColor="bg-gradual-orange" :isCustom="true">
			<block slot="backText">返回</block>
			<block slot="content">写实信息详情</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>{{grouting.rlp_string}} {{grouting.drill.drill_name}} 写实
			</view>
		</view>
    <view class="container">
      <view class="item" v-if="grouting.depth90_drill>0||grouting.depth90_drill_sao>0">
          <view class="title">探水钻进数据</view>
          <view class="content">
             <view class="row">
                 <view class="label">钻孔深度(m)</view>
                 <view class="value">{{grouting.depth90_drill}}</view>
             </view>
            <view class="row">
              <view class="label">扫孔深度(m)</view>
              <view class="value">{{grouting.depth90_drill_sao}}</view>
            </view>	
          </view>

      </view>


      <view class="item"  v-if="grouting.duanceng>0||grouting.chushui>0">
        <view class="title">断层及出水数据</view>
        <view class="content">
          <view class="row">
            <view class="label">断层深度(m)</view>
            <view class="value">{{grouting.duanceng}}</view>
          </view>
          <view class="row">
            <view class="label">出水深度(m)</view>
            <view class="value">{{grouting.chushui}}</view>
          </view>
        </view>



      </view>

      <view class="item" v-if="grouting.water_shift>0">
        <view class="title">涌水量</view>
        <view class="content">
          <view class="row">
            <view class="label">钻孔涌水量(m³/h)</view>
            <view class="value">{{grouting.water_shift}}</view>
          </view>
          
        </view>

      </view>
	  
	  
	  
	  <view class="item" v-if="grouting.cement_sdone>0||grouting.waterglass_sdone>0">
	    <view class="title">材料消耗数据</view>
	    <view class="content">
	      <view class="row">
	        <view class="label">水泥使用量(t)</view>
	        <view class="value">{{grouting.cement_sdone}}</view>
	      </view>
		  
		  <view class="row">
		    <view class="label">水玻璃使用量(t)</view>
		    <view class="value">{{grouting.waterglass_sdone}}</view>
		  </view>
	      
	    </view>
	  
	  </view>
	  
	  
	  
	  <view class="item" v-if="grouting.single_ratio">
	    <view class="title">单液浆注浆数据</view>
	    <view class="content">
	      <view class="row">
	        <view class="label">水灰比</view>
	        <view class="value">{{grouting.single_ratio}}</view>
	      </view>
	  		  
	  		 <!-- <view class="row">
	  		    <view class="label">水泥浆注入量(m³)</view>
	  		    <view class="value">{{grouting.single_amount}}</view>
	  		  </view> -->
	      
	    </view>
	  
	  </view>
	  
	  
	  <view class="item" v-if="grouting.double_ratio">
	    <view class="title">双液浆注浆数据</view>
	    <view class="content">
	      <view class="row">
	        <view class="label">水泥浆与水玻璃浆比</view>
	        <view class="value">{{grouting.double_ratio}}</view>
	      </view>
	  		  
	  		 <!-- <view class="row">
	  		    <view class="label">水玻璃注入量(t)</view>
	  		    <view class="value">{{grouting.double_wgamount}}</view>
	  		  </view>
			  
			  <view class="row">
			    <view class="label">双浆液注入量(m³)</view>
			    <view class="value">{{grouting.double_dwamount}}</view>
			  </view> -->
	      
	    </view>
	  
	  </view>
	  
	  
	  <view class="item" v-if="grouting.pressure_end>0">
	    <view class="title">注浆压力</view>
	    <view class="content">
	      <!-- <view class="row">
	        <view class="label">接班压力(Mpa)</view>
	        <view class="value">{{grouting.pressure_start}}</view>
	      </view> -->
	  		  
	  		  <view class="row">
	  		    <view class="label">交班压力(Mpa)</view>
	  		    <view class="value">{{grouting.pressure_end}}</view>
	  		  </view>
	      
	    </view>
	  
	  </view>
	  
	  <view class="item" v-if="grouting.remark">
	    <view class="title">现场情况说明</view>
	    <view class="content">
			<u-parse :html="grouting.remark"></u-parse>
	   
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
				grouting: {},
			}
		},
		onLoad(options) {
			that = this;
			vk = that.vk;
			this.id = options.id
			this.getgroutingById(options.id)		
		},
		
		methods: {		
			getgroutingById(id) {
				// 回调形式 success fail complete
				vk.callFunction({
				  url: 'client/user/kh/common/getGroutingById',
				  title:'请求中...',
				  data:{
				    _id:id
				  },
				  success:function(data){
				    console.log("得到的数据",data.item);
					that.grouting=data.item
					// 对文本进行转义
					that.grouting.remark=unescape(data.item.remark)
				  }
				});
				
				
			}
			
		}
	}
</script>


<style lang="scss">
@import "./groutingDetail.scss";
</style>

