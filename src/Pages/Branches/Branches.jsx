import React from 'react'

import useFetchData from '../../hooks/useFetchData'

import ContactBox from '../../Components/ContactBox/ContactBox'
import ErrorBox from '../../Components/ErrorBox/ErrorBox'

import "./Branches.css"

export default function Branches() {

    const { data: branches, error: branchesError } = useFetchData('branches');

    return (
        <main className="main">
            <section className="branch-list">
                <div className="container">
                    <h1 className="branch-list__title">
                        شعبه مورد نظر خود را انتخاب کنید
                    </h1>

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
