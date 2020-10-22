import React from 'react'
import { Button as MuiButton, makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: { 
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))
const Controls = {
    Input,
    Button
}
function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "secondary"}
            onClick={onClick}
            fullWidth
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}

function Input(props) {

    const { name, label, value,error=null, onChange,color,type } = props;
    return (
        <TextField
            type={type || 'text'}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            fullWidth
            color={color || "secondary"}
            {...(error && {error:true,helperText:error})}
        />
    )
}

export default Controls;