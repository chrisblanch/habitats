import Link from "next/link"
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'
import { CountryList } from '../../components/CountryList'
import { RegionList } from '../../components/RegionList'
import { Header } from '../../components/Header'

import Home from '../index.js'

const Region = ({ region, matchingCountries }) => {

  console.log('returning Home compoment with region: ' + region);

  // const [searchFilter, setSearchFilter] = useState(region)

  var searchFilter = region;

  const router = useRouter()

  const handleRegionFilter = region => {
    searchFilter = region;
    const path = `/region/${region}`
    console.log(path);
    router.push({pathname: path});
  };

  const searchedCountries = matchingCountries.filter(country => country.name.toLowerCase().includes(searchFilter) || country.region.includes(searchFilter))

  console.log('returning Region');
  return (
    <>
      {/* <Header handleSearchFilter={handleSearchFilter} /> */}
      <Header />
      <Layout title="All Countries">
        <div className='py-10'>
          <h1 className='text-center font-bold text-2xl md:text-4xl lg:text-5xl pt-6 pb-8'>Habitats</h1>
          <RegionList handleRegionFilter={handleRegionFilter} />
        </div>
        <h3 className='font-mono text-xl pr-10'>Displaying: {searchFilter.length ? searchFilter : 'All'}</h3>
        <CountryList searchedCountries={searchedCountries} />
      </Layout>
    </>
  )
}
  
  
  export const getStaticProps = async ({ params }) => {
    try {
      const res = await fetch('https://restcountries.eu/rest/v2/all')
      const allCountries = await res.json()
      const matchingCountries = allCountries.filter((value, index, self) => value.region === params.region)
      const region = params.region
      return {
        props: {
          matchingCountries,
          region
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  export const getStaticPaths = async () => {
    try {
        const res = await fetch('https://restcountries.eu/rest/v2/all')
        const allCountries = await res.json()
        const allRegions = allCountries.map(item => item.region).filter((value, index, self) => self.indexOf(value) === index).filter((value, index, self) => value != '')
        console.log('allRegions:')
        console.log(allRegions)
        const paths = await allRegions.map(c => {
            return {
                params: {
                    region: c
                }
            }
        })
        return {
            paths,
            fallback: false
        }
    } catch (err) {
        console.error(err)
    }
}

export default Region