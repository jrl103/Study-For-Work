import * as yup from 'yup';
import { rule } from './rule';

export const schema = {
  userSchema: yup.object({
    name: rule.REQUIRED_TEXT({ minLength: 1, maxLength: 20 }),
  }),
  agreeSchema: yup.object({
    agreement: rule.REQUIRED_SELECT_CHECK,
  }),
  userSubmitSchema: yup.object({
    name: rule.REQUIRED_TEXT({ minLength: 2, maxLength: 50 }),
    email: rule.EMAIL({ minLength: 4 }),
    password: rule.PASSWORD,
    passwordCheck: rule.PASSWORD_CHECK,
    age: rule.LIMITED_AGE(18),
    phoneNumber: rule.PHONE_NUMBER,
    gender: rule.SELECT_GENDER,
    agreement: rule.REQUIRED_SELECT_CHECK,
    webSite: rule.URL,
  }),
};
