window.onload= function(){
	var currentYear = new Date().getFullYear(); //四位数年份
	var currentMonth = new Date().getMonth()+1; //0-11 加一
	setCurrentYearAndMonth();
	//上一年，起点是1900
	document.querySelector('.lastyear').onclick = function(){
		currentYear = currentYear-1 <1900 ? currentYear: currentYear-1; 
		setCurrentYearAndMonth();
	}
	//上个月 
	document.querySelector('.lastmonth').onclick = function(){
		if(currentMonth==1 && currentYear==1900) return;
		currentYear = currentMonth-1 < 1 ? currentYear - 1:currentYear; 
		currentMonth = currentMonth-1 < 1 ? 12: currentMonth-1; 
		setCurrentYearAndMonth();
	}
	//下一年
	document.querySelector('.nextyear').onclick = function(){
		currentYear = currentYear + 1; 
		setCurrentYearAndMonth();
	}
	//下个月
	document.querySelector('.nextmonth').onclick = function(){
		currentYear = currentMonth + 1 >12 ? currentYear + 1:currentYear; 
		currentMonth = currentMonth + 1 >12 ? 1: currentMonth+1;
		setCurrentYearAndMonth();
	}
	function getDaysOfMonth(currentYear,currentMonth){
		//是否闰年
		var is_leapYear = currentYear%100==0 && currentYear%400==0;
		//是否闰月
		var is_leapMonth = currentMonth ==2;
		//计算当前天数
		return is_leapYear && is_leapMonth ?29:is_leapMonth?28:[1,3,5,7,8,10,12].indexOf(currentMonth)!=-1?31:30;
	}
	//设置当前年月日
	function setCurrentYearAndMonth(){
		document.querySelector('.currentyear').innerText = currentYear;
		document.querySelector('.currentmonth').innerText =currentMonth;
		//是否当天
		var is_currentDay = new Date().getFullYear()==currentYear && new Date().getMonth()+1==currentMonth;
		//计算当前天数
		var daysOfCurrentMonth = getDaysOfMonth(currentYear,currentMonth);
		var daysLastMonth = getDaysOfMonth(currentYear,currentMonth-1);
		var daysNextMonth = getDaysOfMonth(currentMonth+1>12?currentYear+1:currentYear,(currentMonth+1>12?currentMonth-11:currentMonth+1));
		//布局日期
		var currentDom = "";
		for (var i = 1; i <= daysOfCurrentMonth; i++) {
			var d = i;
			var m = currentMonth==1 || currentMonth==2?currentMonth+12:currentMonth;
			var y = currentMonth==1 || currentMonth==2? currentYear-1:currentYear;
			var W = Math.round((d+2*m+3*(m+1)/5+y+y/4-y/100+y/400)%7); //基姆拉尔森计算公式计算日期
			if(i==1){
				for (var j = W; j >= 1; j--) {
					currentDom += "<label>"+(daysLastMonth+1-j)+"</label>"
				};
				currentDom += "<label style='"+(is_currentDay && i==new Date().getDate()?"color:red;background-color:#ccf;":"")+"'>"+i+"</label>";
			}else if(i==daysOfCurrentMonth){
				currentDom += "<label style='"+(is_currentDay && i==new Date().getDate()?"color:red;background-color:#ccf;":"")+"'>"+i+"</label>";
				for (var k = 1; k <= 6-W; k++) {
					currentDom += "<label>"+k+"</label>"
				};
			}else{
				currentDom += "<label style='"+(is_currentDay && i==new Date().getDate()?"color:red;background-color:#ccf;":"")+"'>"+i+"</label>";
			}
		};
		document.querySelector('.dinamicDom').innerHTML = currentDom;
		var labelList = document.querySelectorAll('.dinamicDom label');
		for (var i = labelList.length - 1; i >= 0; i--) {
			labelList[i].onclick = function(){
				document.querySelector('.datepicker').value=currentYear+"-"+currentMonth+"-"+this.innerText;
				document.querySelector('.datepickerBox').style.display ="none";
			}
		};
	}
	document.querySelector('.datepicker').onfocus = function(){
		document.querySelector('.datepickerBox').style.display ="inline-block";
		document.querySelector('.datepickerBox').style.top =document.querySelector('.datepicker').offsetTop+document.querySelector('.datepicker').offsetHeight+"px";
		document.querySelector('.datepickerBox').style.left =document.querySelector('.datepicker').offsetLeft+"px";
	}
}