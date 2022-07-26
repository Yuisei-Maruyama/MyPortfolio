import { useState } from 'react'

const useTableRowSelect = (
  rowIds: number[],
  initialSelectedRowIds: number[] = []
): {
  selectedRowIds: number[]
  getSelectedRows: (rows: { id: number }[]) => { id: number } | { id: number }[] | undefined
  isSelectedIds: (rowId: number) => boolean
  isSelectedAll: boolean
  isIndeterminate: boolean
  toggleSelected: (id: number) => void
  toggleSelectedAll: () => void
} => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>(initialSelectedRowIds)

  const getSelectedRows = (rows: { id: number }[]) => {
    if (selectedRowIds.length === 1) {
      return rows.find((row) => selectedRowIds.includes(row.id))
    }
    return rows.filter((row) => selectedRowIds.includes(row.id))
  }

  const isSelectedIds = (rowId: number) => selectedRowIds.includes(rowId)
  const isSelectedAll = rowIds.length > 0 && selectedRowIds.length === rowIds.length
  const isIndeterminate = selectedRowIds.length > 0 && selectedRowIds.length < rowIds.length

  const toggleSelected = (rowId: number) => {
    isSelectedIds(rowId)
      ? setSelectedRowIds(selectedRowIds.filter((selectedId) => selectedId !== rowId))
      : setSelectedRowIds([...selectedRowIds, rowId])
  }
  const toggleSelectedAll = () => {
    isSelectedAll ? setSelectedRowIds([]) : setSelectedRowIds(rowIds)
  }

  return {
    selectedRowIds,
    getSelectedRows,
    isSelectedIds,
    isSelectedAll,
    isIndeterminate,
    toggleSelected,
    toggleSelectedAll,
  }
}

export default useTableRowSelect