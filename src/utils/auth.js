import { BaseUrl } from "../utils/constants";

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

// Register
export const signup = async ({ name, avatar, email, password }) => {
  const res = await fetch(`${BaseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return checkResponse(res);
};

// Signin
export const signin = async ({ email, password }) => {
  const res = await fetch(`${BaseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
};

// Check Token
export const checkToken = (token) => {
  return fetch(`${BaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
