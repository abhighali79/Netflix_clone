import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import {Link} from 'react-router-dom'



const TitleCards = ({title,category}) => {

  const[apiData, setApiData]=useState([])
  const cardsref=useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDhiOWVjNGRmNDAwODQ2OTJkZWU0ZDUwNDJiNjQ5ZiIsIm5iZiI6MTc1NzczOTcxOS41NjQ5OTk4LCJzdWIiOiI2OGM0ZmFjNzk1YjU2MzA1ODk0Y2ExMDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zPUwJn4icd1qyKaT_ubWgCtBYJiSTOKinhvMH0aDHmE'
  }
};



const handleWheel=(event)=>{
  event.preventDefault;
  cardsref.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsref.current.addEventListener('Wheel',handleWheel);
},[])  
  return ( 
    <div className='title-cards'>
      <h2>{title?title:"Popular on netflix"}</h2>
      <div className="card-list" ref={cardsref}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
