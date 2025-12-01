export function generateRandomEmail(): string {
    const id = Math.floor(Math.random() * 100000);
    return `user${id}@gmail.com`;
}

export function generateRandomPassword(): string {
    const id = randomString(randomNumber());
    return `${id}`;
}
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
export function randomNumber(): number {
  const val = Math.random() * (15 - 5) + 5;
  return parseFloat(val.toFixed(2));
}