import { Grid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import config from '../../config'
import { gridSpacing } from '../../store/constant'
import MainCard from '../../ui-component/cards/MainCard'
import EarningCard from '../dashboard/Default/EarningCard'
import RecentOrders from '../food/Components/RecentOrders'

const Index = () => {
  const [isLoading,setIsLoading] = React.useState(true);
  const token = useSelector(state=>state.account.token);
  const user =useSelector(state=>state.account.user)
  const [data,setData] = React.useState({});
  React.useEffect(()=>{
    axios.get(config.API_SERVER+`admin-page-order-summary/${user?.restaurant?.restaurant_id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }).then(response=>{
      setData(response.data);
      console.log(response.data);
    }).catch(error=>{
      console.log(error.response);
    })
    setIsLoading(false)
  },[])
  return (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Total Orders" isLoading={isLoading} value={data?.total_orders}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Delivered Orders This Month" isLoading={isLoading} value={data?.succesfull_month?.length}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Cancelled Orders This Month" isLoading={isLoading} value={data?.cancelled_month?.length}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Pending Orders This Month" isLoading={isLoading} value={data?.pending_month?.length}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Total Earnings This Month" value={data?.amount_month} isLoading={isLoading}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Total Orders This Month" value={data?.orders_month?.length} isLoading={isLoading}/>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
              <MainCard title="Orders This Month">
                  <div
                  style={{
                    width:'auto',
                    
                  }}
                  >
                    {
                      isLoading!==true && (
                        <DataGrid
                        getRowId={row=>row.order_id}
                        rows={data?.orders_month ?? []}
                        columns={[
                          {field:'order_id',headerName:"Id",type:'number',width:100,headerAlign:'left'},
                          {field:'order_date',headerName:"Order Date",type:'date',width:150,headerAlign:'left'},
                          {field:'order_amount',headerName:"Order Amount",type:'number',width:100,headerAlign:'left'},
                          {field:'quantity',headerName:'Quantity',type:'number',width:140,headerAlign:'left'},
                          {field:'orderStatus',headerName:'Status',width:150,headerAlign:'left'},
                          {field:'delivery_cost',headerName:'Delivery Cost',type:'number',width:150,headerAlign:'left'},
                          {field:'delivey_date',headerName:'Delivery Date',type:'date',width:200,headerAlign:'left'},
                          {field:'payment_types',headerName:'Payment Type',width:200,headerAlign:'left'},
                          
                        ]}
                        autoHeight={true}
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
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={4} isLoading={isLoading}>
              <RecentOrders isLoading={isLoading} data={data?.orders_month}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <RecentOrders title='Recent Pending Orders' isLoading={isLoading} data={data?.pending_month}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <RecentOrders title="Recent Succesfull Orders" isLoading={isLoading} data={data?.succesfull_month}/>
            </Grid>
          </Grid>
        </Grid>
    </Grid>
  )
}

export default Index