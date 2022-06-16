import React from 'react'
import MainCard from '../../ui-component/cards/MainCard';
import { Grid,FormControl,InputLabel,OutlinedInput,FormHelperText,Box,Button} from '@material-ui/core';
import * as Yup from 'yup';
import { gridSpacing } from '../../store/constant';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import SubCard from '../../ui-component/cards/SubCard';
import configData from '../../config'
import axios from 'axios';
import {makeStyles} from '@material-ui/styles';
import AnimateButton from '../../ui-component/extended/AnimateButton';
const Newproduct = ({...others}) => {
  const token = useSelector((state) => state.account.token);   
  const classes = useStyles();
  return (
    <MainCard
    title="Create new Category"
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={12}>
        
        <React.Fragment>
          <SubCard title="New">
          <Formik
          initialValues={{
            cat_name:'',
            cat_description:'',
            cat_icon:'',
          }}
          validationSchem={
            Yup.object().shape({
              cat_name:Yup.string().required('Category name is required').max(255),
              cat_description: Yup.string().required('Category Description is required').max(255),
              cat_icon:Yup.string().required("Category icon link is required")
            })
          }
          onSubmit={(values,{setErrors,setStatus,setSubmitting})=>{
            var data = JSON.stringify({
              "cat_name": values.cat_name,
              "cat_icon": values.cat_icon,
              "cat_desc": values.cat_description
            });
            
            var config = {
              method: 'post',
              url:configData+'admin/create-category',
              headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config).then().catch();
          }}
          >
            
            {({errors,handleBlur,handleChange,handleSubmit,isSubmitting,touched,values})=>{
              <form
              noValidate
              onSubmit={handleSubmit}
              {...others}
              >
                {/* <Grid
                container
                spacing={matchDownSM ? 0 : 2}>
                  <Grid item xs={12}>
                    <TextField/>
                  </Grid>
                </Grid> */}
                <FormControl fullWidth error={Boolean(touched.cat_name && errors.cat_name)} className={classes.loginInput}>
                  <InputLabel htmlFor='category_name'>Category Name</InputLabel>
                  <OutlinedInput
                  id='category_name'
                  type='text'
                  value={values.cat_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{
                    classes:{
                      notchedOutline:classes.notchedOutline
                    }
                  }}
                  />
                  {touched.cat_name && errors.cat_name && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {''}
                      {errors.cat_name}{''}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth error={Boolean(touched.cat_description && errors.cat_description)} className={classes.loginInput}>
                  <InputLabel htmlFor='category_desc'>Category Description</InputLabel>
                  <OutlinedInput
                  id='category_desc'
                  type='text'
                  value={values.cat_description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{
                    classes:{
                      notchedOutline:classes.notchedOutline
                    }
                  }}
                  />
                  {touched.cat_description && errors.cat_description && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {''}
                      {errors.cat_description}{''}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth error={Boolean(touched.cat_icon && errors.cat_icon)} className={classes.loginInput}>
                  <InputLabel htmlFor='category_icon'>Category Icon</InputLabel>
                  <OutlinedInput
                  id='category_icon'
                  type='text'
                  value={values.cat_icon}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{
                    classes:{
                      notchedOutline:classes.notchedOutline
                    }
                  }}
                  />
                  {touched.cat_icon && errors.cat_icon && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                      {''}
                      {errors.cat_icon}{''}
                    </FormHelperText>
                  )}
                </FormControl>
                {
                  errors.submit && (
                    <Box
                    sx={{
                      mt:3
                    }}
                    >
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Box>
                  )
                }
                <Box
                sx={{
                  mt:2
                }}
                >
                  <AnimateButton>
                    <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    >
                      Submit
                    </Button>
                  </AnimateButton>
                </Box>
              </form>
            }}
          </Formik>
          </SubCard>
      </React.Fragment>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default Newproduct;
const useStyles = makeStyles((theme) => ({
  redButton: {
      fontSize: '1rem',
      fontWeight: 500,
      backgroundColor: theme.palette.grey[50],
      border: '1px solid',
      borderColor: theme.palette.grey[100],
      color: theme.palette.grey[700],
      textTransform: 'none',
      '&:hover': {
          backgroundColor: theme.palette.primary.light
      },
      [theme.breakpoints.down('sm')]: {
          fontSize: '0.875rem'
      }
  },
  signDivider: {
      flexGrow: 1
  },
  signText: {
      cursor: 'unset',
      margin: theme.spacing(2),
      padding: '5px 56px',
      borderColor: theme.palette.grey[100] + ' !important',
      color: theme.palette.grey[900] + '!important',
      fontWeight: 500
  },
  loginIcon: {
      marginRight: '16px',
      [theme.breakpoints.down('sm')]: {
          marginRight: '8px'
      }
  },
  loginInput: {
      ...theme.typography.customInput
  }
}));