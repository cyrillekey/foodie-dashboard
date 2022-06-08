// assets
import { IconBrandFramer, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd ,IconBrandProducthunt} from '@tabler/icons';

// constant
const icons = {
    IconTypography: IconBrandProducthunt,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconWindmill: IconWindmill,
    IconBrandFramer: IconBrandFramer,
    IconLayoutGridAdd: IconLayoutGridAdd
};

//-----------------------|| UTILITIES MENU ITEMS ||-----------------------//

export const utilities = {
    id: 'utilities',
    title: 'Main',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Products',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons['IconTypography'],
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: 'Users',
            type: 'item',
            url: '/utils/util-color',
            icon: icons['IconPalette'],
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Orders',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons['IconShadow'],
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Icons',
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
        }
    ]
};
