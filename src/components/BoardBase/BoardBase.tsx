import React, { useState, useEffect, useCallback, useRef } from 'react'
import classes from './BoardBase.module.scss'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { rgba } from 'polished'
import {
  Avatar,
  IconButton,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  TextareaAutosize,
} from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'

const owner = process.env.REACT_APP_USER_NAME

const repo = process.env.REACT_APP_PROJECT

const token = process.env.REACT_APP_TOKEN

const request = axios.create({
  baseURL: 'https://api.github.com',
})

interface Label {
  description?: string
  id?: number
  name?: string
  url?: string
}

interface Issue {
  id: string
  title: string
  body: string
  number: number
  /* eslint-disable camelcase */
  html_url: string
  user: {
    url: string
    login: string
    avatar_url: string
  }
  labels: Label[]
}

type Issues = Issue[]

const convertIssueType = (data: any) => {
  const payload = data.map((item: { id: number }) => {
    return { ...item, id: item.id.toString() }
  })
  return payload
}

const getHeaders = async (): Promise<{ authorization?: string }> => {
  const authorization = `bearer ${token}`
  const headers = authorization ? { authorization } : {}
  return headers
}

const BoardBase: React.FC = () => {
  const [issueItems, setIssues] = useState<Issues>([])
  const [todoItems, setTodo] = useState<Issues>([])
  const [doingItems, setDoing] = useState<Issues>([])
  const [closedItems, setClosed] = useState<Issues>([])
  const [columns, setColumns] = useState<Record<string, { title: string; items: Issues; label: Label }>>({})
  const [open, setOpen] = useState<boolean>(false)
  const [inputError, setInputError] = useState(false)

  const inputTitleRef = useRef<any>(null)
  const inputDeskRef = useRef<any>(null)

  const fetchIssues = useCallback(async () => {
    const headers = await getHeaders()
    await request.get(`/repos/${owner}/${repo}/issues`, { headers }).then((res: { data: any }) => {
      if (issueItems?.length) return
      const payload = convertIssueType(res.data)
      setIssues(payload)
    })
  }, [issueItems])

  const eachIssues = useCallback(async () => {
    const labelNames = ['Todo', 'Doing', 'Closed']

    await labelNames.forEach(async (labelName: string) => {
      const headers = await getHeaders()
      await request
        .get(`/repos/${owner}/${repo}/issues?labels=${labelName}&state=open`, { headers })
        .then((res: { data: any }) => {
          if (labelName === 'Todo' && !todoItems?.length) {
            const payload = convertIssueType(res.data)
            setTodo(payload)
          }
          if (labelName === 'Doing' && !doingItems?.length) {
            const payload = convertIssueType(res.data)
            setDoing(payload)
          }
          if (labelName === 'Closed' && !closedItems?.length) {
            const payload = convertIssueType(res.data)
            setClosed(payload)
          }
        })
    })
  }, [todoItems, doingItems, closedItems])

  const convertLabel = (items: Issues): Label => {
    const labels = { ...items[0].labels }
    let label
    Object.entries(labels).forEach(([key, value]) => {
      label = value
      return value
    })
    return label as unknown as Label
  }

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

  useEffect(() => {
    const orderProcess = async () => {
      if (!issueItems?.length) {
        await fetchIssues()
      }

      await eachIssues()

      if (todoItems?.length && doingItems?.length && closedItems?.length) {
        await initializeColumns()
      }
    }

    orderProcess()
    // eslint-disable-next-line
  }, [todoItems, doingItems, closedItems])

  const changeLabel = async (issueNum: number, payload: { label: Label; owner: string; repo: string }) => {
    const headers = await getHeaders()
    const { data } = await request.put(
      `/repos/${owner}/${repo}/issues/${issueNum}/labels`,
      { labels: [payload.label.name] },
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

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickClose = () => {
    setOpen(false)
  }

  const handleInputTitle = () => {
    if (inputTitleRef.current) {
      inputTitleRef.current.value === '' ? setInputError(true) : setInputError(false)
    }
  }

  const handleClickSubmit = async() => {
    console.log(inputTitleRef.current.value)
    console.log(inputDeskRef.current.value)
    // const title = inputTitleRef.current.value
    // const description = inputDeskRef.current.value
    // await request.post(`/repos/${owner}/${repo}/issues?labels=${labelName}&state=open`, { title: ${title}, body: ${description} }, { headers })
  }

  return (
    <div className={classes.area}>
      <h1>TaskBoard of GitHub Issue</h1>
      <a onClick={() => window.open('https://docs.github.com/ja/rest/reference/users', '_blank')} style={{ cursor: 'pointer'}}>
        <p style={{ color: '#C38FFF' }}>GitHub API</p>
      </a>
      <a onClick={() => window.open('https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md', '_blank')} style={{ cursor: 'pointer'}}>
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
                        <Avatar sx={{ width: 24, height: 24, bgcolor: deepPurple[500], margin: '10px' }}>
                          {column.items ? column.items.length : '0'}
                        </Avatar>
                        <h3 style={{ flexGrow: 1 }}>{column.title}</h3>
                        <IconButton onClick={handleClickOpen}>
                          <AiOutlinePlus style={{ color: 'white', width: '30px' }}></AiOutlinePlus>
                        </IconButton>
                        <Dialog open={open} onClose={handleClickClose} fullWidth maxWidth="md">
                          <DialogTitle
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingRight: 13,
                              backgroundColor: '#3F51B5',
                            }}
                          >
                            <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                              Create a new GitHub Issue
                            </Typography>
                            <IconButton onClick={handleClickClose} sx={{ color: 'white' }}>
                              <AiOutlineClose />
                            </IconButton>
                          </DialogTitle>
                          <DialogContent dividers>
                            <DialogContentText>Create a new issue with <span style={{ fontWeight: 'bold'}}>{column.title}</span> label.</DialogContentText>
                            <TextField
                              autoFocus
                              margin="dense"
                              id="title"
                              label="Title"
                              type="text"
                              color="primary"
                              error={inputError}
                              helperText={inputError ? "Title is required." : ""}
                              inputRef={inputTitleRef}
                              fullWidth
                              variant="standard"
                              onChange={handleInputTitle}
                            />
                            <TextareaAutosize
                              placeholder="Description"
                              minRows={12}
                              style={{ width: '100%', marginTop: 15 }}
                              ref={inputDeskRef}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClickSubmit} style={{ backgroundColor: '#3F51B5', color: 'white' }}>
                              Submit
                            </Button>
                          </DialogActions>
                        </Dialog>
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
                                      <div style={{ flexDirection: 'column' }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} component="div">
                                          <a href={item.html_url} style={{ color: 'white', textDecoration: 'none' }}>
                                            {item.title}
                                          </a>
                                        </Typography>
                                        <Typography sx={{ mb: 1.0, margin: 0 }}>
                                          #{item.number} opened by {item.user.login}
                                        </Typography>
                                      </div>
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
