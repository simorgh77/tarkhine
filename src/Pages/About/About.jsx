import React, { useEffect } from 'react'


import "./About.css"

export default function About() {

    //parallax effect
    const parallax = () => {
        const scrollPosition = window.pageYOffset;
        const background = document.getElementById('about-img');
        background.style.backgroundPositionY = `${scrollPosition / 2}px`;
    };

    useEffect(() => {
        window.addEventListener('scroll', parallax);
        return () => {
            window.removeEventListener('scroll', parallax);
        };
    }, []);



    return (
        <main className="main">
            <div className="about-banner" id='about-img'>
                <p className="about-banner__desc" >
                    درباره ترخینه بیشتر بدانید!
                </p>
            </div>
            <section className="about">
                <div className="container">
                    <h1 className="about__title">
                        درباره‌ما
                    </h1>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <p className="about__desc">
                                رستوران‌های زنجیره‌ای ترخینه در سال ۱۳۶۸ افتتاح گردیده‌اند و در طی این سال‌ها همواره با ارائه غذاهای باکیفیت و سرویس سریع و به موقع در تلاش برای جلب رضایت مشتریان خود بوده‌اند. در طی این سال‌ها اولیت جلب رضایت مشتریان بوده است. دراین خصوص ترخینه همیشه در تلاش بوده تا در طی این زمان‌ها کیفیت غذاهای خودرا در بهترین حالت نگه داشته و حتی با نوسانات قیمت‌های مواد اولیه در بازار قیمت خود را ثابت نگه داشته است. ترخینه شعبات خود را افتتاح کرده که بسیار شیک و مدرن می‌باشند و برای برگزاری جشن‌های کوچک و بزرگ شما مشتریان عزیز توانایی پذیرایی با کیفیت بالا را دارند. سالن پذیرایی شعبات در دو طبقه مجزا به همراه راه پله مدرن و آسانسور برای افراد کم‌توان و سالخورده آماده ارائه سرویس به شما عزیزان می‌باشند.
                                چشم انداز: در آینده‌ای نزدیک تالار پذیرایی شعبات راه اندازی شده و آماده برگزاری جشن‌ها و مراسم‌های بزرگ شما خواهند بود . به امید آن روز که همه ایرانیان سالم و سلامت باشند.
                            </p>
                        </div>
                        <div className="col-12 col-md-6">
                            <img src="/public/img/about/about2.jpg" alt="about" className="about__img" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
