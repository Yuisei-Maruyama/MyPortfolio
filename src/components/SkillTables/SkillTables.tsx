import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SkillTable } from '@/components'

const request = axios.create({
  baseURL: 'http://localhost:3020',
})

interface Step {
  name: string
  genre: 'FrontEnd' | 'BackEnd'
  steps: string[]
  activeStep: number
}

const SkillTables: React.FC = () => {

  const [frontEndSteps, setFrontSteps] = useState<Step[]>([])
  const [backEndSteps, setBackSteps] = useState<Step[]>([])

  const fetchSteps = async () => {
    const { data } = await request.get('/steps')
    const frontEndSteps = data.filter((step: Step) => step.genre === 'FrontEnd')
    const backEndSteps = data.filter((step: Step) => step.genre === 'BackEnd')
    setFrontSteps(frontEndSteps)
    setBackSteps(backEndSteps)
  }

  useEffect(() => {
    fetchSteps()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {frontEndSteps && backEndSteps ? (
        <>
          <SkillTable
            title="Front-End Goal Image"
            link="https://github.com/Yuisei-Maruyama/MyPortfolio"
            frontEndProps={frontEndSteps}
          />
          <SkillTable
            title="Back-End Goal Image"
            link="https://github.com/Yuisei-Maruyama/MyPortfolio_Backend"
            backEndProps={backEndSteps}
          />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default SkillTables
