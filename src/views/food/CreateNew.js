import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Box, Button } from '@material-ui/core';
import React from 'react';
import { gridSpacing } from '../../store/constant';
import MainCard from '../../ui-component/cards/MainCard';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import config from '../../config';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import { useSelector } from 'react-redux';
const CreateNew = () => {
    const [categories, setCategories] = React.useState([]);
    const [file, setFile] = React.useState(null);
    const token = useSelector(state=>state.account.token)
    const user = useSelector(state=>state.account.user)
    React.useEffect(() => {
        axios
            .get(config.API_SERVER + 'get-all-categories')
            .then((repsonse) => {
                setCategories(repsonse.data);
                console.log(repsonse.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const classes = useStyles();
    return (
        <MainCard title="New Food">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <React.Fragment>
                        <Formik
                            initialValues={{
                                food_name: '',
                                food_desc: '',
                                food_price: '',
                                food_image: '',
                                food_calories: '',
                                food_category: '',
                                stock:'',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                food_name: Yup.string().max(255).required('Food Name Is Required'),
                                food_desc: Yup.string().max(255).required('Food Description Is Required'),
                                food_price: Yup.number().required('Food price Required'),
                                food_image: Yup.mixed().required('Upload Image Of The Food'),
                                food_category: Yup.mixed().required('Food Caegory Is Required'),
                                food_calories: Yup.number().required('Food Calories Required'),
                                stock:Yup.number().required('Food Stock Required')
                            })}
                            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    const data = new FormData();
                                    data.append('file', file);
                                    data.append('upload_preset', 'btpmy93j');
                                    data.append('cloud_name', 'dftgy3yfd');
                                    axios({
                                        url: 'https://api.cloudinary.com/v1_1/dftgy3yfd/image/upload',
                                        method: 'post',
                                        data: data
                                    }).then((resp) => {
                                        let url = resp.data?.secure_url;
                                        axios({
                                            method:'post',
                                            headers:{
                                                'Authorization':`Bearer ${token}`,
                                                'Content-Type':'application/json'
                                            },
                                            data:{
                                                "food_name":values.food_name,
                                                "food_desc":values.food_desc,
                                                "food_price":values.food_price,
                                                "food_calories":values.food_calories,
                                                "food_image":url,
                                                "stock":values.stock
                                            },
                                            url:config.API_SERVER + `admin/create-food/category/${values.food_category}/restaurant/${user.restaurant?.restaurant_id}`
                                        }).then(resp=>{
                                            if(resp.status === 201){
                                                setStatus({success:true,message:'Food Created'});
                                                setSubmitting(false);
                                            }else{
                                                setSubmitting(false);
                                                setStatus({success:false});
                                                setErrors({submit:`Something Went Wrong. Status ${resp.statusText}`})
                                            }
                                        }).catch(err=>{
                                            setSubmitting(false);
                                            setStatus({success:false});
                                            setErrors({submit:err?.response?.data?.message});
                                        });  
                                    }).catch(err=>{
                                        setSubmitting(false);
                                        setErrors({submit:err.message});
                                        setStatus({success:false});
                                    });
                                } catch (error) {
                                    setStatus({ success: false });
                                    setErrors({ submit: error.message });
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, status }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.food_name && errors.food_name)}
                                        className={classes.loginInput}
                                    >
                                        <InputLabel>Food Name</InputLabel>
                                        <OutlinedInput
                                            value={values.food_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            label="Food Name"
                                            name="food_name"
                                            inputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        />
                                        {touched.food_name && errors.food_name && (
                                            <FormHelperText error>
                                                {''}
                                                {errors.food_name}
                                                {''}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.food_desc && errors.food_desc)}
                                        className={classes.loginInput}
                                    >
                                        <InputLabel>Food Description</InputLabel>
                                        <OutlinedInput
                                            value={values.food_desc}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            label="Food Name"
                                            name="food_desc"
                                            inputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        />
                                        {touched.food_desc && errors.food_desc && (
                                            <FormHelperText error>
                                                {''}
                                                {errors.food_desc}
                                                {''}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.food_price && errors.food_price)}
                                        className={classes.loginInput}
                                    >
                                        <InputLabel>Food Price</InputLabel>
                                        <OutlinedInput
                                            value={values.food_price}
                                            type="number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            label="Food Price"
                                            name="food_price"
                                            inputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        />
                                        {touched.food_price && errors.food_price && (
                                            <FormHelperText error>
                                                {''}
                                                {errors.food_price}
                                                {''}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.food_calories && errors.food_calories)}
                                        className={classes.loginInput}
                                    >
                                        <InputLabel>Food Calories </InputLabel>
                                        <OutlinedInput
                                            value={values.food_calories}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            label="Food Calories"
                                            name="food_calories"
                                            type="number"
                                            inputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        />
                                        {touched.food_calories && errors.food_calories && (
                                            <FormHelperText error>
                                                {''}
                                                {errors.food_calories}
                                                {''}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.food_image && errors.food_image)}
                                        className={classes.loginInput}
                                    >
                                        <InputLabel>Food Image</InputLabel>
                                        <OutlinedInput
                                            value={values.food_image}
                                            onChange={(e) => {
                                                setFile(e.target.files[0]);
                                                handleChange(e);
                                            }}
                                            onBlur={handleBlur}
                                            label="Food Image"
                                            name="food_image"
                                            type="file"
                                            inputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        />
                                        {touched.food_image && errors.food_image && (
                                            <FormHelperText error>
                                                {''}
                                                {errors.food_image}
                                                {''}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.stock && errors.stock)}
                                        className={classes.loginInput}
                                    >
                                        <InputLabel>Stock</InputLabel>
                                        <OutlinedInput
                                            value={values.stock}
                                            onChange={
                                                handleChange
                                            }
                                            onBlur={handleBlur}
                                            label="Food Stock"
                                            name="stock"
                                            type="number"
                                            inputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        />
                                        {touched.stock && errors.stock && (
                                            <FormHelperText error>
                                                {''}
                                                {errors.stock}
                                                {''}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.food_category && errors.food_category)}
                                        className={classes.loginInput}
                                    >
                                        <InputLabel>Food Category</InputLabel>
                                        <Select
                                            value={values.food_category}
                                            label="Food Category"
                                            name="food_category"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        >
                                            {categories.map((item) => (
                                                <MenuItem value={item.cat_id}>{item.cat_name}</MenuItem>
                                            ))}
                                        </Select>
                                        {touched.food_category && errors.food_category && (
                                            <FormHelperText error>
                                                {''}
                                                {errors.food_category}
                                                {''}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    {errors.submit && (
                                        <Box
                                            sx={{
                                                mt: 3
                                            }}
                                        >
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Box>
                                    )}
                                    {status?.success && (
                                        <Box
                                            sx={{
                                                mt: 3
                                            }}
                                        >
                                            <FormHelperText
                                                error={false}
                                                style={{
                                                    color: 'green',
                                                    fontSize: 15,
                                                    fontWeight: '700'
                                                }}
                                            >
                                                {status?.message}
                                            </FormHelperText>
                                        </Box>
                                    )}
                                    <Box
                                        sx={{
                                            mt: 2
                                        }}
                                    >
                                        <AnimateButton>
                                            <Button
                                                disabled={isSubmitting}
                                                variant="contained"
                                                disableElevation
                                                fullWidth
                                                type="submit"
                                                color="secondary"
                                            >
                                                Submit
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </React.Fragment>
                </Grid>
            </Grid>
        </MainCard>
    );
};
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
export default CreateNew;
