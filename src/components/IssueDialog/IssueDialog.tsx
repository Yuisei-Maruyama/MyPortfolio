import React, { useState, useRef, ElementType } from 'react'
import {
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
} from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { getHeaders, convertIssueId } from '@/components'
import { Issues, Issue } from '@/types'
import MDEditor from '@uiw/react-md-editor'

const request = axios.create({
  baseURL: 'https://api.github.com',
})

const owner = process.env.REACT_APP_USER_NAME

const repo = process.env.REACT_APP_PROJECT

const token = process.env.REACT_APP_TOKEN

type Props = {
  issueNumber?: number
  dialogTitle: string
  dialogDesc: string | Array<string | ElementType>
  selectedLabel: string
  open: boolean
  todoItems: Issues
  doingItems: Issues
  closedItems: Issues
  setOpen: (open: boolean) => void
  fetchIssues: () => void
  setNumber: (num: number | undefined) => void
  setTodo: React.Dispatch<React.SetStateAction<Issues>>
  setDoing: React.Dispatch<React.SetStateAction<Issues>>
  setClosed: React.Dispatch<React.SetStateAction<Issues>>
}

const IssueDialog: React.FC<Props> = (props: Props) => {

  const {
    issueNumber,
    dialogTitle,
    dialogDesc,
    selectedLabel,
    open,
    todoItems,
    doingItems,
    closedItems,
    setOpen,
    fetchIssues,
    setTodo,
    setDoing,
    setClosed,
    setNumber
  } = props

  const [inputError, setInputError] = useState(false)
  const [desc, setDesc] = useState<string | undefined>('')

  const inputTitleRef = useRef<any>(null)
  // const inputDeskRef = useRef<any>(null)

  const handleClickClose = () => {
    setOpen(false)
    setNumber(undefined)
  }

  const handleInputTitle = () => {
    if (inputTitleRef.current) {
      inputTitleRef.current.value === '' ? setInputError(true) : setInputError(false)
    }
  }

  // const handleInputDesc = (e: string | undefined) => {
  //   if (inputDeskRef.current) {
  //     // const desk = inputDeskRef.current
  //     // console.log(desk)
  //     const text = inputDeskRef.current.textarea.value
  //     console.log(text)
  //   }
  // }

  // Issues内をIDで降順で並べ替え
  const sortIssues = (before: Issue, after: Issue) => {
    return before.id < after.id ? 1 : -1
  }

  const handleClickSubmit = async(labelName: string) => {
    if (!token) return
    const headers = await getHeaders(token)
    const title = inputTitleRef.current.value
    // const description = inputDeskRef.current.value
    const description = desc
    const { data } = await request.post(`/repos/${owner}/${repo}/issues`, { title: title, body: description, labels: [labelName] }, { headers })
    const payload = convertIssueId(data)
    await handleClickClose()
    await setDesc('')
    await fetchIssues()
    await setTodo([...todoItems, payload].sort(sortIssues))
  }

  const handleClickDelete = async (num: number, labelName: string) => {
    if (!token) return
    const headers = await getHeaders(token)
    const { data } = await request.delete(`/repos/${owner}/${repo}/issues/${num}`, { headers })
    const payload = convertIssueId(data)
    await handleClickClose()
    await fetchIssues()
    if (labelName === 'Todo') await setTodo([...todoItems, payload].sort(sortIssues))
    if (labelName === 'Doing') await setDoing([...doingItems, payload].sort(sortIssues))
    if (labelName === 'Closed') await setClosed([...closedItems, payload].sort(sortIssues))
  }

  const convertToUpperCase = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <>
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
            { dialogTitle }
          </Typography>
          <IconButton onClick={handleClickClose} sx={{ color: 'white' }}>
            <AiOutlineClose />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {
            issueNumber
              ? <DialogContentText>{ dialogDesc }</DialogContentText>
              : <>
                  <DialogContentText>{ dialogDesc }</DialogContentText>
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
                  <MDEditor
                    placeholder='Description'
                    style={{ marginTop: 25 }}
                    value={desc}
                    height={400}
                    onChange={setDesc}
                  />
                </>
          }
        </DialogContent>
        <DialogActions>
          {
            issueNumber
              ? <Button disabled onClick={() => handleClickDelete(issueNumber, convertToUpperCase(selectedLabel))}>Delete</Button>
              : <Button
                onClick={() => handleClickSubmit(convertToUpperCase(selectedLabel))}
                style={{ backgroundColor: '#3F51B5', color: 'white' }}>
                  Submit
                </Button>
          }
        </DialogActions>
      </Dialog>
    </>
  )
}

export default IssueDialog
