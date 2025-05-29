import React from 'react'
import HistoryOfTheDay from '../components/HistoryOfTheDay.jsx'
import LatestArticles from '../components/LatestArticles.jsx'
// import InteractiveMap from '../components/InteractiveMap.jsx'
function Home() {
  return (
    <div>
      <div className='mt-20'>
        <HistoryOfTheDay/>
        <LatestArticles/>
        {/* <InteractiveMap/> */}
      </div>
    </div>
  )
}

export default Home
