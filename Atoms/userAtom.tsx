import { atom, RecoilState } from 'recoil';

type User = {
  uid: string;
};

export const userState: RecoilState<User> = atom({
  key: 'userState',
  default: { uid: 'uid' }, // TODO: login機能が実装できたらuidは空文字にすること
});
