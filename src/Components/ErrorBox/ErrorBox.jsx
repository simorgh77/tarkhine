import React from 'react'

import "./ErrorBox.css"

export default function ErrorBox() {
    return (
        <div className="error-box">
            <p className="error-box__title">
                دریافت اطلاعات با خطا مواجه شد
            </p>
            <p className="error-box__desc">
                لطفا تنظیمات اینترنت خود را چک کنید و دوباره تلاش کنید
            </p>
        </div>
    )
}
