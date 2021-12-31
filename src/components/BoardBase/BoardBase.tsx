import React, { useState, useEffect, useCallback } from 'react'
import classes from './BoardBase.module.scss'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { rgba } from 'polished'
import { Avatar, IconButton } from '@mui/material'
import { IssueDialog, IssueCard, getHeaders, IconSwitch, convertIssueId, convertLabel } from '@/components'
import { deepPurple } from '@mui/material/colors'
import { AiOutlinePlus } from 'react-icons/ai'
import axios from 'axios'
import { Label, Issues } from '@/types'

const owner = process.env.REACT_APP_USER_NAME

const repo = process.env.REACT_APP_PROJECT

const token = process.env.REACT_APP_TOKEN

const request = axios.create({
  baseURL: 'https://api.github.com',
})

const BoardBase: React.FC = () => {
  const [issueItems, setIssues] = useState<Issues>([])
  const [todoItems, setTodo] = useState<Issues>([])
  const [doingItems, setDoing] = useState<Issues>([])
  const [closedItems, setClosed] = useState<Issues>([])
  const [columns, setColumns] = useState<Record<string, { title: string; items: Issues; label: Label }>>({})
  const [open, setOpen] = useState<boolean>(false)
  const [selectedLabel, setSelectLabel] = useState<string>('')
  const [toggleDelete, setDelete] = useState<boolean>(false)
  const [number, setNumber] = useState<number | undefined>(undefined)

  const fetchIssues = useCallback(async () => {
    const { data } = await request.get(`/repos/${owner}/${repo}/issues`)
    const payload = convertIssueId(data)
    await setIssues(payload)
  }, [])

  const eachIssues = useCallback(async () => {
    const labelNames = ['Todo', 'Doing', 'Closed']

    await labelNames.forEach(async (labelName: string) => {
      await request.get(`/repos/${owner}/${repo}/issues?labels=${labelName}&state=all`).then((res: { data: any }) => {
        if (labelName === 'Todo' && !todoItems?.length) {
          const payload = convertIssueId(res.data)
          setTodo(payload)
        }
        if (labelName === 'Doing' && !doingItems?.length) {
          const payload = convertIssueId(res.data)
          setDoing(payload)
        }
        if (labelName === 'Closed' && !closedItems?.length) {
          const payload = convertIssueId(res.data)
          setClosed(payload)
        }
      })
    })
  }, [todoItems, doingItems, closedItems])

  const initializeColumns = useCallback(async () => {
    if (!(todoItems || doingItems || closedItems)?.length) return

    const columnsFromBackend: Record<string, { title: string; items: Issues; label: Label }> = {
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
    await setColumns(columnsFromBackend)
  }, [todoItems, doingItems, closedItems])

  const orderProcess = async () => {
    if (!issueItems?.length) {
      await fetchIssues()
    }

    await eachIssues()

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

  const handleClickOpen = (label: string, number?: number) => {
    setSelectLabel(label)
    setOpen(true)
    if (number) {
      setNumber(number)
    }
  }

  const handleClickToggle = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setDelete((event.target as unknown as { checked: boolean }).checked)
  }

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
        <h1 style={{ flexGrow: 1 }}>TaskBoard of GitHub Issue</h1>
        <IconSwitch {...switchProps} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a
          onClick={() => window.open('https://docs.github.com/ja/rest/reference/users', '_blank')}
          style={{ cursor: 'pointer' }}
        >
          <p style={{ color: '#C38FFF', display: 'contents' }}>GitHub API</p>
        </a>
        <a
          onClick={() =>
            window.open('https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md', '_blank')
          }
          style={{ cursor: 'pointer' }}
        >
          <p style={{ color: '#C38FFF', display: 'contents' }}>react-beautiful-dnd</p>
        </a>
      </div>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([label, column]) => {
            return (
              <Droppable droppableId={label} key={label}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? rgba(63, 81, 181, 1.0) : '#161C22',
                        margin: 10,
                        padding: 6,
                        minHeight: 400,
                        borderRadius: 7,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            bgcolor: deepPurple[500],
                            margin: '10px',
                            fontWeight: 'bold',
                            fontSize: 16,
                          }}
                        >
                          {column.items ? column.items.length : '0'}
                        </Avatar>
                        <h3 style={{ flexGrow: 1 }}>{column.title}</h3>
                        {label === 'todo' ? (
                          <IconButton onClick={() => handleClickOpen(label)}>
                            <AiOutlinePlus style={{ color: 'white', width: '30px' }}></AiOutlinePlus>
                          </IconButton>
                        ) : (
                          <></>
                        )}
                        {number ? (
                          <IssueDialog
                            issueNumber={number}
                            dialogTitle="Delete a GitHub Issue"
                            dialogDesc={["I gave up because GitHub doesn't provide DELETE API about Issue."]}
                            selectedLabel={selectedLabel}
                            open={open}
                            todoItems={todoItems}
                            doingItems={doingItems}
                            closedItems={closedItems}
                            setOpen={(open) => setOpen(open)}
                            fetchIssues={fetchIssues}
                            setTodo={setTodo}
                            setNumber={setNumber}
                            setDoing={setDoing}
                            setClosed={setClosed}
                          />
                        ) : (
                          <IssueDialog
                            dialogTitle="Create a new GitHub Issue"
                            dialogDesc={['Create a new issue with Todo label.']}
                            selectedLabel={selectedLabel}
                            open={open}
                            todoItems={todoItems}
                            doingItems={doingItems}
                            closedItems={closedItems}
                            setOpen={(open) => setOpen(open)}
                            fetchIssues={fetchIssues}
                            setTodo={setTodo}
                            setNumber={setNumber}
                            setDoing={setDoing}
                            setClosed={setClosed}
                          />
                        )}
                      </div>
                      {column.items?.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <IssueCard
                                  provided={provided}
                                  snapshot={snapshot}
                                  item={item}
                                  toggleDelete={toggleDelete}
                                  label={column.title}
                                  handleClickOpen={handleClickOpen}
                                />
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

export default BoardBase
