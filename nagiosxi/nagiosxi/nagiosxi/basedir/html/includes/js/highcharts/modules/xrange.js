/*
 Highcharts JS v7.2.1 (2019-10-31)

 X-range series

 (c) 2010-2019 Torstein Honsi, Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/xrange",["highcharts"],function(c){b(c);b.Highcharts=c;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function c(q,b,c,m){q.hasOwnProperty(b)||(q[b]=m.apply(null,c))}b=b?b._modules:{};c(b,"modules/xrange.src.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,c){var q=c.defined,m=c.isNumber,u=c.isObject,
v=c.pick;c=b.addEvent;var x=b.color,y=b.seriesTypes.column,A=b.correctFloat,r=b.merge,B=b.seriesType,C=b.Axis,w=b.Point,D=b.Series;B("xrange","column",{colorByPoint:!0,dataLabels:{formatter:function(){var a=this.point.partialFill;u(a)&&(a=a.amount);if(m(a)&&0<a)return A(100*a)+"%"},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:'<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.yCategory}</b><br/>'},
borderRadius:3,pointRange:0},{type:"xrange",parallelArrays:["x","x2","y"],requireSorting:!1,animate:b.seriesTypes.line.prototype.animate,cropShoulder:1,getExtremesFromAll:!0,autoIncrement:b.noop,buildKDTree:b.noop,getColumnMetrics:function(){function a(){d.series.forEach(function(a){var d=a.xAxis;a.xAxis=a.yAxis;a.yAxis=d})}var d=this.chart;a();var g=y.prototype.getColumnMetrics.call(this);a();return g},cropData:function(a,d,g,b){d=D.prototype.cropData.call(this,this.x2Data,d,g,b);d.xData=a.slice(d.start,
d.end);return d},findPointIndex:function(a){var d=this.data,g=this.points,z=a.id,e;if(z)var f=(e=b.find(d,function(a){return a.id===z}))?e.index:void 0;void 0===f&&(f=(e=b.find(d,function(d){return d.x===a.x&&d.x2===a.x2&&!(g[f]&&g[f].touched)}))?e.index:void 0);this.cropped&&f>=this.cropStart&&(f-=this.cropStart);return f},translatePoint:function(a){var d=this.xAxis,g=this.yAxis,b=this.columnMetrics,e=this.options,f=e.minPointLength||0,c=a.plotX,k=v(a.x2,a.x+(a.len||0)),h=d.translate(k,0,0,0,1);
k=Math.abs(h-c);var p=this.chart.inverted,t=v(e.borderWidth,1)%2/2,l=b.offset,n=Math.round(b.width);f&&(f-=k,0>f&&(f=0),c-=f/2,h+=f/2);c=Math.max(c,-10);h=Math.min(Math.max(h,-10),d.len+10);q(a.options.pointWidth)&&(l-=(Math.ceil(a.options.pointWidth)-n)/2,n=Math.ceil(a.options.pointWidth));e.pointPlacement&&m(a.plotY)&&g.categories&&(a.plotY=g.translate(a.y,0,1,0,1,e.pointPlacement));a.shapeArgs={x:Math.floor(Math.min(c,h))+t,y:Math.floor(a.plotY+l)+t,width:Math.round(Math.abs(h-c)),height:n,r:this.options.borderRadius};
e=a.shapeArgs.x;f=e+a.shapeArgs.width;0>e||f>d.len?(e=Math.min(d.len,Math.max(0,e)),f=Math.max(0,Math.min(f,d.len)),h=f-e,a.dlBox=r(a.shapeArgs,{x:e,width:f-e,centerX:h?h/2:null})):a.dlBox=null;p?(a.tooltipPos[1]+=k/2*(d.reversed?1:-1),a.tooltipPos[0]+=b.width/2,a.tooltipPos[1]=Math.max(Math.min(a.tooltipPos[1],d.len-1),0),a.tooltipPos[0]=Math.max(Math.min(a.tooltipPos[0],g.len-1),0)):(a.tooltipPos[0]+=k/2*(d.reversed?-1:1),a.tooltipPos[1]-=b.width/2,a.tooltipPos[0]=Math.max(Math.min(a.tooltipPos[0],
d.len-1),0),a.tooltipPos[1]=Math.max(Math.min(a.tooltipPos[1],g.len-1),0));if(b=a.partialFill)u(b)&&(b=b.amount),m(b)||(b=0),g=a.shapeArgs,a.partShapeArgs={x:g.x,y:g.y,width:g.width,height:g.height,r:this.options.borderRadius},c=Math.max(Math.round(k*b+a.plotX-c),0),a.clipRectArgs={x:d.reversed?g.x+k-c:g.x,y:g.y,width:c,height:g.height}},translate:function(){y.prototype.translate.apply(this,arguments);this.points.forEach(function(a){this.translatePoint(a)},this)},drawPoint:function(a,d){var b=this.options,
c=this.chart.renderer,e=a.graphic,f=a.shapeType,m=a.shapeArgs,k=a.partShapeArgs,h=a.clipRectArgs,p=a.partialFill,t=b.stacking&&!b.borderRadius,l=a.state,n=b.states[l||"normal"]||{},q=void 0===l?"attr":d;l=this.pointAttribs(a,l);n=v(this.chart.options.chart.animation,n.animation);if(a.isNull)e&&(a.graphic=e.destroy());else{if(e)e.rect[d](m);else a.graphic=e=c.g("point").addClass(a.getClassName()).add(a.group||this.group),e.rect=c[f](r(m)).addClass(a.getClassName()).addClass("highcharts-partfill-original").add(e);
k&&(e.partRect?(e.partRect[d](r(k)),e.partialClipRect[d](r(h))):(e.partialClipRect=c.clipRect(h.x,h.y,h.width,h.height),e.partRect=c[f](k).addClass("highcharts-partfill-overlay").add(e).clip(e.partialClipRect)));this.chart.styledMode||(e.rect[d](l,n).shadow(b.shadow,null,t),k&&(u(p)||(p={}),u(b.partialFill)&&(p=r(p,b.partialFill)),a=p.fill||x(l.fill).brighten(-.3).get()||x(a.color||this.color).brighten(-.3).get(),l.fill=a,e.partRect[q](l,n).shadow(b.shadow,null,t)))}},drawPoints:function(){var a=
this,b=a.getAnimationVerb();a.points.forEach(function(d){a.drawPoint(d,b)})},getAnimationVerb:function(){return this.chart.pointCount<(this.options.animationLimit||250)?"animate":"attr"}},{resolveColor:function(){var a=this.series;if(a.options.colorByPoint&&!this.options.color){var b=a.options.colors||a.chart.options.colors;var c=this.y%(b?b.length:a.chart.options.chart.colorCount);b=b&&b[c];a.chart.styledMode||(this.color=b);this.options.colorIndex||(this.colorIndex=c)}else this.color||(this.color=
a.color)},init:function(){w.prototype.init.apply(this,arguments);this.y||(this.y=0);return this},setState:function(){w.prototype.setState.apply(this,arguments);this.series.drawPoint(this,this.series.getAnimationVerb())},getLabelConfig:function(){var a=w.prototype.getLabelConfig.call(this),b=this.series.yAxis.categories;a.x2=this.x2;a.yCategory=this.yCategory=b&&b[this.y];return a},tooltipDateKeys:["x","x2"],isValid:function(){return"number"===typeof this.x&&"number"===typeof this.x2}});c(C,"afterGetSeriesExtremes",
function(){var a=this.series,b;if(this.isXAxis){var c=v(this.dataMax,-Number.MAX_VALUE);a.forEach(function(a){a.x2Data&&a.x2Data.forEach(function(a){a>c&&(c=a,b=!0)})});b&&(this.dataMax=c)}});""});c(b,"masters/modules/xrange.src.js",[],function(){})});