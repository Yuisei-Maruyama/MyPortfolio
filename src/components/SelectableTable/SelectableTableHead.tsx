import React, { FC } from 'react'
import {TableCell, TableHead, TableRow, Checkbox} from '@mui/material'
import { TableHeadCell } from './SelectableTable'

type Props = {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  tableHeadCells: TableHeadCell[];
  checked: boolean;
  indeterminate: boolean;
}

const SelectableTableHead: FC<Props> = ({ onSelectAllClick, tableHeadCells, checked, indeterminate }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={indeterminate}
            checked={checked}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {tableHeadCells.map((headCell) => (
          <TableCell key={headCell.id} padding={"normal"} width={headCell.width}>
            {headCell.headerName}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default SelectableTableHead;