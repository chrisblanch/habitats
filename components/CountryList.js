import React from 'react'

import { CountryCard } from './CountryCard'


export const CountryList = ({ searchedCountries }) => {
    console.log('CountryList')
    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                searchedCountries.map(country =>
                    <CountryCard key={country.name} country={country} />
                )
            }
        </ul>
    )
}
