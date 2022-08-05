import { FC, useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import { marked } from 'marked'
import mermaid from 'mermaid'
import styled from 'styled-components'
import 'highlight.js/styles/panda-syntax-dark.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('css', css)

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
  h3 {
    position: relative;
    line-height: 1.4;
    padding: 0.25em 1em;
    display: inline-block;
    background-color: #0e3333;
    top: 0;
  }

  h3:before,
  h3:after {
    position: absolute;
    top: 0;
    content: '';
    width: 8px;
    height: 100%;
    display: inline-block;
  }
  h3:before {
    border-left: solid 1px #06d8d7;
    border-top: solid 1px #06d8d7;
    border-bottom: solid 1px #06d8d7;
    left: 0;
  }
  h3:after {
    content: '';
    border-top: solid 1px #06d8d7;
    border-right: solid 1px #06d8d7;
    border-bottom: solid 1px #06d8d7;
    right: 0;
  }
  p > a {
    color: #06d8d7;
  }
  pre {
    margin: 0;
  }
  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    color: #06d8d7;
    /* background-color: rgba(110,118,129,0.4); */
    border-radius: 6px;
    display: contents;
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
  svg[id*='mermaid'] {
    padding: 10px;
    background-color: white;
  }
  button {
    width: 150px;
    height: 150px;
    font-size: 23px;
    font-weight: bold;
    border-radius: 12px;
    cursor: pointer;
    :hover {
      box-shadow: -1px -1px #06d8d7, 1px -1px #06d8d7, 1px 1px #06d8d7, -1px 1px #06d8d7, 0 0 0.1em #06d8d7,
      0 0 0.1em #06d8d7 inset, 0 0 0.5em #06d8d7, 0 0 0.5em #06d8d7 inset, 0 0 1em #06d8d7, 0 0 1em #06d8d7 inset;
    }
  }
  hr {
    margin: 50px auto;
  }
  .cyber-color {
    color: #06d8d7;
  }
  .fw-bold {
    font-weight: bold;
  }
  .mt-0 {
    margin-top: 0;
  }
  .flex-block-center {
    display: flex;
    height: 150px;
    justify-content: center;
    align-items: center;
    background-color: #333;
    border-radius: 5px;
  }
  .flex-content {
    padding: 10px;
    height: fit-content;
    background-color: #06d8d7;
  }
  .grid-block-center {
    display: grid;
    place-items: center;
    height: 150px;
    background-color: #333;
    border-radius: 5px;
  }
  .grid-content {
    padding: 10px;
    height: fit-content;
    background-color: #06d8d7;
  }
  .cyber-btn {
    color: #fff;
    background-color: #0e3333;
    border: 1px solid #06d8d7;
  }
  .backdrop-filter-bg {
    height: 300px;
    display: grid;
    place-items: center;
    gap: 24px;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
    background-color: #0e354bff;
    background-image: url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1788&q=80');
  }
  .backdrop-filter {
    width: min(500px, 100%);
    border-radius: 12px;
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    backdrop-filter: blur(8px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.5);
  }
  .backdrop-filter h2 {
    margin: 0;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 12px 12px 0 0;
    font-size: 16px;
    font-weight: normal;
    padding: 8px 14px;
    color: #333;
  }
  .backdrop-filter p {
    margin: 0;
    padding: 14px;
    color: #000;
  }
`

export default MarkdownPreview
