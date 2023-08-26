import React from 'react'

import "./EmptyMenuBox.css"

export default function EmptyMenuBox() {
    return (
        <div className="empty-box">
            <p className="empty-box__title">
                برای این فیلتر در حال حاضر غذایی در این دسته بندی وجود ندارد
            </p>
        </div>
    )
}
