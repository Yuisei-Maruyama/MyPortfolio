import React, { useState, createContext } from 'react'
import Hotkeys, { OnKeyFun } from 'react-hot-keys'
import { Command } from '@/types'
import { CommandList } from '@/components'

type Props = {
  commandList: Command[]
  children: React.ReactNode[]
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>
}

export const CommandListContext = createContext<Command[]>([])

const CommandListArea: React.FC<Props> = ({ commandList, children, setComponent }) => {
  const [isRunning, setIsRunning] = useState(false)

  const handleKeyDown: OnKeyFun = (_, e) => {
    e.preventDefault()
    setIsRunning(true)
    document.addEventListener('click', handleClose)
  }

  const handleClose = () => {
    setIsRunning(false)
    document.removeEventListener('click', handleClose)
  }

  return (
    <CommandListContext.Provider value={commandList}>
      <Hotkeys keyName="command+shift+p" onKeyDown={(_, evn: KeyboardEvent, $) => handleKeyDown(_, evn, $)}>
        {isRunning ? <CommandList setIsRunning={setIsRunning} setComponent={setComponent} /> : <></>}
      </Hotkeys>
      {children}
    </CommandListContext.Provider>
  )
}

export default CommandListArea
