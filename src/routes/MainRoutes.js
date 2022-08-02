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
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));
const CreateNewProduct = Loadable(lazy(()=>import('../views/categories/Newcategory')));
const FoodHome = Loadable(lazy(()=>import('../views/food')))
const SingleFood = Loadable(lazy(()=>import('../views/food/SingleFood')))
// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',
                '/categories/list',
                '/users/home',
                '/food/home',
                '/icons/tabler-icons',
                '/icons/material-icons',
                '/category/createnew',
                '/sample-page',
                '/food/createnew',
                '/food/singlefood/:id'
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
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
