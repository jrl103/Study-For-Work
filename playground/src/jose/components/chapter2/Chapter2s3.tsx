import { pageBasic } from '@/common/styles/Common';
import React from 'react';
import styled from 'styled-components';

const BASE_URL = 'https://koreanjson.com/users';

interface User {
  city: string;
  createdAt: string;
  district: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  province: string;
  street: string;
  updatedAt: string;
  username: string;
  website: string;
  zipcode: string;
}

export default function Chapter2s3() {
  const [userListState, setUserListState] = React.useState<User[]>([]);

  const getUserList = React.useCallback(async () => {
    const response = await fetch(BASE_URL, {
      method: 'GET',
    });
    const parsedData: User[] = await response.json();
    return parsedData;
  }, []);

  React.useEffect(function initializeUserList() {
    (async () => {
      const userList = getUserList();
      setUserListState(await userList);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Chapter2s3>
      <div className="user-wrapper">
        {userListState
          .sort((a, b) => (a.email > b.email ? 1 : -1))
          .map((user) =>
            user.name[0] && user.name[0] !== '김' ? (
              <div className="user-element">
                <span>{user.name}</span>
                <span>{user.email}</span>
              </div>
            ) : (
              <></>
            ),
          )}
      </div>
    </S.Chapter2s3>
  );
}

const S = {
  Chapter2s3: styled.div`
    ${pageBasic}
    .user-wrapper {
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .user-element {
      display: flex;
      gap: 10px;
      span {
        font-weight: 600;
      }
    }
  `,
};
