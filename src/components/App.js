import React from 'react';
import {Grid,makeStyles} from '@material-ui/core'
import './App.css';
import {connect} from 'react-redux'
import Colorpanel from './colorpanel/Colorpanel';
import Messages from './MessagesPanel/Messages';
import Metapanel from './Metapanel/Metapanel';
import Sidebarpanel from './sidebarpanel/Sidebarpanel';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	  background:'#eee',
	},
	cs:{
		display:'flex',
		flexDirection:"row"
	},
	cp:{
		marginRight:'14px'
	}
})
)
function App({currentUser}) {
	const classes = useStyles();
  return (
    <Grid container className={classes.root}>
		<Grid item xs={4} className={classes.cs} spacing={2}>
		<Colorpanel className={classes.cp}/>
		<Sidebarpanel currentUser={currentUser}/>
		</Grid>
		<Grid item xs={5}>
			<Messages/>
		</Grid>
		<Grid item xs={3}>
			<Metapanel />
		</Grid>
    </Grid>
  );
}
const mapStateToProps = (state) =>({
	currentUser:state.user.currentUser
})
export default connect(mapStateToProps)(App);
