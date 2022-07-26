import React, { FC, ReactNode, useState } from 'react'
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, TablePagination, Checkbox, Box, Typography } from '@mui/material'
import SelectableTableHead from './SelectableTableHead'
import { useTableRowSelect } from '@/customHooks'

export interface TableContent {
  id: number
}

export type TableHeadCell = {
  id: string
  headerName: string
  width: number | string
}

type Props = {
  tableHeadCells: TableHeadCell[]
  tableContents: TableContent[]
  children?: ReactNode[]
}

const SelectableTable: FC<Props> = ({ tableContents, tableHeadCells, children }) => {

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const {
    selectedRowIds,
    getSelectedRows,
    isSelectedIds,
    isSelectedAll,
    isIndeterminate,
    toggleSelected,
    toggleSelectedAll,
  } = useTableRowSelect(tableContents.map((tableContent) => tableContent.id))

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table>
            <SelectableTableHead
              onSelectAllClick={toggleSelectedAll}
              tableHeadCells={tableHeadCells}
              checked={isSelectedAll}
              indeterminate={isIndeterminate}
            />
            <TableBody>
              {tableContents.map((tableContent) => {
                const isItemSelected = isSelectedIds(tableContent.id)

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={tableContent.id}
                    onClick={() => toggleSelected(tableContent.id)}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    {Object.values(tableContent).map((tableContentKey) => {
                      return <TableCell key={tableContentKey}>{tableContentKey}</TableCell>
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={tableContents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {children ? (
        <>
          <Box sx={{ marginTop: '25px' }}>
            {children[0]}
            <Typography sx={{ marginTop: '10px' }}>{JSON.stringify(selectedRowIds)}</Typography>
          </Box>
          <Box sx={{ marginTop: '25px' }}>
            {children[1]}
            <Typography sx={{ marginTop: '10px' }}>{JSON.stringify(getSelectedRows(tableContents))}</Typography>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default SelectableTable
