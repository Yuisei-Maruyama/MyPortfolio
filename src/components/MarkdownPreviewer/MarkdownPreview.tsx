import { FC, useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import { marked } from 'marked'
import mermaid from 'mermaid'
import styled from 'styled-components'
import 'highlight.js/styles/panda-syntax-dark.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)

type Props = {
  text: string
}

const MarkdownPreview: FC<Props> = ({ text }) => {
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elRef.current) return
    const element = elRef.current
    element.innerHTML = marked(text, {
      highlight: (code: string, language: string) => {
        if (hljs.getLanguage(language)) {
          return ['<code class="hljs">', hljs.highlight(code, { language }).value, '</code>'].join('')
        }
        if (language === 'mermaid') {
          return ['<div class="mermaid">', code, '</div>'].join('')
        }
        return code
      },
    })
    mermaid.init('.mermaid')
  }, [text])

  return (
    <_MarkdownBase>
      <div ref={elRef} />
    </_MarkdownBase>
  )
}

const _MarkdownBase = styled.div`
  font-size: 1.15rem;
`

export default MarkdownPreview
