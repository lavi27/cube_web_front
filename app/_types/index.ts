export interface User {
	userId: number;
	userName: string;
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
	userName: string;
	userNickname: string;
}
