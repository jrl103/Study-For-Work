import * as yup from 'yup';
import { rule } from './rule';

export const schema = {
  userSchema: yup.object({
    name: rule.REQUIRED_TEXT({ minLength: 1, maxLength: 20 }),
  }),
  agreeSchema: yup.object({
    agreement: rule.REQUIRED_SELECT_CHECK(),
  }),
};
