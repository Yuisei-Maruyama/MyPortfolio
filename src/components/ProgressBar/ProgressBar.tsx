// import React, { useContext } from 'react'
import React from 'react'
import styled from '@emotion/styled'
// import { LanguageContext } from '@/pages/Main'

type Props = {
  style?: Record<string, string | number>
}

interface StyleProps {
  style: Record<string, string | number>
}

const _Progress = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #06d8d7;
`

const $PropsProgress = styled(_Progress)<StyleProps>`
  ${(props) => props.style}
`

const ProgressBar: React.FC<Props> = ({ style }) => {
  // const languages = useContext(LanguageContext)

  // console.log(languages);

  return (
    <div>
      <$PropsProgress style={style || {}} />
    </div>
  )
}

export default ProgressBar
