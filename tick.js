!(function() {
	'use strict';
	var a = {
		_currentTime: 0,
		_lastTimeForCallback: 0,
		_lastTimeForInterval: 0,
		_timer: null,
		_instanceHash: {},
		_callbackInterval: 0,
		_timerInterval: 300,
		_callbackCountDown: 0,
		_callback: null,
		init: function(a) {
			var b = this;
			(b._currentTime = a.currentTime),
				(b._lastTimeForCallback = a.currentTime),
				(b._lastTimeForInterval = +new Date()),
				(b._callback = a.callback),
				(b._callbackInterval = a.interval),
				(b._callbackCountDown = 0),
				b._run();
		},
		_run: function() {
			var a = this;
			a._timer = setInterval(function() {
				(a._currentTime += +new Date() - a._lastTimeForInterval),
					(a._lastTimeForInterval = +new Date()),
					a._check();
			}, a._timerInterval);
		},
		_check: function() {
			var a = this;
			for (var b in a._instanceHash) a._instanceHash.hasOwnProperty(b) && a._sync(b);
			a._callbackCountDown >= a._callbackInterval
				? ((a._callbackCountDown -= a._callbackInterval),
					(a._lastTimeForCallback = a._currentTime - a._callbackCountDown),
					a._callback())
				: (a._callbackCountDown = a._currentTime - a._lastTimeForCallback);
		},
		execute: function() {
			var a = this;
			(a._lastTimeForCallback = a._currentTime), (a._callbackCountDown = 0), a._callback();
		},
		_sync: function(a) {
			var b = this,
				c = b._instanceHash[a],
				d = c.expires <= b._currentTime ? 0 : c.expires - b._currentTime;
			if (0 === d) b.remove(a), 'function' == typeof c.timeout && c.timeout();
			else if ('string' == typeof c.targetId) {
				var e = document.getElementById(c.targetId);
				e && (e.innerHTML = b.util.format(d, c.format, c.formatIgnore));
			}
		},
		create: function(a, b) {
			var c = this;
			c._instanceHash.hasOwnProperty(a) || (c._instanceHash[a] = b);
		},
		reset: function(b, c) {
			var d = this;
			d._instanceHash.hasOwnProperty(b) && (d._instanceHash[b] = a.util.extend(d._instanceHash[b], c));
		},
		remove: function(a) {
			var b = this;
			b._instanceHash.hasOwnProperty(a) &&
				(b._instanceHash[a].targetId && (document.getElementById(b._instanceHash[a].targetId).innerHTML = ''),
				delete b._instanceHash[a]);
		},
		getCurrentTime: function() {
			return this._currentTime;
		},
		regulate: function(a) {
			var b = this;
			(b._currentTime = a),
				(b._lastTimeForCallback = a),
				(b._lastTimeForInterval = +new Date()),
				(b._callbackCountDown = 0),
				clearInterval(b._timer),
				b._run();
		},
		destroy: function() {
			clearInterval(this._timer), (this._timer = null);
			for (var a in this._instanceHash) this.remove(a);
			this._instanceHash = {};
		}
	};
	a.util = {
		format: function(a, c, d) {
			var e = '';
			if (0 > a || 'object' != typeof c) return e;
			'[object Boolean]' !== Object.prototype.toString.call(d) && (d = !0);
			var f = {
				days: Math.floor(a / 864e5),
				hours: Math.floor((a % 864e5) / 36e5),
				minutes: Math.floor((a % 36e5) / 6e4),
				seconds: Math.floor((a % 6e4) / 1e3)
			};
			for (var g in c)
				if (c.hasOwnProperty(g)) {
					var h = f[g];
					(0 === h && '' === e && d && 'seconds' !== g) ||
						(e += c[g].replace(b[g], function() {
							return 10 > h && arguments[0].length > 3 && (h = '0' + h), h;
						}));
				}
			return e;
		},
		extend: function() {
			for (var a = arguments[0], b = 1; b < arguments.length; b++) {
				var c = arguments[b];
				if (c) for (var d in c) a[d] = c[d];
			}
			return a;
		}
	};
	var b = { days: /{[Dd]}/g, hours: /{[Hh]{2}}|{[Hh]}/g, minutes: /{[Mm]{2}}|{[Mm]}/g, seconds: /{[Ss]{2}}|{[Ss]}/g };
	window.Tictac || (window.Tictac = a);
})();
