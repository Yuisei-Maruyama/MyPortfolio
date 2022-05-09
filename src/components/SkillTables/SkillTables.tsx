import React from 'react'

type Props = {
  children?: React.ReactNode
}

const SkillTables: React.FC<Props> = (props: Props) => {
  const { children } = props

  return <>{children}</>
}

export default SkillTables
