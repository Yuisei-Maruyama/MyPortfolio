import React, { useContext } from 'react'
import { TextField, InputAdornment, Typography } from '@mui/material'
import styled from 'styled-components'
import { CommandListContext } from '@/components/CommandListArea/CommandListArea'

const _ActiveCommandWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 500px;
  color: #06d8d7;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #06d8d7;
  z-index: 1000;
`

const $CommandTextField = styled(TextField)`
  width: 96%;
  display: block;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.9);
  box-shadow: -1px -1px #06d8d7, 1px -1px #06d8d7, 1px 1px #06d8d7, -1px 1px #06d8d7, 0 0 0.1em #06d8d7,
    0 0 0.1em #06d8d7 inset, 0 0 1em #06d8d7, 0 0 1em #06d8d7 inset;
  & .MuiOutlinedInput-root {
    width: 100%;
  }
  & input {
    color: #06d8d7;
    width: 100%;
    margin-left: 10px;
    font-size: 20px;
  }
`

const $InputAdornment = styled(InputAdornment)`
  & > p {
    margin-left: 15px;
    color: #06d8d7;
    font-size: 18px;
  }
`

const _CommandOptions = styled.div`
  margin-top: 30px;
`
const _CommandOption = styled.div`
  padding: 10px 25px;
  width: 100%;
  height: 80px;
  border-top: 1px solid #06d8d7;
  border-bottom: 1px solid #06d8d7;
  cursor: pointer;
  :hover {
    box-shadow: -1px -1px #06d8d7, 1px -1px #06d8d7, 1px 1px #06d8d7, -1px 1px #06d8d7, 0 0 0.1em #06d8d7,
      0 0 0.1em #06d8d7 inset, 0 0 0.5em #06d8d7, 0 0 0.5em #06d8d7 inset, 0 0 1em #06d8d7, 0 0 1em #06d8d7 inset;
  }
`

const $CommandTitle = styled(Typography)`
  font-weight: bold;
`

const CommandList: React.FC = () => {
  const commandList = useContext(CommandListContext)

  console.log(commandList)

  return (
    <_ActiveCommandWrapper>
      <$CommandTextField
        variant="outlined"
        InputProps={{
          startAdornment: <$InputAdornment position="start">&gt;</$InputAdornment>,
        }}
      />
      <_CommandOptions>
        {commandList.map((command, index) => (
          <_CommandOption key={index}>
            <$CommandTitle variant="h6">{command.title}</$CommandTitle>
            <Typography>{command.desc}</Typography>
          </_CommandOption>
        ))}
      </_CommandOptions>
    </_ActiveCommandWrapper>
  )
}

export default CommandList
