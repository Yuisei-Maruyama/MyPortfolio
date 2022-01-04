import React from 'react'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
  GridRowsProp,
  useGridApiRef,
  DataGridPro,
  GridApiRef,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridEvents,
  GridRowId,
} from '@mui/x-data-grid-pro'
import { getRandomInt } from '@/data/utils'
import { v4 as uuid } from 'uuid'

const rows: GridRowsProp = [
  {
    id: uuid(),
    period: ['2020/11/01', '-', '2022/01/31'], // 期間
    summary: '官公庁の職員を対象とした申請システムの開発と管理画面の作成', // 業務概要
    experience: ['Vue,jsを使用したコンポーネント作成'], // 業務内容
    post: 'PG', // 役割
    language: 'Javascript\nTypeScript\nYAML', // 使用言語
    db: 'CouchDB', // DB
    environment: 'Windows', // 作業環境
    tools: ['Vue.js', 'Vuetify', 'Vuex', 'Vue-Router'], // 開発ツール等
  },
]

interface EditToolbarProps {
  apiRef: GridApiRef
}

function EditToolbar(props: EditToolbarProps) {
  const { apiRef } = props

  const handleClick = () => {
    const id = getRandomInt(1, 3)
    apiRef.current.updateRows([{ id, isNew: true }])
    apiRef.current.setRowMode(id, 'edit')
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      })
      apiRef.current.setCellFocus(id, 'name')
    })
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  )
}

const EditableTable: React.FC = () => {
  const apiRef = useGridApiRef()

  const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop: GridEventListener<GridEvents.rowEditStop> = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleCellFocusOut: GridEventListener<GridEvents.cellFocusOut> = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleEditClick = (id: GridRowId) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    apiRef.current.setRowMode(id, 'edit')
  }

  const handleSaveClick = (id: GridRowId) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    apiRef.current.commitRowChange(id)
    apiRef.current.setRowMode(id, 'view')

    const row = apiRef.current.getRow(id)
    apiRef.current.updateRows([{ ...row, isNew: false }])
  }

  const handleDeleteClick = (id: GridRowId) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    apiRef.current.updateRows([{ id, _action: 'delete' }])
  }

  const handleCancelClick = (id: GridRowId) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    apiRef.current.setRowMode(id, 'view')

    const row = apiRef.current.getRow(id)
    if (row!.isNew) {
      apiRef.current.updateRows([{ id, _action: 'delete' }])
    }
  }

  const columns: GridColumns = [
    { field: 'period', headerName: 'PERIOD', type: 'string', width: 100, editable: true },
    { field: 'summary', headerName: 'SUMMARY', type: 'string', editable: true },
    {
      field: 'experience',
      headerName: 'EXPERIENCE',
      type: 'string',
      editable: true,
    },
    {
      field: 'post',
      headerName: 'POST',
      type: 'string',
      editable: true,
    },
    {
      field: 'language',
      headerName: 'LANGUAGE',
      type: 'string',
      editable: true,
    },
    {
      field: 'db',
      headerName: 'DB',
      type: 'string',
      editable: true,
    },
    {
      field: 'environment',
      headerName: 'ENVIRONMENT',
      type: 'string',
      editable: true,
    },
    {
      field: 'tools',
      headerName: 'TOOLS',
      type: 'string',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = apiRef.current.getRowMode(id) === 'edit'

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
              key="id"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
              key="id"
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            key="id"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            key="id"
          />,
        ]
      },
    },
  ]

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'white',
        },
        '& .textPrimary': {
          color: 'white',
        },
      }}
    >
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onCellFocusOut={handleCellFocusOut}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}
      />
    </Box>
  )
}

export default EditableTable
