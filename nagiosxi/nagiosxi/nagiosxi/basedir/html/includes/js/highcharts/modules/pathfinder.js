/*
 Highcharts Gantt JS v7.2.1 (2019-10-31)

 Pathfinder

 (c) 2016-2019 ystein Moseng

 License: www.highcharts.com/license
*/
(function(m){"object"===typeof module&&module.exports?(m["default"]=m,module.exports=m):"function"===typeof define&&define.amd?define("highcharts/modules/pathfinder",["highcharts"],function(r){m(r);m.Highcharts=r;return m}):m("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(m){function r(g,k,u,m){g.hasOwnProperty(k)||(g[k]=m.apply(null,u))}m=m?m._modules:{};r(m,"parts-gantt/PathfinderAlgorithms.js",[m["parts/Utilities.js"]],function(g){function k(c,f,h){h=h||0;var g=c.length-1;f-=1e-7;
for(var k,n;h<=g;)if(k=g+h>>1,n=f-c[k].xMin,0<n)h=k+1;else if(0>n)g=k-1;else return k;return 0<h?h-1:0}function u(c,f){for(var h=k(c,f.x+1)+1;h--;){var g;if(g=c[h].xMax>=f.x)g=c[h],g=f.x<=g.xMax&&f.x>=g.xMin&&f.y<=g.yMax&&f.y>=g.yMin;if(g)return h}return-1}function m(c){var f=[];if(c.length){f.push("M",c[0].start.x,c[0].start.y);for(var h=0;h<c.length;++h)f.push("L",c[h].end.x,c[h].end.y)}return f}function p(c,f){c.yMin=B(c.yMin,f.yMin);c.yMax=z(c.yMax,f.yMax);c.xMin=B(c.xMin,f.xMin);c.xMax=z(c.xMax,
f.xMax)}var r=g.extend,F=g.pick,z=Math.min,B=Math.max,y=Math.abs;return{straight:function(c,f){return{path:["M",c.x,c.y,"L",f.x,f.y],obstacles:[{start:c,end:f}]}},simpleConnect:r(function(c,f,h){function g(a,b,d,c,f){a={x:a.x,y:a.y};a[b]=d[c||b]+(f||0);return a}function k(a,b,d){var e=y(b[d]-a[d+"Min"])>y(b[d]-a[d+"Max"]);return g(b,d,a,d+(e?"Max":"Min"),e?1:-1)}var n=[],q=F(h.startDirectionX,y(f.x-c.x)>y(f.y-c.y))?"x":"y",p=h.chartObstacles,a=u(p,c);h=u(p,f);if(-1<h){var b=p[h];h=k(b,f,q);b={start:h,
end:f};var d=h}else d=f;-1<a&&(p=p[a],h=k(p,c,q),n.push({start:c,end:h}),h[q]>=c[q]===h[q]>=d[q]&&(q="y"===q?"x":"y",f=c[q]<f[q],n.push({start:h,end:g(h,q,p,q+(f?"Max":"Min"),f?1:-1)}),q="y"===q?"x":"y"));c=n.length?n[n.length-1].end:c;h=g(c,q,d);n.push({start:c,end:h});q=g(h,"y"===q?"x":"y",d);n.push({start:h,end:q});n.push(b);return{path:m(n),obstacles:n}},{requiresObstacles:!0}),fastAvoid:r(function(c,f,h){function g(a,b,d){var e,w=a.x<b.x?1:-1;if(a.x<b.x){var c=a;var t=b}else c=b,t=a;if(a.y<b.y){var f=
a;var g=b}else f=b,g=a;for(e=0>w?z(k(l,t.x),l.length-1):0;l[e]&&(0<w&&l[e].xMin<=t.x||0>w&&l[e].xMax>=c.x);){if(l[e].xMin<=t.x&&l[e].xMax>=c.x&&l[e].yMin<=g.y&&l[e].yMax>=f.y)return d?{y:a.y,x:a.x<b.x?l[e].xMin-1:l[e].xMax+1,obstacle:l[e]}:{x:a.x,y:a.y<b.y?l[e].yMin-1:l[e].yMax+1,obstacle:l[e]};e+=w}return b}function v(a,b,d,e,w){var c=w.soft,f=w.hard,l=e?"x":"y",t={x:b.x,y:b.y},C={x:b.x,y:b.y};w=a[l+"Max"]>=c[l+"Max"];c=a[l+"Min"]<=c[l+"Min"];var h=a[l+"Max"]>=f[l+"Max"];f=a[l+"Min"]<=f[l+"Min"];
var D=y(a[l+"Min"]-b[l]),k=y(a[l+"Max"]-b[l]);d=10>y(D-k)?b[l]<d[l]:k<D;C[l]=a[l+"Min"];t[l]=a[l+"Max"];a=g(b,C,e)[l]!==C[l];b=g(b,t,e)[l]!==t[l];d=a?b?d:!0:b?!1:d;d=c?w?d:!0:w?!1:d;return f?h?d:!0:h?!1:d}function n(a,b,e){if(a.x===b.x&&a.y===b.y)return[];var c=e?"x":"y",f=h.obstacleOptions.margin;var k={soft:{xMin:w,xMax:C,yMin:I,yMax:D},hard:h.hardBounds};var t=u(l,a);if(-1<t){t=l[t];k=v(t,a,b,e,k);p(t,h.hardBounds);var A=e?{y:a.y,x:t[k?"xMax":"xMin"]+(k?1:-1)}:{x:a.x,y:t[k?"yMax":"yMin"]+(k?1:
-1)};var x=u(l,A);-1<x&&(x=l[x],p(x,h.hardBounds),A[c]=k?B(t[c+"Max"]-f+1,(x[c+"Min"]+t[c+"Max"])/2):z(t[c+"Min"]+f-1,(x[c+"Max"]+t[c+"Min"])/2),a.x===A.x&&a.y===A.y?(d&&(A[c]=k?B(t[c+"Max"],x[c+"Max"])+1:z(t[c+"Min"],x[c+"Min"])-1),d=!d):d=!1);a=[{start:a,end:A}]}else c=g(a,{x:e?b.x:a.x,y:e?a.y:b.y},e),a=[{start:a,end:{x:c.x,y:c.y}}],c[e?"x":"y"]!==b[e?"x":"y"]&&(k=v(c.obstacle,c,b,!e,k),p(c.obstacle,h.hardBounds),k={x:e?c.x:c.obstacle[k?"xMax":"xMin"]+(k?1:-1),y:e?c.obstacle[k?"yMax":"yMin"]+(k?
1:-1):c.y},e=!e,a=a.concat(n({x:c.x,y:c.y},k,e)));return a=a.concat(n(a[a.length-1].end,b,!e))}function q(a,b,d){var e=z(a.xMax-b.x,b.x-a.xMin)<z(a.yMax-b.y,b.y-a.yMin);d=v(a,b,d,e,{soft:h.hardBounds,hard:h.hardBounds});return e?{y:b.y,x:a[d?"xMax":"xMin"]+(d?1:-1)}:{x:b.x,y:a[d?"yMax":"yMin"]+(d?1:-1)}}var r=F(h.startDirectionX,y(f.x-c.x)>y(f.y-c.y)),a=r?"x":"y",b=[],d=!1,e=h.obstacleMetrics,w=z(c.x,f.x)-e.maxWidth-10,C=B(c.x,f.x)+e.maxWidth+10,I=z(c.y,f.y)-e.maxHeight-10,D=B(c.y,f.y)+e.maxHeight+
10,l=h.chartObstacles;var A=k(l,w);e=k(l,C);l=l.slice(A,e+1);if(-1<(e=u(l,f))){var x=q(l[e],f,c);b.push({end:f,start:x});f=x}for(;-1<(e=u(l,f));)A=0>f[a]-c[a],x={x:f.x,y:f.y},x[a]=l[e][A?a+"Max":a+"Min"]+(A?1:-1),b.push({end:f,start:x}),f=x;c=n(c,f,r);c=c.concat(b.reverse());return{path:m(c),obstacles:c}},{requiresObstacles:!0})}});r(m,"parts-gantt/ArrowSymbols.js",[m["parts/Globals.js"]],function(g){g.SVGRenderer.prototype.symbols.arrow=function(k,g,m,p){return["M",k,g+p/2,"L",k+m,g,"L",k,g+p/2,
"L",k+m,g+p]};g.SVGRenderer.prototype.symbols["arrow-half"]=function(k,m,v,p){return g.SVGRenderer.prototype.symbols.arrow(k,m,v/2,p)};g.SVGRenderer.prototype.symbols["triangle-left"]=function(g,m,v,p){return["M",g+v,m,"L",g,m+p/2,"L",g+v,m+p,"Z"]};g.SVGRenderer.prototype.symbols["arrow-filled"]=g.SVGRenderer.prototype.symbols["triangle-left"];g.SVGRenderer.prototype.symbols["triangle-left-half"]=function(k,m,v,p){return g.SVGRenderer.prototype.symbols["triangle-left"](k,m,v/2,p)};g.SVGRenderer.prototype.symbols["arrow-filled-half"]=
g.SVGRenderer.prototype.symbols["triangle-left-half"]});r(m,"parts-gantt/Pathfinder.js",[m["parts/Globals.js"],m["parts/Utilities.js"],m["parts-gantt/PathfinderAlgorithms.js"]],function(g,k,m){function v(a){var b=a.shapeArgs;return b?{xMin:b.x,xMax:b.x+b.width,yMin:b.y,yMax:b.y+b.height}:(b=a.graphic&&a.graphic.getBBox())?{xMin:a.plotX-b.width/2,xMax:a.plotX+b.width/2,yMin:a.plotY-b.height/2,yMax:a.plotY+b.height/2}:null}function p(a){for(var b=a.length,d=0,e,c,g=[],h=function(a,b,d){d=f(d,10);var e=
a.yMax+d>b.yMin-d&&a.yMin-d<b.yMax+d,c=a.xMax+d>b.xMin-d&&a.xMin-d<b.xMax+d,w=e?a.xMin>b.xMax?a.xMin-b.xMax:b.xMin-a.xMax:Infinity,g=c?a.yMin>b.yMax?a.yMin-b.yMax:b.yMin-a.yMax:Infinity;return c&&e?d?h(a,b,Math.floor(d/2)):Infinity:G(w,g)};d<b;++d)for(e=d+1;e<b;++e)c=h(a[d],a[e]),80>c&&g.push(c);g.push(80);return q(Math.floor(g.sort(function(a,b){return a-b})[Math.floor(g.length/10)]/2-1),1)}function r(a,b,d){this.init(a,b,d)}function u(a){this.init(a)}function z(a){if(a.options.pathfinder||a.series.reduce(function(a,
d){d.options&&n(!0,d.options.connectors=d.options.connectors||{},d.options.pathfinder);return a||d.options&&d.options.pathfinder},!1))n(!0,a.options.connectors=a.options.connectors||{},a.options.pathfinder),g.error('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.')}var B=k.defined,y=k.extend,c=k.objectEach,f=k.pick,h=k.splat,H=g.deg2rad,E=g.addEvent,n=g.merge,q=Math.max,G=Math.min;y(g.defaultOptions,{connectors:{type:"straight",lineWidth:1,marker:{enabled:!1,
align:"center",verticalAlign:"middle",inside:!1,lineWidth:1},startMarker:{symbol:"diamond"},endMarker:{symbol:"arrow-filled"}}});r.prototype={init:function(a,b,d){this.fromPoint=a;this.toPoint=b;this.options=d;this.chart=a.series.chart;this.pathfinder=this.chart.pathfinder},renderPath:function(a,b,d){var e=this.chart,c=e.styledMode,g=e.pathfinder,f=!e.options.chart.forExport&&!1!==d,h=this.graphics&&this.graphics.path;g.group||(g.group=e.renderer.g().addClass("highcharts-pathfinder-group").attr({zIndex:-1}).add(e.seriesGroup));
g.group.translate(e.plotLeft,e.plotTop);h&&h.renderer||(h=e.renderer.path().add(g.group),c||h.attr({opacity:0}));h.attr(b);a={d:a};c||(a.opacity=1);h[f?"animate":"attr"](a,d);this.graphics=this.graphics||{};this.graphics.path=h},addMarker:function(a,b,d){var e=this.fromPoint.series.chart,c=e.pathfinder;e=e.renderer;var g="start"===a?this.fromPoint:this.toPoint,f=g.getPathfinderAnchorPoint(b);if(b.enabled){d="start"===a?{x:d[4],y:d[5]}:{x:d[d.length-5],y:d[d.length-4]};d=g.getRadiansToVector(d,f);
f=g.getMarkerVector(d,b.radius,f);d=-d/H;if(b.width&&b.height){var h=b.width;var l=b.height}else h=l=2*b.radius;this.graphics=this.graphics||{};f={x:f.x-h/2,y:f.y-l/2,width:h,height:l,rotation:d,rotationOriginX:f.x,rotationOriginY:f.y};this.graphics[a]?this.graphics[a].animate(f):(this.graphics[a]=e.symbol(b.symbol).addClass("highcharts-point-connecting-path-"+a+"-marker").attr(f).add(c.group),e.styledMode||this.graphics[a].attr({fill:b.color||this.fromPoint.color,stroke:b.lineColor,"stroke-width":b.lineWidth,
opacity:0}).animate({opacity:1},g.series.options.animation))}},getPath:function(a){var b=this.pathfinder,d=this.chart,e=b.algorithms[a.type],c=b.chartObstacles;if("function"!==typeof e)g.error('"'+a.type+'" is not a Pathfinder algorithm.');else return e.requiresObstacles&&!c&&(c=b.chartObstacles=b.getChartObstacles(a),d.options.connectors.algorithmMargin=a.algorithmMargin,b.chartObstacleMetrics=b.getObstacleMetrics(c)),e(this.fromPoint.getPathfinderAnchorPoint(a.startMarker),this.toPoint.getPathfinderAnchorPoint(a.endMarker),
n({chartObstacles:c,lineObstacles:b.lineObstacles||[],obstacleMetrics:b.chartObstacleMetrics,hardBounds:{xMin:0,xMax:d.plotWidth,yMin:0,yMax:d.plotHeight},obstacleOptions:{margin:a.algorithmMargin},startDirectionX:b.getAlgorithmStartDirection(a.startMarker)},a))},render:function(){var a=this.fromPoint,b=a.series,d=b.chart,e=d.pathfinder,c=n(d.options.connectors,b.options.connectors,a.options.connectors,this.options),f={};d.styledMode||(f.stroke=c.lineColor||a.color,f["stroke-width"]=c.lineWidth,c.dashStyle&&
(f.dashstyle=c.dashStyle));f["class"]="highcharts-point-connecting-path highcharts-color-"+a.colorIndex;c=n(f,c);B(c.marker.radius)||(c.marker.radius=G(q(Math.ceil((c.algorithmMargin||8)/2)-1,1),5));a=this.getPath(c);d=a.path;a.obstacles&&(e.lineObstacles=e.lineObstacles||[],e.lineObstacles=e.lineObstacles.concat(a.obstacles));this.renderPath(d,f,b.options.animation);this.addMarker("start",n(c.marker,c.startMarker),d);this.addMarker("end",n(c.marker,c.endMarker),d)},destroy:function(){this.graphics&&
(c(this.graphics,function(a){a.destroy()}),delete this.graphics)}};u.prototype={algorithms:m,init:function(a){this.chart=a;this.connections=[];E(a,"redraw",function(){this.pathfinder.update()})},update:function(a){var b=this.chart,d=this,c=d.connections;d.connections=[];b.series.forEach(function(a){a.visible&&!a.options.isInternal&&a.points.forEach(function(a){var c,e=a.options&&a.options.connect&&h(a.options.connect);a.visible&&!1!==a.isInside&&e&&e.forEach(function(e){c=b.get("string"===typeof e?
e:e.to);c instanceof g.Point&&c.series.visible&&c.visible&&!1!==c.isInside&&d.connections.push(new r(a,c,"string"===typeof e?{}:e))})})});for(var f=0,k,m,n=c.length,l=d.connections.length;f<n;++f){m=!1;for(k=0;k<l;++k)if(c[f].fromPoint===d.connections[k].fromPoint&&c[f].toPoint===d.connections[k].toPoint){d.connections[k].graphics=c[f].graphics;m=!0;break}m||c[f].destroy()}delete this.chartObstacles;delete this.lineObstacles;d.renderConnections(a)},renderConnections:function(a){a?this.chart.series.forEach(function(a){var b=
function(){var b=a.chart.pathfinder;(b&&b.connections||[]).forEach(function(b){b.fromPoint&&b.fromPoint.series===a&&b.render()});a.pathfinderRemoveRenderEvent&&(a.pathfinderRemoveRenderEvent(),delete a.pathfinderRemoveRenderEvent)};!1===a.options.animation?b():a.pathfinderRemoveRenderEvent=E(a,"afterAnimate",b)}):this.connections.forEach(function(a){a.render()})},getChartObstacles:function(a){for(var b=[],c=this.chart.series,e=f(a.algorithmMargin,0),g,h=0,k=c.length;h<k;++h)if(c[h].visible&&!c[h].options.isInternal)for(var m=
0,l=c[h].points.length,n;m<l;++m)n=c[h].points[m],n.visible&&(n=v(n))&&b.push({xMin:n.xMin-e,xMax:n.xMax+e,yMin:n.yMin-e,yMax:n.yMax+e});b=b.sort(function(a,b){return a.xMin-b.xMin});B(a.algorithmMargin)||(g=a.algorithmMargin=p(b),b.forEach(function(a){a.xMin-=g;a.xMax+=g;a.yMin-=g;a.yMax+=g}));return b},getObstacleMetrics:function(a){for(var b=0,c=0,e,f,g=a.length;g--;)e=a[g].xMax-a[g].xMin,f=a[g].yMax-a[g].yMin,b<e&&(b=e),c<f&&(c=f);return{maxHeight:c,maxWidth:b}},getAlgorithmStartDirection:function(a){var b=
"top"!==a.verticalAlign&&"bottom"!==a.verticalAlign;return"left"!==a.align&&"right"!==a.align?b?void 0:!1:b?!0:void 0}};g.Connection=r;g.Pathfinder=u;y(g.Point.prototype,{getPathfinderAnchorPoint:function(a){var b=v(this);switch(a.align){case "right":var c="xMax";break;case "left":c="xMin"}switch(a.verticalAlign){case "top":var e="yMin";break;case "bottom":e="yMax"}return{x:c?b[c]:(b.xMin+b.xMax)/2,y:e?b[e]:(b.yMin+b.yMax)/2}},getRadiansToVector:function(a,b){B(b)||(b=v(this),b={x:(b.xMin+b.xMax)/
2,y:(b.yMin+b.yMax)/2});return Math.atan2(b.y-a.y,a.x-b.x)},getMarkerVector:function(a,b,c){var e=2*Math.PI,d=v(this),f=d.xMax-d.xMin,g=d.yMax-d.yMin,h=Math.atan2(g,f),l=!1;f/=2;var k=g/2,m=d.xMin+f;d=d.yMin+k;for(var n=m,p=d,q={},r=1,u=1;a<-Math.PI;)a+=e;for(;a>Math.PI;)a-=e;e=Math.tan(a);a>-h&&a<=h?(u=-1,l=!0):a>h&&a<=Math.PI-h?u=-1:a>Math.PI-h||a<=-(Math.PI-h)?(r=-1,l=!0):r=-1;l?(n+=r*f,p+=u*f*e):(n+=g/(2*e)*r,p+=u*k);c.x!==m&&(n=c.x);c.y!==d&&(p=c.y);q.x=n+b*Math.cos(a);q.y=p-b*Math.sin(a);return q}});
g.Chart.prototype.callbacks.push(function(a){!1!==a.options.connectors.enabled&&(z(a),this.pathfinder=new u(this),this.pathfinder.update(!0))})});r(m,"masters/modules/pathfinder.src.js",[],function(){})});