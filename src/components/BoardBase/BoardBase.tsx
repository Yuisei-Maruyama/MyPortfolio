import React, { useState, useEffect, useCallback, createContext } from 'react'
import classes from './BoardBase.module.scss'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { getHeaders, IconSwitch, convertIssueId, convertLabel, DragDrop } from '@/components'
import { deepPurple } from '@mui/material/colors'
import axios from 'axios'
import { Label, Issue, Issues } from '@/types'
import { useDelete } from '@/customHooks'

const owner = process.env.REACT_APP_USER_NAME

const repo = process.env.REACT_APP_PROJECT

const token = process.env.REACT_APP_TOKEN

const request = axios.create({
  baseURL: 'https://api.github.com',
})

export type DialogContextType = {
  todoItems: Issues
  doingItems: Issues
  closedItems: Issues
  open: boolean
  issueNumber: number
  selectedLabel: string
  setOpen: (open: boolean) => void
  setNumber: (num: number | undefined) => void
  setSelectLabel: (label: string) => void
  fetchIssues: () => Promise<void>
  setTodo: React.Dispatch<React.SetStateAction<Issues>>
  setDoing: React.Dispatch<React.SetStateAction<Issues>>
  setClosed: React.Dispatch<React.SetStateAction<Issues>>
}

export const IssueContext = createContext<Partial<DialogContextType>>({})

const BoardBase: React.FC = () => {
  const [issueItems, setIssues] = useState<Issues>([])
  const [todoItems, setTodo] = useState<Issues>([])
  const [doingItems, setDoing] = useState<Issues>([])
  const [closedItems, setClosed] = useState<Issues>([])
  const [columns, setColumns] = useState<Record<string, { title: string; items: Issues; label: Label }>>({})
  const [open, setOpen] = useState<boolean>(false)
  const [selectedLabel, setSelectLabel] = useState<string>('')
  const [issueNumber, setNumber] = useState<number | undefined>(undefined)

  const { toggleDelete, handleClickToggle } = useDelete()

  const fetchIssues = async () => {
    const { data } = await request.get(`/repos/${owner}/${repo}/issues?state=all`)
    const open = await request.get(`/repos/${owner}/${repo}/issues?state=open`)
    const closed = await request.get(`/repos/${owner}/${repo}/issues?state=closed&labels=closed`)
    const openData = open.data
    const closedData = closed.data
    const payloadOpenIssues = convertIssueId(openData)
    const payloadClosedIssues = convertIssueId(closedData)
    const todoIssues: Issues = []
    const doingIssues: Issues = []
    const closedIssues: Issues = []
    payloadOpenIssues.map((issue: Issue) =>
      issue.labels.forEach((label: Label) => {
        if (label.name === 'Todo') todoIssues.push(issue)
        if (label.name === 'Doing') doingIssues.push(issue)
      })
    )
    payloadClosedIssues.map((issue: Issue) =>
      issue.labels.forEach((label: Label) => {
        if (label.name === 'Closed') closedIssues.push(issue)
      })
    )
    setIssues(data)
    setTodo(todoIssues)
    setDoing(doingIssues)
    setClosed(closedIssues)
  }

  const contextValue = {
    todoItems,
    doingItems,
    closedItems,
    open,
    issueNumber,
    selectedLabel,
    setOpen,
    setNumber,
    setSelectLabel,
    fetchIssues,
    setTodo,
    setDoing,
    setClosed,
  }

  const initializeColumns = async () => {
    if (!(todoItems || doingItems || closedItems)?.length) return

    const columns: Record<string, { title: string; items: Issues; label: Label }> = {
      todo: {
        title: 'Todo',
        items: todoItems,
        label: todoItems ? convertLabel(todoItems) : {},
      },
      doing: {
        title: 'Doing',
        items: doingItems,
        label: doingItems ? convertLabel(doingItems) : {},
      },
      closed: {
        title: 'Closed',
        items: closedItems,
        label: closedItems ? convertLabel(closedItems) : {},
      },
    }
    await setColumns(columns)
  }

  const orderProcess = async () => {
    if (!issueItems?.length) {
      await fetchIssues()
    }

    if (todoItems?.length && doingItems?.length && closedItems?.length) {
      await initializeColumns()
    }
  }

  useEffect(() => {
    orderProcess()
    // eslint-disable-next-line
  }, [todoItems, doingItems, closedItems])

  const changeLabel = async (issueNum: number, payload: { label: Label; owner: string; repo: string }) => {
    if (!token) return
    const headers = await getHeaders(token)
    const { label } = payload
    if (label.name === 'Closed') {
      await request.patch(
        `/repos/${owner}/${repo}/issues/${issueNum}`,
        {
          state: 'closed',
          labels: [payload.label.name],
        },
        { headers }
      )
    }
    const { data } = await request.patch(
      `/repos/${owner}/${repo}/issues/${issueNum}`,
      { labels: [label.name] },
      { headers }
    )
    console.log(data)
  }

  const onDragEnd = async (result: DropResult, columns: any, setColumns: any) => {
    // droppableId: ドラッグしている要素のid
    // source: ドロップ元
    // destination: ドロップ先
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [targetItem] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, targetItem)
      await setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      })
      const destLabel = destColumn.label
      console.log('destLabel', destLabel)
      if (!(owner && repo)) return
      await changeLabel(targetItem.number, { label: destLabel, owner, repo })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [targetItem] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, targetItem)
      await setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    }
  }

  console.log('Check relender')

  const handleClickOpen = useCallback(
    (label: string, number?: number) => {
      setSelectLabel(label)
      setOpen(true)
      if (number) {
        setNumber(number)
      }
    },
    [setSelectLabel, setOpen, setNumber]
  )

  const switchProps = {
    checked: toggleDelete,
    color: {
      checkedcolor: '#3F51B5',
      uncheckcolor: deepPurple[500],
    },
    svg: {
      checkedsvg:
        'M20.37, 8.91L19.37, 10.64L7.24, 3.64L8.24, 1.91L11.28, 3.66L12.64, 3.29L16.97, 5.79L17.34, 7.16L20.37, 8.91M6, 19V7H11.07L18, 11V19A2, 2 0 0, 1 16, 21H8A2, 2 0 0, 1 6, 19Z',
      unchecksvg: 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
    },
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => handleClickToggle(e),
  }

  return (
    <div className={classes.area}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ flexGrow: 1, color: '#06D8D7' }}>TaskBoard of GitHub Issue</h1>
        <IconSwitch {...switchProps} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a
          onClick={() => window.open('https://docs.github.com/ja/rest/reference/users', '_blank')}
          style={{ cursor: 'pointer' }}
        >
          <p style={{ color: '#06D8D7', display: 'contents' }}>GitHub API</p>
        </a>
        <a
          onClick={() =>
            window.open('https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md', '_blank')
          }
          style={{ cursor: 'pointer' }}
        >
          <p style={{ color: '#06D8D7', display: 'contents' }}>react-beautiful-dnd</p>
        </a>
      </div>
      <div style={{ display: 'flex' }}>
        <IssueContext.Provider value={contextValue}>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([label, column], index) => {
              return (
                <DragDrop
                  key={index}
                  column={column}
                  issueNumber={issueNumber}
                  label={label}
                  toggleDelete={toggleDelete}
                  handleClickOpen={handleClickOpen}
                />
              )
            })}
          </DragDropContext>
        </IssueContext.Provider>
      </div>
    </div>
  )
}

export default BoardBase
