import React from 'react'
import {makeStyles,Grid} from '@material-ui/core'
import UserPanel from './UserPanel'
const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
      background:'#4c3c4c',
      minHeight:'630px'
	},
	
})
)

function Sidebarpanel({currentUser}) {
    const classes = useStyles()
    return (
       <Grid className={classes.root} container>
            <UserPanel currentUser={currentUser}/>
       </Grid>
    )
}

export default Sidebarpanel
