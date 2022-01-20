import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Typography, Box, List, ListItem, ListItemText } from '@mui/material'
import { rgba } from 'polished'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Header, Footer } from '@/components'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

type Props = {
  params: string | string[],
  input?: React.FC
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTab-root': { backgroundColor: "#06D8D7" }
    },
  })
)

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const ComponentPreviewTabs: React.FC<Props> = (props: Props) => {

  const { params, input } = props

  const classes = useStyles()

  const [value, setValue] = useState(0)

  const componentList = [
    { name: 'Header', tag: Header },
    { name: 'Footer', tag: Footer },
  ]

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ bgcolor: rgba(0,26,26, 1), color: "white" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab sx={{ backgroundColor: rgba(0,26,26, 1) }} label="Usage" {...a11yProps(0)} />
          <Tab sx={{ backgroundColor: rgba(0,26,26, 1) }} label="Props" {...a11yProps(1)} />
          <Tab sx={{ backgroundColor: rgba(0,26,26, 1) }} className={classes.root} label="Events" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List dense={true} sx={{ marginBottom: 3 }}>
            <ListItem>
              <ListItemText>Name:<span style={{ fontWeight: 'bold', marginLeft: 10 }}>{ params }</span></ListItemText>
          </ListItem>
          { input
            ? (
              <>
                <ListItem>
                  <ListItemText>Input:{ input }</ListItemText>
                </ListItem>
              </>
            )
            :
            <></>
          }
            <ListItem>
              <ListItemText>Demo:</ListItemText>
            </ListItem>
        </List>
        <>
          {
            componentList.filter(component => component.name === params).map((component, index) => {
                return <component.tag key={index} />
            })
          }
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Props
      </TabPanel>
      <TabPanel value={value} index={2}>
        Events
      </TabPanel>
    </Box>
  );
}

export default ComponentPreviewTabs
