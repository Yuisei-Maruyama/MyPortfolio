import { FC } from 'react'
import { CSVLink } from 'react-csv'
import { Headers, Data } from 'react-csv/components/CommonPropTypes'
import { Button } from '@mui/material'
import { IoMdDownload } from 'react-icons/io'

type Props = {
  csvHeaders: Headers
  csvData: string | Data | (() => string | Data)
  fileName: string
  color?: string
  variant?: 'text' | 'outlined' | 'contained' | undefined
}

const CsvDownloadButton: FC<Props> = ({ csvHeaders, csvData, fileName, color, variant }) => {
  return (
    <CSVLink headers={csvHeaders} data={csvData} filename={fileName} style={{ textDecoration: 'none' }}>
      <Button
        aria-label="CSVがダウンロードできるボタン"
        variant={variant}
        startIcon={<IoMdDownload />}
        sx={{ color: color }}
      >
        CSVダウンロード
      </Button>
    </CSVLink>
  )
}

export default CsvDownloadButton
