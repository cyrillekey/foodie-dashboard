import React from 'react'
import {Avatar, CardContent,Divider,Grid,Menu,MenuItem,Rating,Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonPopularCard from '../../../ui-component/cards/Skeleton/PopularCard'
import { gridSpacing } from '../../../store/constant';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import KeyboardArrowUpOutlined from '@material-ui/icons/KeyboardArrowUpOutlined';
import { KeyboardArrowDownOutlined } from '@material-ui/icons';
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
const FoodReviews = ({isLoading,data}) => {
    const classes =  useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
    <React.Fragment>
        {
            isLoading ? (
                <SkeletonPopularCard/>
            )
            :
            <MainCard content={false}>
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant='h4'>Recent Reviews</Typography>
                                </Grid>
                                <Grid item>
                                    <MoreHorizOutlinedIcon
                                    fontSize='small'
                                    className={classes.primaryLight}
                                    aria-controls="menu-review-card"
                                    aria-haspopup='true'
                                    onClick={handleClick}
                                    />
                                    <Menu
                                    id="menu-review-card"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    variant="selectedMenu"
                                    anchorOrigin={{
                                        vertical:'bottom',
                                        horizontal:'right'
                                    }}
                                    transformOrigin={{
                                        vertical:'top',
                                        horizontal:'right'
                                    }}
                                    >
                                        <MenuItem onClick={handleClose}>Critical</MenuItem>
                                        <MenuItem onClick={handleClose}>Best</MenuItem>

                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                data !== undefined && data.lenght > 0 ? 

                                data?.map((review)=>(
                                    <>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant='subtitle1' color="inherit">
                                                        {review?.customer?.user_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                        <Grid container alignItems="center" justifyContent="space-between">
                                                            <Grid item>
                                                                <Rating readOnly value={review.rating} precision={0.5}/>
                                                            </Grid>
                                                            <Grid item>
                                                                <Avatar variant='rounded' className={ review.rating > 3 ? classes.avatarSuccess : classes.avatarError}>
                                                                    {
                                                                        review.rating > 3 ?
                                                                        <KeyboardArrowUpOutlined fontSize='small' color='inherit'/>
                                                                        :
                                                                        <KeyboardArrowDownOutlined color='inherit' fontSize='small'/>
                                                                    }
                                                                </Avatar>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                                <Typography variant="subtitle2" className={classes.successDark}>
                                                    {review.subject}
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
                                        No Reviews Yet
                                    </Typography>
                                </Grid>
                            }
                           
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        }
    </React.Fragment>
  )
}

export default FoodReviews