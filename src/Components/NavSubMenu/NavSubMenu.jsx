import React from 'react'

import { Link } from 'react-router-dom'

import "./NavSubMenu.css"

export default function NavSubMenu({ isSubMenuActiveBranch, isSubMenuActiveMenu, }) {
    return (

        <>
            {
                isSubMenuActiveBranch ?
                    (
                        <ul className={`responsive__submenu ${isSubMenuActiveBranch && 'active'}`}>
                            <li className="responsive__submenu-item">
                                <Link to='/branches' className='responsive__submenu-item-link'>شعبه اکباتان</Link>
                            </li>
                            <li className="responsive__submenu-item">
                                <Link to='/branches' className='responsive__submenu-item-link'>شعبه اقدسیه</Link>
                            </li>
                            <li className="responsive__submenu-item">
                                <Link to='/branches' className='responsive__submenu-item-link'>شعبه چالوس</Link>
                            </li>
                            <li className="responsive__submenu-item">
                                <Link to='/branches' className='responsive__submenu-item-link'>شعبه ونک</Link>
                            </li>
                        </ul>
                    )
                    : ('')
            }
            {
                isSubMenuActiveMenu ?
                    (
                        <ul className={`responsive__submenu ${isSubMenuActiveMenu && 'active'}`}>
                            <li className="responsive__submenu-item">
                                <Link to='/menus' className='responsive__submenu-item-link'>غذای اصلی</Link>
                            </li>
                            <li className="responsive__submenu-item">
                                <Link to='/menus' className='responsive__submenu-item-link'>پیش غذا</Link>
                            </li>
                            <li className="responsive__submenu-item">
                                <Link to='/menus' className='responsive__submenu-item-link'>دسر</Link>
                            </li>
                            <li className="responsive__submenu-item">
                                <Link to='/menus' className='responsive__submenu-item-link'>نوشیدنی</Link>
                            </li>
                        </ul>
                    )
                    : ('')
            }

        </>
    )
}
