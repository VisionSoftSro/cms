import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Form} from "react-final-form";
import {useTranslation} from "react-i18next";
import Oauth from '@vision-soft/module-api/src/OauthServerConfig';
import {Token} from '@vision-soft/module-api/src';
import {FormText} from "@vision-soft/components";
import {jsonToFormUrlEncoded, useLoadingContext} from "@vision-soft/components/src";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://vision-soft.cz">
                Vision Soft s.r.o.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
//@ts-ignore
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));
type LoginForm = {
    username:string,
    password: string
}
export default function LoginPage({setToken}:{setToken:(token:Token)=>void}) {
    const {t} = useTranslation();
    const classes = useStyles();
    const {loading, setLoading} = useLoadingContext();
    const onNext = async (data: LoginForm) => {
       setLoading(true);
       try {
           const result = await fetch(`${Oauth.url}/oauth/token`, {
               method:"POST",
               headers: {
                   'Authorization': `Basic ${Oauth.clientId}`,
                   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
               },
               body:jsonToFormUrlEncoded({...data, grant_type:"password"})
           });
           const json = await result.json();
           setToken(json as Token);
       } catch (e) {
           console.log("Error:", e);
       } finally {
           setLoading(false);
       }
    };
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Form onSubmit={onNext} initialValues={{username:"herisn23@gmail.com", password:"a"} as LoginForm}
                    render={({ handleSubmit }) => (
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <FormText type={"text"} required name="username" label={t("Email")} textFieldProps={{margin:"normal"}}/>
                            <FormText type={"password"} required name="password" label={t("Password")} textFieldProps={{margin:"normal"}}/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {t("SignIn")}
                            </Button>

                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    )}
                    />

                </div>
            </Grid>
        </Grid>
    );
}
