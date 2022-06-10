import React from 'react';
// material-ui
import { Grid, Link } from '@material-ui/core';
// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';
import { DataGrid,GridColDef,GridValueGetterParams } from '@material-ui/data-grid';
import {columns, rows} from '../../assets/constants/data';
//==============================|| TYPOGRAPHY ||==============================//

const Typography = () => {
    return (
        <MainCard title="Food" secondary={<h6>New</h6>}>
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
                        rows={rows}
                        columns={columns}
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
