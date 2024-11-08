import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import ActionAreaCard from '../common/Card'

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="light">
      <Toolbar>
        <ActionAreaCard />
      </Toolbar>
    </AppBar>
  )
}

export default Header
