import React from 'react'
import TreeItem from '@mui/lab/TreeItem'

const ComponentList: React.FC = () => {
  return (
    <>
      <TreeItem nodeId="1" label="Components">
        <TreeItem nodeId="2" label="Header" />
        <TreeItem nodeId="3" label="Table">
          <TreeItem nodeId="4" label="SkillTable" />
          <TreeItem nodeId="5" label="ResumeTable" />
        </TreeItem>
        <TreeItem nodeId="6" label="Footer" />
      </TreeItem>
    </>
  )
}

export default ComponentList
