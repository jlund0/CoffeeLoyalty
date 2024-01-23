import { Text, Pressable } from "react-native";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { app, signInWithPhoneNumber } from "../firebase";

const auth = getAuth(app);
auth.languageCode = "it";

window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
  size: "invisible",
  callback: (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  },
});

signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    // ...
  })
  .catch((error) => {
    // Error; SMS not sent
    grecaptcha.reset(window.recaptchaWidgetId);
  });

const phoneNumber = getPhoneNumberFromUserInput();
const appVerifier = window.recaptchaVerifier;

//Sign in the user with the verification code
const code = getCodeFromUserInput();
confirmationResult
  .confirm(code)
  .then((result) => {
    // User signed in successfully.
    const user = result.user;
    // ...
  })
  .catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
  });

firebase.auth().signInWithCredential(credential);
export function PhoneSignIn() {
  return (
    <Pressable>
      <Text>Phone Sign In</Text>
    </Pressable>
  );
}
