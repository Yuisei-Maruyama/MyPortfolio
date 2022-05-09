import React, { useState } from 'react'
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
import { deepPurple } from '@mui/material/colors'
import { useSetParams, useFlipped, useDelete } from '@/customHooks'
import { rgba } from 'polished'
import { GrTooltip } from 'react-icons/gr'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { isObject } from '@/data/utils'
import {
  Tooltip,
  Header,
  Circular,
  ComponentList,
  DocumentList,
  FlippedCard,
  ProfileFrontCard,
  ProfileBackCard,
  Footer,
  History,
  IconSwitch,
  MarkdownPreviewer,
  MessageArea,
  ResumeTable,
  SkillTable,
  SkillTables,
  Stepper,
} from '@/components'
import { skillTableData } from '@/data/skillTableData'
import { SkillTableContents } from '@/types'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

type Props = {
  params: string | string[]
  input?: React.FC
  componentsFileNameList?: string[]
}

type ComponentPreviewListType = {
  name: string
  desc: string
  tag: any
  props?: {
    title?: string
    icon?: string
    getParams?: (params: string) => void
    componentsFileNameList?: string[]
    children?: React.ReactNode
    length?: number
    value?: number
    items?: string[]
    isFlipped?: boolean
    setFlipped?: (isFlipped: boolean) => void
    checked?: boolean
    color?: {
      checkedcolor: string
      uncheckcolor: string
    }
    svg?: {
      checkedsvg: string
      unchecksvg: string
    }
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
    fileName?: string
    message?: string
    speed?: number
    width?: string
    height?: string
    imageSrc?: string
    link?: string
    frontEndProps?: SkillTableContents
    backEndProps?: SkillTableContents
    steps?: string[]
    activeStep?: number
  }
  events?: {
    name: string
    desc: string
    target: string
  }[]
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

const headerEvents = [
  { name: 'click', desc: '/ に遷移', target: 'MyPortfolio' },
  { name: 'click', desc: '/components に遷移', target: 'COMPONENTS' },
  { name: 'click', desc: '/documents に遷移', target: 'DOCUMENTS' },
  { name: 'click', desc: '/board に遷移', target: 'TaskBoard Icon' },
  { name: 'click', desc: 'GitHub の README に遷移', target: 'GitHub Icon' },
  { name: 'click', desc: 'Netlify の Deployページ に遷移', target: 'Netlify Icon' },
  { name: 'click', desc: 'Instagram の Profileページ に遷移', target: 'Instagram Icon' },
  { name: 'click', desc: 'Login メニューの表示\n認証機能は未実装', target: 'User Icon' },
]

const circularEvents = [
  { name: 'click', desc: '左にあるスライドを中央に設置', target: 'ChevronRight Icon' },
  { name: 'click', desc: '右にあるスライドを中央に設置', target: 'ChevronLeft Icon' },
]

const componentListEvents = [
  { name: 'click', desc: '選択されたコンポーネントの使用方法を表示する', target: 'Label of Component' },
]

const documentListEvents = [
  { name: 'click', desc: '選択されたドキュメントの使用方法を表示する', target: 'Label of Document' },
]

const flippedCardEvents = [
  { name: 'hover', desc: 'マウスホバー時に表示するカードを切り替える', target: 'Front-Card or Back-Card' },
]

const svgIconSwitchEvents = [
  { name: 'click', desc: 'toggleの真偽値を入れ替え、アイコンと色の表示を切り替える', target: 'Switch Button' },
]

const ComponentPreviewTabs: React.FC<Props> = (props: Props) => {
  const { params, input, componentsFileNameList } = props

  const classes = useStyles()

  const { getParams } = useSetParams()

  const { isFlipped, handleSetFlipped } = useFlipped()

  const { toggleDelete, handleClickToggle } = useDelete()

  const { frontEndProps, backEndProps, demoSteps } = skillTableData()

  const [value, setValue] = useState(0)

  const componentList: ComponentPreviewListType[] = [
    {
      name: 'Circular',
      desc: `Circularを構成するコンポーネント`,
      tag: Circular,
      props: { length: 8, value: 0, items: ['1', '2', '3', '4', '5', '6', '7', '8'] },
      events: circularEvents,
    },
    {
      name: 'ComponentList',
      desc: `ComponentListを構成するコンポーネント`,
      tag: ComponentList,
      props: {
        getParams: () => getParams(typeof params === 'string' ? params : ''),
        componentsFileNameList: componentsFileNameList,
      },
      events: componentListEvents,
    },
    {
      name: 'DocumentList',
      desc: `DocumentListを構成するコンポーネント`,
      tag: DocumentList,
      props: {
        getParams: () => getParams(typeof params === 'string' ? params : ''),
      },
      events: documentListEvents,
    },
    {
      name: 'FlippedCard',
      desc: `FlippedCardを構成するコンポーネント`,
      tag: FlippedCard,
      props: {
        isFlipped: isFlipped,
        setFlipped: handleSetFlipped,
        children: [
          <ProfileFrontCard
            imageSrc="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/public/assets/Profile.jpg?raw=true"
            width="300px"
            height="450px"
            key={1}
          />,
          <ProfileBackCard width="300px" height="450px" key={2} />,
        ],
      },
      events: flippedCardEvents,
    },
    {
      name: 'Header',
      desc: `Headerを構成するコンポーネント`,
      tag: Header,
      events: headerEvents,
    },
    {
      name: 'Footer',
      desc: `Footerを構成するコンポーネント`,
      tag: Footer,
    },
    {
      name: 'History',
      desc: `Historyタイムラインを構成するコンポーネント`,
      tag: History,
    },
    {
      name: 'IconSwitch',
      desc: `IconSwitchを構成するコンポーネント`,
      tag: IconSwitch,
      props: {
        checked: toggleDelete,
        color: {
          checkedcolor: '#3F51B5',
          uncheckcolor: deepPurple[500],
        },
        svg: {
          checkedsvg:
            'M20.37, 8.91L19.37, 10.64L7.24, 3.64L8.24, 1.91L11.28, 3.66L12.64, 3.29L16.97, 5.79L17.34, 7.16L20.37, 8.91M6, 19V7H11.07L18, 11V19A2, 2 0 0, 1 16, 21H8A2, 2 0 0, 1 6, 19Z',
          unchecksvg: 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
        },
        onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => handleClickToggle(e),
      },
      events: svgIconSwitchEvents,
    },
    {
      name: 'MarkdownPreviewer',
      desc: `MarkdownPreviewerを構成するコンポーネント`,
      tag: MarkdownPreviewer,
      props: {
        fileName: 'ComponentPreviewDemo',
      },
    },
    {
      name: 'MessageArea',
      desc: `MessageAreaを構成するコンポーネント`,
      tag: MessageArea,
      props: {
        message:
          'ここにメッセージが入ります\nここにメッセージが入ります\nここにメッセージが入ります\nここにメッセージが入ります\nここにメッセージが入ります\nここにメッセージが入ります\nここにメッセージが入ります\nここにメッセージが入ります\nここにメッセージが入ります',
        speed: 50,
      },
    },
    {
      name: 'ProfileBackCard',
      desc: `ProfileBackCardを構成するコンポーネント`,
      tag: ProfileBackCard,
      props: {
        width: '300px',
        height: '450px',
      },
    },
    {
      name: 'ProfileFrontCard',
      desc: `ProfileFrontCardを構成するコンポーネント`,
      tag: ProfileFrontCard,
      props: {
        width: '300px',
        height: '450px',
        imageSrc: 'https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/public/assets/Profile.jpg?raw=true',
      },
    },
    {
      name: 'ResumeTable',
      desc: `ResumeTableを構成するコンポーネント`,
      tag: ResumeTable,
      props: {
        title: '業務経歴テーブル',
      },
    },
    {
      name: 'SkillTable',
      desc: `SkillTableを構成するコンポーネント\nテーブルヘッダーをクリックすることで該当のREADMEに遷移する`,
      tag: SkillTable,
      props: {
        title: 'Front-End Goal Image',
        link: 'https://github.com/Yuisei-Maruyama/MyPortfolio',
        frontEndProps: frontEndProps,
      },
    },
    {
      name: 'SkillTables',
      desc: `SkillTablesを構成するコンポーネント`,
      tag: SkillTables,
      props: {
        children: (
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
        ),
      },
    },
    {
      name: 'Stepper',
      desc: `Stepperを構成するコンポーネント`,
      tag: Stepper,
      props: {
        steps: demoSteps,
        activeStep: 3,
      },
    },
    {
      name: 'Tooltip',
      desc: `Tooltipを構成するコンポーネント`,
      tag: Tooltip,
      props: {
        title: 'Tooltip Demo',
        icon: 'arrow',
        children: (
          <IconButton edge="start" color="inherit" aria-label="tooltip_demo">
            <GrTooltip />
          </IconButton>
        ),
      },
    },
  ]

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
                {componentList
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
          {componentList
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
                  {componentList
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
                  {componentList
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
