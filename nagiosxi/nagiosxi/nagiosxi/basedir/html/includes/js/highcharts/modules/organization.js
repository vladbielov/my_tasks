/*
 Highcharts JS v7.2.1 (2019-10-31)
 Organization chart series type

 (c) 2019-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/organization",["highcharts","highcharts/modules/sankey"],function(e){b(e);b.Highcharts=e;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function e(b,e,n,h){b.hasOwnProperty(e)||(b[e]=h.apply(null,n))}b=b?b._modules:{};e(b,"modules/organization.src.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,e){var n=
e.pick,h=b.seriesTypes.sankey.prototype;b.seriesType("organization","sankey",{borderColor:"#666666",borderRadius:3,linkRadius:10,borderWidth:1,dataLabels:{nodeFormatter:function(){function a(a){return Object.keys(a).reduce(function(c,d){return c+d+":"+a[d]+";"},'style="')+'"'}var c={width:"100%",height:"100%",display:"flex","flex-direction":"row","align-items":"center","justify-content":"center"},g={"max-height":"100%","border-radius":"50%"},d={width:"100%",padding:0,"text-align":"center","white-space":"normal"},
b={margin:0},f={margin:0},k={opacity:.75,margin:"5px"};this.point.image&&(g["max-width"]="30%",d.width="70%");this.series.chart.renderer.forExport&&(c.display="block",d.position="absolute",d.left=this.point.image?"30%":0,d.top=0);c="<div "+a(c)+">";this.point.image&&(c+='<img src="'+this.point.image+'" '+a(g)+">");c+="<div "+a(d)+">";this.point.name&&(c+="<h4 "+a(b)+">"+this.point.name+"</h4>");this.point.title&&(c+="<p "+a(f)+">"+(this.point.title||"")+"</p>");this.point.description&&(c+="<p "+a(k)+
">"+this.point.description+"</p>");return c+"</div></div>"},style:{fontWeight:"normal",fontSize:"13px"},useHTML:!0},hangingIndent:20,linkColor:"#666666",linkLineWidth:1,nodeWidth:50,tooltip:{nodeFormat:"{point.name}<br>{point.title}<br>{point.description}"}},{pointAttribs:function(a,c){var g=this,d=h.pointAttribs.call(g,a,c),b=g.mapOptionsToLevel[(a.isNode?a.level:a.fromNode.level)||0]||{},f=a.options,k=b.states&&b.states[c]||{};c=["borderRadius","linkColor","linkLineWidth"].reduce(function(a,c){a[c]=
n(k[c],f[c],b[c],g.options[c]);return a},{});a.isNode?c.borderRadius&&(d.r=c.borderRadius):(d.stroke=c.linkColor,d["stroke-width"]=c.linkLineWidth,delete d.fill);return d},createNode:function(a){a=h.createNode.call(this,a);a.getSum=function(){return 1};return a},createNodeColumn:function(){var a=h.createNodeColumn.call(this);b.wrap(a,"offset",function(a,g,d){a=a.call(this,g,d);return g.hangsFrom?{absoluteTop:g.hangsFrom.nodeY}:a});return a},translateNode:function(a,c){h.translateNode.call(this,a,
c);a.hangsFrom&&(a.shapeArgs.height-=this.options.hangingIndent,this.chart.inverted||(a.shapeArgs.y+=this.options.hangingIndent));a.nodeHeight=this.chart.inverted?a.shapeArgs.width:a.shapeArgs.height},curvedPath:function(a,c){var g=[],d;for(d=0;d<a.length;d++){var b=a[d][0];var f=a[d][1];if(0===d)g.push("M",b,f);else if(d===a.length-1)g.push("L",b,f);else if(c){var k=a[d-1][0];var e=a[d-1][1];var h=a[d+1][0];var l=a[d+1][1];if(k!==h&&e!==l){var m=k<h?1:-1;var p=e<l?1:-1;g.push("L",b-m*Math.min(Math.abs(b-
k),c),f-p*Math.min(Math.abs(f-e),c),"C",b,f,b,f,b+m*Math.min(Math.abs(b-h),c),f+p*Math.min(Math.abs(f-l),c))}}else g.push("L",b,f)}return g},translateLink:function(a){var c=a.fromNode,b=a.toNode,d=Math.round(this.options.linkLineWidth)%2/2,e=Math.floor(c.shapeArgs.x+c.shapeArgs.width)+d,f=Math.floor(c.shapeArgs.y+c.shapeArgs.height/2)+d,k=Math.floor(b.shapeArgs.x)+d,h=Math.floor(b.shapeArgs.y+b.shapeArgs.height/2)+d,n=this.options.hangingIndent;var l=b.options.offset;var m=/%$/.test(l)&&parseInt(l,
10),p=this.chart.inverted;p&&(e-=c.shapeArgs.width,k+=b.shapeArgs.width);l=Math.floor(k+(p?1:-1)*(this.colDistance-this.nodeWidth)/2)+d;m&&(50<=m||-50>=m)&&(l=k=Math.floor(k+(p?-.5:.5)*b.shapeArgs.width)+d,h=b.shapeArgs.y,0<m&&(h+=b.shapeArgs.height));b.hangsFrom===c&&(this.chart.inverted?(f=Math.floor(c.shapeArgs.y+c.shapeArgs.height-n/2)+d,h=b.shapeArgs.y+b.shapeArgs.height):f=Math.floor(c.shapeArgs.y+n/2)+d,l=k=Math.floor(b.shapeArgs.x+b.shapeArgs.width/2)+d);a.plotY=1;a.shapeType="path";a.shapeArgs=
{d:this.curvedPath([[e,f],[l,f],[l,h],[k,h]],this.options.linkRadius)}},alignDataLabel:function(a,c,g){if(g.useHTML){var d=a.shapeArgs.width,e=a.shapeArgs.height,f=this.options.borderWidth+2*this.options.dataLabels.padding;this.chart.inverted&&(d=e,e=a.shapeArgs.width);e-=f;d-=f;b.css(c.text.element.parentNode,{width:d+"px",height:e+"px"});b.css(c.text.element,{left:0,top:0,width:"100%",height:"100%",overflow:"hidden"});c.getBBox=function(){return{width:d,height:e}}}b.seriesTypes.column.prototype.alignDataLabel.apply(this,
arguments)}});""});e(b,"masters/modules/organization.src.js",[],function(){})});