import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase/firebaseConfig";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import AddUserToFirestore from "../firebase/createUser";
import { Navigate } from "react-router-dom";
const auth = getAuth(app);

function SignInPage(type = "login") {
  const [screenType, setType] = useState(type);
  return (
    <section>
      <div>
        <header>
          <Link to="/">
            <h1>CupCount</h1>
          </Link>
          <h1>Store Sign In</h1>
          <button onClick={() => setType("login")}>Login</button>
          <button onClick={() => setType("register")}>SignUp</button>
        </header>
        {screenType === "login" ? (
          <SignIn onClick={() => setType("register")} />
        ) : (
          <SignUp onClick={() => setType("login")} />
        )}
      </div>
    </section>
  );
}

export default SignInPage;

function SignUp({ onClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [userid, setUserid] = useState();
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const createNewUser = () => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        console.log("created new user: ", user.uid);

        AddUserToFirestore(user);
        setUserid(user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div>
      <div>
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label>Phone</label>
        <input type="text" onChange={(e) => setNumber(e.target.value)} />
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <div>
          <label>Password</label>
          <input
            type={type}
            id="psw"
            name="psw"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span class="" onClick={handleToggle}>
            <Icon class="absolute mr-10" icon={icon} size={25} />
          </span>
          <PasswordStrengthBar password={password} />
        </div>

        {/* <div id="message">
          <h3>Password must contain the following:</h3>
          <p id="letter" class="invalid">
            A <b>lowercase</b> letter
          </p>
          <p id="capital" class="invalid">
            A <b>capital (uppercase)</b> letter
          </p>
          <p id="number" class="invalid">
            A <b>number</b>
          </p>
          <p id="length" class="invalid">
            Minimum <b>8 characters</b>
          </p>
        </div> */}
        <button type="submit" value="Create account" onClick={createNewUser}>
          Create Account
        </button>
      </div>
      <div>
        <button onClick={onClick}>Already have an account?</button>
      </div>
      {userid ? <Navigate to={`/console/${userid}`} replace={true} /> : null}
    </div>
  );
}

function SignIn({ onClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [userid, setUserId] = useState();
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const signInUser = () => {
    console.log("siging in user");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setUserId(user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div>
      <label>Email or Phone number</label>
      <input onChange={(e) => setEmail(e.target.value)} type="email" />
      <div>
        <label>Password</label>

        <input
          type={type}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="" onClick={handleToggle}>
          <Icon className="absolute mr-10" icon={icon} size={25} />
        </span>
      </div>
      <button>forgot password?</button>
      <button title="Login" onClick={() => signInUser()}>
        Login
      </button>

      <div>
        <button onClick={onClick}>or sign up your store for free?</button>
      </div>
      {userid ? <Navigate to={`/console/${userid}`} replace={true} /> : null}
    </div>
  );
}
