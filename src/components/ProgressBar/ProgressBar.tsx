import React from 'react'
import styled from '@emotion/styled'

type Props = {
  style: Record<string, string | number>
}

const ProgressBar: React.FC<Props> = ({ style }) => {
  const _Progress = styled.div`
    width: 75%;
    height: 50px;
    margin: 0 auto;
    border: 1px solid #06d8d7;
    background-color: '#fff';
    border-radious: 50px !important;
  `

  const $PropsProgress = styled(_Progress)`
    ${style}
  `

  return (
    <div>
      <$PropsProgress />
    </div>
  )
}

export default ProgressBar
