import './style.css';
import { errorHandle, data } from './data.js';

// getPromice
(async () => {
	const top = document.querySelector('.location');
	const paras = createElements(2, 'p');
	const mainBox = document.querySelector('.mainBox');
	paras.forEach((e) => top.appendChild(e));
	paras[0].textContent = 'Please wait...';
	const weather = await errorHandle(data.weather)(await data.getLocation());
	try {
		headerDealer(paras, weather);
		weather.days.forEach((el) => {
			mainBox.appendChild(addCard(el));
		});
	} catch (e){
		console.log(e)
		paras[0].textContent = 'Sorry, try after few minutes';
		return;
	}
})();

function createElements(num, el, clases = '') {
	const array = [];
	for (let i = 0; i < num; i++) {
		const element = document.createElement(el);
		element.classList = clases;
		array.push(element);
	}
	return array;
}

function headerDealer(paras, weather) {
	paras[0].innerHTML = `Temp: ${weather.current.temp}C&deg; - Feels like: ${weather.current.feelslike}C&deg;`;
	if (weather.location.includes('/')) {
		paras[1].textContent = `${weather.current.conditions} day in ${weather.location.split('/')[1]}`;
	} else {
		paras[1].textContent = `${weather.current.conditions} day in ${weather.location}`;
	}
}

function addCard(data) {
	const date = new Date(data.datetime);
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	const div = document.createElement('div');
	div.classList = "card";
	const paras = createElements(4, 'p');
	paras[0].textContent = days[date.getDay()];
	paras[1].innerHTML = `${data.tempmax}&deg; ${data.tempmin}&deg;`;
	paras[2].textContent = data.conditions;
	paras[3].textContent = `${date.getDate()}/${+date.getMonth() + 1}`;

	for (let i = 0; i < 4; i++) {
		div.appendChild(paras[i]);
	}

	return div;
}
