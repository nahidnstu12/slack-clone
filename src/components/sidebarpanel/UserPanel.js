import React,{useState,useEffect} from 'react'
import firebase from '../../firebase'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import {Grid,Typography,makeStyles,Drawer,Divider,List,ListItem,ListItemText,ListItemIcon,Avatar,Collapse} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	AppHeader:{
        display:'flex',
        flexDirection:'row',
        padding:'.25em',
        marginTop:'25px'
    },
    logo:{
        fontSize:'60px',
        marginRight:'18px',
        padding:'3px',
        color:'#b2f3ed',
    },
    logoText:{
        color:'#0ae9d4',
        fontFamily:'Lobster',
        letterSpacing:'4px'
    },
    drawer: {
        width: drawerWidth,
		flexShrink: 0,
		marginTop:'11px'
      },
      drawerPaper: {
		width: '27%',
		// width: drawerWidth,
        position:'absolute',
        top:'auto',
        left:'auto',
        color:'#fefefe',
        background:'#4c3c4c',
        height:'auto'
      },
      avatar: {
		background:'#1a8077',
		// width: theme.spacing(3),
		// height: theme.spacing(3),
      },
      nested: {
		paddingLeft: theme.spacing(7),
		fontSize:'9px !important'
	  },
	  AVsmall: {
		background:'#1a8077',
		width: theme.spacing(3),
		height: theme.spacing(3),
	  },
	 
})
)

function UserPanel({currentUser}) {
    const classes = useStyles()

    const [userOpen, setUserOpen] = useState(false);
    const [chOpen, setChOpen] = useState(false);
    const [DMOpen, setDMOpen] = useState(false);
    const [user,setUser] = useState({})
    // const [firstCh,setFirst] = useState("")

    useEffect(() => {
      if(currentUser !== null){
        setUser(currentUser)
        // setFirst(currentUser.displayName[0]) //disturbs first attempts
      }
    }, [currentUser])
    

    const handleClickUser = () => {
        setUserOpen(!userOpen);
    };
    const handleClickCH = () => {
        setChOpen(!chOpen);
    };
    const handleClickDM = () => {
        setDMOpen(!DMOpen);
    };
    const handleLogOut = () =>{
        firebase
        .auth()
        .signOut()
        .then(()=> alert("Sign Out"))
    }

    return (
        <Grid>
         {/* App Header */}
        <Grid className={classes.AppHeader}>
            <AllInclusiveIcon className={classes.logo}/>
            <Typography variant="h3" className={classes.logoText}>LeChat</Typography>
        </Grid>
        {/* Top 3 Section */}
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Divider />
          <List>
            <TopLabel name={user.displayName} menuOpen={handleClickUser} open={userOpen} src={user.photoURL}/>
              <Nested open={userOpen} LogOut={handleLogOut}/>
              <Divider />

            <TopLabel name="Channel" icon="C" menuOpen={handleClickCH} open={chOpen} />
              <NestedCH open={chOpen} LogOut={handleLogOut}/>
              <Divider />
              
            <TopLabel name="Direct Message" icon="DM" menuOpen={handleClickDM} open={DMOpen} />
              <NestedDM open={DMOpen} LogOut={handleLogOut}/>
              <Divider />
          </List>
        </Drawer>
      </Grid>
    ) 
}

const AvatarIC = ({text,comp,src}) =>{
    const classes = useStyles()
    return(
        <Avatar aria-label="recipe" className={classes.avatar} comp={comp} src={src}>
            {text}
        </Avatar>
    )
}
const TopLabel = ({name,icon,menuOpen,open,src}) =>{
    return(
        <ListItem button key={name} onClick={menuOpen}>
        <ListItemIcon>
            <AvatarIC text={icon} src={src}/>
        </ListItemIcon>
        <ListItemText primary={name} />
        { (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem> 
    )
}
const Nested = ({open,LogOut}) =>{
    return(
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding dense={true}>
        <SecondayLabel name = "Change Avatar"/>
        <SecondayLabel name = "Change Theme" />
        <SecondayLabel name = "Sign Out" handleFunc={LogOut}/>
      </List>
    </Collapse>
    )
}
const NestedCH = ({open}) =>{
    return(
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true}>
			<SecondayLabel name = "React" />
			<SecondayLabel name = "Vue" />
			<SecondayLabel name = "Laravel"/>
        </List>
      </Collapse>
    )
}
const NestedDM = ({open}) =>{
    return(
    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true}>
			<SecondayLabel name = "MD.Asik" />
			<SecondayLabel name = "CF.Babul" />
			<SecondayLabel name = "RF.Rifat" />
        </List>
      </Collapse>
    )
}
const SecondayLabel = ({name,handleFunc}) => {
	const classes = useStyles()
	return (
		<ListItem button key={Date.now()} className={classes.nested}>
            <ListItemIcon>
                <AvatarIC className={classes.AVsmall}/>
            </ListItemIcon>
        	<ListItemText primary={name} onClick={handleFunc} className={classes.secLabelText}/>
        </ListItem>
	)
}

export default UserPanel