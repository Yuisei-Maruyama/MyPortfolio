import React from 'react'
// import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
// import { rgba } from 'polished'
// import { Label, Issues } from '@/types'
// import { AiOutlinePlus } from 'react-icons/ai'
// import { Avatar, IconButton } from '@mui/material'
// import { IssueDialog, IssueCard } from '@/components'
// import { deepPurple } from '@mui/material/colors'

// type Column = Record<string, { title: string; items: Issues; label: Label }>

// type Props = {
//   columns: Column
//   number: number
//   open: boolean
//   owner: string
//   repo: string
//   setColumns: () => void
//   setSelectLabel: (value: React.SetStateAction<string>) => void
//   setOpen: (toggle: React.SetStateAction<boolean>) => void
//   setNumber: (number: React.SetStateAction<number | undefined>) => void
// }

const DragDrop: React.FC = () => {

  return (
    <div>aaaaa</div>
  )

//   const { columns, number, owner, repo, setColumns, setSelectLabel, setOpen, setNumber } = props

//   const onDragEnd = async (result: DropResult, columns: Column, setColumns: React.Dispatch<React.SetStateAction<Column>>) => {
//     // droppableId: ドラッグしている要素のid
//     // source: ドロップ元
//     // destination: ドロップ先
//     const { source, destination } = result
//     if (!destination) return
//     if (destination.droppableId === source.droppableId && destination.index === source.index) return
//     if (source.droppableId !== destination.droppableId) {
//       const sourceColumn = columns[source.droppableId]
//       const destColumn = columns[destination.droppableId]
//       const sourceItems = [...sourceColumn.items]
//       const destItems = [...destColumn.items]
//       const [targetItem] = sourceItems.splice(source.index, 1)
//       destItems.splice(destination.index, 0, targetItem)
//       await setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...sourceColumn,
//           items: sourceItems,
//         },
//         [destination.droppableId]: {
//           ...destColumn,
//           items: destItems,
//         },
//       })
//       const destLabel = destColumn.label
//       console.log('destLabel', destLabel)
//       if (!(owner && repo)) return
//       await changeLabel(targetItem.number, { label: destLabel, owner, repo })
//     } else {
//       const column = columns[source.droppableId]
//       const copiedItems = [...column.items]
//       const [targetItem] = copiedItems.splice(source.index, 1)
//       copiedItems.splice(destination.index, 0, targetItem)
//       await setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...column,
//           items: copiedItems,
//         },
//       })
//     }
//   }

//   const handleClickOpen = (label: string, number?: number) => {
//     setSelectLabel(label)
//     setOpen(true)
//     if (number) {
//       setNumber(number)
//     }
//   }

//   return (
//     <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
//       {Object.entries(columns).map(([label, column]) => {
//         return (
//           <Droppable droppableId={label} key={label}>
//             {(provided, snapshot) => {
//               return (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   style={{
//                     background: snapshot.isDraggingOver ? rgba(63, 81, 181, 1.0) : '#161C22',
//                     margin: 10,
//                     padding: 6,
//                     minHeight: 400,
//                     borderRadius: 7,
//                   }}
//                 >
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <Avatar
//                       sx={{
//                         width: 30,
//                         height: 30,
//                         bgcolor: deepPurple[500],
//                         margin: '10px',
//                         fontWeight: 'bold',
//                         fontSize: 16,
//                       }}
//                     >
//                       {column.items ? column.items.length : '0'}
//                     </Avatar>
//                     <h3 style={{ flexGrow: 1 }}>{column.title}</h3>
//                     {label === 'todo' ? (
//                       <IconButton onClick={() => handleClickOpen(label)}>
//                         <AiOutlinePlus style={{ color: 'white', width: '30px' }}></AiOutlinePlus>
//                       </IconButton>
//                     ) : (
//                       <></>
//                     )}
//                     {number ? (
//                       <IssueDialog
//                         issueNumber={number}
//                         dialogTitle="Delete a GitHub Issue"
//                         dialogDesc={["I gave up because GitHub doesn't provide DELETE API about Issue."]}
//                       />
//                     ) : (
//                       <IssueDialog
//                         dialogTitle="Create a new GitHub Issue"
//                         dialogDesc={['Create a new issue with Todo label.']}
//                       />
//                     )}
//                   </div>
//                   {column.items?.map((item, index) => {
//                     return (
//                       <Draggable key={item.id} draggableId={item.id} index={index}>
//                         {(provided, snapshot) => {
//                           return (
//                             <IssueCard
//                               provided={provided}
//                               snapshot={snapshot}
//                               item={item}
//                               toggleDelete={toggleDelete}
//                               label={column.title}
//                               handleClickOpen={handleClickOpen}
//                             />
//                           )
//                         }}
//                       </Draggable>
//                     )
//                   })}
//                   {provided.placeholder}
//                 </div>
//               )
//             }}
//           </Droppable>
//         )
//       })}
//     </DragDropContext>
//   )
}

export default DragDrop
