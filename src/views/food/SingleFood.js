import { FormControl, Grid, InputLabel, OutlinedInput, FormHelperText, Select, MenuItem ,Button, CardContent, Typography, Avatar} from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import config from '../../config';
import { gridSpacing } from '../../store/constant';
import EarningCard from '../dashboard/Default/EarningCard';
import PopularCard from '../dashboard/Default/PopularCard';
import FoodReviews from './Components/FoodReviews';
import RecentOrders from './Components/RecentOrders';
import MainCard from '../../ui-component/cards/MainCard';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/system';
import AnimateButton from '../../ui-component/extended/AnimateButton';
const SingleFood = () => {
    const param = useParams();
    const token = useSelector((state) => state.account.token);
    const [data, setData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const [categories, setCategories] = React.useState([]);
    const classes = useStyles();
    React.useEffect(() => {
        axios
            .get(config.API_SERVER + `admin/single-product-report/${param.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
        axios
            .get(config.API_SERVER + 'get-all-categories')
            .then((repsonse) => {
                setCategories(repsonse.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }, [param.id,token]);
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} xs={12}>
                        <EarningCard isLoading={isLoading} title="Orders " value={`${data?.orders?.length} Total Orders`} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                        <EarningCard isLoading={isLoading} title="Reviews " value={`${data?.reviews?.length} Total Reviews`} />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                        <MainCard content={false}>
                                <CardContent>
                                    <Grid container spacing={gridSpacing}> 
                                        <Grid item xs={12}>
                                            <Grid container alignContent="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="h3">Category</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Grid container alignContent="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="h5">Category Id</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="h5">{data.category?.cat_id}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Grid container alignContent="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="h5">Category Name</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="h5">{data.category?.cat_name}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                        <Grid container alignContent="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="h5">Category Image</Typography>
                                                </Grid>
                                                <Grid item>
                                                    
                                                    <Avatar src={data.category?.cat_icon}/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={4}>
                        <FoodReviews isLoading={isLoading} data={data?.reviews} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RecentOrders isLoading={isLoading} data={data?.reviews}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <MainCard title="Edit Details">
                            <Grid container spacing={gridSpacing}>
                                {data.food && (
                                    <Grid item xs={12}>
                                        <Formik
                                            initialValues={{
                                                food_name: data.food.food_name,
                                                food_desc: data.food.food_desc,
                                                food_price: data.food.food_price,
                                                food_image: null,
                                                food_calories: data.food.food_calories,
                                                stock: data.food.stock,
                                                food_category: data.category.cat_id,
                                                submit: null
                                            }}
                                            validationSchema={Yup.object().shape({
                                                food_name: Yup.string().max(255).required('Food Name Is Required'),
                                                food_desc: Yup.string().max(255).required('Food Description Is Required'),
                                                food_price: Yup.number().required('Food price Required').min(1),
                                                food_image: Yup.mixed().required('Upload Image Of The Food'),
                                                food_category: Yup.mixed().required('Food Caegory Is Required'),
                                                food_calories: Yup.number().required('Food Calories Required').min(1),
                                                stock: Yup.number().required('Food Stock Required').min(0)
                                            })}
                                            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {}}
                                        >
                                            {({
                                                errors,
                                                handleBlur,
                                                handleChange,
                                                handleSubmit,
                                                isSubmitting,
                                                touched,
                                                values,
                                                status
                                            }) => (
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
                                                            name="food_name"
                                                            label="Food Name"
                                                            onBlur={handleBlur}
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
                                                            name="food_desc"
                                                            label="Food Description"
                                                            onBlur={handleBlur}
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
                                                            onChange={handleChange}
                                                            name="food_price"
                                                            label="Food Price"
                                                            type="number"
                                                            onBlur={handleBlur}
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
                                                        <InputLabel>Food Calories</InputLabel>
                                                        <OutlinedInput
                                                            value={values.food_calories}
                                                            onChange={handleChange}
                                                            name="food_calories"
                                                            label="Food Calories"
                                                            onBlur={handleBlur}
                                                            type="number"
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
                                                            onChange={handleChange}
                                                            name="food_image"
                                                            label="Food Image"
                                                            onBlur={handleBlur}
                                                            type="file"
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
                                                            color="secondary"
                                                            >
                                                                Update
                                                            </Button>
                                                        </AnimateButton>
                                                    </Box>
                                                </form>
                                            )}
                                        </Formik>
                                    </Grid>
                                )}
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        Edit
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
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
export default SingleFood;
