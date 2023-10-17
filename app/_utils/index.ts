import CONFIG from '@root/config.json';
import moment from 'moment';
import 'moment/locale/ko';

moment.locale('ko');

// return moment.unix(timestamp).format('YYYY.MM.DD HH:mm:ss');

export const timestampFromNow = (timestamp: number) => {
	return moment.unix(timestamp).fromNow();
};

export const intToCompact = (number: number) => {
	return new Intl.NumberFormat('ko-KR', {
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(number);
};

export const toStaticURL = (url: string) => {
	return `${CONFIG.API_URL}/static/${url}`;
};

export const toUriQuery = (
	values: Record<string, string | number | undefined>
) => {
	const res: string[] = [];

	Object.keys(values).forEach((key) => {
		let val = values[key];
		if (typeof val == 'number') val = val.toString();
		if (val == undefined) return;

		res.push(`${key}=${encodeURIComponent(val)}`);
	});

	if (res.length == 0) {
		return '';
	}

	return '?' + res.join('&');
};
