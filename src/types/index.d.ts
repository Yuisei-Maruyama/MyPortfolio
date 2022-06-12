import { ReactNode } from 'react'

export interface Label {
  color?: string
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
  id: string
  label: string
  width?: number
  minWidth?: number
  manWidth?: number
  align?: 'right' | 'left'
  format?: (value: number) => string
}

export type Issues = Issue[]

export type SkillTableContents = {
  name: string
  steps: string[]
  activeStep: number
}[]

export type Command = {
  name: string
  component: ReactNode
  title: string
  desc: string
}
