import React from 'react'

const Footer: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 30,
        height: 40,
        borderTop: 'solid 1px white',
      }}
    >
      <p style={{ marginRight: 10 }}>created by Yuisei Maruyama</p>
    </div>
  )
}

export default Footer
