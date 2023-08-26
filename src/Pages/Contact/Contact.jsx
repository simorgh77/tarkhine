import React, { useEffect } from 'react'

import ContactBox from '../../Components/ContactBox/ContactBox';
import ErrorBox from '../../Components/ErrorBox/ErrorBox';
import useFetchData from '../../hooks/useFetchData';

import "./Contact.css"

export default function Contact() {

    const { data: branches, error: branchesError } = useFetchData('branches')
console.log(branches)
    //parallax effect
    const parallax = () => {
        const scrollPosition = window.pageYOffset;
        const background = document.getElementById('contact-img');
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
            <div className="contact-banner" id='contact-img'>
                <p className="contact-banner__desc" >
                    با ترخینه در تماس باشید.
                </p>
            </div>

            <section className="contact">
                <div className="container">
                    {
                        branches.length ?
                            (
                                branches.map(branch => (
                                    <ContactBox key={branch.id} {...branch} />
                                ))
                            )
                            : ('')
                    }
                    {
                        branchesError && <ErrorBox />
                    }
                </div>
            </section>
        </main>
    )
}
