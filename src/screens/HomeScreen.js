import React from 'react'
import './HomeScreen.css'
import Nav from '../Nav';
import Banner from '../Banner';
import requests from '../Requests';
import Row from '../Row';

function HomeScreen() {
  return <div className='homeScreen'>
    <Nav/>
    <Banner/>
    < Row 
        title = 'Netflix Trending'
        fetchUrl = {requests.fetchTrending}
        isLargeRow 
    />
    < Row title = 'Comedy Movies' fetchUrl = {requests.fetchComedyMovies}/>
    < Row title = 'Romance Rated' fetchUrl = {requests.fetchRomanceMovies}/>
    < Row title = 'Documentaries' fetchUrl = {requests.fetchDocumentaries}/>
  </div>;

}

export default HomeScreen;