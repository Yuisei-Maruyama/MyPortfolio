import React, { useState, useRef } from 'react'
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
  TextareaAutosize,
} from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { getHeaders } from '@/components'

const request = axios.create({
  baseURL: 'https://api.github.com',
})

const owner = process.env.REACT_APP_USER_NAME

const repo = process.env.REACT_APP_PROJECT

const token = process.env.REACT_APP_TOKEN

type Props = {
  selectedLabel: string
  open: boolean
  setOpen: (open: boolean) => void
  fetchIssues: () => void
}

const IssueDialog: React.FC<Props> = (props: Props) => {

  const { selectedLabel, open, setOpen, fetchIssues } = props

  const [inputError, setInputError] = useState(false)

  const inputTitleRef = useRef<any>(null)
  const inputDeskRef = useRef<any>(null)

  const handleClickClose = () => {
    setOpen(false)
  }

  const handleInputTitle = () => {
    if (inputTitleRef.current) {
      inputTitleRef.current.value === '' ? setInputError(true) : setInputError(false)
    }
  }

  const handleClickSubmit = async(labelName: string) => {
    if (!token) return
    const headers = await getHeaders(token)
    const title = inputTitleRef.current.value
    const description = inputDeskRef.current.value
    await request.post(`/repos/${owner}/${repo}/issues`, { title: title, body: description, labels: [labelName] }, { headers })
    await handleClickClose()
    await fetchIssues()
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
            Create a new GitHub Issue
          </Typography>
          <IconButton onClick={handleClickClose} sx={{ color: 'white' }}>
            <AiOutlineClose />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Create a new issue with <span style={{ fontWeight: 'bold'}}>{ convertToUpperCase(selectedLabel) }</span> label.</DialogContentText>
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
          <Button onClick={() => handleClickSubmit(convertToUpperCase(selectedLabel))} style={{ backgroundColor: '#3F51B5', color: 'white' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default IssueDialog
