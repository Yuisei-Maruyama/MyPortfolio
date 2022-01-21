import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Typography, Box, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { rgba } from 'polished'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Header, Circular, Footer } from '@/components'

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
    {
      name: 'Header',
      desc: `Headerを構成するコンポーネント`,
      tag: Header
    },
    {
      name: 'Circular',
      desc: `Circularを構成するコンポーネント`,
      tag: Circular,
      props: { length: 8, value: 0, items: ['1', '2', '3', '4', '5', '6', '7', '8'] }
    },
    {
      name: 'Footer',
      desc: `Footerを構成するコンポーネント`,
      tag: Footer
    },
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
            <ListItem>
            <Box sx={{ display: 'flex' }}>
              <ListItemText>Description:</ListItemText>
              <ListItemText sx={{ marginLeft: 5}}>
                  {
                    componentList.filter(component => component.name === params).map((component, index) =>
                    <Typography component='div' key={index}>
                        {
                          component.desc.match(/\n/) ? component.desc.split('\n').map((txt, index) =>
                            <div key={index}> { txt }</div>
                          ) : component.desc
                        }
                    </Typography>
                  )}
              </ListItemText>
            </Box>
            </ListItem>
            {
              input
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
              return component.props ? <component.tag key={index} {...component.props}  /> : <component.tag key={index} />
            })
          }
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List dense={true} sx={{ marginBottom: 3 }}>
          <ListItem>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Props Name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Example</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {componentList.filter(component => component.name === params).map((component, index) => {
                    return component.props
                      ? Object.entries(component.props).map((prop, index) => {
                        return (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">{prop[0]}</TableCell>
                            <TableCell align="right">{Array.isArray(prop[1]) ? 'Array' + `<${ typeof prop[1][0] }>` : (typeof prop[1]).charAt(0).toUpperCase() + (typeof prop[1]).slice(1)}</TableCell>
                            <TableCell align="right">{prop[1]}</TableCell>
                          </TableRow>
                        )
                        })
                      : (
                        <TableRow key={index}>
                          <TableCell key={index}>No props by the parent component.</TableCell>
                        </TableRow>
                      )
                  })}
                </TableBody>
                </Table>
            </TableContainer>
          </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Events
      </TabPanel>
    </Box>
  );
}

export default ComponentPreviewTabs
