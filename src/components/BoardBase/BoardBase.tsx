import React, { useState } from 'react'
import classes from './BoardBase.module.scss'
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { rgba } from "polished"
import {v4 as uuidv4} from 'uuid'

const BoardBase: React.FC = () => {

  const itemsFromBackend: Record<string, string>[] = [
    { id: '1234', content: 'First tasks' },
    { id: '5678', content: 'Second tasks' }
  ]

  const columnsFromBackend = [
    {
      [uuidv4()]: {
        name: 'Todo',
        items: itemsFromBackend
      }
    }
  ]

  const [columns, setColumns] = useState<any>(columnsFromBackend)

  const aaa = () => {
    setColumns([])
  }

  console.log(aaa)

  const onDragEnd = (result: any) => {
    console.log(result)
  }

  return (
    <div className={classes.area}>
      boardbase
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Droppable droppableId={id} key={uuidv4()}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? rgba(255, 255, 255, 0.5) : 'lightgrey',
                      padding: 4,
                      width: 400,
                      minHeight: 800,
                      borderRadius: 5
                    }}
                  >
                  </div>
                )
              }}
            </Droppable>
          )
        })}
      </DragDropContext>
    </div>
  )
}

export default BoardBase
