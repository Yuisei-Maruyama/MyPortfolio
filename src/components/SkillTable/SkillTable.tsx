import React, { useState, useEffect } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
import { rgba } from 'polished'
import { Header } from '@/types/index'
import { Stepper } from '@/components'

export type TableData = {
  name: string
  steps: string[]
  activeStep: number
}

type Props = {
  title: string
  link?: string
  frontEndProps?: TableData[]
  backEndProps?: TableData[]
}

interface CustomHeader extends Header {
  id: 'name' | 'roadStep'
}

const headers: CustomHeader[] = [
  { id: 'name', label: 'Technology', align: 'left' },
  { id: 'roadStep', label: 'Road\u00a0Step' },
]

const createData = (name: string, roadStep: string | React.ReactNode) => {
  return { name, roadStep }
}

const frontEndRows: { name: string; roadStep: string | React.ReactNode }[] = []
const backEndRows: { name: string; roadStep: string | React.ReactNode }[] = []

const SkillTable: React.FC<Props> = (props: Props) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { title, link, frontEndProps, backEndProps } = props

  useEffect(() => {
    if (frontEndProps && !frontEndRows.length) {
      frontEndProps.forEach((item: TableData) => {
        const { name, steps, activeStep } = item
        frontEndRows.push(createData(name, <Stepper steps={steps} activeStep={activeStep} />))
      })
    }

    if (backEndProps && !backEndRows.length) {
      backEndProps.forEach((item: TableData) => {
        const { name, steps, activeStep } = item
        backEndRows.push(createData(name, <Stepper steps={steps} activeStep={activeStep} />))
      })
    }

    // eslint-disable-next-line
  }, [])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', backgroundColor: rgba(0, 0, 0, 0.3), border: '1px solid #06D8D7' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => {
                  window.open(link, '_blank')
                }}
                align="center"
                colSpan={12}
                sx={{
                  cursor: 'pointer',
                  color: '#06D8D7',
                  backgroundColor: rgba(8, 55, 54, 0.7),
                  fontSize: '2rem',
                  fontFamily: 'TronFont',
                }}
              >
                {title}
              </TableCell>
            </TableRow>
            <TableRow>
              {headers.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                  sx={{ color: '#06D8D7', backgroundColor: rgba(0, 26, 26, 1) }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {frontEndProps
              ? frontEndRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                })
              : backEndRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
      {frontEndProps && frontEndRows.length ? (
        <TablePagination
          sx={{ color: 'white' }}
          rowsPerPageOptions={[5, 10, 100]}
          component="div"
          count={frontEndRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <></>
      )}
      {backEndProps && backEndRows.length ? (
        <TablePagination
          sx={{ color: 'white' }}
          rowsPerPageOptions={[5, 10, 100]}
          component="div"
          count={backEndRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        <></>
      )}
    </Paper>
  )
}

export default SkillTable
