//  React Components
export { default as Tooltip } from './Tooltip/Tooltip'
export { default as ProfileCard } from './ProfileCard/ProfileCard'
export { default as History } from './History/History'
export { default as Header } from './Header/Header'
export { default as ModeSwitch } from './ModeSwitch/ModeSwitch'
export { default as ThemeProvider } from './ThemeProvider'
export { default as Circular } from './Circular/Circular'
export { default as Menu } from './Menu/Menu'
export { default as MessageArea } from './MessageArea/MessageArea'
export { default as BoardBase } from './BoardBase/BoardBase'
export { default as IssueDialog } from './IssueDialog/IssueDialog'
// export { default as Baffle } from './components/Baffle'
export { default as IconSwitch} from './SvgIconSwitch/SvgIconSwitch'

export const getHeaders = async (token: string): Promise<{ authorization?: string }> => {
  const authorization = `bearer ${token}`
  const headers = authorization ? { authorization } : {}
  return headers
}
