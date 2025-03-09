class apiStuff {
	async weather(place = 'london') {
		const weatherReport = await fetch(
			`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=WYKTTPYG29F83WMFFLGWFGNMY&unitGroup=metric`,
			{ mode: 'cors' }
		);
		const jsoning = await weatherReport.json();
		const data = {
			location: jsoning.timezone,
			days: jsoning.days,
			current: jsoning.currentConditions
		};
		return data;
	}

	getLocationAccess = new Promise((success, cancel) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success);
		} else {
			cancel('london');
		}
	});

	async getLocation() {
		return await this.getLocationAccess
			.then((location) => {
				return `${location.coords.latitude},${location.coords.longitude}`;
			})
			.catch((any) => {
				return any;
			});
	}
}

function errorHandle(fn) {
	return (...args) => {
		return fn(...args).catch((error) => {
			console.error(`We have this ${error}`);
		});
	};
}

const data = new apiStuff();

export { errorHandle, data };
