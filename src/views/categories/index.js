import React from 'react';
// material-ui
import { Grid,Button} from '@material-ui/core';
// project imports
import { Link } from 'react-router-dom';
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';
import { DataGrid,GridColDef,GridValueGetterParams } from '@material-ui/data-grid';
import {categoriesColumns, rows} from '../../assets/constants/data';
import axios from 'axios';
import config from '../../config';
//==============================|| TYPOGRAPHY ||==============================//
const Typography = () => {
    const [data,setData] = React.useState([]);
    React.useEffect(()=>{
        let isMounted = true
        axios.get(config.API_SERVER+"get-all-categories").then(resp=>{
            if( isMounted)
            if (resp.status === 200){
            setData(resp.data);
            }
        }).catch(err=>{})
        return (()=>{isMounted=false})
    },[]);
    return (
        <MainCard title="Categories" secondary={<Button variant='outlined' color='info' ><Link to="/category/createnew" style={{
            textDecoration:'none',
            color:"#000000"
        }}>Create New</Link></Button>}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <SubCard title="Popular Products" >
                        <div
                        style={{
                            height:400,
                            width:"100%"
                        }}
                        >
                        <DataGrid
                        getRowId={row=>row.cat_id}
                        rows={data}
                        columns={categoriesColumns}
                        checkboxSelection

                        />
                        </div>
                    </SubCard>
                </Grid>
                
            </Grid>
        </MainCard>
    );
};

export default Typography;
