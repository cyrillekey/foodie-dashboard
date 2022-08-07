// assets
import { IconBrandFramer, IconWindmill, IconLayoutGridAdd ,IconShoppingCart, IconUsers, IconTruckDelivery,IconPizza,IconCurrencyDollar} from '@tabler/icons';

// constant
const icons = {
    IconTypography: IconShoppingCart,
    IconPalette: IconUsers,
    IconShadow: IconTruckDelivery,
    IconWindmill: IconCurrencyDollar,
    IconBrandFramer: IconBrandFramer,
    IconLayoutGridAdd: IconLayoutGridAdd,
    IconPizza:IconPizza,

};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
    id: 'utilities',
    title: 'Main',
    type: 'group',
    children: [
        {
            id: 'category',
            title: 'Categories',
            type: 'item',
            url: '/categories/list',
            icon: icons['IconTypography'],
            breadcrumbs: false,
            children:[
                {
                id:'category-new',
                title:'New Category',
                type:'item',
                url:'/category/createnew'
                }
            ]
        },
        {
            id: 'user',
            title: 'Couriers',
            type: 'item',
            url: '/couriers/home',
            icon: icons['IconPalette'],
            breadcrumbs: false
        },
        {
            id:'food',
            title:'Food Products',
            type:'collapse',
            icon:icons['IconPizza'],
            children:[
                {
                    id: 'food_list',
                    title: 'List',
                    type: 'item',
                    url:'/food/home',
                    breadcrumbs: false
                },
                {
                    id:'create-new',
                    title:'Create New',
                    type:'item',
                    url:'/food/createnew',
                    breadcrumbs:false
                }
            ]
        },
        {
            id: 'order',
            title: 'Orders',
            type: 'collapse',
            icon: icons['IconShadow'],
            breadcrumbs: false,
            children:[
                {
                    id:'order-home',
                    title:'Orders',
                    type:'item',
                    url:'/orders/home',
                    breadcrumbs:true,
                },
                {
                    id:'order-pending',
                    title:'Pending Orders',
                    type:'item',
                    url:'/orders/pending',
                    breadcrumbs:true,
                },
                {
                    id:'order-fullfiled',
                    title:'Fulfilled Orders',
                    type:'item',
                    url:'/orders/fulfilled',
                    breadcrumbs:true,
                },
                {
                    id:'order-reports',
                    title:'Reports',
                    type:'item',
                    url:'/orders/reports',
                    breadcrumbs:true,
                }
            ]
        },
        {
            id: 'transaction',
            title: 'transactions',
            type: 'collapse',
            icon: icons['IconWindmill'],
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Tabler Icons',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Material Icons',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        },
    ]
};
