import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const textEllipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const pageBasic = css`
  width: 100%;
  height: 100vh;
  ${flexCenter};
  flex-direction: column;
  gap: 10px;
`;

export const buttonBasic = css`
  button {
    width: 300px;
    height: 50px;
    font-size: 17px;
    font-weight: 700;
  }
`;
