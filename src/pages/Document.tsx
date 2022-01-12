import React from 'react'
import { MarkdownPreviewer } from '@/components'
import { useParams } from 'react-router-dom'

const Document = () => {

  const params: { label: string } = useParams()

  return (
    <div style={{ margin: "2% auto", width: "60%" }}>
      <MarkdownPreviewer fileName={`${params.label}.md`} />
    </div>
  )
}

export default Document
