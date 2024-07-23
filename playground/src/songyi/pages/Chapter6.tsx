import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  province: string;
  city: string;
  district: string;
  street: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
}

export default function Chapter6() {
  const [userList, setUserList] = useState<IUser[]>([]);
  const getData = async () => {
    try {
      // fetch API를 사용하여 호출
      const res = await fetch('https://koreanjson.com/users');
      // HTTP 응답 성공 여부를 나타내는 속성
      if (!res.ok) {
        throw new Error('불러오기 실패!');
      }
      // 불러온 데이터를 json 형식으로 파싱
      const data: IUser[] = await res.json();
      // filter를 사용해 name의 value 값에 김씨가 있는 아이템을 제외
      // 그리고 sort를 사용해 email의 알파벳 순으로 정렬
      const filterData = data
        .filter((item) => !item.name.includes('김'))
        .sort((a, b) => {
          return a.email < b.email ? -1 : a.email > b.email ? 1 : 0;
        });
      setUserList(filterData);
    } catch (e) {
      console.log('에러가 발생했어요!!', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <S.Chapter6>
        <S.AlignBox>
          <p>
            3. 아래 정보의 API가 존재한다. 아래 API를 화면의 첫 렌더링시에 호출하시오. 또한 가지고온 정보를 useState로 저장하고, 이름의 성이
            ‘김’으로 시작하는 사람을 제외하고, 사용자의 이메일(알파벳)순으로 정렬하시오. 마지막으로 이를 화면에 출력해주시오. (axios및
            리액트 쿼리 사용금지. 반드시 유저정보를 인터페이스로 구축할 것.)
          </p>
          {userList.map((user) => (
            <S.ItemBox key={user.id}>
              {Object.keys(user).map((key) => (
                <p key={key}>
                  <strong>{key}:</strong> {user[key as keyof IUser]}
                </p>
              ))}
            </S.ItemBox>
          ))}
        </S.AlignBox>
      </S.Chapter6>
      ;
    </>
  );
}

const S = {
  Chapter6: styled.div``,
  AlignBox: styled.div`
    margin: 30px;
  `,
  ItemBox: styled.div`
    border: 1px solid #000;
  `,
};
