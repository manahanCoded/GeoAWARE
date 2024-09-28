import {atom} from "recoil"
import { user_loggedin } from "@/configure/user_loggedin";

const userAtom = atom<user_loggedin | null>({
    key: "userAtom",
    default: null, 
    effects: [
      ({ setSelf }) => {
        if (typeof window !== "undefined") {
          const savedUserInfo = localStorage.getItem("userInfo");
          if (savedUserInfo) {
            setSelf(JSON.parse(savedUserInfo));
          }
        }
      },
    ],
  });

export default userAtom