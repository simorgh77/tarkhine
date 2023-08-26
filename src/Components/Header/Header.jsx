import React, { useState } from 'react'

import Nav from '../Nav/Nav'

import { useDispatch } from 'react-redux'
import { toggleSearchModalAction } from '../../redux/searchMenu'

import { Link } from 'react-router-dom'
import { RiSearch2Line } from "react-icons/ri"
import { HiOutlineShoppingCart } from "react-icons/hi"
import { BiUser } from "react-icons/bi"

import "./Header.css"

export default function Header() {

    const [isActiveResponsiveMenu, setIsActiveResponsiveMenu] = useState(false);
    const dispatch = useDispatch()


    //show and hide search box modal on click
    const toggleSearchModalHandler = () => dispatch(toggleSearchModalAction())

    return (
        <>
            <header className={`header`}>
                <div className="container">
                    <div className="header-wrapper">
                        <div
                            className={`header__responsive-icon ${isActiveResponsiveMenu && 'active'}`}
                            onClick={() => setIsActiveResponsiveMenu(prev => !prev)}
                        >
                        </div>
                        <Link to='/' className="header__brand">
                            <img src="/public/img/main/Logo.png" alt="logo" className="header__brand-logo" />
                        </Link>
                        <Nav
                            isActiveResponsiveMenu={isActiveResponsiveMenu}
                            setIsActiveResponsiveMenu={setIsActiveResponsiveMenu}
                        />
                        <div className="header__icons">
                            <RiSearch2Line
                                className='header__icons-item header__icons--search'
                                onClick={toggleSearchModalHandler}
                            />
                            <Link to='/cart'>
                                <HiOutlineShoppingCart
                                    className='header__icons-item header__icons--cart'
                                />
                            </Link>
                            <BiUser className='header__icons-item header__icons--user' />
                        </div>
                    </div>
                </div>

            </header >

        </>
    )
}
