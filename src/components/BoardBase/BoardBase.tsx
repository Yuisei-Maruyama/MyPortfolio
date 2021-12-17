import React, { useState, useEffect } from 'react'
import classes from './BoardBase.module.scss'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { rgba } from 'polished'
import { v4 as uuid } from 'uuid'
import { Avatar, IconButton } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import RefreshIcon from '@mui/icons-material/Refresh'
import axios from 'axios'

// const reorder = (
//   list: any[],
//   startIndex: number,
//   endIndex: number
// ): any[] => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

const userName = process.env.REACT_APP_USER_NAME

const project = process.env.REACT_APP_PROJECT

const request = axios.create({
  baseURL: 'https://api.github.com',
})

interface Issue {
  id: string
  title: string
  body: string
  labels: {
    name: string
  }[]
}

type Issues = Issue[] | undefined

// ここに関数定義することで、レンダリングを抑える

const convertIssueType = (data: any) => {
  const payload = data.map((item: { id: number }) => {
    return { ...item, id: item.id.toString() }
  })
  return payload
}

const BoardBase: React.FC = () => {
  const [issueItems, setIssues] = useState<Issues>([])
  const [todoItems, setTodo] = useState<Issues>([])
  const [doingItems, setDoing] = useState<Issues>([])
  const [closedItems, setClosed] = useState<Issues>([])
  const [columns, setColumns] = useState<Record<string, { title: string; items: Issues }>>({})

  useEffect(() => {
    ;(async () => {
      await request.get(`/repos/${userName}/${project}/issues`).then((res: { data: any }) => {
        if (issueItems?.length) return
        const payload = convertIssueType(res.data)
        setIssues(payload)
      })

      const labelNames = ['Todo', 'Doing', 'Closed']

      await labelNames.forEach(async (labelName: string) => {
        await request
          .get(`/repos/${userName}/${project}/issues?labels=${labelName}&state=open`)
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
      const initializeColumns = async () => {
        if ((todoItems || doingItems || closedItems) === []) return
        const columnsFromBackend = {
          [uuid()]: {
            title: 'Todo',
            items: todoItems,
          },
          [uuid()]: {
            title: 'Doing',
            items: doingItems,
          },
          [uuid()]: {
            title: 'Closed',
            items: closedItems,
          },
        }
        await setColumns(columnsFromBackend)
      }
      await initializeColumns()
    })()
  }, [issueItems, todoItems, doingItems, closedItems])

  console.log('All', issueItems)
  console.log('Todo', todoItems)
  console.log('Doing', doingItems)
  console.log('Closed', closedItems)

  const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
    // ドラッグしている要素のid
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
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumns({
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
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      })
    }
  }

  return (
    <div className={classes.area}>
      <h1>TaskBoard of GitHub Issue</h1>
      <a href="https://docs.github.com/ja/rest/reference/users">
        <p style={{ color: '#C38FFF' }}>GitHub API</p>
      </a>
      <a href="https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md">
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
                        <IconButton>
                          <RefreshIcon style={{ color: 'white', width: '30px' }}></RefreshIcon>
                        </IconButton>
                      </div>
                      {column.items?.map((item, index) => {
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div
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
                                  {item.title}
                                </div>
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
      <img
        src={`${process.env.PUBLIC_URL}/assets/BoardDesign_PC.png`}
        alt="BoardDesign"
        style={{ marginTop: 20, width: 1400 }}
      />
    </div>
  )
}

export default BoardBase
