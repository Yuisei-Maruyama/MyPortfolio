import React from 'react'
import { CustomTreeItem } from '@/components/TreeViewer/TreeViewer'

const ComponentList: React.FC = () => {
  return (
    <>
      <CustomTreeItem nodeId="1" label="Components">
        <CustomTreeItem nodeId="2" label="Header" />
        <CustomTreeItem nodeId="3" label="Table">
          <CustomTreeItem nodeId="4" label="SkillTable" />
          <CustomTreeItem nodeId="5" label="ResumeTable" />
        </CustomTreeItem>
        <CustomTreeItem nodeId="6" label="Footer" />
      </CustomTreeItem>
    </>
  )
}

export default ComponentList
