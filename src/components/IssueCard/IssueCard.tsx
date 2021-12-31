import React from 'react'
import { Avatar, IconButton, Card, CardContent, Typography } from '@mui/material'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { Issue } from '@/types/index'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

type Props = {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  item: Issue
  toggleDelete: boolean
  label: string
  handleClickOpen: (label: string, number?: number | undefined) => void
}

const IssueCard: React.FC<Props> = (props: Props) => {
  const { provided, snapshot, item, toggleDelete, label, handleClickOpen } = props
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
          <Avatar alt={item.user.login} src={item.user.avatar_url} sx={{ width: 35, height: 35, marginRight: 2 }} />
          <div style={{ flexDirection: 'column', flexGrow: 1 }}>
            <div style={{ display: 'flex' }}>
              <Typography
                sx={{
                  width: toggleDelete ? 200 : 260,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                  cursor: 'pointer',
                }}
                component="div"
                onClick={() => window.open(`${item.html_url}`, '_blank')}
              >
                {item.title}
              </Typography>
              {toggleDelete ? (
                <IconButton
                  onClick={() => handleClickOpen(label, item.number)}
                  style={{ color: 'white', marginLeft: 5 }}
                >
                  <DeleteForeverIcon fontSize="large" />
                </IconButton>
              ) : (
                <></>
              )}
            </div>
            <Typography sx={{ mb: 1.0, margin: 0 }}>
              #{item.number} {item.state} by {item.user.login}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default IssueCard
