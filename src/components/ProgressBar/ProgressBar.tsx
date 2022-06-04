import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { LanguageContext } from '@/pages/Main'
import { getBgColor } from '../ProgressArea/ProgressArea'

type Props = {
  style?: Record<string, string | number>
}

interface StyleProps {
  style: Record<string, string | number>
}

interface ProgressBarProps {
  width: number | string,
  bgColor: string
}

const _ProgressWrapper = styled.div`
  display: flex;
  margin: 10px auto 0;
`

const $ProgressWrapper = styled(_ProgressWrapper)<StyleProps>`
  ${(props) => props.style}
`

const _ProgressBar = styled.span<ProgressBarProps>`
  width: ${p => p.width}%;
  background-color: ${p => p.bgColor};
`

const ProgressBar: React.FC<Props> = ({ style }) => {

  const languages = useContext(LanguageContext)

  let sum = 0;

  Object.entries(languages).forEach(([_, value]) => {
    sum += value
  });


  return (
    <$ProgressWrapper style={style || {}}>
      {
        Object.entries(languages).map(([key, value], index) => {
          return (
            <_ProgressBar width={value / sum * 100} bgColor={getBgColor(key)} key={index} />
          )
        })
      }
    </$ProgressWrapper>
  )
}

export default ProgressBar
