import decode from 'jwt-decode';

export function isValidToken(token: string): boolean {
  try {
    const isValid: boolean = decode(token);
    return isValid;
  } catch (error) {
    return false;
  }
}
