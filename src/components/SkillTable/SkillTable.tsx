import React, { useState, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
import { rgba } from 'polished'
import { Header } from '@/types/index'
import { Stepper } from '@/components'

const headers: Header[] = [
  { id: 'name', label: 'Name' },
  { id: 'roadStep', label: 'Road\u00a0Step' },
]

const createData = (name: string, roadStep: string | React.ReactNode) => {
  return { name, roadStep }
}

let rows: { name: string; roadStep: string | React.ReactNode }[] = []

const SkillTable: React.FC = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const reactStep = ['create-react-app', 'rooting', 'tsx']

  useEffect(() => {
    rows = [
      createData('React.js', <Stepper steps={reactStep} activeStep={2} />),
      createData('Vue.js', 'CN'),
      createData('TypeScript', 'IT'),
    ]
  }, [])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', backgroundColor: rgba(0, 0, 0, 0.3), border: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={12} sx={{ color: 'white', backgroundColor: rgba(63, 81, 181, 1) }}>
                Front-End Goal Image
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
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {headers.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align} sx={{ color: 'white' }}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
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

export default SkillTable
