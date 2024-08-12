// getStaticProps(회사소개 페이지)

import { GetStaticProps } from 'next'
import React from 'react'

type TeamMember = {
  name: string
  position: string
}

type CompanyInfo = {
  name: string
  description: string
  team: TeamMember[]
}

interface IntroductionPageProps {
  companyInfo: CompanyInfo
}

export const getStaticProps: GetStaticProps<
  IntroductionPageProps
> = async () => {
  const companyInfo = {
    name: '왈라',
    description: '저희는 왈라입니다',
    team: [
      { name: '송이', position: 'development' },
      { name: '호세', position: 'development' },
    ],
  }

  return {
    props: {
      companyInfo,
    },
  }
}

function IntroductionPage({ companyInfo }: IntroductionPageProps) {
  return (
    <div>
      <h1>회사 이름: {companyInfo.name}</h1>
      <p>회사 설명: {companyInfo.description}</p>
      <section>
        <h2>개발팀</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          {companyInfo.team.map((member, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default IntroductionPage
