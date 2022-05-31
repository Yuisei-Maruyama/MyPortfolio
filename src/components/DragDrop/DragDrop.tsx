import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { rgba } from 'polished'
import { Label, Issues } from '@/types'
import { AiOutlinePlus } from 'react-icons/ai'
import { Avatar, IconButton } from '@mui/material'
import { IssueDialog, IssueCard } from '@/components'
import { deepPurple } from '@mui/material/colors'
import classes from './DragDrop.module.scss'

type Column = { title: string; items: Issues; label: Label }

type Props = {
  column: Column
  issueNumber?: number
  label: string
  toggleDelete: boolean
  handleClickOpen: (label: string, number?: number) => void
}

const DragDrop: React.FC<Props> = (props: Props) => {
  const { column, issueNumber, label, toggleDelete, handleClickOpen } = props

  return (
    <Droppable droppableId={label} key={label}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: rgba(5, 33, 35, 0.7),
              margin: 25,
              padding: 6,
              minHeight: 400,
              borderRadius: 7,
            }}
            className={snapshot.isDraggingOver ? classes.neonBorderBox : ''}
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
              <h3 style={{ flexGrow: 1, color: '#06D8D7' }}>{column.title}</h3>
              {label === 'todo' ? (
                <IconButton onClick={() => handleClickOpen(label)}>
                  <AiOutlinePlus style={{ color: 'white', width: '30px' }}></AiOutlinePlus>
                </IconButton>
              ) : (
                <></>
              )}
              {issueNumber ? (
                <IssueDialog
                  dialogTitle="Delete a GitHub Issue"
                  dialogDesc={["I gave up because GitHub doesn't provide DELETE API about Issue."]}
                />
              ) : (
                <IssueDialog
                  dialogTitle="Create a new GitHub Issue"
                  dialogDesc={['Create a new issue with Todo label.']}
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
}

export default DragDrop
