export interface User {
	userId: number;
	userNickname: string;
	createDate: number;
	followerCount: number;
	followingCount: number;
	postCount: number;
}

export interface Post {
	postId: number;
	userId: number;
	content: string;
	createDate: number;
	likeCount: number;
	userNickname: string;
	isLiked: boolean;
}

export interface Account {
	userId: number;
	userNickname: string;
}
