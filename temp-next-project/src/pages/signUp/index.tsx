// getServerSideProps(회원가입 페이지 - 국가코드를 입력할경우)

import { GetServerSideProps } from 'next'

type Country = {
  code: string
  name: string
}

interface SignUpPageProps {
  countries: Country[]
}

export const getServerSideProps: GetServerSideProps<
  SignUpPageProps
> = async () => {
  const countries: Country[] = [
    { code: 'US', name: 'United States' },
    { code: 'KR', name: 'South Korea' },
    { code: 'JP', name: 'Japan' },
    { code: 'CN', name: 'China' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'GB', name: 'United Kingdom' },
  ]

  return {
    props: {
      countries,
    },
  }
}

function SignUpPage({ countries }: SignUpPageProps) {
  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <div>
          <label>이름:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label>비밀번호:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label>국가:</label>
          <select id="country" name="country">
            <option value="" disabled>
              나라를 선택해주세요
            </option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <button>회원가입</button>
      </form>
    </div>
  )
}
export default SignUpPage
