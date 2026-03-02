import http from "k6/http";
import { check, group } from "k6";
import { Trend } from "k6/metrics";
import { generateRandomEmail } from "../helpers/random-email.js";
import { getBaseUrl } from "../helpers/base-url.js";

// Custom metric for checkout request duration
const checkoutDuration = new Trend("checkout_duration");

export const options = {
  stages: [
    { duration: "30s", target: 5 },    // Ramp up 5 VUs in 30s
    { duration: "1m30s", target: 10 }, // Ramp up 10 VUs in 1m30s
    { duration: "2m", target: 20 },    // Ramp up 20 VUs in 2m
    { duration: "2m30s", target: 50 }, // Ramp up 50 VUs in 2m30s
    { duration: "3m", target: 100 },   // Ramp up 100 VUs in 3m
    { duration: "1m", target: 0 },     // Ramp down to 0 VUs in 1m
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95th percentile must be less than 2 seconds
    checkout_duration: ["p(95)<2000"], // 95th percentile checkout time must be less than 2 seconds
  },
};

export default function () {
  const baseUrl = getBaseUrl();
  const username = generateRandomEmail();
  const password = "testpass123";

  // Register
  group("Register", () => {
    const registerPayload = JSON.stringify({
      username: username,
      password: password,
      favorecido: false,
    });

    const registerParams = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const registerResponse = http.post(`${baseUrl}/register`, registerPayload, registerParams);

    check(registerResponse, {
      "register status is 201": (r) => r.status === 201,
    });
  });

  // Login
  let token;
  group("Login", () => {
    const loginPayload = JSON.stringify({
      username: username,
      password: password,
    });

    const loginParams = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const loginResponse = http.post(`${baseUrl}/login`, loginPayload, loginParams);

    check(loginResponse, {
      "login status is 200": (r) => r.status === 200,
    });

    token = loginResponse.json("token");
  });

  // Checkout
  group("Checkout", () => {
    const checkoutPayload = JSON.stringify({
      productId: 1,
      quantity: 1,
      paymentMethod: "cash",
    });

    const checkoutParams = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const checkoutResponse = http.post(`${baseUrl}/checkout`, checkoutPayload, checkoutParams);

    checkoutDuration.add(checkoutResponse.timings.duration);

    check(checkoutResponse, {
      "checkout status is 201": (r) => r.status === 201,
    });
  });
}
