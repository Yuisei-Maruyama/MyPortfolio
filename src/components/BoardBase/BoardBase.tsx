import React, { useState, useEffect, useCallback } from 'react'
import classes from './BoardBase.module.scss'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { rgba } from 'polished'
import {
  Avatar,
  IconButton,
  Card,
  CardContent,
  Typography
} from '@mui/material'
import { IssueDialog, getHeaders, IconSwitch, convertIssueId, convertLabel } from '@/components'
import { deepPurple } from '@mui/material/colors'
import { AiOutlinePlus } from 'react-icons/ai'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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

  const fetchIssues = useCallback(async () => {
    if (!token) return
    const headers = await getHeaders(token)
    const { data } = await request.get(`/repos/${owner}/${repo}/issues`, { headers })
    const payload = convertIssueId(data)
    await setIssues(payload)
  }, [])

  const eachIssues = useCallback(async () => {
    const labelNames = ['Todo', 'Doing', 'Closed']

    await labelNames.forEach(async (labelName: string) => {
      if (!token) return
      const headers = await getHeaders(token)
      await request
        .get(`/repos/${owner}/${repo}/issues?labels=${labelName}&state=open`, { headers })
        .then((res: { data: any }) => {
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
          labels: [payload.label.name]
        },
        { headers }
      )
    }
    await request.patch(
      `/repos/${owner}/${repo}/issues/${issueNum}`,
      { labels: [label.name] },
      { headers }
    )
  }

  const onDragEnd = async (result: DropResult, columns: any, setColumns: any) => {
    // droppableId: ドラッグしている要素のid
    // source: ドロップ元
    // destination: ドロップ先
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId] // ドロップ元のカラム
      const destColumn = columns[destination.droppableId] // ドロップ先のカラム
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

  const handleClickOpen = (id: string) => {
    console.log(id)
    setSelectLabel(id)
    setOpen(true)
  }

  const handleClickToggle = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setDelete((event.target as unknown as { checked: boolean }).checked)
  }

  const switchProps = {
    checked: toggleDelete,
    color: {
      checkedcolor: '#3F51B5',
      uncheckcolor: deepPurple[500]
    },
    svg: {
      checkedsvg: "M20.37, 8.91L19.37, 10.64L7.24, 3.64L8.24, 1.91L11.28, 3.66L12.64, 3.29L16.97, 5.79L17.34, 7.16L20.37, 8.91M6, 19V7H11.07L18, 11V19A2, 2 0 0, 1 16, 21H8A2, 2 0 0, 1 6, 19Z",
      unchecksvg: "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
    },
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => handleClickToggle(e)
  }

  return (
    <div className={classes.area}>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <h1 style={{ flexGrow: 1 }}>TaskBoard of GitHub Issue</h1>
        <IconSwitch {...switchProps} />
      </div>
      <a onClick={() => window.open('https://docs.github.com/ja/rest/reference/users', '_blank')} style={{ cursor: 'pointer' }}>
        <p style={{ color: '#C38FFF' }}>GitHub API</p>
      </a>
      <a onClick={() => window.open('https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md', '_blank')} style={{ cursor: 'pointer' }}>
        <p style={{ color: '#C38FFF' }}>react-beautiful-dnd</p>
      </a>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? rgba(63, 81, 181, 1.0) : '#161C22',
                        margin: 10,
                        padding: 6,
                        width: 400,
                        minHeight: 400,
                        borderRadius: 7,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 30, height: 30, bgcolor: deepPurple[500], margin: '10px', fontWeight: 'bold', fontSize: 16 }}>
                          {column.items ? column.items.length : '0'}
                        </Avatar>
                        <h3 style={{ flexGrow: 1 }}>{column.title}</h3>
                        {
                          id === 'todo'
                            ? <IconButton onClick={() => handleClickOpen(id)}>
                                <AiOutlinePlus style={{ color: 'white', width: '30px' }}></AiOutlinePlus>
                              </IconButton>
                            : <></>
                        }
                        <IssueDialog selectedLabel={selectedLabel} open={open} setOpen={(open) => setOpen(open)} fetchIssues={fetchIssues} todoItems={todoItems} setTodo={setTodo} />
                      </div>
                      {column.items?.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: 'none',
                                    padding: 10,
                                    borderRadius: 10,
                                    margin: '10px 5px 0 5px',
                                    minHeight: '120px',
                                    backgroundColor: snapshot.isDragging ? '#263B4A' : '#2A2A2A',
                                    color: 'white',
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  <CardContent style={{ padding: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <Avatar
                                        alt={item.user.login}
                                        src={item.user.avatar_url}
                                        sx={{ width: 35, height: 35, marginRight: 2 }}
                                      />
                                      <div style={{ flexDirection: 'column', flexGrow: 1 }} >
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: 'white', cursor: 'pointer', width: 260 }} component="div" onClick={() => window.open(`${item.html_url}`, '_blank')}>
                                          {item.title}
                                        </Typography>
                                        <Typography sx={{ mb: 1.0, margin: 0 }}>
                                          #{item.number} opened by {item.user.login}
                                        </Typography>
                                      </div>
                                      {
                                        toggleDelete ? <IconButton onClick={() => handleClickOpen(id)} style={{ color: 'white', marginLeft: 5 }}>
                                            <DeleteForeverIcon fontSize='large' />
                                          </IconButton>
                                        : <></>
                                      }
                                    </div>
                                  </CardContent>
                                </Card>
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
