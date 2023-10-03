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

export default toUriQuery;
