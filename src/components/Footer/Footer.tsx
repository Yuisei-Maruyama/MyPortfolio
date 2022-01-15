import React from 'react'

const Footer: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 40,
        borderTop: 'solid 1px #06D8D7',
      }}
    >
      <p style={{ marginRight: 10 }}>created by Yuisei Maruyama</p>
    </div>
  )
}

export default Footer
