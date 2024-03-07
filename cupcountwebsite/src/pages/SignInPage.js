import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

function SignInPage(type="login"){
    const [screenType, setType] =  useState(type)
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const [number,setNumber] =useState("")
    const [name,setName] =useState("")
    return(
        <section>
            <div>
                <h1>CupCount</h1>
                <button>Login</button>
                <button>SignUp</button>
            </div>
            {type==="login"?
                <SignIn onClick={()=>setType("register")}/>
            : <SignUp onClick={()=>setType("login")}/>
}
            

        </section>
    )
}

export default SignInPage


function SignUp(onClick){
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const [number,setNumber] =useState("")
    const [name,setName] =useState("")
    const [checkPassword,setCheckPassword] =useState("")

    const createNewUser = () =>{
        createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    })}
    return(
        <div>
        <div>
        <h3>Name</h3>
        <input type="text" onChange={e=>setName(e)}/>
        <h3>Phone</h3>
        <input type="number" onChange={e=>setNumber(e)}/>
        <h3>Email</h3>
        <input type="email" onChange={e=>setEmail(e)}/>
        <h3>Password</h3>
        <input type="password" onChange={e=>setPassword(e)}/>
        <h3>Confirm Password</h3>
        <input type="password" onChange={e=>setCheckPassword(e)}/>
        
        <button title="Login" onClick={createNewUser}/>
    </div>
    <div>
        <button onClick={onClick}/>
    </div>
    </div>
    )
}

function SignIn(onClick){
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const [number,setNumber] =useState("")
    const [name,setName] =useState("")

    const signInUser = ()=>{
        signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
      }
    return(
<div>
                
                <h3 >Email</h3>
                <input onChange={(e)=>setEmail(e)} type="email"/>
                <h3>Password</h3>
                <input type="password" onChange={(e)=>setPassword(e)}/>
                <button title="Login" onClick={()=>signInUser()}/>
               
           
            <div>
                <button onClick={onClick}/>
            </div></div>
    )
}