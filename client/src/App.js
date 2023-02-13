import { signInGoogle } from "./firebase/firebase.auth";
import axios from "axios";

function App() {
  const handleSignInGoogle = async () => {
    const result = await signInGoogle();
    const idToken = result.credential.idToken;

    const res = await axios.get("http://localhost:3000/auth/google", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    console.log("idToken ", idToken);
    // console.log("res ", res);
  };

  return (
    <div className="App">
      <button onClick={handleSignInGoogle} className="App-link">
        Sign With Google
      </button>
    </div>
  );
}

export default App;
