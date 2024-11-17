import { pbkdf2 } from 'node:crypto';
import { promisify } from 'node:util';

export const promisifiedPbkdf2 = promisify(pbkdf2);
