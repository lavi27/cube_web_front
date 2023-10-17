import { create } from 'zustand';

interface Store {
	userIsRoaded: boolean;
	userId: number | null;
	userName: string | null;
	userIconId: number | null;
	setUser: (userId: number, userIconId: number) => void;
}

export const useBearStore = create<Store>((set) => ({
	userIsRoaded: false,
	userId: null,
	userName: null,
	userIconId: null,
	setUser: (userId, userIconId) => {
		set(() => ({ userId, userIconId, idIsRoaded: true }));
	},
}));
