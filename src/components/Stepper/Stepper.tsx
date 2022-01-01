import React from 'react'
import { Box, StepLabel, Stepper as BaseStepper, Step } from '@mui/material'

type Props = {
  steps: string[]
  activeStep: number
}

const Stepper: React.FC<Props> = (props: Props) => {
  const { steps, activeStep } = props

  return (
    <Box sx={{ width: '100%' }}>
      <BaseStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ color: 'white' }}>{label}</StepLabel>
          </Step>
        ))}
      </BaseStepper>
    </Box>
  )
}

export default Stepper
