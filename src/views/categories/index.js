import React from 'react';
// material-ui
import { Grid,Button, Modal, Box} from '@material-ui/core';
// project imports
import { Link } from 'react-router-dom';
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import config from '../../config';
import {DeleteOutline } from '@material-ui/icons';
//==============================|| TYPOGRAPHY ||==============================//
const Typography = () => {
    const [data,setData] = React.useState([]);
    const [open,setOpen] = React.useState(false);
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
    const categoriesColumns = [
        { field: 'cat_id', headerName: 'ID', width: 100 ,type:'number'},
        { field: 'cat_name', headerName: 'Category Name', width: 200 },
        { field: 'cat_desc', headerName: 'Category Desc', width: 200 },
        {
          field: 'cat_icon',
          headerName: 'cat_icon',
          sortable:false,
          width: 150,
        },
        {
          field:'action',
          headerName:'Action',
          width:150,
          renderCell:(params)=>(
            <div>
              <DeleteOutline onClick={()=>{
                setOpen(true)
              }}/>
            </div>
          )
        }
      ];
    return (
        <MainCard title="Categories" secondary={<Button variant='outlined' color='info' ><Link to="/category/createnew" style={{
            textDecoration:'none',
            color:"#000000"
        }}>Create New</Link></Button>}>
            <Modal
            open={open}
            onClose={()=>setOpen(false)}
            >
                <Box
                sx={{
                    position:'absolute',
                    top:'50%',
                    left:'50%',
                    //transform:'translate(-50% -50%)',
                    width:400,
                    bgcolor:'background.paper',
                    border:'2px solid #fff',
                    p:4,
                }}
                ></Box>
            </Modal>
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
                        disableSelectionOnClick

                        />
                        </div>
                    </SubCard>
                </Grid>
                
            </Grid>
        </MainCard>
    );
};

export default Typography;
