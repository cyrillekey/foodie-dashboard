import { CardContent, Divider, Grid, Typography,Avatar,CardActions,Button } from '@material-ui/core';
import { ChevronRightOutlined, ProductionQuantityLimits } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import { gridSpacing } from '../../../store/constant';
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonPopularCard from '../../../ui-component/cards/Skeleton/PopularCard';

const RecentOrders = ({isLoading,data}) => {
    const classes =  useStyles();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
  return (
    <React.Fragment>
        {
            isLoading ? (
                <SkeletonPopularCard/>
            ) :
            <MainCard content={false}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h4"> Recent Orders</Typography>
                                </Grid>
                                <Grid item>
                                    <ProductionQuantityLimits/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                        {
                            data !== undefined && data.length > 0 ?
                            data.slice(0,7).map((order)=>(
                                <>
                                <Grid container direction="column">
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant='subtitle1' color="inherit">
                                                        {order.order_date}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography variant='subtitle1' color="inherit">
                                                                    {order.orderStatus}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Avatar variant='rounded' className={ order.orderStatus === "CANCELLED"  ? classes.avatarError : classes.avatarSuccess}>
                                                                
                                                                </Avatar>
                                                                
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                                <Typography variant="subtitle2" className={classes.successDark}>
                                                    Kes {order.order_amount}
                                                </Typography>
                                            </Grid>
                                    </Grid>
                                    <Divider className={classes.divider}/>
                                </>
                            ))
                            :
                            <Grid container direction="column" style={{
                                height:530
                            }} alignItems="center" justifyContent="center">
                                <Typography variant='h1'>
                                    No Orders In Yet
                                </Typography>
                            </Grid>
                        }
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <Button small disableElevation>
                            View All 
                            <ChevronRightOutlined/>
                    </Button>
                </CardActions>
            </MainCard>
        }
    </React.Fragment>
  )
}
const useStyles = makeStyles((theme)=>({
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center'
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    }
}))
export default RecentOrders