import React from 'react'

import { BiUser, BiHomeAlt, BiFoodMenu } from "react-icons/bi"
import { AiOutlineLineChart } from "react-icons/ai"

import "./IconBox.css"

export default function IconBox({ item }) {
    return (
        <div className="col-6">
            <div className="icon-box">
                {
                    item === 'personnel' ? <BiUser className='icon-box__icon' />
                        : item === 'quality' ? <AiOutlineLineChart className='icon-box__icon' />
                            : item === 'environment' ? <BiHomeAlt className='icon-box__icon' />
                                : <BiFoodMenu className='icon-box__icon' />

                }

                <span className="icon-box__title">
                    {
                        item === 'personnel' ? 'پرسنلی مجرب و حرفه‌ای'
                            : item === 'quality' ? 'کیفیت بالای غذاها'
                                : item === 'environment' ? 'محیطی دلنشین و آرام'
                                    : 'منوی متنوع'

                    }
                </span>
            </div>
        </div>
    )
}
