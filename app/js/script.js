(function () {

	var init = function () {
		_inverseWorld('.content__header');
		// date (2019.04.15 || 2019-04-15 || 2019/04/15)
		// for firefox date not (2019.04.15)
		_countdown('2019/04/15 00:00:00');
	};

	var _inverseWorld = function (selector) {
		var el = document.querySelector(selector);
		el.innerHTML = el.innerHTML.replace(/(\S+)\s*$/, '<span>$1</span>');
	};

	var _countdown = function (dateEnd) {
		var days, hours, minutes, seconds;
		var _days = document.querySelector('#days'),
			_hours = document.querySelector('#hours'),
			_min = document.querySelector('#min'),
			_sec = document.querySelector('#sec');

		target_date = new Date(dateEnd).getTime();

		if (isNaN(target_date)) return false;

		var timer = setInterval(calculate, 1000);

		function calculate() {
			var current_date = new Date().getTime();
			if (current_date > target_date) return false;
			var seconds_left = (target_date - current_date) / 1000;

			days = pad(parseInt(seconds_left / 86400));
			seconds_left = seconds_left % 86400;

			hours = pad(parseInt(seconds_left / 3600));
			seconds_left = seconds_left % 3600;

			minutes = pad(parseInt(seconds_left / 60));
			seconds = pad(parseInt(seconds_left % 60));

			_days.innerHTML = parseInt(days, 10);
			_hours.innerHTML = hours;
			_min.innerHTML = minutes;
			_sec.innerHTML = seconds;
		}
		function pad(n) {
			return (n < 10 ? '0' : '') + n;
		}
	}

	return init();
})();