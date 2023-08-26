import React, { useState } from 'react'

import useFetchData from "../../hooks/useFetchData"

import { NavLink, Link } from 'react-router-dom'

import { MdKeyboardArrowDown } from "react-icons/md"

import "./Nav.css"
import NavSubMenu from '../NavSubMenu/NavSubMenu'

export default function Nav({ isActiveResponsiveMenu }) {

    const { data: menuData, error: menuError } = useFetchData('header-menu');

    const [isSubMenuActiveBranch, setIsSubMenuActiveBranch] = useState(false);
    const [isSubMenuActiveMenu, setIsSubMenuActiveMenu] = useState(false);

    return (
        <>
            <nav className="navbar">
                <ul className="header__menu">
                    {
                        menuData.length ?
                            (
                                menuData.map(menu => (
                                    <li className="header__menu-list" key={menu.id}>
                                        <NavLink to={menu.href} className='header__menu-list'>{menu.name}</NavLink>
                                        {
                                            menu.children &&
                                            (
                                                <>
                                                    <MdKeyboardArrowDown className='header__menu-list-icon' />
                                                    <ul className="navbar__submenu">
                                                        {
                                                            menu.children.map(submenu => (
                                                                <li
                                                                    className="navbar__submenu-item"
                                                                    key={submenu.id}>
                                                                    <Link to={submenu.href}
                                                                        className='navbar__submenu-item-link'
                                                                    >
                                                                        {submenu.name}
                                                                    </Link>
                                                                </li>

                                                            ))
                                                        }
                                                    </ul>
                                                </>
                                            )
                                        }
                                    </li>
                                ))
                            )
                            : ('')
                    }

                    {
                        menuError && (
                            <div className="navbar__error">
                                خطا،لطفا اینترنت خود را بررسی کنید و دوباره تلاش کنید
                            </div>
                        )
                    }

                </ul>
            </nav>
            <nav className={`responsive-menu ${isActiveResponsiveMenu && 'active'}`}>
                <div className="responsive-menu__header">
                    <img src="/public/img/main/Logo.png" alt="tarkhine" className="responsive-menu__logo" />
                </div>
                <ul className="responsive-menu__list">
                    <li className="responsive-menu__item">
                        <NavLink to='/' className='responsive-menu__list-item'>
                            صفحه اصلی
                        </NavLink>
                    </li>

                    <li
                        className="responsive-menu__item"
                    >
                        <div className='responsive-menu__list-item'>
                            <div
                                className="responsive-menu__list-item--wrapper"

                            >
                                <NavLink to='branches' className='responsive-menu__list-item'>شعبه</NavLink>
                                <MdKeyboardArrowDown
                                    className={`${isSubMenuActiveBranch && 'active'}`}
                                    onClick={() => setIsSubMenuActiveBranch(prev => !prev)}
                                />
                            </div>
                            <NavSubMenu
                                isSubMenuActiveBranch={isSubMenuActiveBranch}
                            />
                        </div>
                    </li>
                    <li className="responsive-menu__item">
                        <div className='responsive-menu__list-item'>
                            <div
                                className="responsive-menu__list-item--wrapper"

                            >
                                <NavLink to='menus' className='responsive-menu__list-item'>منو</NavLink>
                                <MdKeyboardArrowDown
                                    className={`${isSubMenuActiveMenu && 'active'}`}
                                    onClick={() => setIsSubMenuActiveMenu(prev => !prev)}
                                />
                            </div>
                            <NavSubMenu
                                isSubMenuActiveMenu={isSubMenuActiveMenu}
                            />
                        </div>
                    </li>
                    <li className="responsive-menu__item">
                        <NavLink to='/faq' className='responsive-menu__list-item'>
                            اعطای نمایندگی
                        </NavLink>
                    </li>
                    <li className="responsive-menu__item">
                        <NavLink to='/about' className='responsive-menu__list-item'>
                            درباره ما
                        </NavLink>
                    </li>
                    <li className="responsive-menu__item">
                        <NavLink to='/contact' className='responsive-menu__list-item'>
                            تماس با ما
                        </NavLink>
                    </li>
                    <li className="responsive-menu__item">
                        <NavLink to='https://react.dev' className='responsive-menu__list-item'>
                            ورود | ثبت نام
                        </NavLink>
                    </li>


                </ul>
            </nav>
        </>

    )
}
