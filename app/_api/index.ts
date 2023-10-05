import axios from 'axios';
import { User, Post } from '@app/_types';
import CONFIG from '@root/config.json';
import { toUriQuery } from '@app/_utils';

const apiConn = !CONFIG.IS_UI_DEBUG
	? axios.create({
			baseURL: CONFIG.API_URL + '/api',
	  })
	: undefined;

apiConn?.interceptors.response.use(
	(res) => res,
	(err) => {
		if (typeof err.response === 'undefined') {
			console.error(err);
			alert('알수없는 통신 에러가 발생했습니다.');
		} else if (err.status == 500) {
			console.error(err);
			alert('서버 통신 에러가 발생했습니다.');
			return;
		}

		return Promise.reject(err);
	}
);

export const getPost = async (postId: number): Promise<Post> => {
	const query = toUriQuery({
		postId: postId,
	});

	return await apiConn?.get(`/post${query}`).then((res) => res.data);
};

export const getSearch = async (
	length?: number,
	userId?: number,
	dateFrom?: number
): Promise<Post[]> => {
	const query = toUriQuery({
		userId: userId,
		dateFrom: dateFrom,
		length: length,
	});

	return await apiConn?.get(`/post/search${query}`).then((res) => res.data);
};

export const postPost = async (content: string): Promise<null> => {
	return await apiConn?.post('/post', { content }).then((res) => res.data);
};

export const getUser = async (userId: number): Promise<User> => {
	const query = toUriQuery({
		userId: userId,
	});

	return await apiConn?.get(`/user${query}`).then((res) => res.data);
};

export const postSignin = async (
	userName: string,
	userPw: string
): Promise<null> => {
	const query = toUriQuery({
		userName: userName,
		userPassword: userPw,
	});

	return await apiConn?.get(`/user/signin${query}`).then((res) => res.data);
};

export const postSignup = async (
	userName: string,
	userPw: string
): Promise<null> => {
	const query = toUriQuery({
		userName: userName,
		userPassword: userPw,
	});

	return await apiConn?.get(`/user/signup${query}`).then((res) => res.data);
};
