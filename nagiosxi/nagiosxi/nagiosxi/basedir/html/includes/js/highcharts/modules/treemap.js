/*
 Highcharts JS v7.2.1 (2019-10-31)

 (c) 2014-2019 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/treemap",["highcharts"],function(n){b(n);b.Highcharts=n;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function n(p,e,b,g){p.hasOwnProperty(e)||(p[e]=g.apply(null,b))}b=b?b._modules:{};n(b,"mixins/tree-series.js",[b["parts/Globals.js"],b["parts/Utilities.js"]],function(b,e){var p=e.extend,g=e.isArray,q=e.isNumber,l=
e.isObject,y=e.pick,n=b.merge;return{getColor:function(f,k){var p=k.index,e=k.mapOptionsToLevel,g=k.parentColor,l=k.parentColorIndex,w=k.series,z=k.colors,q=k.siblings,r=w.points,n=w.chart.options.chart,v;if(f){r=r[f.i];f=e[f.level]||{};if(e=r&&f.colorByPoint){var x=r.index%(z?z.length:n.colorCount);var B=z&&z[x]}if(!w.chart.styledMode){z=r&&r.options.color;n=f&&f.color;if(v=g)v=(v=f&&f.colorVariation)&&"brightness"===v.key?b.color(g).brighten(p/q*v.to).get():g;v=y(z,n,B,v,w.color)}var C=y(r&&r.options.colorIndex,
f&&f.colorIndex,x,l,k.colorIndex)}return{color:v,colorIndex:C}},getLevelOptions:function(f){var k=null;if(l(f)){k={};var e=q(f.from)?f.from:1;var b=f.levels;var A={};var y=l(f.defaults)?f.defaults:{};g(b)&&(A=b.reduce(function(k,b){if(l(b)&&q(b.level)){var f=n({},b);var g="boolean"===typeof f.levelIsConstant?f.levelIsConstant:y.levelIsConstant;delete f.levelIsConstant;delete f.level;b=b.level+(g?0:e-1);l(k[b])?p(k[b],f):k[b]=f}return k},{}));b=q(f.to)?f.to:1;for(f=0;f<=b;f++)k[f]=n({},y,l(A[f])?A[f]:
{})}return k},setTreeValues:function u(k,b){var e=b.before,g=b.idRoot,l=b.mapIdToNode[g],q=b.points[k.i],n=q&&q.options||{},r=0,B=[];p(k,{levelDynamic:k.level-(("boolean"===typeof b.levelIsConstant?b.levelIsConstant:1)?0:l.level),name:y(q&&q.name,""),visible:g===k.id||("boolean"===typeof b.visible?b.visible:!1)});"function"===typeof e&&(k=e(k,b));k.children.forEach(function(e,g){var l=p({},b);p(l,{index:g,siblings:k.children.length,visible:k.visible});e=u(e,l);B.push(e);e.visible&&(r+=e.val)});k.visible=
0<r||k.visible;e=y(n.value,r);p(k,{children:B,childrenTotal:r,isLeaf:k.visible&&!r,val:e});return k},updateRootId:function(b){if(l(b)){var e=l(b.options)?b.options:{};e=y(b.rootNode,e.rootId,"");l(b.userOptions)&&(b.userOptions.rootId=e);b.rootNode=e}return e}}});n(b,"mixins/draw-point.js",[],function(){var b=function(b){var e=this,g=e.graphic,p=b.animatableAttribs,l=b.onComplete,n=b.css,C=b.renderer;if(e.shouldDraw())g||(e.graphic=g=C[b.shapeType](b.shapeArgs).add(b.group)),g.css(n).attr(b.attribs).animate(p,
b.isNew?!1:void 0,l);else if(g){var f=function(){e.graphic=g=g.destroy();"function"===typeof l&&l()};Object.keys(p).length?g.animate(p,void 0,function(){f()}):f()}};return function(e){(e.attribs=e.attribs||{})["class"]=this.getClassName();b.call(this,e)}});n(b,"modules/treemap.src.js",[b["parts/Globals.js"],b["mixins/tree-series.js"],b["mixins/draw-point.js"],b["parts/Utilities.js"]],function(b,e,n,g){var q=g.defined,l=g.extend,p=g.isArray,C=g.isNumber,f=g.isObject,k=g.isString,B=g.objectEach,u=g.pick;
g=b.seriesType;var A=b.seriesTypes,G=b.addEvent,w=b.merge,z=b.error,H=b.noop,r=b.fireEvent,J=e.getColor,v=e.getLevelOptions,x=b.Series,K=b.stableSort,I=b.Color,L=function(a,c,d){d=d||this;B(a,function(b,h){c.call(d,b,h,a)})},D=function(a,c,d){d=d||this;a=c.call(d,a);!1!==a&&D(a,c,d)},M=e.updateRootId;g("treemap","scatter",{allowTraversingTree:!1,animationLimit:250,showInLegend:!1,marker:!1,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,formatter:function(){var a=this&&this.point?this.point:{};return k(a.name)?
a.name:""},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}<br/>"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,colorKey:"colorValue",opacity:.15,states:{hover:{borderColor:"#999999",brightness:A.heatmap?0:.1,
halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:H,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,c){a=p(a)?a:[];var d=p(c)?c:[];c=a.reduce(function(a,c,d){c=u(c.parent,"");void 0===a[c]&&(a[c]=[]);a[c].push(d);return a},{"":[]});L(c,function(a,c,b){""!==c&&-1===d.indexOf(c)&&(a.forEach(function(a){b[""].push(a)}),delete b[c])});return c},getTree:function(){var a=
this.data.map(function(a){return a.id});a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},hasData:function(){return!!this.processedXData.length},init:function(a,c){var d=b.colorMapSeriesMixin;d&&(this.colorAttribs=d.colorAttribs);G(this,"setOptions",function(a){a=a.userOptions;q(a.allowDrillToNode)&&!q(a.allowTraversingTree)&&(a.allowTraversingTree=a.allowDrillToNode,delete a.allowDrillToNode);q(a.drillUpButton)&&!q(a.traverseUpButton)&&(a.traverseUpButton=
a.drillUpButton,delete a.drillUpButton)});x.prototype.init.call(this,a,c);this.options.allowTraversingTree&&G(this,"click",this.onClickDrillToNode)},buildNode:function(a,c,d,b,h){var t=this,m=[],e=t.points[c],f=0,F;(b[a]||[]).forEach(function(c){F=t.buildNode(t.points[c].id,c,d+1,b,a);f=Math.max(F.height+1,f);m.push(F)});c={id:a,i:c,children:m,height:f,level:d,parent:h,visible:!1};t.nodeMap[c.id]=c;e&&(e.node=c);return c},setTreeValues:function(a){var c=this,d=c.options,b=c.nodeMap[c.rootNode];d=
"boolean"===typeof d.levelIsConstant?d.levelIsConstant:!0;var h=0,E=[],m=c.points[a.i];a.children.forEach(function(a){a=c.setTreeValues(a);E.push(a);a.ignore||(h+=a.val)});K(E,function(a,c){return a.sortIndex-c.sortIndex});var e=u(m&&m.options.value,h);m&&(m.value=e);l(a,{children:E,childrenTotal:h,ignore:!(u(m&&m.visible,!0)&&0<e),isLeaf:a.visible&&!h,levelDynamic:a.level-(d?0:b.level),name:u(m&&m.name,""),sortIndex:u(m&&m.sortIndex,-e),val:e});return a},calculateChildrenAreas:function(a,c){var d=
this,b=d.options,h=d.mapOptionsToLevel[a.level+1],e=u(d[h&&h.layoutAlgorithm]&&h.layoutAlgorithm,b.layoutAlgorithm),m=b.alternateStartingDirection,f=[];a=a.children.filter(function(a){return!a.ignore});h&&h.layoutStartingDirection&&(c.direction="vertical"===h.layoutStartingDirection?0:1);f=d[e](c,a);a.forEach(function(a,b){b=f[b];a.values=w(b,{val:a.childrenTotal,direction:m?1-c.direction:c.direction});a.pointValues=w(b,{x:b.x/d.axisRatio,width:b.width/d.axisRatio});a.children.length&&d.calculateChildrenAreas(a,
a.values)})},setPointValues:function(){var a=this,c=a.xAxis,d=a.yAxis;a.points.forEach(function(b){var h=b.node,e=h.pointValues,m=0;a.chart.styledMode||(m=(a.pointAttribs(b)["stroke-width"]||0)%2/2);if(e&&h.visible){h=Math.round(c.translate(e.x,0,0,0,1))-m;var t=Math.round(c.translate(e.x+e.width,0,0,0,1))-m;var f=Math.round(d.translate(e.y,0,0,0,1))-m;e=Math.round(d.translate(e.y+e.height,0,0,0,1))-m;b.shapeArgs={x:Math.min(h,t),y:Math.min(f,e),width:Math.abs(t-h),height:Math.abs(e-f)};b.plotX=b.shapeArgs.x+
b.shapeArgs.width/2;b.plotY=b.shapeArgs.y+b.shapeArgs.height/2}else delete b.plotX,delete b.plotY})},setColorRecursive:function(a,c,b,e,h){var d=this,m=d&&d.chart;m=m&&m.options&&m.options.colors;if(a){var f=J(a,{colors:m,index:e,mapOptionsToLevel:d.mapOptionsToLevel,parentColor:c,parentColorIndex:b,series:d,siblings:h});if(c=d.points[a.i])c.color=f.color,c.colorIndex=f.colorIndex;(a.children||[]).forEach(function(c,b){d.setColorRecursive(c,f.color,f.colorIndex,b,a.children.length)})}},algorithmGroup:function(a,
c,b,e){this.height=a;this.width=c;this.plot=e;this.startDirection=this.direction=b;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,c){return Math.max(a/c,c/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/
this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,c,d,e){var h,f,m,t,k=d.lW,g=d.lH,l=d.plot,n=0,p=d.elArr.length-1;if(c)k=d.nW,g=d.nH;else var q=d.elArr[d.elArr.length-
1];d.elArr.forEach(function(a){if(c||n<p)0===d.direction?(h=l.x,f=l.y,m=k,t=a/m):(h=l.x,f=l.y,t=g,m=a/t),e.push({x:h,y:f,width:m,height:b.correctFloat(t)}),0===d.direction?l.y+=t:l.x+=m;n+=1});d.reset();0===d.direction?d.width-=k:d.height-=g;l.y=l.parent.y+(l.parent.height-d.height);l.x=l.parent.x+(l.parent.width-d.width);a&&(d.direction=1-d.direction);c||d.addElement(q)},algorithmLowAspectRatio:function(a,c,b){var d=[],h=this,e,f={x:c.x,y:c.y,parent:c},l=0,k=b.length-1,g=new this.algorithmGroup(c.height,
c.width,c.direction,f);b.forEach(function(b){e=b.val/c.val*c.height*c.width;g.addElement(e);g.lP.nR>g.lP.lR&&h.algorithmCalcPoints(a,!1,g,d,f);l===k&&h.algorithmCalcPoints(a,!0,g,d,f);l+=1});return d},algorithmFill:function(a,c,b){var d=[],h,e=c.direction,f=c.x,g=c.y,l=c.width,k=c.height,n,p,q,r;b.forEach(function(b){h=b.val/c.val*c.height*c.width;n=f;p=g;0===e?(r=k,q=h/r,l-=q,f+=q):(q=l,r=h/q,k-=r,g+=r);d.push({x:n,y:p,width:q,height:r});a&&(e=1-e)});return d},strip:function(a,c){return this.algorithmLowAspectRatio(!1,
a,c)},squarified:function(a,c){return this.algorithmLowAspectRatio(!0,a,c)},sliceAndDice:function(a,c){return this.algorithmFill(!0,a,c)},stripes:function(a,c){return this.algorithmFill(!1,a,c)},translate:function(){var a=this,c=a.options,b=M(a);x.prototype.translate.call(a);var e=a.tree=a.getTree();var h=a.nodeMap[b];a.renderTraverseUpButton(b);a.mapOptionsToLevel=v({from:h.level+1,levels:c.levels,to:e.height,defaults:{levelIsConstant:a.options.levelIsConstant,colorByPoint:c.colorByPoint}});""===
b||h&&h.children.length||(a.setRootNode("",!1),b=a.rootNode,h=a.nodeMap[b]);D(a.nodeMap[a.rootNode],function(c){var b=!1,d=c.parent;c.visible=!0;if(d||""===d)b=a.nodeMap[d];return b});D(a.nodeMap[a.rootNode].children,function(a){var c=!1;a.forEach(function(a){a.visible=!0;a.children.length&&(c=(c||[]).concat(a.children))});return c});a.setTreeValues(e);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=b={x:0,y:0,width:100,height:100};a.nodeMap[""].values=b=w(b,{width:b.width*a.axisRatio,
direction:"vertical"===c.layoutStartingDirection?0:1,val:e.val});a.calculateChildrenAreas(e,b);a.colorAxis||c.colorByPoint||a.setColorRecursive(a.tree);c.allowTraversingTree&&(c=h.pointValues,a.xAxis.setExtremes(c.x,c.x+c.width,!1),a.yAxis.setExtremes(c.y,c.y+c.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},drawDataLabels:function(){var a=this,c=a.mapOptionsToLevel,b,e;a.points.filter(function(a){return a.node.visible}).forEach(function(d){e=c[d.node.level];b={style:{}};d.node.isLeaf||
(b.enabled=!1);e&&e.dataLabels&&(b=w(b,e.dataLabels),a._hasPointLabels=!0);d.shapeArgs&&(b.style.width=d.shapeArgs.width,d.dataLabel&&d.dataLabel.css({width:d.shapeArgs.width+"px"}));d.dlOptions=w(b,d.options.dataLabels)});x.prototype.drawDataLabels.call(this)},alignDataLabel:function(a,b,d){var c=d.style;!q(c.textOverflow)&&b.text&&b.getBBox().width>b.text.textWidth&&b.css({textOverflow:"ellipsis",width:c.width+="px"});A.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||
0)+1})},pointAttribs:function(a,b){var c=f(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},e=a&&c[a.node.level]||{};c=this.options;var h=b&&c.states[b]||{},g=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||e.borderColor||h.borderColor||c.borderColor,"stroke-width":u(a&&a.borderWidth,e.borderWidth,h.borderWidth,c.borderWidth),dashstyle:a&&a.borderDashStyle||e.borderDashStyle||h.borderDashStyle||c.borderDashStyle,fill:a&&a.color||this.color};-1!==g.indexOf("highcharts-above-level")?(a.fill="none",
a["stroke-width"]=0):-1!==g.indexOf("highcharts-internal-node-interactive")?(b=u(h.opacity,c.opacity),a.fill=I(a.fill).setOpacity(b).get(),a.cursor="pointer"):-1!==g.indexOf("highcharts-internal-node")?a.fill="none":b&&(a.fill=I(a.fill).brighten(h.brightness).get());return a},drawPoints:function(){var a=this,b=a.chart,d=b.renderer,e=b.styledMode,f=a.options,g=e?{}:f.shadow,k=f.borderRadius,n=b.pointCount<f.animationLimit,q=f.allowTraversingTree;a.points.forEach(function(b){var c=b.node.levelDynamic,
h={},m={},r={},p="level-group-"+c,t=!!b.graphic,u=n&&t,v=b.shapeArgs;b.shouldDraw()&&(k&&(m.r=k),w(!0,u?h:m,t?v:{},e?{}:a.pointAttribs(b,b.selected&&"select")),a.colorAttribs&&e&&l(r,a.colorAttribs(b)),a[p]||(a[p]=d.g(p).attr({zIndex:1E3-c}).add(a.group),a[p].survive=!0));b.draw({animatableAttribs:h,attribs:m,css:r,group:a[p],renderer:d,shadow:g,shapeArgs:v,shapeType:"rect"});q&&b.graphic&&(b.drillId=f.interactByLeaf?a.drillToByLeaf(b):a.drillToByGroup(b))})},onClickDrillToNode:function(a){var b=
(a=a.point)&&a.drillId;k(b)&&(a.setState(""),this.setRootNode(b,!0,{trigger:"click"}))},drillToByGroup:function(a){var b=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(b=a.id);return b},drillToByLeaf:function(a){var b=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!b;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(b=a.id);return b},drillUp:function(){var a=this.nodeMap[this.rootNode];a&&k(a.parent)&&this.setRootNode(a.parent,!0,{trigger:"traverseUpButton"})},
drillToNode:function(a,b){z("WARNING: treemap.drillToNode has been renamed to treemap.setRootNode, and will be removed in the next major version.");this.setRootNode(a,b)},setRootNode:function(a,b,d){a=l({newRootId:a,previousRootId:this.rootNode,redraw:u(b,!0),series:this},d);r(this,"setRootNode",a,function(a){var b=a.series;b.idPreviousRoot=a.previousRootId;b.rootNode=a.newRootId;b.isDirty=!0;a.redraw&&b.chart.redraw()})},renderTraverseUpButton:function(a){var b=this,d=b.options.traverseUpButton,
e=u(d.text,b.nodeMap[a].name,"< Back");if(""===a)b.drillUpButton&&(b.drillUpButton=b.drillUpButton.destroy());else if(this.drillUpButton)this.drillUpButton.placed=!1,this.drillUpButton.attr({text:e}).align();else{var f=(a=d.theme)&&a.states;this.drillUpButton=this.chart.renderer.button(e,null,null,function(){b.drillUp()},a,f&&f.hover,f&&f.select).addClass("highcharts-drillup-button").attr({align:d.position.align,zIndex:7}).add().align(d.position,!1,d.relativeTo||"plotBox")}},buildKDTree:H,drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,
getExtremes:function(){x.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;x.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};x.prototype.bindAxes.call(this);l(this.yAxis.options,a);l(this.xAxis.options,a)},setState:function(a){this.options.inactiveOtherPoints=!0;
x.prototype.setState.call(this,a,!1);this.options.inactiveOtherPoints=!1},utils:{recursive:D}},{draw:n,setVisible:A.pie.prototype.pointClass.prototype.setVisible,getClassName:function(){var a=b.Point.prototype.getClassName.call(this),c=this.series,d=c.options;this.node.level<=c.nodeMap[c.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||u(d.interactByLeaf,!d.allowTraversingTree)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return this.id||
C(this.value)},setState:function(a){b.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})},shouldDraw:function(){return C(this.plotY)&&null!==this.y}})});n(b,"masters/modules/treemap.src.js",[],function(){})});