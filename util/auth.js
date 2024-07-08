import axios from "axios";

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const responce = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = responce.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
