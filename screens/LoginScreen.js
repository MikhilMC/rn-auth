import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent.js";
import LoadingOverlay from "../components/UI/LoadingOverlay.js";
import { login } from "../util/auth.js";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context.js";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log(error);
      const title = "Authentication failed!";
      const message =
        "Could not log you in. Please check the credentials or try again later";
      Alert.alert(title, message);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
