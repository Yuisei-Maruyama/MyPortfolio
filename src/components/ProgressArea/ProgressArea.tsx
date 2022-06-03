import React, { useContext } from 'react'
import { Typography } from '@mui/material'
import { ProgressBar } from '@/components'
import styled from 'styled-components'
import { LanguageContext } from '@/pages/Main'

type Props = {
  style?: Record<string, string | number>,
}

interface BgProps {
  bgColor: string;
}

interface StyleProps {
  style: Record<string, string | number>
}

export const getBgColor = (languageName: string) => {
  switch (languageName) {
    case 'CSS':
      return '#563D7C'
    case 'HTML':
      return '#E34C26'
    case 'JavaScript':
      return '#F0D81D'
    case 'SCSS':
      return '#C6538C'
    case 'Shell':
      return '#EDEDED'
    case 'TypeScript':
      return '#2B7489'
    default:
      break
  }
  return '#fff'
}

const _LanguageNameWrapper = styled.div`
    display: flex;
    width: 75%;
    margin: 30px auto 0;
    justify-content: space-around;
    align-items: center;
  `

const _ColorRound = styled.div<BgProps>`
    width: 30px;
    height: 30px;
    border-radius: 16px;
    background-color: ${({bgColor}) => (bgColor || '#fff')};
    border: 1px solid #06D8D7;
  `
const _Progress = styled.div`
    width: 100%;
    text-align: center;
    `

const $ProgressWrapper = styled(_Progress)<StyleProps>`
    ${props => props.style}
  `

const ProgressArea: React.FC<Props> = ({style}) => {

  const languages = useContext(LanguageContext)

  return (
    <$ProgressWrapper  style={style || {}}>
      <Typography style={{ lineHeight: 2, fontSize: '30px', color: '#06D8D7' }}>GitHub Repository Language Stats</Typography>
      <ProgressBar style={{ width: '75%', height: '30px', borderRadius: '15px' }} />
      <_LanguageNameWrapper>
        {
          languages ?
          Object.keys(languages).map((languageName, index) => {
            return (
              <div key={index} style={{ display: 'flex'}}>
                <_ColorRound bgColor={getBgColor(languageName)}></_ColorRound>
                <Typography sx={{ fontSize: '20px', color: '#06D8D7', marginLeft: '10px' }} component='p'>{languageName}</Typography>
              </div>
            )
          })
          : ''
        }
      </_LanguageNameWrapper>
    </$ProgressWrapper>
  );
}

export default ProgressArea;