import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../components/Layout'
import { CountryList } from '../components/CountryList'
import { RegionList } from '../components/RegionList'
import { Header } from '../components/Header'


const Home = ({ allCountries, initialRegion='' }) => {

  console.log('called Home comp with initialRegion: ' + initialRegion);

  const [searchFilter, setSearchFilter] = useState(initialRegion)
  const router = useRouter()

  // console.log('searchFilter: ' + searchFilter);

  // const searchFilter = initialRegion;

  // const handleSearchFilter = e => setSearchFilter(e.target.value)

  // const handleRegionFilter = region => setSearchFilter(region)

  const handleRegionFilter = region => {
      setSearchFilter(region)
      const path = `/region/${region}`
      console.log(path);
      router.push({pathname: path}, '', {shallow: false});
    }
  ;

  const searchedCountries = allCountries.filter(country => country.name.toLowerCase().includes(searchFilter) || country.region.includes(searchFilter))

  console.log('returning Home');
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


export const getStaticProps = async () => {
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const allCountries = await res.json()

    return {
      props: {
        allCountries
      }
    }
  } catch (err) {
    console.error(err)
  }
}


export default Home;