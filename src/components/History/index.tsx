import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import SchoolIcon from '@material-ui/icons/School'

const History: React.FC = () => {
  return (
    <div>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(189, 9, 219)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(189, 9, 219)' }}
          date="2020 - present"
          iconStyle={{ background: 'rgb(189, 9, 219)', color: '#fff' }}
          icon={<AccessibilityNewIcon />}
        >
          <h3 className="vertical-timeline-element-title">FrontEnd Engineer</h3>
          <h4 className="vertical-timeline-element-subtitle">Shibuya, Tokyo</h4>
          <p>Creative Web Service, User Experience, Visual Design</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(189, 9, 219)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(189, 9, 219)' }}
          date="2016 - 2020"
          iconStyle={{ background: 'rgb(189, 9, 219)', color: '#fff' }}
          icon={<SchoolIcon />}
        >
          <h3 className="vertical-timeline-element-title">University Student</h3>
          <h4 className="vertical-timeline-element-subtitle">Tokyo</h4>
          <p>I was learning Programing Language about Java, Python, HTML, CSS, Javascript</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  )
}

export default History
