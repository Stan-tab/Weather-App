import './style.css';
// import weather from '../../some.json'; //example of data
import { errorHandle, data } from './data.js';

// getPromice
(async () => {
	const top = document.querySelector('.location');
	const paras = createElements(2, 'p');
	paras.forEach((e) => top.appendChild(e));
	paras[0].textContent = 'Please wait...';
	const weather = await errorHandle(data.weather)(await data.getLocation());
	try {
		paras[0].innerHTML = `Temp: ${weather.current.temp}C&deg; - Feels like: ${weather.current.feelslike}C&deg;`;
		if (weather.location.includes('/')) {
			paras[1].textContent = `${weather.current.conditions} day in ${weather.location.split('/')[1]}`;
		} else {
			paras[1].textContent = `${weather.current.conditions} day in ${weather.location}`;
		}
	} catch {
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
