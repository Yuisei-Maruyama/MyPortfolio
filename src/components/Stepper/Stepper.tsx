import React from 'react'
import { Box, StepLabel, Stepper as BaseStepper, Step } from '@mui/material'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

type Props = {
  steps: string[]
  activeStep: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiStepLabel-label.Mui-active': { color: 'white' },
      '& .MuiStepLabel-label.Mui-completed': { color: 'white' },
    },
  })
)

const Stepper: React.FC<Props> = (props: Props) => {
  const { steps, activeStep } = props

  const classes = useStyles()

  return (
    <Box sx={{ width: '100%' }}>
      <BaseStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className={classes.root}>{label}</StepLabel>
          </Step>
        ))}
      </BaseStepper>
    </Box>
  )
}

export default Stepper
