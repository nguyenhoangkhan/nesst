import * as bcrypt from 'bcrypt';

import { DEFAULT_SALT_ROUNDS } from '../constants/bcrypt.const';

export const hashPassword = async (
  rawPassword: string,
  saltRounds = DEFAULT_SALT_ROUNDS,
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(rawPassword, salt);
};

export const isCorrectPassword = (rawPassword: string, hash: string) => {
  return bcrypt.compareSync(rawPassword, hash);
};
