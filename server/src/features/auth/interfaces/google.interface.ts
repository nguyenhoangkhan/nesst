export interface DecodedIdToken {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  at_hash: boolean;
  iat: number;
  exp: number;
}
