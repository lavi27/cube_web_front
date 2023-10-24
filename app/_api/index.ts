import axios from 'axios';
import { User, Post } from '@app/_types';
import CONFIG from '@root/config.json';
import { toUriQuery } from '@app/_utils';
import router from 'next/router';

const apiConn = !CONFIG.IS_UI_DEBUG
	? axios.create({
			baseURL: CONFIG.API_URL + '/api',
			withCredentials: true,
	  })
	: undefined;

apiConn?.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.status == 500) {
			console.error(err);
			alert('서버 통신 에러가 발생했습니다.');
			return;
		} else if (err.response.data) {
			console.error(err.response.data);

			switch (err.response.data.errorCode) {
				case 100: {
					alert('로그인이 필요합니다.');
					router.push('/signin');
					break;
				}
				case 101: {
					alert('이미 로그인 되어있습니다.');
					router.push('/');
					break;
				}
			}
		} else {
			console.error(err);
			alert('알수없는 통신 에러가 발생했습니다.');
		}

		return Promise.reject(err.response.data);
	}
);

//ANCHOR - Account
export const getAccount = async (): Promise<number> => {
	return await apiConn?.get(`/account/`).then((res) => res.data);
};

export const postSignin = async (
	userName: string,
	userPw: string
): Promise<null> => {
	return await apiConn
		?.post(`/account/signin/`, { userName, userPassword: userPw })
		.then((res) => res.data);
};

export const postSignup = async (
	userName: string,
	userPw: string
): Promise<null> => {
	return await apiConn
		?.post(`/account/signup/`, { userName, userPassword: userPw })
		.then((res) => res.data);
};

//ANCHOR - Post
export const getPost = async (postId: number): Promise<Post> => {
	const uriQuery = toUriQuery({
		postId,
	});

	return await apiConn?.get(`/post/${uriQuery}`).then((res) => res.data);
};

export const getSearch = async ({
	length,
	userId,
	dateFrom,
	keywords,
}: {
	length?: number;
	userId?: number;
	dateFrom?: number;
	keywords?: string[];
}): Promise<Post[]> => {
	const uriQuery = toUriQuery({
		userId,
		dateFrom,
		length,
		keywords: keywords?.join(' '),
	});

	return await apiConn?.get(`/post/search/${uriQuery}`).then((res) => res.data);
};

export const postWrite = async (content: string): Promise<null> => {
	return await apiConn
		?.post('/post/write/', { content })
		.then((res) => res.data);
};

export const postLike = async (postId: number): Promise<null> => {
	return await apiConn?.post('/post/like/', { postId }).then((res) => res.data);
};

export const postUnlike = async (postId: number): Promise<null> => {
	return await apiConn
		?.post('/post/unlike/', { postId })
		.then((res) => res.data);
};

//ANCHOR - User
export const getUser = async (userId: number): Promise<User> => {
	const uriQuery = toUriQuery({
		userId,
	});

	return await apiConn?.get(`/user/${uriQuery}`).then((res) => res.data);
};

export const postFollow = async (userId: number): Promise<null> => {
	return await apiConn
		?.post('/user/follow/', { userId })
		.then((res) => res.data);
};

export const postUnfollow = async (userId: number): Promise<null> => {
	return await apiConn
		?.post('/user/unfollow/', { userId })
		.then((res) => res.data);
};
