import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/categories/')));
const CreateFood = Loadable(lazy(() =>import('../views/food/CreateNew')))
const FoodHome = Loadable(lazy(()=>import('../views/food')))
const SingleFood = Loadable(lazy(()=>import('../views/food/SingleFood')))
const Couriers = Loadable(lazy(()=>import('../views/couriers/Index')))
const Orders = Loadable(lazy(()=>import('../views/Orders/Index')))
// sample page routing

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',
                '/categories/list',
                '/couriers/home',
                '/food/home',
                '/icons/tabler-icons',
                '/icons/material-icons',
                '/category/createnew',
                '/food/createnew',
                '/food/singlefood/:id',
                '/orders/home',
                '/orders/pending',
                '/orders/fulfilled',
                '/orders/reports'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />
                        <Route path="/categories/list" component={UtilsTypography} />
                        <Route path="/food/home" component={FoodHome} />
                        <Route path="/food/createnew" component={CreateFood}/>
                        <Route path="/food/singlefood/:id" component={SingleFood}/>
                        <Route path="/couriers/home" component={Couriers}/>
                        <Route path="/orders/home" component={Orders}/>
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
