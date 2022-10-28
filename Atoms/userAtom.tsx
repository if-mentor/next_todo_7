import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

export const loginState: RecoilState<Boolean> = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
