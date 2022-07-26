import React from 'react'
import {
  Tooltip,
  Header,
  Circular,
  ComponentList,
  CsvDownloadButton,
  DocumentList,
  FlippedCard,
  FileUploadButton,
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
  SelectableTable,
  Stepper,
} from '@/components'
import { IconButton, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { GrTooltip } from 'react-icons/gr'
import { Headers, Data } from 'react-csv/components/CommonPropTypes'
import { Issue, SkillTableContents } from '@/types'
import { TableData } from '@/components/SkillTable/SkillTable'
import { selectableTableContents, tableHeadCells } from '@/data/selectableTableData'
import { TableHeadCell, TableContent } from '@/components/SelectableTable/SelectableTable'

export type ComponentPreviewListType = {
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
    color?:
      | {
          checkedcolor: string
          uncheckcolor: string
        }
      | string
    variant?: 'text' | 'outlined' | 'contained' | undefined
    svg?: {
      checkedsvg: string
      unchecksvg: string
    }
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
    csvHeaders?: Headers
    csvData?: string | Data | (() => string | Data)
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
    tableHeadCells?: TableHeadCell[]
    tableContents?: TableContent[]
  }
  events?: {
    name: string
    desc: string
    target: string
  }[]
}

// Circularのレイアウト崩れを暫定的に防ぐためのダミーデータ
export const dummyIssue: Issue = {
  id: '',
  title: 'ダミースライド',
  body: 'Circularのレイアウト崩れを防ぐ意図で暫定的に表示しています。',
  number: 1,
  state: 'open',
  /* eslint-disable camelcase */
  html_url: 'https://github.com/Yuisei-Maruyama/MyPortfolio/issues/',
  user: {
    url: 'https://api.github.com/users/Yuisei-Maruyama',
    login: 'Yuisei-Maruyama',
    avatar_url: 'https://avatars.githubusercontent.com/u/76277215?v=4',
  },
  labels: [],
}

const csvDownloadEvents = [
  {
    name: 'click',
    desc: 'データ構造をCSV形式に変換してダウンロードさせる',
    target: 'Button',
  },
]

const fileUploadEvents = [{ name: 'click', desc: 'ファイル選択モーダルが開く', target: 'Button' }]

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

const csvData = [
  {
    name: 'Maruyama',
    location: 'Tokyo',
    country: 'Japan',
    job: 'Front-End Engineer',
  },
  {
    name: 'Yuisei',
    location: 'Tokyo',
    country: 'Japan',
    job: 'Front-End Engineer',
  },
]

const csvHeaders = Object.keys(csvData[0]).map((key) => ({ key, label: key }))

export const componentList = (
  params: string,
  componentsFileNameList: string[],
  getParams: (params: string) => void,
  isFlipped: boolean,
  handleSetFlipped: (isFlipped: boolean) => void,
  toggleDelete: boolean,
  handleClickToggle: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
  frontEndProps: TableData[],
  backEndProps: TableData[],
  demoSteps: string[]
): ComponentPreviewListType[] => {
  return [
    {
      name: 'Circular',
      desc: `Circularを構成するコンポーネント`,
      tag: Circular,
      props: {
        length: 8,
        value: 0,
        items: [
          '1枚目のスライド',
          '2枚目のスライド',
          '3枚目のスライド',
          '4枚目のスライド',
          '5枚目のスライド',
          '6枚目のスライド',
          '7枚目のスライド',
          '8枚目のスライド',
        ],
      },
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
            imageSrc="https://avatars.githubusercontent.com/u/76277215?v=4"
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
      name: 'CsvDownloadButton',
      desc: '設定されたデータをCSV形式に変換してダウンロードできるボタンコンポーネント',
      tag: CsvDownloadButton,
      props: {
        csvHeaders: csvHeaders,
        csvData: csvData,
        fileName: 'xxxx.csv',
        color: '#06D8D7',
        variant: 'outlined',
      },
      events: csvDownloadEvents,
    },
    {
      name: 'FileUploadButton',
      desc: 'アップロードするファイルを選択できるボタンコンポーネント\nCSV がアップロードされた際には、配列に変換して返すことが可能',
      tag: FileUploadButton,
      props: {
        color: '#06D8D7',
        variant: 'outlined',
      },
      events: fileUploadEvents,
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
        imageSrc: 'https://avatars.githubusercontent.com/u/76277215?v=4',
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
      name: 'SelectableTable',
      desc: `Tableの複数レコード選択を可能にするコンポーネント`,
      tag: SelectableTable,
      props: {
        tableHeadCells: tableHeadCells,
        tableContents: selectableTableContents,
        children: [
          <Typography sx={{ fontWeight: 'bold' }} key="SelectedRowsIDs">
            SelectedRowsIDs
          </Typography>,
          <Typography sx={{ fontWeight: 'bold' }} key="SelectedRowsInfo">
            SelectedRowsInfo
          </Typography>,
        ],
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
}
