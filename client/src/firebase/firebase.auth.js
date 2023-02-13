import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, providerGoogle } from "./index";

export const signInGoogle = async () => {
  return signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);

      return {
        credential,
      };
    })
    .catch((err) => {
      console.log("err", err);
    });
};
