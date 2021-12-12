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

const BoardBase: React.FC = () => {
  const itemsFromBackend: Record<string, string>[] = [
    { id: uuid(), content: 'First tasks' },
    { id: uuid(), content: 'Second tasks' },
  ]

  const columnsFromBackend = {
    [uuid()]: {
      title: 'Todo',
      items: itemsFromBackend,
    },
    [uuid()]: {
      title: 'Doing',
      items: [],
    },
    [uuid()]: {
      title: 'Closed',
      items: [],
    },
  }

  const [columns, setColumns] =
    useState<Record<string, { title: string; items: Record<string, string>[] }>>(columnsFromBackend)

  const [issueItems, setIssues] = useState<Record<string, unknown>[]>([])

  const request = axios.create({
    baseURL: 'https://api.github.com',
  })

  useEffect(() => {
    request.get('/repos/Yuisei-Maruyama/MyPortfolio/issues').then((res: any) => {
      setIssues(res.data)
    })
  }, [])

  // [
  //   {
  //     labels: [
  //       {
  //         name: 'Todo'
  //       }
  //     ]
  //   },
  //   {
  //     labels: [
  //       {
  //         name: 'Doing'
  //       }
  //     ]
  //   }
  // ]
  console.log(issueItems)

  // const todoList = issueItems.filter((item: { labels: { name: string }[] }) => {
  //   console.log(item.labels.map(label => console.log(label))
  //   return item
  // })

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
                          {column.items.length}
                        </Avatar>
                        <h3 style={{ flexGrow: 1 }}>{column.title}</h3>
                        <IconButton>
                          <RefreshIcon style={{ color: 'white', width: '30px' }}></RefreshIcon>
                        </IconButton>
                      </div>
                      {column.items.map((item, index) => {
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
                                  {item.content}
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
        src={`${process.env.PUBLIC_URL}/assets/BoardDesign.png`}
        alt="BoardDesign"
        style={{ marginTop: 20, width: 1400 }}
      />
    </div>
  )
}

export default BoardBase
