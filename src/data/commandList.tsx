import { Alert } from '@/components'
import { Command } from '@/types'

export const commandList: Command[] = [
  {
    name: 'alert',
    component: <Alert />,
    title: 'アラートコマンド',
    desc: 'アラートを発火させるコマンド',
  },
]
