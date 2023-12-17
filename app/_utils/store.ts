import { create } from 'zustand';
import { Account } from '@app/_types';

interface Store {
	userIsRoaded: boolean;
	userId: number | null;
	userName: string | null;
	userIconId: number | null;
	setUser: (account: Account) => void;
}

export const useBearStore = create<Store>((set) => ({
	userIsRoaded: false,
	userId: null,
	userName: null,
	userIconId: null,
	setUser: (account) => {
		set({
			userId: account.userId,
			userIconId: -1,
			userName: account.userNickname,
			userIsRoaded: true,
		});
	},
}));
