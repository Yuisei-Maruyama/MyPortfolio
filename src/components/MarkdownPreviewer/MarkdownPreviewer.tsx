import React, { useState, useEffect } from 'react'
// import MarkdownPreview from '@uiw/react-markdown-preview'
import MarkdownPreview from './MarkdownPreview'

type Props = {
  fileName: string
}

const MarkdownPreviewer: React.FC<Props> = (props: Props) => {
  const { fileName } = props

  const [text, setText] = useState<string>('')

  useEffect(() => {
    import(`../../../documents/${fileName}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setText(res))
      })
      .catch((err) => console.log(err))
  }, [fileName])

  return <MarkdownPreview text={text} />
}

export default MarkdownPreviewer
