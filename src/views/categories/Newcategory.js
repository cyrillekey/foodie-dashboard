import React from 'react'
import MainCard from '../../ui-component/cards/MainCard';
import { Grid} from '@material-ui/core';
import { gridSpacing } from '../../store/constant';

import SubCard from '../../ui-component/cards/SubCard';
import { CreateCategoryForm } from './CreateCategoryForm';

const Newproduct = ({...others}) => {
  return (
    <MainCard
    title="Create new Category"
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <CreateCategoryForm/>
        </Grid>
      </Grid>
    </MainCard>
  );
}
export default Newproduct;