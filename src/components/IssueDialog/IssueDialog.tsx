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
// import axios from 'axios'

// const request = axios.create({
//   baseURL: 'https://api.github.com',
// })

// const owner = process.env.REACT_APP_USER_NAME

// const repo = process.env.REACT_APP_PROJECT

// const token = process.env.REACT_APP_TOKEN

type Props = {
  selectedLabel: string
  open: boolean
  setOpen: (open: boolean) => void
}

const IssueDialog: React.FC<Props> = (props: Props) => {

  const { selectedLabel, open, setOpen } = props

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
    console.log(inputTitleRef.current.value)
    console.log(inputDeskRef.current.value)
    console.log('labelName', labelName)
    // const title = inputTitleRef.current.value
    // const description = inputDeskRef.current.value
    // await request.post(`/repos/${owner}/${repo}/issues?labels=${labelName}&state=open`, { title: ${title}, body: ${description} }, { headers })
  }

  console.log(props)

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
          <DialogContentText>Create a new issue with <span style={{ fontWeight: 'bold'}}>{ selectedLabel.charAt(0).toUpperCase() + selectedLabel.slice(1) }</span> label.</DialogContentText>
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
          <Button onClick={() => handleClickSubmit(selectedLabel)} style={{ backgroundColor: '#3F51B5', color: 'white' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default IssueDialog
