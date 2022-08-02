import React from 'react'
import { makeStyles } from '@material-ui/styles';
import {FormControl,Box,Button,OutlinedInput,InputLabel,FormHelperText, Snackbar} from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useSelector } from 'react-redux';
import configData from '../../config'
import AnimateButton from '../../ui-component/extended/AnimateButton';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import {createReadStream} from 'fs'
import { useState } from 'react';
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
export const CreateCategoryForm = ({others}) => {
    const token = useSelector((state) => state.account.token);
    const [file,setFile] = useState(null);
    
  const classes = useStyles();
  return (
    <React.Fragment>
      <Formik
      initialValues={{
        cat_name:'',
        cat_desc:'',
        cat_icon:'',
        submit:null,

      }}
      validationSchema={Yup.object().shape({
        cat_name:Yup.string().max(255).required('Category Name Required'),
        cat_desc:Yup.string().max(255).required('Category Description Required'),
        cat_icon:Yup.mixed().required('Category Picture Required')
        
      })}
      onSubmit={(values,{setErrors,setStatus,setSubmitting})=>{
        try {
      const data = new FormData();
      data.append("file",file);
      data.append("upload_preset","btpmy93j");
      data.append("cloud_name","dftgy3yfd");
      axios({
        url:"https://api.cloudinary.com/v1_1/dftgy3yfd/image/upload",
        method:'post',
        data:data,
      }).then(resp=>{
        let url = resp.data?.secure_url;
        axios({
          method:'post',
         url:configData.API_SERVER + "admin/create-category",
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
          },
          data:{
            cat_name:values.cat_name,
            cat_desc:values.cat_desc,
            cat_icon:url
          }
        }).then(resp=>{
          if (resp.status === 201){
            setStatus({success:true,message:'Category Created'});
            setSubmitting(false);
          }
          else{
            setSubmitting(false);
            setStatus({success:false});
            setErrors({submit:"Something Went Wrong"});
          }
        }).catch(err=>{
          setStatus({success:false});
          setErrors({submit:err?.response?.data?.message ?? "Something went wrong"})
          setSubmitting(false);
        })
      }).catch(err=>{
        setErrors(err.message)
        setSubmitting(false);
        setStatus({success:false})
      })
        } catch (error) {
          setStatus({success:false})
          setErrors({submit:error.message})
          setSubmitting(false);
        }
      }}
      >{({errors,handleBlur,handleChange,handleSubmit,isSubmitting,touched,values,status})=>(
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.cat_name && errors.cat_name)} className={classes.loginInput}>
            <InputLabel htmlFor ="outlined-adornment-cat_name">Category Name</InputLabel>
            <OutlinedInput
            id="outlined-adornment-cat_name"
            type="text"
            value={values.cat_name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Category Name"
            name="cat_name"
            inputProps={{
              classes:{
                notchedOutline:classes.notchedOutline
              }
            }}
            />
            {
              touched.cat_name && errors.cat_name && (
                <FormHelperText
                error id="standard-weight-helper-text-email-login"
                >
                  {''}{errors.cat_name}{''}
                </FormHelperText>
              )
            }
          </FormControl>
          <FormControl fullWidth error={Boolean(touched.cat_desc && errors.cat_desc)} className={classes.loginInput}>
            <InputLabel htmlFor ="outlined-adornment-cat_name">Category Description</InputLabel>
            <OutlinedInput
            id="outlined-adornment-cat_name"
            type="text"
            value={values.cat_desc}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Category Description"
            name="cat_desc"
            inputProps={{
              classes:{
                notchedOutline:classes.notchedOutline
              }
            }}
            />
            {
              touched.cat_desc && errors.cat_desc && (
                <FormHelperText
                error id="standard-weight-helper-text-email-login"
                >
                  {''}{errors.cat_desc}{''}
                </FormHelperText>
              )
            }
          </FormControl>
          <FormControl fullWidth error={Boolean(touched.cat_icon && errors.cat_icon)} className={classes.loginInput}>
            <InputLabel htmlFor ="outlined-adornment-cat_name">Category Description</InputLabel>
            <OutlinedInput
            id="outlined-adornment-cat_name"
            type="file"
            value={values.cat_icon}
            onChange={(val)=>{
              setFile(val.target.files[0]);
              handleChange(val)
            }}
            onBlur={handleBlur}
            label="Category Icon"
            name="cat_icon"
            inputProps={{
              classes:{
                notchedOutline:classes.notchedOutline
              }
            }}
            />
            {
              touched.cat_icon && errors.cat_icon && (
                <FormHelperText
                error id="standard-weight-helper-text-email-login"
                >
                  {''}{errors.cat_icon}{''}
                </FormHelperText>
              )
            }
          </FormControl>
          {
            errors.submit && (
              <Box
              sx={{
                mt:3,
              }}
              >
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )
          }
          {
            status?.success && 
            (<Box
            sx={{
              mt:3,
            }}
            >
              <FormHelperText error={false} style={{
                color:'green',
                fontSize:18,
                fontWeight:"500",
              }}>{status?.message}</FormHelperText>
            </Box>)
          }
          <Box
          sx={{
            mt:2
          }}
          >
           <AnimateButton>
            <Button
            disabled={isSubmitting}
            variant="contained"
            disableElevation
            fullWidth
            type="submit"
            color='secondary'
            >
              Submit
            </Button>
            </AnimateButton> 
          </Box>
        
        </form>
      )}
      </Formik>
    </React.Fragment>
  )
}
