import { Grid } from '@material-ui/core';
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import config from '../../config';
import { gridSpacing } from '../../store/constant';
import EarningCard from '../dashboard/Default/EarningCard';
import PopularCard from '../dashboard/Default/PopularCard';
import FoodReviews from './Components/FoodReviews';

const SingleFood = () => {
    const param = useParams();
    const token = useSelector(state=>state.account.token);
    const [data,setData] = React.useState({});
    const [isLoading,setIsLoading] = React.useState(true);
    React.useEffect(()=>{
        axios.get(config.API_SERVER+`admin/single-product-report/${param.id}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(response=>{
            setData(response.data);
            setIsLoading(false);
        }).catch(err=>{
            setIsLoading(false);
        })
    },[])
  return (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={4} md={6} xs={12}>
                    <EarningCard isLoading={isLoading} title="Orders " value={`${data?.orders?.length} Total Orders`}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <EarningCard isLoading={isLoading} title="Reviews " value={`${data?.reviews?.length} Total Reviews`}/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={4}>
                <FoodReviews/>
            </Grid>
            <Grid item xs={12} md={4}>
            </Grid>
            <Grid item xs={12} md={4}>
                <PopularCard isLoading={isLoading} />
            </Grid>
        </Grid>
        </Grid>
    </Grid>
  )
}

export default SingleFood