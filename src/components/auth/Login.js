import React from 'react'
import { CssBaseline, Grid, Box, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import Controls from "./InputField";
import { useForm, Form } from './UseForm';
import {Copyright} from './Register'

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
	email: '',
	password: '',
}


function Login() {
    const classes = useStyles()
    const handleSubmit = (e) =>{
		e.preventDefault()
		if(validate()){
			firebase.auth()
			.signInWithEmailAndPassword(values.email,values.password)
			.then(signedInUser =>{
				console.log(signedInUser)
				alert("login success")
				setErrors({})
			})
			.catch(err =>{
				alert(err)
				setErrors(err)
			})
			// 
		}
		
    }
    const validate = (fieldValues = values) =>{
		let temp = { ...errors }
		if ('email' in fieldValues){
			temp.email = fieldValues.email ? "" : "This field is required."
		}
		if ('password' in fieldValues)
			temp.password = fieldValues.password ? "" : "This field is required."
		setErrors({
			...temp
		})
		if (fieldValues === values)
			return Object.values(temp).every(x => x === "")
    }
    const {
		values,
		errors,
		setErrors,
		handleInputChange,
		resetForm
    } = useForm(initialFValues, true, validate);
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img src="slack.png" alt="site logo" />
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>

                <Form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
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
                        <Controls.Button
                            type="submit"
                            text="Submit" 
							className={classes.submit}
							/>
						<Grid container justify="flex-end">
							<Grid item>
							<Link to="/register" className={classes.list}>
								Don't have account? Sign Up first
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
    )
}

export default Login
