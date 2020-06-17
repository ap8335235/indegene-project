import React, { useState } from 'react';
import './App.scss';
import Movie from './pages/movie/movie';
import MoviePoster from './pages/movie-poster/movie-poster';


function App() {
  const[tab,setTab]=useState(true);
  const[currentTab,setCurrentTab]= useState('movies');

  const handleTab= (tabName) => {
     setCurrentTab(tabName);
    
     if(tabName==='movies'){
      setTab(true);
     }else{
      setTab(false);
     }
};


  return (
   <div className='App'>
         <div className='App__tabs'>
             <div onClick={()=>handleTab('movies')} className={`App__tabs--tab ${currentTab==='movies' ? 'App__tabs--tab2' : ''} `} > Movies</div>
             <div onClick={()=>handleTab('moviesposter')} className={`App__tabs--tab ${currentTab==='moviesposter' ? 'App__tabs--tab2' : ''} `}> Movies Poster </div>
         </div>
        {tab ? (
          <Movie />
        ) : (
          <MoviePoster />
        )}


         </div>
   
  );
}

export default App;
