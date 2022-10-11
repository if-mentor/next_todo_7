import { atom, RecoilState } from "recoil";

type User = {
	uid?: string;
};

export const userState: RecoilState<User> = atom({
	key: "userState",
	default: {},
});
