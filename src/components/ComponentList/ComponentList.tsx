import React from 'react'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem, { TreeItemProps, useTreeItem, TreeItemContentProps } from '@mui/lab/TreeItem'
import clsx from 'clsx'
import Typography from '@mui/material/Typography'

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

const CustomTreeItem = (props: TreeItemProps) => <TreeItem ContentComponent={CustomContent} {...props} />

const ComponentList: React.FC = () => {
  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <CustomTreeItem nodeId="1" label="Components">
        <CustomTreeItem nodeId="2" label="Header" />
        <CustomTreeItem nodeId="3" label="Table">
          <CustomTreeItem nodeId="4" label="SkillTable" />
          <CustomTreeItem nodeId="5" label="ResumeTable" />
        </CustomTreeItem>
        <CustomTreeItem nodeId="6" label="Footer" />
      </CustomTreeItem>
      <CustomTreeItem nodeId="7" label="Documents">
        <CustomTreeItem nodeId="20" label="Front-End">
          <CustomTreeItem nodeId="8" label="README" />
          <CustomTreeItem nodeId="9" label="React">
            <CustomTreeItem nodeId="10" label="React Hooks">
              <CustomTreeItem nodeId="11" label="useState" />
              <CustomTreeItem nodeId="12" label="useEffect" />
              <CustomTreeItem nodeId="13" label="useRef" />
              <CustomTreeItem nodeId="14" label="useCallback" />
            </CustomTreeItem>
            <CustomTreeItem nodeId="15" label="react-router-dom" />
            <CustomTreeItem nodeId="16" label="styled-components" />
            <CustomTreeItem nodeId="17" label="Suspense" />
            <CustomTreeItem nodeId="18" label="OAuth" />
            <CustomTreeItem nodeId="19" label="Apollo-Client" />
          </CustomTreeItem>
          <CustomTreeItem nodeId="21" label="Vue">
            <CustomTreeItem nodeId="22" label="Vue v3.x" />
          </CustomTreeItem>
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
  )
}

export default ComponentList
