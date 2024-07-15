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

type Person = User | Admin;

export default function Chapter1s3() {
  const persons: Person[] = [
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

  // is를 통해 타입을 알려야함.
  function isAdmin(person: Person): person is Admin {
    return person.type === 'admin';
  }

  function isUser(person: Person): person is User {
    return person.type === 'user';
  }

  function logPerson(person: Person) {
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
  return <S.Chapter1s3>Chapter1s3</S.Chapter1s3>;
}

const S = {
  Chapter1s3: styled.div``,
};
