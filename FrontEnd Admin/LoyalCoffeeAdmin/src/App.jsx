import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faTwitter, faGoogle} from '@fortawesome/free-brands-svg-icons'
import {faLock, faAt} from '@fortawesome/free-solid-svg-icons'
import MainPage from './Home'

function App() {
  const [hasAccount, setHasAccount] = useState(true)
  const handleClick = () => {
    setHasAccount(prevStatus => !prevStatus);
   };
  return (
    <>
    <h1 id="title">Coffee Loyality</h1>
    <MainPage/>
  
    {hasAccount?
      <div>
        <Login handleClick={handleClick}/>
      </div>:
      <div>
      <SignUp handleClick={handleClick}/>
      </div>}
    </>

  )
}
function handleEmailandPasswordLogin(email, password){
  return(
    conole.log(email + password)
  )
}

function Login({handleClick}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    return (
      <div>
        <FontAwesomeIcon icon={faAt}  />
        <input
          placeholder={"Email ID"}
          value={email}
          onChange={setEmail}
          inputMode="email"
        />
        <FontAwesomeIcon icon={faLock} />
        <input
          placeholder={"Password"}
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
        <button
          title="Login"
          onClick={() => handleEmailandPasswordLogin(email, password)}
        >Login</button>
        <h2>Forgot your password?</h2>
  
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <h2 style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
            Or, login with ...
          </h2>
          <FontAwesomeIcon
            icon={faFacebook}
            onClick={() => HandleFacebookLogin()} height={24} width={24} 
          />
          <FontAwesomeIcon icon={faGoogle} height={24} width={24} />
          <FontAwesomeIcon icon={faTwitter} height={24} width={24}/>
        </div>
  
        <div
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <h2>New to the app?</h2>
          <button onClick={handleClick}>
            <h2 style={{ color: "#AD40AF", fontWeight: "700" }}> Register</h2>
          </button>
        </div>
      </div>
    );
  }

function SignUp({handleClick}){
      const [password, setPassword] = useState("");
      const [name, setName] = useState("");
      const [lastname, setLastname] = useState("");
      const [email, setEmail] = useState("");
      const [passwordCheck, setPasswordCheck] = useState("");
    
      const handleEmailSignUp = (email, password, name) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(user, { displayName: name });
            addUser(user);
    
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
          });
      };
    
      return (
        <div>
          <h2>Sign Up with</h2>
          <button
            onClick={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FontAwesomeIcon icon={faGoogle} height={24} width={24} />
          </button>
          <button
            onClick={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FontAwesomeIcon icon={faFacebook}  height={24} width={24} />
          </button>
          <button
            onClick={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FontAwesomeIcon icon={faTwitter} height={24} width={24} />
          </button>
          <h2>Or Create account with Email</h2>
          <input
            
            placeholder="Store"
            onChangeText={setName}
          ></input>
          <input
            
            onChangeText={setEmail}
            placeholder="Email"
          ></input>
          <input
            
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          ></input>
          <input
            
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={setPasswordCheck}
          ></input>
          <button
            title="Create Account"
            onClick={() => handleEmailandPasswordLogin(email, password, name)}
          >Create Account</button>
                   <h2>Already have an account</h2>
          <button onClick={handleClick}>
            <h2 style={{ color: "#AD40AF", fontWeight: "700" }}> Sign in</h2>
          </button>
        </div>
  )
}


export default App


