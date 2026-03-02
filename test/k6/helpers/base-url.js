/**
 * Get the base URL from environment variable
 * @returns {string} Base URL for the API
 */
export function getBaseUrl() {
  return __ENV.BASE_URL || "http://localhost:3000";
}
