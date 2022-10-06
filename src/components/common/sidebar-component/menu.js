import {
    Home,
    FileText
} from 'react-feather';

export const MENUITEMS = [
    {
        path:'/dashboard/mold', title: 'Mold', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        path:'/dashboard/session/', title: 'Six Step Study', icon: FileText, type: 'link', badgeType: 'primary', active: false
    },
    {
        path:'', title: 'Calculators', icon: FileText, type: 'link', badgeType: 'primary', active: false
    }
]
