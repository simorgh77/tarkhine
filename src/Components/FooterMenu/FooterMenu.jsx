import React from 'react'

import { Link } from 'react-router-dom'

import "./FooterMenu.css"

export default function FooterMenu({ items }) {
    return (
        <div className="footer-menu">
            <h3 className="footer-menu__title">
                {items.title}
            </h3>
            <ul className="footer-menu__list">
                {
                    items.menu ?
                        (
                            items?.menu.map(menu => (
                                <li className="footer-menu__item" key={menu.id}>
                                    <Link to={menu.href} className='footer-menu__link'>
                                        {menu.name}
                                    </Link>
                                </li>
                            ))
                        )
                        : ('')
                }

            </ul>
        </div>
    )
}
