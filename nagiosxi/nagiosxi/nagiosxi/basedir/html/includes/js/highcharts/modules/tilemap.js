/*
 Highmaps JS v7.2.1 (2019-10-31)

 Tilemap module

 (c) 2010-2019 Highsoft AS

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?(d["default"]=d,module.exports=d):"function"===typeof define&&define.amd?define("highcharts/modules/tilemap",["highcharts","highcharts/modules/map"],function(e){d(e);d.Highcharts=e;return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){function e(n,d,e,v){n.hasOwnProperty(d)||(n[d]=v.apply(null,e))}d=d?d._modules:{};e(d,"modules/tilemap.src.js",[d["parts/Globals.js"],d["parts/Utilities.js"]],function(d,e){var n=e.extend,
v=e.pick;e=d.seriesType;var g=function(a,b,c){return Math.min(Math.max(b,a),c)},x=function(a,b,c){a=a.options;return{xPad:(a.colsize||1)/-b,yPad:(a.rowsize||1)/-c}};d.tileShapeTypes={hexagon:{alignDataLabel:d.seriesTypes.scatter.prototype.alignDataLabel,getSeriesPadding:function(a){return x(a,3,2)},haloPath:function(a){if(!a)return[];var b=this.tileEdges;return["M",b.x2-a,b.y1+a,"L",b.x3+a,b.y1+a,b.x4+1.5*a,b.y2,b.x3+a,b.y3-a,b.x2-a,b.y3-a,b.x1-1.5*a,b.y2,"Z"]},translate:function(){var a=this.options,
b=this.xAxis,c=this.yAxis,d=a.pointPadding||0,w=(a.colsize||1)/3,e=(a.rowsize||1)/2,m;this.generatePoints();this.points.forEach(function(a){var t=g(Math.floor(b.len-b.translate(a.x-2*w,0,1,0,1)),-b.len,2*b.len),h=g(Math.floor(b.len-b.translate(a.x-w,0,1,0,1)),-b.len,2*b.len),q=g(Math.floor(b.len-b.translate(a.x+w,0,1,0,1)),-b.len,2*b.len),u=g(Math.floor(b.len-b.translate(a.x+2*w,0,1,0,1)),-b.len,2*b.len),r=g(Math.floor(c.translate(a.y-e,0,1,0,1)),-c.len,2*c.len),f=g(Math.floor(c.translate(a.y,0,1,
0,1)),-c.len,2*c.len),k=g(Math.floor(c.translate(a.y+e,0,1,0,1)),-c.len,2*c.len),l=v(a.pointPadding,d),p=l*Math.abs(h-t)/Math.abs(k-f);p=b.reversed?-p:p;var n=b.reversed?-l:l;l=c.reversed?-l:l;a.x%2&&(m=m||Math.round(Math.abs(k-r)/2)*(c.reversed?-1:1),r+=m,f+=m,k+=m);a.plotX=a.clientX=(h+q)/2;a.plotY=f;t+=p+n;h+=n;q-=n;u-=p+n;r-=l;k+=l;a.tileEdges={x1:t,x2:h,x3:q,x4:u,y1:r,y2:f,y3:k};a.shapeType="path";a.shapeArgs={d:["M",h,r,"L",q,r,u,f,q,k,h,k,t,f,"Z"]}});this.translateColors()}},diamond:{alignDataLabel:d.seriesTypes.scatter.prototype.alignDataLabel,
getSeriesPadding:function(a){return x(a,2,2)},haloPath:function(a){if(!a)return[];var b=this.tileEdges;return["M",b.x2,b.y1+a,"L",b.x3+a,b.y2,b.x2,b.y3-a,b.x1-a,b.y2,"Z"]},translate:function(){var a=this.options,b=this.xAxis,c=this.yAxis,d=a.pointPadding||0,e=a.colsize||1,n=(a.rowsize||1)/2,m;this.generatePoints();this.points.forEach(function(a){var p=g(Math.round(b.len-b.translate(a.x-e,0,1,0,0)),-b.len,2*b.len),h=g(Math.round(b.len-b.translate(a.x,0,1,0,0)),-b.len,2*b.len),q=g(Math.round(b.len-
b.translate(a.x+e,0,1,0,0)),-b.len,2*b.len),u=g(Math.round(c.translate(a.y-n,0,1,0,0)),-c.len,2*c.len),r=g(Math.round(c.translate(a.y,0,1,0,0)),-c.len,2*c.len),f=g(Math.round(c.translate(a.y+n,0,1,0,0)),-c.len,2*c.len),k=v(a.pointPadding,d),l=k*Math.abs(h-p)/Math.abs(f-r);l=b.reversed?-l:l;k=c.reversed?-k:k;a.x%2&&(m=Math.abs(f-u)/2*(c.reversed?-1:1),u+=m,r+=m,f+=m);a.plotX=a.clientX=h;a.plotY=r;p+=l;q-=l;u-=k;f+=k;a.tileEdges={x1:p,x2:h,x3:q,y1:u,y2:r,y3:f};a.shapeType="path";a.shapeArgs={d:["M",
h,u,"L",q,r,h,f,p,r,"Z"]}});this.translateColors()}},circle:{alignDataLabel:d.seriesTypes.scatter.prototype.alignDataLabel,getSeriesPadding:function(a){return x(a,2,2)},haloPath:function(a){return d.seriesTypes.scatter.prototype.pointClass.prototype.haloPath.call(this,a+(a&&this.radius))},translate:function(){var a=this.options,b=this.xAxis,c=this.yAxis,d=a.pointPadding||0,e=(a.rowsize||1)/2,n=a.colsize||1,m,t,v,h,q=!1;this.generatePoints();this.points.forEach(function(a){var p=g(Math.round(b.len-
b.translate(a.x,0,1,0,0)),-b.len,2*b.len),f=g(Math.round(c.translate(a.y,0,1,0,0)),-c.len,2*c.len),k=d,l=!1;void 0!==a.pointPadding&&(k=a.pointPadding,q=l=!0);if(!h||q)m=Math.abs(g(Math.floor(b.len-b.translate(a.x+n,0,1,0,0)),-b.len,2*b.len)-p),t=Math.abs(g(Math.floor(c.translate(a.y+e,0,1,0,0)),-c.len,2*c.len)-f),v=Math.floor(Math.sqrt(m*m+t*t)/2),h=Math.min(m,v,t)-k,q&&!l&&(q=!1);a.x%2&&(f+=t*(c.reversed?-1:1));a.plotX=a.clientX=p;a.plotY=f;a.radius=h;a.shapeType="circle";a.shapeArgs={x:p,y:f,r:h}});
this.translateColors()}},square:{alignDataLabel:d.seriesTypes.heatmap.prototype.alignDataLabel,translate:d.seriesTypes.heatmap.prototype.translate,getSeriesPadding:function(){},haloPath:d.seriesTypes.heatmap.prototype.pointClass.prototype.haloPath}};d.addEvent(d.Axis,"afterSetAxisTranslation",function(){if(!this.recomputingForTilemap&&"colorAxis"!==this.coll){var a=this,b=a.series.map(function(b){return b.getSeriesPixelPadding&&b.getSeriesPixelPadding(a)}).reduce(function(a,b){return(a&&a.padding)>
(b&&b.padding)?a:b},void 0)||{padding:0,axisLengthFactor:1},c=Math.round(b.padding*b.axisLengthFactor);b.padding&&(a.len-=c,a.recomputingForTilemap=!0,a.setAxisTranslation(),delete a.recomputingForTilemap,a.minPixelPadding+=b.padding,a.len+=c)}});e("tilemap","heatmap",{states:{hover:{halo:{enabled:!0,size:2,opacity:.5,attributes:{zIndex:3}}}},pointPadding:2,tileShape:"hexagon"},{setOptions:function(){var a=d.seriesTypes.heatmap.prototype.setOptions.apply(this,Array.prototype.slice.call(arguments));
this.tileShape=d.tileShapeTypes[a.tileShape];return a},alignDataLabel:function(){return this.tileShape.alignDataLabel.apply(this,Array.prototype.slice.call(arguments))},getSeriesPixelPadding:function(a){var b=a.isXAxis,c=this.tileShape.getSeriesPadding(this);if(!c)return{padding:0,axisLengthFactor:1};var d=Math.round(a.translate(b?2*c.xPad:c.yPad,0,1,0,1));a=Math.round(a.translate(b?c.xPad:0,0,1,0,1));return{padding:Math.abs(d-a)||0,axisLengthFactor:b?2:1.1}},translate:function(){return this.tileShape.translate.apply(this,
Array.prototype.slice.call(arguments))}},n({haloPath:function(){return this.series.tileShape.haloPath.apply(this,Array.prototype.slice.call(arguments))}},d.colorPointMixin));""});e(d,"masters/modules/tilemap.src.js",[],function(){})});