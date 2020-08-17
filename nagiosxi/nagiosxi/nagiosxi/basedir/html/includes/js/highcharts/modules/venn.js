/*
 Highcharts JS v7.2.1 (2019-10-31)

 (c) 2017-2019 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/venn",["highcharts"],function(x){a(x);a.Highcharts=x;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function x(e,f,g,k){e.hasOwnProperty(f)||(e[f]=k.apply(null,g))}a=a?a._modules:{};x(a,"mixins/draw-point.js",[],function(){var e=function(f){var g=this,k=g.graphic,e=f.animatableAttribs,a=f.onComplete,z=f.css,t=f.renderer;
if(g.shouldDraw())k||(g.graphic=k=t[f.shapeType](f.shapeArgs).add(f.group)),k.css(z).attr(f.attribs).animate(e,f.isNew?!1:void 0,a);else if(k){var n=function(){g.graphic=k=k.destroy();"function"===typeof a&&a()};Object.keys(e).length?k.animate(e,void 0,function(){n()}):n()}};return function(f){(f.attribs=f.attribs||{})["class"]=this.getClassName();e.call(this,f)}});x(a,"mixins/geometry.js",[],function(){return{getAngleBetweenPoints:function(e,f){return Math.atan2(f.x-e.x,f.y-e.y)},getCenterOfPoints:function(e){var f=
e.reduce(function(f,e){f.x+=e.x;f.y+=e.y;return f},{x:0,y:0});return{x:f.x/e.length,y:f.y/e.length}},getDistanceBetweenPoints:function(e,f){return Math.sqrt(Math.pow(f.x-e.x,2)+Math.pow(f.y-e.y,2))}}});x(a,"mixins/geometry-circles.js",[a["mixins/geometry.js"]],function(e){function f(b,c){c=Math.pow(10,c);return Math.round(b*c)/c}function g(b){if(0>=b)throw Error("radius of circle must be a positive number.");return Math.PI*b*b}function a(b,c){return b*b*Math.acos(1-c/b)-(b-c)*Math.sqrt(c*(2*b-c))}
function y(b,c){var h=v(b,c),r=b.r,g=c.r,e=[];if(h<r+g&&h>Math.abs(r-g)){r*=r;var a=(r-g*g+h*h)/(2*h);g=Math.sqrt(r-a*a);r=b.x;e=c.x;b=b.y;var k=c.y;c=r+a*(e-r)/h;a=b+a*(k-b)/h;b=g/h*-(k-b);h=g/h*-(e-r);e=[{x:f(c+b,14),y:f(a-h,14)},{x:f(c-b,14),y:f(a+h,14)}]}return e}function m(b){return b.reduce(function(b,f,g,e){e=e.slice(g+1).reduce(function(b,c,e){var h=[g,e+g+1];return b.concat(y(f,c).map(function(b){b.indexes=h;return b}))},[]);return b.concat(e)},[])}function z(b,c){return v(b,c)<=c.r+1e-10}
function t(b,c){return!c.some(function(c){return!z(b,c)})}function n(b){return m(b).filter(function(c){return t(c,b)})}var p=e.getAngleBetweenPoints,u=e.getCenterOfPoints,v=e.getDistanceBetweenPoints;return{getAreaOfCircle:g,getAreaOfIntersectionBetweenCircles:function(b){var c=n(b);if(1<c.length){var f=u(c);c=c.map(function(b){b.angle=p(f,b);return b}).sort(function(b,c){return c.angle-b.angle});var g=c[c.length-1];c=c.reduce(function(c,f){var g=c.startPoint,e=u([g,f]),h=f.indexes.filter(function(b){return-1<
g.indexes.indexOf(b)}).reduce(function(c,h){h=b[h];var a=p(h,f),r=p(h,g);a=r-(r-a+(r<a?2*Math.PI:0))/2;a=v(e,{x:h.x+h.r*Math.sin(a),y:h.y+h.r*Math.cos(a)});h=h.r;a>2*h&&(a=2*h);if(!c||c.width>a)c={r:h,largeArc:a>h?1:0,width:a,x:f.x,y:f.y};return c},null);if(h){var a=h.r;c.arcs.push(["A",a,a,0,h.largeArc,1,h.x,h.y]);c.startPoint=f}return c},{startPoint:g,arcs:[]}).arcs;if(0!==c.length&&1!==c.length){c.unshift(["M",g.x,g.y]);var e={center:f,d:c}}}return e},getCircleCircleIntersection:y,getCirclesIntersectionPoints:m,
getCirclesIntersectionPolygon:n,getCircularSegmentArea:a,getOverlapBetweenCircles:function(b,c,h){var e=0;h<b+c&&(h<=Math.abs(c-b)?e=g(b<c?b:c):(e=(b*b-c*c+h*h)/(2*h),h-=e,e=a(b,b-e)+a(c,c-h)),e=f(e,14));return e},isPointInsideCircle:z,isPointInsideAllCircles:t,isPointOutsideAllCircles:function(b,c){return!c.some(function(c){return z(b,c)})},round:f}});x(a,"mixins/nelder-mead.js",[],function(){var e=function(f){f=f.slice(0,-1);for(var e=f.length,a=[],y=function(e,f){e.sum+=f[e.i];return e},m=0;m<
e;m++)a[m]=f.reduce(y,{sum:0,i:m}).sum/e;return a};return{getCentroid:e,nelderMead:function(f,a){var g=function(b,c){return b.fx-c.fx},y=function(b,c,a,e){return c.map(function(c,f){return b*c+a*e[f]})},m=function(b,c){c.fx=f(c);b[b.length-1]=c;return b},z=function(b){var c=b[0];return b.map(function(b){b=y(.5,c,.5,b);b.fx=f(b);return b})},t=function(b,c,a,e){b=y(a,b,e,c);b.fx=f(b);return b};a=function(b){var c=b.length,a=Array(c+1);a[0]=b;a[0].fx=f(b);for(var e=0;e<c;++e){var g=b.slice();g[e]=g[e]?
1.05*g[e]:.001;g.fx=f(g);a[e+1]=g}return a}(a);for(var n=0;100>n;n++){a.sort(g);var p=a[a.length-1],u=e(a),v=t(u,p,2,-1);v.fx<a[0].fx?(p=t(u,p,3,-2),a=m(a,p.fx<v.fx?p:v)):v.fx>=a[a.length-2].fx?v.fx>p.fx?(u=t(u,p,.5,.5),a=u.fx<p.fx?m(a,u):z(a)):(u=t(u,p,1.5,-.5),a=u.fx<v.fx?m(a,u):z(a)):a=m(a,v)}return a[0]}}});x(a,"modules/venn.src.js",[a["parts/Globals.js"],a["mixins/draw-point.js"],a["mixins/geometry.js"],a["mixins/geometry-circles.js"],a["mixins/nelder-mead.js"],a["parts/Utilities.js"]],function(a,
f,g,k,y,m){var e=y.nelderMead,t=m.isArray,n=m.isNumber,p=m.isObject,u=m.isString;m=a.addEvent;var v=a.Color,b=a.extend,c=k.getAreaOfCircle,h=k.getAreaOfIntersectionBetweenCircles,r=k.getCirclesIntersectionPolygon,x=k.getCircleCircleIntersection,S=g.getCenterOfPoints,C=g.getDistanceBetweenPoints,F=k.getOverlapBetweenCircles,G=k.isPointInsideAllCircles,T=k.isPointInsideCircle,J=k.isPointOutsideAllCircles,H=a.merge,U=a.seriesType,I=a.seriesTypes,V=function(d){return Object.keys(d).map(function(a){return d[a]})},
W=function(d){var a=0;2===d.length&&(a=d[0],d=d[1],a=F(a.r,d.r,C(a,d)));return a},K=function(a,b){return b.reduce(function(d,b){var q=0;1<b.sets.length&&(q=b.value,b=W(b.sets.map(function(b){return a[b]})),b=q-b,q=Math.round(b*b*1E11)/1E11);return d+q},0)},L=function(a,b,l,c,q){var d=a(b),e=a(l);q=q||100;c=c||1e-10;var f=l-b,A=1;if(b>=l)throw Error("a must be smaller than b.");if(0<d*e)throw Error("f(a) and f(b) must have opposite signs.");if(0===d)var w=b;else if(0===e)w=l;else for(;A++<=q&&0!==
h&&f>c;){f=(l-b)/2;w=b+f;var h=a(w);0<d*h?b=w:l=w}return w},D=function(b,a,l){var d=b+a;return 0>=l?d:c(b<a?b:a)<=l?0:L(function(d){d=F(b,a,d);return l-d},0,d)},B=function(b){return t(b.sets)&&1===b.sets.length},E=function(b,a,c){a=a.reduce(function(a,d){d=d.r-C(b,d);return d<=a?d:a},Number.MAX_VALUE);return a=c.reduce(function(a,d){d=C(b,d)-d.r;return d<=a?d:a},a)},X=function(a,b){var d=a.reduce(function(d,c){var e=c.r/2;return[{x:c.x,y:c.y},{x:c.x+e,y:c.y},{x:c.x-e,y:c.y},{x:c.x,y:c.y+e},{x:c.x,
y:c.y-e}].reduce(function(d,c){var e=E(c,a,b);d.margin<e&&(d.point=c,d.margin=e);return d},d)},{point:void 0,margin:-Number.MAX_VALUE}).point;d=e(function(d){return-E({x:d[0],y:d[1]},a,b)},[d.x,d.y]);d={x:d[0],y:d[1]};G(d,a)&&J(d,b)||(d=1<a.length?S(r(a)):{x:a[0].x,y:a[0].y});return d},M=function(a,b,c){var d=b.reduce(function(a,b){return Math.min(b.r,a)},Infinity),e=c.filter(function(b){return!T(a,b)});c=function(d,c){return L(function(f){var l={x:a.x+c*f,y:a.y};l=G(l,b)&&J(l,e);return-(d-f)+(l?
0:Number.MAX_VALUE)},0,d)};return 2*Math.min(c(d,-1),c(d,1))},Y=function(a){var b=a.filter(B);return a.reduce(function(a,d){if(d.value){var c=d.sets;d=c.join();var e=b.reduce(function(a,b){var d=-1<c.indexOf(b.sets[0]);a[d?"internal":"external"].push(b.circle);return a},{internal:[],external:[]}),f=X(e.internal,e.external);e=M(f,e.internal,e.external);a[d]={position:f,width:e}}return a},{})},N=function(a){var d=a.filter(function(a){return 2===a.sets.length}).reduce(function(a,b){b.sets.forEach(function(d,
c,e){p(a[d])||(a[d]={overlapping:{},totalOverlap:0});a[d].totalOverlap+=b.value;a[d].overlapping[e[1-c]]=b.value});return a},{});a.filter(B).forEach(function(a){b(a,d[a.sets[0]])});return a},O=function(a,b){return b.totalOverlap-a.totalOverlap},P=function(a){var b=[],d={};a.filter(function(a){return 1===a.sets.length}).forEach(function(a){d[a.sets[0]]=a.circle={x:Number.MAX_VALUE,y:Number.MAX_VALUE,r:Math.sqrt(a.value/Math.PI)}});var c=function(a,d){var c=a.circle;c.x=d.x;c.y=d.y;b.push(a)};N(a);
var e=a.filter(B).sort(O);c(e.shift(),{x:0,y:0});var f=a.filter(function(a){return 2===a.sets.length});e.forEach(function(a){var e=a.circle,l=e.r,q=a.overlapping,h=b.reduce(function(a,c,h){var g=c.circle,A=D(l,g.r,q[c.sets[0]]),w=[{x:g.x+A,y:g.y},{x:g.x-A,y:g.y},{x:g.x,y:g.y+A},{x:g.x,y:g.y-A}];b.slice(h+1).forEach(function(a){var b=a.circle;a=D(l,b.r,q[a.sets[0]]);w=w.concat(x({x:g.x,y:g.y,r:A},{x:b.x,y:b.y,r:a}))});w.forEach(function(b){e.x=b.x;e.y=b.y;var c=K(d,f);c<a.loss&&(a.loss=c,a.coordinates=
b)});return a},{loss:Number.MAX_VALUE,coordinates:void 0});c(a,h.coordinates)});return d},Z=function(a){var b={};0<a.length&&(b=P(a),a.filter(function(a){return!B(a)}).forEach(function(a){var c=a.sets;a=c.join();c=c.map(function(a){return b[a]});b[a]=h(c)}));return b},Q=function(a){var b={};return p(a)&&n(a.value)&&-1<a.value&&t(a.sets)&&0<a.sets.length&&!a.sets.some(function(a){var c=!1;!b[a]&&u(a)?b[a]=!0:c=!0;return c})},R=function(a){a=t(a)?a:[];var b=a.reduce(function(a,b){Q(b)&&B(b)&&0<b.value&&
-1===a.indexOf(b.sets[0])&&a.push(b.sets[0]);return a},[]).sort(),c=a.reduce(function(a,c){Q(c)&&!c.sets.some(function(a){return-1===b.indexOf(a)})&&(a[c.sets.sort().join()]=c);return a},{});b.reduce(function(a,b,c,d){d.slice(c+1).forEach(function(c){a.push(b+","+c)});return a},[]).forEach(function(a){if(!c[a]){var b={sets:a.split(","),value:0};c[a]=b}});return V(c)},aa=function(a,b,c){var d=c.bottom-c.top,e=c.right-c.left;d=Math.min(0<e?1/e*a:1,0<d?1/d*b:1);return{scale:d,centerX:a/2-(c.right+c.left)/
2*d,centerY:b/2-(c.top+c.bottom)/2*d}};U("venn","scatter",{borderColor:"#cccccc",borderDashStyle:"solid",borderWidth:1,brighten:0,clip:!1,colorByPoint:!0,dataLabels:{enabled:!0,verticalAlign:"middle",formatter:function(){return this.point.name}},inactiveOtherPoints:!0,marker:!1,opacity:.75,showInLegend:!1,states:{hover:{opacity:1,borderColor:"#333333"},select:{color:"#cccccc",borderColor:"#000000",animation:!1}},tooltip:{pointFormat:"{point.name}: {point.value}"}},{isCartesian:!1,axisTypes:[],directTouch:!0,
pointArrayMap:["value"],translate:function(){var a=this.chart;this.processedXData=this.xData;this.generatePoints();var b=R(this.options.data),c=Z(b),e=Y(b);b=Object.keys(c).filter(function(a){return(a=c[a])&&n(a.r)}).reduce(function(a,b){var d=c[b];b=d.x-d.r;var e=d.x+d.r,f=d.y+d.r;d=d.y-d.r;if(!n(a.left)||a.left>b)a.left=b;if(!n(a.right)||a.right<e)a.right=e;if(!n(a.top)||a.top>d)a.top=d;if(!n(a.bottom)||a.bottom<f)a.bottom=f;return a},{top:0,bottom:0,left:0,right:0});a=aa(a.plotWidth,a.plotHeight,
b);var f=a.scale,g=a.centerX,h=a.centerY;this.points.forEach(function(a){var b=t(a.sets)?a.sets:[],d=b.join(),l=c[d],q,k=e[d]||{};d=k.width;k=k.position;var w=a.options&&a.options.dataLabels;l&&(l.r?q={x:g+l.x*f,y:h+l.y*f,r:l.r*f}:l.d&&(q={d:l.d.reduce(function(a,b){"M"===b[0]?(b[1]=g+b[1]*f,b[2]=h+b[2]*f):"A"===b[0]&&(b[1]*=f,b[2]*=f,b[6]=g+b[6]*f,b[7]=h+b[7]*f);return a.concat(b)},[]).join(" ")}),k?(k.x=g+k.x*f,k.y=h+k.y*f):k={},n(d)&&(d=Math.round(d*f)));a.shapeArgs=q;k&&q&&(a.plotX=k.x,a.plotY=
k.y);d&&q&&(a.dlOptions=H(!0,{style:{width:d}},p(w)&&w));a.name=a.options.name||b.join("\u2229")})},drawPoints:function(){var a=this,c=a.chart,e=a.group,f=c.renderer;(a.points||[]).forEach(function(d){var g={zIndex:t(d.sets)?d.sets.length:0},h=d.shapeArgs;c.styledMode||b(g,a.pointAttribs(d,d.state));d.draw({isNew:!d.graphic,animatableAttribs:h,attribs:g,group:e,renderer:f,shapeType:h&&h.d?"path":"circle"})})},pointAttribs:function(a,b){var c=this.options||{};a=H(c,{color:a&&a.color},a&&a.options||
{},b&&c.states[b]||{});return{fill:v(a.color).setOpacity(a.opacity).brighten(a.brightness).get(),stroke:a.borderColor,"stroke-width":a.borderWidth,dashstyle:a.borderDashStyle}},animate:function(b){if(!b){var c=a.animObject(this.options.animation);this.points.forEach(function(a){var b=a.shapeArgs;if(a.graphic&&b){var d={},e={};b.d?d.opacity=.001:(d.r=0,e.r=b.r);a.graphic.attr(d).animate(e,c);b.d&&setTimeout(function(){a&&a.graphic&&a.graphic.animate({opacity:1})},c.duration)}},this);this.animate=null}},
utils:{addOverlapToSets:N,geometry:g,geometryCircles:k,getLabelWidth:M,getMarginFromCircles:E,getDistanceBetweenCirclesByOverlap:D,layoutGreedyVenn:P,loss:K,nelderMead:y,processVennData:R,sortByTotalOverlap:O}},{draw:f,shouldDraw:function(){return!!this.shapeArgs},isValid:function(){return n(this.value)}});m(I.venn,"afterSetOptions",function(a){var b=a.options.states;this instanceof I.venn&&Object.keys(b).forEach(function(a){b[a].halo=!1})})});x(a,"masters/modules/venn.src.js",[],function(){})});