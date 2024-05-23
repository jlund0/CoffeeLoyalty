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
import Logo from "../components/logo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const auth = getAuth(app);

function SignInPage(type = "login") {
  const [screenType, setType] = useState(type);

  return (
    <section className="w-screen h-screen flex-col">
      <header className=" flex w-screen justify-between h-20 absolute top-0">
        <Logo />
        <h1 className="">Admin Console</h1>
        <button>
          <Link to="/">Back to site</Link>
        </button>
      </header>
      <div className="flex">
        <div className="border-4">
          {screenType === "login" ? (
            <SignIn onClick={() => setType("register")} />
          ) : (
            <>
              <Button onClick={() => setType("login")}>
                Already have an account?
              </Button>
            </>
          )}
        </div>
        <div className="border-4">
          {screenType === "register" ? (
            <SignUp onClick={() => setType("login")} />
          ) : (
            <>
              <Button onClick={() => setType("register")}>
                Sign up your store today
              </Button>
            </>
          )}
        </div>

        {/* <div className="border-4">
          <button onClick={() => setType("login")}>Login</button>
          <button onClick={() => setType("register")}>SignUp</button>
          {screenType === "login" ? (
            <SignIn onClick={() => setType("register")} />
          ) : (
            <SignUp onClick={() => setType("login")} />
          )}
        </div> */}
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
      <div className="flex-col ">
        <h1>Create account</h1>
        <TextField
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField label="Password" variant="outlined" />
        <TextField label="Confirm Password" variant="outlined" />

        {/* <label>Name</label>
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
        </div> */}

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
        <Button
          type="submit"
          value="Create account"
          onClick={createNewUser}
          variant="contained"
        >
          Create Account
        </Button>
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
    <div className="flex-col">
      <h1>Sign In</h1>
      <TextField
        required
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button variant="contained" onClick={() => signInUser()}>
        Login
      </Button>

      {userid ? <Navigate to={`/console/${userid}`} replace={true} /> : null}
    </div>
  );
}
