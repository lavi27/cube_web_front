import CONFIG from '@root/config.json';
import moment from 'moment';

const timestampToStr = (timestamp: number) => {
	return moment.unix(timestamp).format('YYYY.MM.DD HH:mm:ss');
};

const toStaticURL = (url: string) => {
	return `${CONFIG.API_URL}/static/${url}`;
};

const toUriQuery = (values: Record<string, string | number | undefined>) => {
	const res: string[] = [];

	Object.keys(values).forEach((key) => {
		let val = values[key];
		if (typeof val == 'number') val = val.toString();
		if (val == undefined) return;

		res.push(`${key}=${val}`);
	});

	if (res.length == 0) {
		return '';
	}

	return '?' + res.join('&');
};

export { timestampToStr, toStaticURL, toUriQuery };
