/**
 * URL重写
 * 如让 https://xxx.bspapp.com/http/router/aaa 指向云函数 template/db_api/pub/select
 * 
 
 https://696bea48-0666-46a5-a113-0e3fd17caa88.bspapp.com/
 
https://696bea48-0666-46a5-a113-0e3fd17caa88.bspapp.com/router/getRlpList
其中第一个router 为在控制台上的云函数或者路径名字，必须填写
后面的/getRlpList   getRlpList  是转发规则

https://696bea48-0666-46a5-a113-0e3fd17caa88.bspapp.com/router/getRpList

client/utils/pub/getRpTree
 */
module.exports = {
	"rule":{
		"^findById/(.+)": "template/db_api/pub/findById?_id=$1",
		"^aaa$": "template/db_api/pub/select",
		"^getRlpList$": "client/utils/pub/getRlpTree",
		"^getRpList$": "client/utils/pub/getRpTree"
	},
  "config":{
    // 当设置为true时，只有符合url重写规则内的云函数才可以被url化访问。
    "accessOnlyInRule":true
  }
};
