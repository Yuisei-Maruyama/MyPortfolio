export interface Label {
  description?: string
  id?: number
  name?: string
  url?: string
}

export interface Issue {
  id: string
  title: string
  body: string
  number: number
  state: string
  /* eslint-disable camelcase */
  html_url: string
  user: {
    url: string
    login: string
    avatar_url: string
  }
  labels: Label[]
}

export interface Column {
  ['todo' | 'doing' | 'closed']: { title?: string; items?: Issues; label?: Label }
}

export interface Header {
  id: 'name' | 'roadStep'
  label: string
  width?: number
  minWidth?: number
  manWidth?: number
  align?: 'right' | 'left'
  format?: (value: number) => string
}

export type Issues = Issue[]
