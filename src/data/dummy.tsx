import { Issue } from '@/types'

export const dummyIssue: Issue = {
  id: '',
  title: 'ダミースライド',
  body: 'Circularのレイアウト崩れを防ぐ意図で暫定的に表示しています。',
  number: 1,
  state: 'open',
  /* eslint-disable camelcase */
  html_url: 'https://github.com/Yuisei-Maruyama/MyPortfolio/issues/',
  user: {
    url: 'https://api.github.com/users/Yuisei-Maruyama',
    login: 'Yuisei-Maruyama',
    avatar_url: 'https://avatars.githubusercontent.com/u/76277215?v=4',
  },
  labels: [],
}
