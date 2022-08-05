import { Grid } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React from 'react'
import { gridSpacing } from '../../store/constant'
import MainCard from '../../ui-component/cards/MainCard'
import EarningCard from '../dashboard/Default/EarningCard'

const Index = () => {
  const [isLoading,setIsLoading] = React.useState(true);
  React.useEffect(()=>{
    setIsLoading(false)
  },[])
  return (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Total Orders This Month" value={12}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Delivered Orders This Month" value={12}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Cancelled Orders This Month" value={12}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Pending Orders This Month" value={12}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Total Earnings This Month" value={12}/>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <EarningCard title="Total Orders This Month" value={12}/>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
              <MainCard title="Orders List">
                  <div
                  style={{
                    width:'auto',
                    
                  }}
                  >
                    {
                      !isLoading && (
                        <DataGrid
                        getRowId={row=>row.order_id}
                        rows={[]}
                        columns={[
                          {field:'order_id',headerName:"Order Id",type:'number',width:100},
                          {field:'order_date',headerName:"Order Date",type:'date',width:200},
                          {field:'order_amount',headerName:"Order Amount",type:'number',width:150},
                          {field:'quantity',headerName:'Quantity',type:'number',width:150},
                          {field:'orderStatus',headerName:'Status',width:150}
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

        </Grid>
    </Grid>
  )
}

export default Index