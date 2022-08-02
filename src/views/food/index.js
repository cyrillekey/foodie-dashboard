import { Avatar, Chip, Grid, Rating } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import config from '../../config';
import { gridSpacing } from '../../store/constant';
import MainCard from '../../ui-component/cards/MainCard';
import EarningCard from '../dashboard/Default/EarningCard';

const Index = () => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(true);
    const token = useSelector(state=>state.account.token);
    const user = useSelector(state=>state.account.user);
    React.useEffect(() => {
        axios
            .get(config.API_SERVER+`admin-product-summary/${user.restaurant?.restaurant_id}`,
            {
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }
            )
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err.response)
                setLoading(false);
            });
    }, []);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} xs={12}>
                        <EarningCard isLoading={loading} value={`${data?.product_quantity} Product`} title="Product Quantity"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                    <MainCard title="Products">
                        <div
                            style={{
                                width:'auto',
                                height:400,
                            }}
                        >
                        {
                            !loading && (
                                <DataGrid
                        getRowId={row=>row.food_id}
                        rows={data.food}
                        columns={[
                            {field:'food_id',headerName:'Id',width:100,type:'number'},
                            {field:'food_name',headerName:'Food Name',width:200},
                            {field:'food_desc',headerName:'Food Description',width:200},
                            {field:'food_price',headerName:'Food Price',width:150},
                            {field:'stock',headerName:'Food Stock',width:150,renderCell:(params)=>(<Chip label={`${params.value} Items Left`} color={params.value < 10 ? "error" : "success" }/>)},
                            {field:'food_image',headerName:"Food Image",width:150,renderCell:(params)=>(<Avatar src={params.value}/>)},
                            {field:'ratings',headerName:'Ratings',width:150,renderCell:(params)=>(<Rating
                                readOnly
                                value={params.value}
                            />)}

                        ]}
                        checkboxSelection
                        disableSelectionOnClick
                        />
                            )
                        }
                        </div>
                    </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Index;
