import React, { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
import { rgba } from 'polished'
import { Header } from '@/types/index'

type Props = {
  title: string
}

interface CustomHeader extends Header {
  id: 'period' | 'summary' | 'experience' | 'post' | 'language' | 'db' | 'environment' | 'tools'
}

interface Rows {
  period: string[]
  summary: string | string[]
  experience: string[]
  post: string
  language: string[]
  db: string
  environment: string
  tools: string[]
}

const headers: CustomHeader[] = [
  { id: 'period', label: 'PERIOD' },
  { id: 'summary', label: 'SUMMARY' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'post', label: 'POST' },
  { id: 'language', label: 'LANGUAGE' },
  { id: 'db', label: 'DB' },
  { id: 'environment', label: 'ENVIRONMENT' },
  { id: 'tools', label: 'TOOLS' },
]

const createData = (
  period: string[],
  summary: string | string[],
  experience: string[],
  post: string,
  language: string[],
  db: string,
  environment: string,
  tools: string[]
) => {
  return { period, summary, experience, post, language, db, environment, tools }
}

const ResumeTable: React.FC<Props> = (props: Props) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { title } = props

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const rows: Rows[] = [
    createData(
      ['2020/11/01', '-', '2022/01/31'], // 期間
      '官公庁の職員を対象とした申請システムの開発と管理画面の作成', // 業務概要
      ['Vue,jsを使用したコンポーネント作成'], // 業務内容
      'PG', // 役割
      ['Javascript', 'TypeScript', 'YAML'], // 使用言語
      'CouchDB', // DB
      'Windows', // 作業環境
      ['Vue.js', 'Vuetify', 'Vuex', 'Vue-Router'] // 開発ツール等
    ),
  ]

  return (
    <Paper sx={{ width: '100%', backgroundColor: rgba(0, 0, 0, 0.3), border: '1px solid black' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={12} sx={{ color: 'white', backgroundColor: rgba(63, 81, 181, 1) }}>
                {title}
              </TableCell>
            </TableRow>
            <TableRow>
              {headers.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                  sx={{ color: 'white', backgroundColor: rgba(63, 81, 181, 0.7) }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ color: 'white' }}
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ResumeTable
