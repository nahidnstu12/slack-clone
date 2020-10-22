import React from 'react'
import { CssBaseline, Grid, Box, Typography, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import Controls from "./InputField";
import { useForm, Form } from './UseForm';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="textSecondary" href="#" to="/">
				react-slack-clone
      </Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	list:{
		textDecoration:'none !important',
		fontWeight:"600",
		color:'#f50057'
	}
}));
const initialFValues = {
	username: '',
	email: '',
	password: '',
	confirmPassword: ''
}

export default function Register() {
	const classes = useStyles();

	const validate = (fieldValues = values) => {
		
		let temp = { ...errors }
		if ('username' in fieldValues)
			temp.username = fieldValues.username ? "" : "This field is required."
		
		if ('email' in fieldValues){
			const reg = /\S+@\S+\.\S+/
			if(!fieldValues.email)
				temp.email = "This Field is required"
			else if(!reg.test(fieldValues.email))
				temp.email = "Email is invalid"
			else
				temp.email = ""
		}
		if ('password' in fieldValues)
			temp.password = fieldValues.password ? "" : "This field is required."
		// if ('confirmPassword' in fieldValues)
		//   temp.confirmPassword = fieldValues.confirmPassword ? "" : "This field is required."
		if ('confirmPassword' in fieldValues){
		if(!isPass())
			temp.confirmPassword = "Password Invalid"
		else
			temp.confirmPassword = ''
		}
		setErrors({
			...temp
		})

		if (fieldValues === values)
			return Object.values(temp).every(x => x === "")
	}
	function isPass(){
		if(values.password.length < 6 || values.confirmPassword.length < 6){
			return false
		}
		else if(values.password.trim() !== values.confirmPassword.trim()){
			return false
		}
		else
			return true
	}
	const {
		values,
		errors,
		setErrors,
		handleInputChange,
		resetForm
	} = useForm(initialFValues, true, validate);

	const handleSubmit = e => {
		e.preventDefault();
		if (validate()) {
			alert("success")
			firebase.auth()
			.createUserWithEmailAndPassword(values.email,values.password)
			.then(createdUser =>{
				console.log(createdUser)

			})
			.catch(err => {
				alert(err)
			})
			resetForm()
		}
	}


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<img src="slack.png" alt="site logo" />
				<Typography component="h1" variant="h5">
					Sign Up
        		</Typography>
		
				<Form onSubmit={handleSubmit} className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Controls.Input
								name="username"
								label="User Name"
								value={values.username}
								onChange={handleInputChange}
								error={errors.username}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controls.Input
								name="email"
								label="Email Address"
								value={values.email}
								onChange={handleInputChange}
								error={errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controls.Input
								type="password"
								name="password"
								label="Password"
								value={values.password}
								onChange={handleInputChange}
								error={errors.password}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controls.Input
								type="password"
								name="confirmPassword"
								label="Confirm Password"
								value={values.confirmPassword}
								onChange={handleInputChange}
								error={errors.confirmPassword}
								
							/>
						</Grid>
						<Controls.Button
                            type="submit"
                            text="Submit" 
							className={classes.submit}
							/>
						<Grid container justify="flex-end">
							<Grid item>
							<Link to="/login" className={classes.list}>
								Already have an account? Sign in
							</Link>
							</Grid>
						</Grid>
					</Grid>
				</Form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
