import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from './routes';

// defaultTheme
import theme from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import axios from 'axios';
import config from './config';
import { ACCOUNT_INITIALIZE } from './store/actions';

//-----------------------|| APP ||-----------------------//

const App = () => {
    const customization = useSelector((state) => state.customization);
    const user = useSelector(state=>state.account.user);
    const dispatch = useDispatch();
    React.useEffect(()=>{
        axios({
            method:'POST',
            url:config.API_SERVER + "silentlogin",
            data:{
                user_mail:user.user_mail,
                user_password:user.password
            },
            headers:{
                'Content-Type':'application/json'
            }
        },
        ).then(response=>{
             if (response.status === 200){
                dispatch({
                    type: ACCOUNT_INITIALIZE,
                    payload: { isLoggedIn: true, user: response.data.customer, token: response.data.token }
                })
             }
        }).catch(error=>{
            console.log(error)
        })
    },[])

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
