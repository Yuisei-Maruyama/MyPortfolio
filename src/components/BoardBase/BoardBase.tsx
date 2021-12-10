import React, { useState } from 'react'
import classes from './BoardBase.module.scss'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { rgba } from 'polished'
import { v4 as uuid } from 'uuid'

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
      name: 'Todo',
      items: itemsFromBackend,
    },
  }

  const [columns, setColumns] =
    useState<Record<string, { name: string; items: Record<string, string>[] }>>(columnsFromBackend)

  const aaa = () => {
    setColumns({ '1': { name: 'Todo', items: [{ id: '1234', content: 'First tasks' }] } })
  }

  console.log(aaa)

  const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
    if (!result.destination) return
    const { source, destination } = result
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

  // const onDragEnd = (result: any) => {
  //   if (!result.destination) {
  //     return;
  //   }

  //   if (result.destination.index === result.source.index) {
  //     return;
  //   }

  //   const items = reorder(
  //     state.items,
  //     result.source.index,
  //     result.destination.index
  //   );

  //   setColumns({ items });
  // };

  // darkFontColor: #C38FFF

  return (
    <div className={classes.area}>
      <h2>TaskBoard of GitHub Issue</h2>
      <a href="https://docs.github.com/ja/rest/reference/users">
        <p>GitHub API</p>
      </a>
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
                      background: snapshot.isDraggingOver ? rgba(63, 81, 181, 1.0) : '#000107',
                      padding: 4,
                      width: 400,
                      minHeight: 400,
                      borderRadius: 5,
                    }}
                  >
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
                                  backgroundColor: snapshot.isDragging ? '#263B4A' : '#161C22',
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
                  </div>
                )
              }}
            </Droppable>
          )
        })}
      </DragDropContext>
      <img
        src={`${process.env.PUBLIC_URL}/assets/BoardDesign.png`}
        alt="BoardDesign"
        style={{ marginTop: 20, width: 1400 }}
      />
    </div>
  )
}

export default BoardBase
