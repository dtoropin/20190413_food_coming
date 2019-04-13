(function () {

	var init = function () {
		_inverseWorld('.content__header');
		_countdown('2019.07.01');
		_setUpListners();
	};

	var _setUpListners = function () {
		// прослушка событий
	};

	var _inverseWorld = function (selector) {
		$(selector).each(function () {
			this.innerHTML = this.innerHTML.replace(/(\S+)\s*$/, '<span>$1</span>');
		});
	};

	var _countdown = function (dateEnd) {
		var days, hours, minutes, seconds;
		var _days = $('#days'),
			_hours = $('#hours'),
			_min = $('#min'),
			_sec = $('#sec');

		target_date = new Date(dateEnd).getTime();

		if (isNaN(target_date)) return false;

		var timer = setInterval(calculate, 1000);

		function calculate() {
			var current_date = new Date().getTime();
			var seconds_left = (target_date - current_date) / 1000;

			days = pad(parseInt(seconds_left / 86400));
			seconds_left = seconds_left % 86400;

			hours = pad(parseInt(seconds_left / 3600));
			seconds_left = seconds_left % 3600;

			minutes = pad(parseInt(seconds_left / 60));
			seconds = pad(parseInt(seconds_left % 60));

			_days.html(parseInt(days, 10));
			_hours.html(hours);
			_min.html(minutes);
			_sec.html(seconds);
		}
		function pad(n) {
			return (n < 10 ? '0' : '') + n;
		}
	}

	return init();
})();