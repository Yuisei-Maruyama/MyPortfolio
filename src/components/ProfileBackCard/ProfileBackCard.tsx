import React from 'react'
import { Card, CardContent, List, ListItem, ListItemText } from '@material-ui/core'
import { rgba } from 'polished'

type Props = {
  height?: string
}

const ProfileBackCard: React.FC<Props> = (props: Props) => {

  const { height } = props

  return (
    <Card style={{ maxWidth: '100%', height: height, backgroundColor: rgba(0, 0, 0, 0.3), color: 'white' }}>
      <CardContent>
      <List dense={true}>
        <ListItem>
          <ListItemText>aaaaa</ListItemText>
          <ListItemText>bbb</ListItemText>
          <ListItemText>ccc</ListItemText>
        </ListItem>
      </List>

      </CardContent>
    </Card>
  )
};

export default ProfileBackCard
