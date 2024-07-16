import styled from 'styled-components';

interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

// isAdmin, isUser 의 반환타입이 어떤 타입을 가지고 있는지 확실하게 명시되지 않아서 생긴 에러
// is : 타입가드 (조건 분기)
// isAdmin 함수가 true 를 반환할 때 person 은 Admin 타입으로 간주
export function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

// isUser 함수가 true 를 반환할 때 person 은 User 타입으로 간주
export function isUser(person: Person): person is User {
  return person.type === 'user';
}

export function logPerson(person: Person) {
  let additionalInformation = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);
export default function Chapter3() {
  return <S.Chapter3>Chapter3</S.Chapter3>;
}

const S = {
  Chapter3: styled.div``,
};
