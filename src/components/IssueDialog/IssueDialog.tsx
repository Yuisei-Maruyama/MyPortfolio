import React, { useState, useRef, ElementType, useContext } from 'react'
import {
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import MDEditor from '@uiw/react-md-editor'
import { getHeaders, convertIssueId } from '@/components'
import { IssueContext } from '@/components/BoardBase/BoardBase'
import { Issue } from '@/types'
import styled from 'styled-components'

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
}

interface Disable {
  disable: boolean
}

const $IssueDialogContent = styled(DialogContent)`
  background-color: #021114;
`

const $MDEditor = styled(MDEditor)`
  margin-top: 25px;
  border: 1px solid #06d8d7;
  background-color: #021114;
  color: #06d8d7;
  & .w-md-editor-toolbar {
    background-color: #021114;
    border-bottom: 1px solid #06d8d7;
    & svg {
      color: #06d8d7;
    }
    & li.active > button {
      border: 1px solid #06d8d7;
      background-color: #021114;
    }
  }
  & .w-md-editor-text-pre .title, .w-md-editor-text-pre .bold {
    color: #06d8d7 !important;
  }
  & .wmde-markdown-color code[class*='language-'] .token.punctuation {
    color: #06d8d7;
  }
  & .w-md-editor-preview {
    box-shadow: inset 1px 0 0 0 #06d8d7;
  }
  & .wmde-markdown-color code[class*='language-'] {
    color: #06d8d7;
  }
`

const $DialogActions = styled(DialogActions)<Disable>`
  background-color: #021114;
  border-top: 1px solid #06d8d7;
  & button {
    color: #06d8d7;
    border: ${(p) => (p.disable ? 'none' : '1px solid #06D8D7')};
    background-color: #021114;
  }
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiPaper-root': { border: '1px solid #06D8D7' },
      '& .MuiInput-input.MuiInputBase-input': { color: '#06D8D7', borderBottom: '1px solid #06D8D7' },
    },
  })
)

const IssueDialog: React.FC<Props> = (props: Props) => {
  const { dialogTitle, dialogDesc } = props

  const classes = useStyles()

  const {
    todoItems,
    doingItems,
    closedItems,
    open,
    issueNumber,
    selectedLabel,
    setOpen,
    fetchIssues,
    setTodo,
    setDoing,
    setClosed,
    setNumber,
  } = useContext(IssueContext)

  const [inputError, setInputError] = useState(false)
  const [title, setTitle] = useState<string | undefined>('')
  const [desc, setDesc] = useState<string | undefined>('')

  const inputTitleRef = useRef<any>(null)
  // const inputDeskRef = useRef<any>(null)

  const handleClickClose = () => {
    if (!setOpen || !setNumber) return
    setOpen(false)
    setNumber(undefined)
  }

  const handleInputTitle = () => {
    if (inputTitleRef.current) {
      setTitle(inputTitleRef.current.value)
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

  const handleClickSubmit = async (labelName: string) => {
    if (!token) return
    if (!todoItems || !fetchIssues || !setTodo) return
    const headers = await getHeaders(token)
    const title = inputTitleRef.current.value
    // const description = inputDeskRef.current.value
    const description = desc
    const { data } = await request.post(
      `/repos/${owner}/${repo}/issues`,
      { title: title, body: description, labels: [labelName] },
      { headers }
    )
    const payload = convertIssueId(data)
    await handleClickClose()
    await setDesc('')
    await fetchIssues()
    await setTodo([...todoItems, payload].sort(sortIssues))
  }

  const handleClickDelete = async (num: number, labelName: string) => {
    if (!token) return
    if (!todoItems || !doingItems || !closedItems || !fetchIssues || !setTodo || !setDoing || !setClosed) return
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
      {!open || !selectedLabel ? (
        <></>
      ) : (
        <Dialog open={open} onClose={handleClickClose} fullWidth maxWidth="md" className={classes.root}>
          <DialogTitle
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 13,
              backgroundColor: '#021114',
              borderBottom: '1px solid #06D8D7',
            }}
          >
            <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: '#06D8D7' }}>{dialogTitle}</Typography>
            <IconButton onClick={handleClickClose} sx={{ color: 'white' }}>
              <AiOutlineClose />
            </IconButton>
          </DialogTitle>
          <$IssueDialogContent dividers>
            {issueNumber ? (
              <DialogContentText color="#06D8D7">{dialogDesc}</DialogContentText>
            ) : (
              <>
                <DialogContentText color="#06D8D7">{dialogDesc}</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  error={inputError}
                  helperText={inputError ? 'Title is required.' : ''}
                  inputRef={inputTitleRef}
                  InputLabelProps={{
                    style: { color: '#06D8D7' },
                  }}
                  fullWidth
                  variant="standard"
                  onChange={handleInputTitle}
                />
                <$MDEditor placeholder="Description" value={desc} height={400} onChange={setDesc} />
              </>
            )}
          </$IssueDialogContent>
          <$DialogActions disable={!title}>
            {issueNumber ? (
              <Button disabled onClick={() => handleClickDelete(issueNumber, convertToUpperCase(selectedLabel))}>
                Delete
              </Button>
            ) : (
              <Button onClick={() => handleClickSubmit(convertToUpperCase(selectedLabel))} disabled={!title}>
                Submit
              </Button>
            )}
          </$DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default IssueDialog
