import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material'
import { rgba } from 'polished'
import { GrTooltip } from 'react-icons/gr'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { isObject } from '@/data/utils'
import { componentPreviewData, ComponentPreviewListType } from '@/data/componentPreviewData'
import { ProfileFrontCard, ProfileBackCard, SkillTable } from '@/components'
import { useSetParams, useFlipped, useDelete } from '@/customHooks'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

type Props = {
  params: string | string[]
  input?: React.FC
  componentsFileNameList: string[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTab-root': { backgroundColor: '#06D8D7' },
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
  const { params, input, componentsFileNameList } = props

  const [value, setValue] = useState(0)

  const [componentPreviewList, setPreviewList] = useState<ComponentPreviewListType[]>([])

  const { getParams } = useSetParams()

  const { isFlipped, handleSetFlipped } = useFlipped()

  const { toggleDelete, handleClickToggle } = useDelete()

  const classes = useStyles()

  const payload = {
    paramsState: {
      params,
      getParams,
    },
    flipState: {
      isFlipped,
      handleSetFlipped,
    },
    deleteState: {
      toggleDelete,
      handleClickToggle,
    },
  }

  const { frontEndProps, backEndProps, componentList } = componentPreviewData(componentsFileNameList, payload)

  const flippedCardChildren = [
    <ProfileFrontCard
      imageSrc="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/public/assets/Profile.jpg?raw=true"
      width="300px"
      height="450px"
      key={1}
    />,
    <ProfileBackCard width="300px" height="450px" key={2} />,
  ]

  const skillTablesChildren = (
    <>
      <SkillTable
        title="Front-End Goal Image"
        link="https://github.com/Yuisei-Maruyama/MyPortfolio"
        frontEndProps={frontEndProps}
      />
      <SkillTable
        title="Back-End Goal Image"
        link="https://github.com/Yuisei-Maruyama/MyPortfolio_Backend"
        backEndProps={backEndProps}
      />
    </>
  )

  const tooltipChildren = (
    <IconButton edge="start" color="inherit" aria-label="tooltip_demo">
      <GrTooltip />
    </IconButton>
  )

  const previewList: ComponentPreviewListType[] = []

  const convertComponentPreviewList = () => {
    componentList.forEach((component) => {
      if (component.props && Object.keys(component.props).includes('children')) {
        console.log(component)
        if (component.name === 'FlippedCard') {
          component.props.children = flippedCardChildren
        }
        if (component.name === 'SkillTables') {
          component.props.children = skillTablesChildren
        }
        if (component.name === 'Tooltip') {
          component.props.children = tooltipChildren
        }
      }
      previewList.push(component)
    })
    return previewList
  }

  useEffect(() => {
    setPreviewList(convertComponentPreviewList())
    // eslint-disable-next-line
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ bgcolor: rgba(0, 26, 26, 1), color: 'white' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab sx={{ backgroundColor: rgba(0, 26, 26, 1) }} label="Usage" {...a11yProps(0)} />
          <Tab sx={{ backgroundColor: rgba(0, 26, 26, 1) }} label="Props" {...a11yProps(1)} />
          <Tab sx={{ backgroundColor: rgba(0, 26, 26, 1) }} className={classes.root} label="Events" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List dense={true} sx={{ marginBottom: 3 }}>
          <ListItem>
            <ListItemText>
              Name:<span style={{ fontWeight: 'bold', marginLeft: 10 }}>{params}</span>
            </ListItemText>
          </ListItem>
          <ListItem>
            <Box sx={{ display: 'flex' }}>
              <ListItemText>Description:</ListItemText>
              <ListItemText sx={{ marginLeft: 5 }}>
                {componentPreviewList
                  .filter((component) => component.name === params)
                  .map((component, index) => (
                    <Typography component="div" key={index}>
                      {component.desc.match(/\n/)
                        ? component.desc.split('\n').map((txt, index) => <div key={index}> {txt}</div>)
                        : component.desc}
                    </Typography>
                  ))}
              </ListItemText>
            </Box>
          </ListItem>
          {input ? (
            <>
              <ListItem>
                <ListItemText>Input:{input}</ListItemText>
              </ListItem>
            </>
          ) : (
            <></>
          )}
          <ListItem>
            <ListItemText>Demo:</ListItemText>
          </ListItem>
        </List>
        <>
          {componentPreviewList
            .filter((component) => component.name === params)
            .map((component, index) => {
              return component.props ? (
                !component.props.children ? (
                  <component.tag key={index} {...component.props} />
                ) : (
                  <component.tag key={index} {...component.props}>
                    {component.props.children}
                  </component.tag>
                )
              ) : (
                <component.tag key={index} />
              )
            })}
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
                    <TableCell align="left">Type</TableCell>
                    <TableCell align="left">Example</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {componentPreviewList
                    .filter((component) => component.name === params)
                    .map((component, index) => {
                      return component.props ? (
                        Object.entries(component.props).map((prop, index) => {
                          return (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                {isObject(prop[0]) ? Object.entries(prop[0]) : prop[0]}
                              </TableCell>
                              <TableCell align="left">
                                {Array.isArray(prop[1])
                                  ? 'Array' + `<${typeof prop[1][0]}>`
                                  : (typeof prop[1]).charAt(0).toUpperCase() + (typeof prop[1]).slice(1)}
                              </TableCell>
                              <TableCell align="left">
                                {isObject(prop[1]) && !!prop[1] && prop[0] !== 'children'
                                  ? Object.entries(prop[1]).map((prop, index) => {
                                      return (
                                        <TableBody key={index}>
                                          <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                            <TableCell component="th" scope="row">
                                              {isObject(prop[0]) ? Object.entries(prop[0]) : prop[0]}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                              {isObject(prop[1]) ? Object.entries(prop[1]) : prop[1]}
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      )
                                    })
                                  : prop[1]}
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
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
        <List dense={true} sx={{ marginBottom: 3 }}>
          <ListItem>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell align="left">Target UI</TableCell>
                    <TableCell align="left">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {componentPreviewList
                    .filter((component) => component.name === params)
                    .map((component, index) => {
                      return component.events ? (
                        component.events.map((event, index) => {
                          return (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">
                                {event.name}
                              </TableCell>
                              <TableCell align="left">{event.target}</TableCell>
                              <TableCell align="left">
                                {event.desc.match(/\n/)
                                  ? event.desc.split('\n').map((txt, index) => <div key={index}> {txt} </div>)
                                  : event.desc}
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow key={index}>
                          <TableCell key={index}>No events.</TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </ListItem>
        </List>
      </TabPanel>
    </Box>
  )
}

export default ComponentPreviewTabs
