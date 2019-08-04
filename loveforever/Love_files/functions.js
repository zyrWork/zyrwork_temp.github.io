
// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function setDay(obj,dTime){
//当两个时间通过计算后的相差天数等于开始时间所在月的天数时，月份加一，天数重置为零
	if(obj.D>=parseInt(dTime)){
		 obj.D=obj.D-parseInt(dTime);
		 obj.M=obj.M>=12?obj.M%12:obj.M;
		 obj.M+=1;
		 if(obj.M>=12){
			obj.Y+=1;
		 }
	 };
}

function timeElapse(d1){
	var d2 = new Date();

    var obj={},
     	M1=d1.getMonth()+1,
     	D1=d1.getDate(),
     	M2=d2.getMonth()+1,
     	D2=d2.getDate();
    obj.Y=d2.getFullYear() - d1.getFullYear() + (M1*100+D1 > M2*100+D2 ? -1 : 0);//相差年份计算
    obj.M=(d2.getFullYear() - d1.getFullYear()) * 12 + M2 - M1 + (D1 > D2 ? -1 : 0);
    if(D2>D1){//结束时间的日期大于开始时间的日期，则相差天数为结束日期天数减开始日期天数加1
		obj.D=D2-D1+1;
		if(M2==1||M2==3||M2==5||M2==7||M2==8||M2==10||M2==12){
			 setDay(obj,"31");
		 }else if(M2==4||M2==6||M2==9||M2==11){
			 setDay(obj,"30");
		 }else if(M2==2){
			 if(d2.getFullYear()%4==0){
				 setDay(obj,"29");
			 }else{
				 setDay(obj,"28");
			 }
		 }
	}else if(D2==D1){//结束时间的日期等于开始时间的日期，则相差天数为1
		obj.D=1;
	}else{//结束时间的日期小于于开始时间的日期，则相差天数为开始时间所在月的天数减去开始时间日期加上结束时间的日期
		 if(M1==1||M1==3||M1==5||M1==7||M1==8||M1==10||M1==12){
			 obj.D=31-D1+D2+1;
			 setDay(obj,"31");
		 }else if(M1==4||M1==6||M1==9||M1==11){
			 obj.D=30-D1+D2+1;
			 setDay(obj,"30");
		 }else if(M1==2){
			 if(d1.getFullYear()%4==0){
				 obj.D=29-D1+D2+1;
				 setDay(obj,"29");
			 }else{
				 obj.D=28-D1+D2+1;
				 setDay(obj,"28");
			 }
		 };
	};
    obj.M=obj.M>=12?obj.M%12:obj.M;
    var text="";
    if(obj.D>0){
    	text="零 <span class=\"digit\">"+obj.D+"</span> 天 ";
    };
    if(obj.M>0){
    	text="<span class=\"digit\">"+obj.M+"</span> 个月 "+text;
    	if(obj.Y>0){
    		text="<span class=\"digit\">"+obj.Y+"</span> 年 "+text;
    	}
    };
    if(obj.M==0){
    	if(obj.Y>0){
    		if(text){
    			text="<span class=\"digit\">"+obj.Y+"</span> 年 "+text;
    		}else{
    			text="<span class=\"digit\">"+obj.Y+"</span> 年 ";
    		};
    	};
    };

	var seconds = (Date.parse(d2) - Date.parse(d1)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	var result = text+"\n"+",现在是第 <span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒"; 
	$("#clock").html(result);

}