import { authRoles } from 'app/auth';
import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
    {
        id: 'applications',
        title: '',
        translate: 'APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'e-commerce-products',
                title: 'Products',
                type: 'item',
                icon: 'shopping_cart',
                url: '/apps/e-commerce/products',
                exact: true
            },

            {
                id: 'file-manager',
                title: 'Files',
                translate: 'FILE_MANAGER',
                type: 'item',
                icon: 'folder',
                url: '/apps/file-manager'
            }
        ]
    }
];

export default navigationConfig;
