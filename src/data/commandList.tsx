import { Alert, MatrixArea } from '@/components'
import { Command } from '@/types'

export const commandList: Command[] = [
  {
    name: 'alert',
    component: <Alert />,
    title: 'Alert',
    desc: 'Command to fire an alert',
  },
  {
    name: 'matrix',
    component: <MatrixArea />,
    title: 'MatrixRain',
    desc: 'Command to drop Matrix Rain',
  },
]
