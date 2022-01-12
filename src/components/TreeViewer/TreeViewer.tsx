import React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem, { TreeItemProps, useTreeItem, TreeItemContentProps } from '@mui/lab/TreeItem'
import clsx from 'clsx'
import Typography from '@mui/material/Typography'
import { ComponentList, DocumentList } from '@/components'

const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
  const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } =
    useTreeItem(nodeId)

  const icon = iconProp || expansionIcon || displayIcon

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event)
  }

  const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event)
  }

  const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleSelection(event)
  }

  return (
    // eslint-disable-next-line
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography onClick={handleSelectionClick} component="div" className={classes.label}>
        {label}
      </Typography>
    </div>
  )
})

export const CustomTreeItem = (props: TreeItemProps) => <TreeItem ContentComponent={CustomContent} {...props} />

const TreeViewer: React.FC = () => {
  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 1200, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <ComponentList />
      <DocumentList />
    </TreeView>
  )
}

export default TreeViewer
