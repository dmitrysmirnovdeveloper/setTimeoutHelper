function setTimeoutHelper(callback, delay)
{
	// Текущий объект
	var that = this,
		// Время старта таймера
		startTime = Date.now(),
		// Идентификатор таймера
		timerId,
		// Время запуска паузы
		pauseStart,
		// Время окончания паузы
		pauseStop,
		// Время перезапуска таймера
		restart,
		// Статусы состояния
		status = {
			pause: false,
			resume: false,
			start: false
		};
	// Функция остановки таймера
	that.stop = function(func)
	{
		// Если статусы запуска и перезапуска false
		if(!status.start && !status.resume)
		{
			return false;
		}
		// Устанавливаем статусы в false
		status.start = false;
		status.resume = false;
		// Останавливаем таймер
		window.clearTimeout(timerId);
		// Если была передана функция
		if(typeof func === 'function')
		{
			// Вызаваем функцию
			func.call();
		}
		return true;
	};
	// Функция паузы таймера
	that.pause = function(func)
	{
		// Если статусы запуска и перезапуска false
		if(!status.start && !status.resume)
		{
			return false;
		}
		// Устанавливаем статус паузы в true
		status.pause = true;
		// Время запуска паузы
		pauseStart = Date.now();
		// Останавливаем таймер
		that.stop();
		// Если была передана функция
		if(typeof func === 'function')
		{
			// Вызаваем функцию
			func.call();
		}
		return true;
	};
	// Функция восстановления таймера
	that.resume = function(func)
	{
		// Если паузы не было
		if(!status.pause)
		{
			return false;
		}
		// Устанавливаем статус паузы в false
		status.pause = false;
		// Устанавливаем статус перезапуска в true
		status.resume = true;
		// Время возобновления таймера
		pauseStop = Date.now();
		// Вычисляем общее время паузы
		// И добавляем его к времени старта
		startTime += pauseStop - pauseStart;
		// Вычисляем сколько еще осталось времени
		restart = delay - (pauseStop - startTime);
		// Перезапускаем таймер с новым временем
		timerId = window.setTimeout(callback, restart);
		// Если была передана функция
		if(typeof func === 'function')
		{
			// Вызаваем функцию
			func.call();
		}
		return true;
	};
	// Перезапуск таймера
	that.reset = function(func)
	{
		// Если статусы запуска и перезапуска false
		if(!status.start && !status.resume)
		{
			return false;
		}
		// Останавливаем интервал
		that.stop();
		// Перезапускаем интервал
		startFunc();
		// Если была передана функция
		if(typeof func === 'function')
		{
			// Вызаваем функцию
			func.call();
		}
	}
	// Функция старта таймера
	var startFunc = function()
	{
		// Статус старта таймера
		status.start = true;
		// Время запуска таймера
		startTime = Date.now();
		// Запуск таймера
		timerId = window.setTimeout(callback, delay);
	};
	// Запускаем таймер
	startFunc();
	// Возвращаем объект
	return that;
}
