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
  font-size: 18px;
  p > a {
    color: #06d8d7;
  }
  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    color: #06d8d7;
    /* background-color: rgba(110,118,129,0.4); */
    border-radius: 6px;
  }
  blockquote {
    margin-left: 0;
    padding: 0 1em;
    color: #06d8d7;
    border-left: 0.25em solid #06d8d7;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
    font-size: 16px;
    overflow: auto;
  }
  thead {
    padding: 10px auto;
    border: 1px solid #06d8d7;
    font-size: 16px;
    font-weight: 600;
  }
  th,
  td {
    padding: 6px 13px;
    border: 1px solid #06d8d7;
  }
  td > a {
    color: #06d8d7;
  }
  svg[id*="mermaid"] {
    padding: 10px;
    background-color: white;
  }
`

export default MarkdownPreview
