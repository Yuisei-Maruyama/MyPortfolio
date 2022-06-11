import React, { useContext, useState, ReactNode } from 'react'
import { TextField, InputAdornment, Typography } from '@mui/material'
import styled from 'styled-components'
import { CommandListContext } from '@/components/CommandListArea/CommandListArea'

type Props = {
  setIsRunning: (value: React.SetStateAction<boolean>) => void
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>
}

const CommandList: React.FC<Props> = ({ setIsRunning, setComponent }) => {
  const commandList = useContext(CommandListContext)
  const [seachCommand, setSearchCommand] = useState<string>('')

  const handleChangeText = (value: string) => {
    setSearchCommand(value)
  }

  const handleClickCommand = (component: ReactNode) => {
    setIsRunning(false)
    setComponent(component)
  }

  return (
    <_ActiveCommandWrapper>
      <$CommandTextField
        variant="outlined"
        InputProps={{
          startAdornment: <$InputAdornment position="start">&gt;</$InputAdornment>,
        }}
        value={seachCommand}
        onChange={(e) => handleChangeText(e.target.value)}
      />
      <_CommandOptions>
        {!seachCommand
          ? commandList.map((command, index) => (
              <_CommandOption key={index} onClick={() => handleClickCommand(command.component)}>
                <$CommandTitle variant="h6">{command.title}</$CommandTitle>
                <Typography>{command.desc}</Typography>
              </_CommandOption>
            ))
          : commandList
              .filter((command) => command.name.includes(seachCommand))
              .map((command, index) => (
                <_CommandOption key={index} onClick={() => handleClickCommand(command.component)}>
                  <$CommandTitle variant="h6">{command.title}</$CommandTitle>
                  <Typography>{command.desc}</Typography>
                </_CommandOption>
              ))}
      </_CommandOptions>
    </_ActiveCommandWrapper>
  )
}

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
  padding: 25px;
  width: 100%;
  height: 100px;
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

export default CommandList
