import React, { FC, useRef } from 'react'
import { Button } from '@mui/material'
import { MdFileUpload } from 'react-icons/md'
import { onFileInputToArray } from '@/components/FileUploadButton/loadCsv'

type Props = {
  color?: string
  variant?: 'text' | 'outlined' | 'contained' | undefined
}

const FileUploadButton: FC<Props> = ({ color, variant }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const fileUpload = () => {
    if (!inputRef.current) return
    inputRef.current.click()
  }

  const handleInputFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await onFileInputToArray(event)
    console.log(await onFileInputToArray(event))
  }

  return (
    <div>
      <Button onClick={fileUpload} variant={variant} startIcon={<MdFileUpload />} sx={{ color: color }}>
        ファイルアップロード
      </Button>
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputFile(event)}
      />
    </div>
  )
}

export default FileUploadButton
