import './style.css';
import {errorHandle, data} from './data.js';

const weather = errorHandle(data.weather)(await data.getLocation());

// getPromice
(async () => {
	console.log(await weather)
})()

