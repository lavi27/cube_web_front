import { API_URL } from '@root/config.json';

const toSaticURL = (url: string) => {
	return `${API_URL}/static/${url}`;
};

export default toSaticURL;
