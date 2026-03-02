/**
 * Generate a random email address
 * @returns {string} Random email address
 */
export function generateRandomEmail() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 100000);
  return `user_${timestamp}_${random}@test.com`;
}
