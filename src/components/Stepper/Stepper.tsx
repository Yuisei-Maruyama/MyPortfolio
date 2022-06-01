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
      '& .MuiStepIcon-root.Mui-completed': { color: '#06D8D7' },
      '& .MuiStepIcon-root.Mui-active': { border: '1px solid #06D8D7', borderRadius: '15px' },
      '& .MuiStepLabel-label.Mui-active': { color: 'white' },
      '& .MuiStepLabel-label.Mui-completed': { color: 'white' },
      '& .Mui-disabled': { color: 'dimgray' },
      '& .MuiSvgIcon-root': { color: 'dimgray' },
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
