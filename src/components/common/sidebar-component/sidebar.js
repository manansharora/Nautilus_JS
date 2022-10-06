import React, { Fragment } from 'react';
import { MENUITEMS } from '../../../components/common/sidebar-component/menu';
import { Link } from 'react-router-dom';
import { translate } from 'react-switch-lang';

const Sidebar = (props) => {

    const toggletNavActive = (item) => {
        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
            });
        }
        item.active = !item.active
    }

    return (
        <Fragment>
            <div className="page-sidebar">
                <div className="main-header-left d-none d-lg-block">
                    <div>
                        <h3 style={{ color: '#fff' }}> NAUTILUS </h3>
                    </div>
                </div>
                <div className="sidebar custom-scrollbar">
                    <ul
                        className="sidebar-menu"
                        id="myDIV"
                    >
                        {
                            MENUITEMS.map((menuItem, i) =>
                                <li className={`${menuItem.active ? 'active' : ''}`} key={i}>

                                    {(menuItem.sidebartitle) ?
                                        <div className="sidebar-title">{menuItem.sidebartitle}</div>
                                        : ''}

                                    {(menuItem.type === 'sub') ?
                                        <a className="sidebar-header" href="#javascript" onClick={() => toggletNavActive(menuItem)}>
                                            <menuItem.icon />
                                            <span>{props.t(menuItem.title)}</span>
                                        </a>
                                        : ''}

                                    {(menuItem.type === 'link') ?
                                        <Link
                                            to={`${menuItem.path}`}
                                            className={`sidebar-header ${menuItem.active ? 'active' : ''}`}

                                            onClick={() => toggletNavActive(menuItem)}
                                        >
                                            <menuItem.icon /><span>{props.t(menuItem.title)}</span>
                                            {menuItem.children ?
                                                <i className="fa fa-angle-right pull-right"></i> : ''}
                                        </Link>
                                        : ''}

                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default translate(Sidebar);