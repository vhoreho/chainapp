import * as crypto from 'crypto';

export const calculateHash = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};
