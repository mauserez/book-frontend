import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { immer } from "zustand/middleware/immer";
import { jwtDecode } from "jwt-decode";

export type SessionStoreState = {
	token: string | null;
	exp: number;
	user: {
		id: string | null;
		name: string | null;
		description: string | null;
		login: string | null;
	};
	iat: number;
	reset: () => void;
	setStore: (token: string) => void;
};

const initValue: SessionStoreState = {
	token: null,
	exp: 0,
	user: {
		id: null,
		name: null,
		description: null,
		login: null,
	},
	iat: 0,
	reset: () => {},
	setStore: () => {},
};

export type JWT = {
	exp: number;
	user: {
		id: string;
		name: string | null;
		description: string | null;
		login: string;
	};
	iat: number;
};

export const useSessionStore = create<SessionStoreState>()(
	devtools(
		persist(
			immer((set /* , get */) => ({
				...initValue,
				reset: () => set(initValue),
				setStore: (token: string) =>
					set((state) => {
						const decoded = jwtDecode(token) as JWT;
						const newState = { ...decoded, token: token };
						return { ...state, ...newState };
					}),
			})),
			{
				name: "user",
			}
		),
		{
			serialize: {
				options: {
					map: true,
				},
			},
		}
	)
);
