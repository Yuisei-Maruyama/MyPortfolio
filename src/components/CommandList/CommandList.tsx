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
    <_ActiveCommandWrapper
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <$CommandTextField
        variant="outlined"
        InputProps={{
          startAdornment: <$InputAdornment position="start">&gt;</$InputAdornment>,
        }}
        value={seachCommand}
        onChange={(e) => handleChangeText(e.target.value)}
      />
      <_CommandOptions>
        {!seachCommand ? (
          <_CommandOptionBase>
            <$CommandTitle variant="h6">Please input any command 👨‍💻</$CommandTitle>
          </_CommandOptionBase>
        ) : seachCommand === 'all' ? (
          commandList.map((command, index) => (
            <$CommandOption key={index} onClick={() => handleClickCommand(command.component)}>
              <$CommandTitle variant="h6">{command.title}</$CommandTitle>
              <Typography>{command.desc}</Typography>
            </$CommandOption>
          ))
        ) : (
          commandList
            .filter((command) => command.name === seachCommand)
            .map((command, index) => (
              <$CommandOption key={index} onClick={() => handleClickCommand(command.component)}>
                <$CommandTitle variant="h6">{command.title}</$CommandTitle>
                <Typography>{command.desc}</Typography>
              </$CommandOption>
            ))
        )}
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
  /* height: 500px; */
  color: #06d8d7;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid #06d8d7;
  z-index: 1000;
`

const $CommandTextField = styled(TextField)`
  width: 96%;
  display: block;
  margin: 20px auto 0;
  background-color: rgba(0, 0, 0, 0.6);
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

const _CommandOptionBase = styled.div`
  padding: 25px;
  width: 100%;
  height: 100px;
  border-top: 1px solid #06d8d7;
  border-bottom: 1px solid #06d8d7;
`

const $CommandOption = styled(_CommandOptionBase)`
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
