import { Issues, Label } from '@/types'

//  React Components
export { default as Tooltip } from './Tooltip/Tooltip'
export { default as ProfileCard } from './ProfileCard/ProfileCard'
export { default as History } from './History/History'
export { default as Header } from './Header/Header'
export { default as Footer } from './Footer/Footer'
export { default as ModeSwitch } from './ModeSwitch/ModeSwitch'
export { default as ThemeProvider } from './ThemeProvider'
export { default as Circular } from './Circular/Circular'
export { default as Menu } from './Menu/Menu'
export { default as MessageArea } from './MessageArea/MessageArea'
export { default as BoardBase } from './BoardBase/BoardBase'
export { default as IssueDialog } from './IssueDialog/IssueDialog'
// export { default as Baffle } from './components/Baffle'
export { default as IconSwitch } from './SvgIconSwitch/SvgIconSwitch'
export { default as IssueCard } from './IssueCard/IssueCard'
export { default as SkillTable } from './SkillTable/SkillTable'
export { default as SkillTables } from './SkillTables/SkillTables'
export { default as Stepper } from './Stepper/Stepper'
export { default as TypeWriter } from './TypeWriter/TypeWriter'
export { default as ResumeTable } from './ResumeTable/ResumeTable'
export { default as DragDrop } from './DragDrop/DragDrop'
export { default as SliderContents } from './SliderContents/SliderContents'
export { default as MarkdownPreviewer } from './MarkdownPreviewer/MarkdownPreviewer'
export { default as ComponentList } from './ComponentList/ComponentList'
export { default as DocumentList } from './DocumentList/DocumentList'
export { default as ComponentPreviewTabs } from './ComponentPreviewTabs/ComponentPreviewTabs'
export { default as MatrixRain } from './MatrixRain/MatrixRain'
export { default as MatrixArea } from './MatrixArea/MatrixArea'

export const getHeaders = async (token: string): Promise<{ authorization?: string }> => {
  const authorization = `bearer ${token}`
  const headers = authorization ? { authorization } : {}
  return headers
}

/** IssueのIDを number から string に変換する */
export const convertIssueId = (data: any) => {
  if (typeof data === 'object' && typeof data.id === 'number') {
    const payload = { ...data, id: data.id.toString() }
    return payload
  }
  const payload = data.map((item: { id: number }) => {
    return { ...item, id: item.id.toString() }
  })
  return payload
}

/** Labelオブジェクトの形を下記に変換する */
export const convertLabel = (items: Issues): Label => {
  const labels = { ...items[0].labels }
  let label
  Object.entries(labels).forEach(([key, value]) => {
    label = value
    return value
  })
  return label as unknown as Label
}
