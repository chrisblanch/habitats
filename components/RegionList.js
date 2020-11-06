import React from 'react'
import Link from 'next/link'

import { regions } from '../utils/regions'

export const RegionList = ({ handleRegionFilter }) => {
    console.log('RegionList')
    return (
        <ul className='flex flex-wrap justify-center'>
        {/* {regions.map(r => <li key={r.region}><Link href={'/region/' + r.region } className='my-2 mx-1 text-white font-bold py-2 px-4 rounded bg-teal-500 hover:bg-teal-600' onClick={() => handleRegionFilter(r.region)} ><a>#{r.region}</a></Link></li>)} */}
            {regions.map(r => <li key={r.region}><button href={'/region/' + r.region } className='my-2 mx-1 text-white font-bold py-2 px-4 rounded bg-teal-500 hover:bg-teal-600' onClick={() => handleRegionFilter(r.region)} >#{r.region}</button></li>)}
        </ul>
    )
}
