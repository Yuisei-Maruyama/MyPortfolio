import React, { useEffect } from 'react'
import baffle from '../../data/baffle/base'

// type Props = {
//   characters?: string
//   speed?: number
// }

// █▓▒█▓ ░▒▓ ▓▒▓█░ ░▓░█▓▒█▓ ░▒▓ ▓▒▓█░ ░▓░

const trance = baffle('.text', {
  characters: '█▓▒█▓ ░▒▓ ▓▒▓█░ ░▓░█▓▒█▓ ░▒▓ ▓▒▓█░ ░▓░',
  speed: 1500,
})
// text.set({
//     characters: '█▓▒█▓ ░▒▓ ▓▒▓█░ ░▓░█▓▒█▓ ░▒▓ ▓▒▓█░ ░▓░',
//     speed: 1500
//   })

// trance.reveal(1000)

const Baffle: React.FC = () => {
  useEffect(() => {
    trance.start()
    trance.reveal(1000)
  }, [])

  return (
    <div>
      <p className="text">My name is Yuisei Maruyama.</p>
    </div>
  )
}

export default Baffle
