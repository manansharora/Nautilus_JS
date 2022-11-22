import {
    Home,
    FileText,
    Percent,
    DivideSquare
} from 'react-feather';

export const MENUITEMS = [
    {
        path:'/dashboard/mold', title: 'Mold', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        path:'/dashboard/session/', title: 'Six Step Study', icon: FileText, type: 'link', badgeType: 'primary', active: false
    },
    {
        path:'/dashboard/calculators/', title: 'Calculators', icon: Percent, type: 'link', badgeType: 'primary', active: false
    },
    {
        path:'/dashboard/conversions/', title: 'Conversions', icon: DivideSquare, type: 'link', badgeType: 'primary', active: false
    }
]
