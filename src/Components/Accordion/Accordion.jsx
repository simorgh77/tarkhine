import React, { useState } from 'react'

import { MdOutlineKeyboardArrowDown } from "react-icons/md"

import "./Accordion.css"

export default function Accordion({ question, answer }) {

    const [isAccordionActive, setIsAccordionActive] = useState(false);

    const toggleActiveAccordion = () => setIsAccordionActive(prev => !prev)


    return (
        <div className='accordion'>
            <div className={`accordion-header ${isAccordionActive && 'active'}`} onClick={toggleActiveAccordion}>
                <span className="accordion-title">
                    {question}
                </span>
                <MdOutlineKeyboardArrowDown className={`accordion__item-icon ${isAccordionActive && 'active'}`} />
            </div>
            <div className={`accordion-body ${isAccordionActive && 'active'}`}>
                <p className="accordion__body-content">
                    {answer}
                </p>
            </div>
        </div>
    )
}
