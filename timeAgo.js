/**
 * 获取几天后的日期
 * @param {Number} AddDayCount 
 */
function GetDateStr(AddDayCount, time) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
	return y + '-' + m + '-' + d + ' ' + time;
}
/**
 * ios android 获取时间戳兼容写法
 * @param {*} date 
 * @param {*} time 
 */
function formatTimeStamp(date) {
	var dateStr = date;
	var iosDateStr = date.replace(/-/g, '/');
	return Date.parse(new Date(dateStr)) || Date.parse(new Date(iosDateStr));
}
/**
 * 获取今天周几
 */
function GetWeek() {
	var day = new Date().getDay();
	return day === 0 ? 7 : day;
}
/**
 * 倒计时开始
 * @param {Number} week 周几开始
 * @param {String} time 开始时间点
 * @param {Number} time 间隔天数限制
 */
function init(week, time, n) {
	var interval = week - GetWeek();
	if (interval >= 0) {
		var endTime = GetDateStr(interval, time);
		var endTimeStamp = formatTimeStamp(endTime);
		var nowTimeStamp = new Date().getTime();
		var intervalStamp = endTimeStamp - nowTimeStamp;
		var oneDayStamp = n * 24 * 60 * 60 * 1000;
		if (intervalStamp <= oneDayStamp) {
			console.log('显示倒计时');
			Tick(endTimeStamp);
		} else {
			console.log('隐藏倒计时');
		}
	} else {
		console.log('隐藏倒计时');
		return;
	}
}
/**
 * 倒计时插件
 * @param {Number} endTimeStamp 
 */
function Tick(endTimeStamp) {
	Tictac.init({
		currentTime: new Date().getTime(), //设置当前时间
		interval: 3000, //执行callback的时间间隔
		callback: function() {
			//重复执行的回调
		}
	});
	console.log(endTimeStamp);
	Tictac.create('tick', {
		targetId: 'tick', //显示计时器的容器
		expires: endTimeStamp, //目标时间
		format: {
			//格式化对象
			days: '{d}天 ',
			hours: '{hh}小时 ',
			minutes: '{mm}分 ',
			seconds: '{ss}秒'
		},
		timeout: function() {
			//计时器 timeout 回调
		}
	});
}

/**
 * 初始化
 */
init(7, '11:25:00', 2);
