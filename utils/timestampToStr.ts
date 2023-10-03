import moment from 'moment';

const timestampToStr = (timestamp: number) => {
	return moment.unix(timestamp).format('YYYY.MM.DD HH:mm:ss');
};

export default timestampToStr;
