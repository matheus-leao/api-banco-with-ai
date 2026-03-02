import http from "k6/http";
import { check, group } from "k6";
import { Trend } from "k6/metrics";
import { generateRandomEmail } from "../helpers/random-email.js";
import { getBaseUrl } from "../helpers/base-url.js";
import { login } from "../helpers/auth.js";

// Custom metric for checkout request duration
const checkoutDuration = new Trend("checkout_duration");

export const options = {
  stages: [
    { duration: "2m", target: 10 }, // Ramp-up to 10 users over 2 minutes
    { duration: "5m", target: 10 }, // Stay at 10 users for 5 minutes (soak phase)
    { duration: "2m", target: 0 },  // Ramp-down to 0 users over 2 minutes
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95th percentile must be less than 2 seconds
    checkout_duration: ["p(95)<2000"],
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

    token = loginResponse.json("data.token") || loginResponse.json("token");
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

    // Record checkout duration
    checkoutDuration.add(checkoutResponse.timings.duration);

    check(checkoutResponse, {
      "checkout status is 201": (r) => r.status === 201,
    });
  });
}
