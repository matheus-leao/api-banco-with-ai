import http from "k6/http";
import { getBaseUrl } from "./base-url.js";

/**
 * Login with username and password
 * @param {string} username - Username to login with
 * @param {string} password - Password to login with
 * @returns {string} JWT token
 */
export function login(username, password) {
  const baseUrl = getBaseUrl();
  const payload = JSON.stringify({
    username: username,
    password: password,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.post(`${baseUrl}/login`, payload, params);
  
  if (response.status !== 200) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  return response.json("token");
}
