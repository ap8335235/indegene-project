import React,{useState} from 'react';
import './post.scss';
import axios from 'axios';
import CustomButton from '../custom-button/custom-button';
import Modal from 'react-modal';

const Posts = ({ posts, loading }) => {
  const customStyles = {
    content : {
      top                   : '50%',
      width                 : '70vw',
      height                : '75vh',
      left                  : '50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
 const[modal,setModal]=useState(false);
 const[id,setId]=useState('');
 const[data,setData]=useState(null);
  
  const handleModal= (id) =>{
    setId(id);
    modalData(id);
    
    };

  const modalData= async (id) =>{
    const res = await axios.get(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=42d557f0`);
    setData(res.data);
    console.log(res.data);
    setModal(true);
    
  };

    if (loading) {
      return <h2>Loading...</h2>;
    }
   
  return (
    <div className='PostPage'>
      {posts.map(post => (
        <div key={post.imdbID} className='PostPage__post'>
           {post.Poster==='N/A' ? (
             <div className='PostPage__post--placeholderImage'> Image Not Available</div>
           ) : (
               <img src={post.Poster} className='PostPage__post--image'/>
           )} 
          <div className='PostPage__post--details'>
          <div>{post.Title}</div>
           <div>{post.Type}</div>
           <div>{post.Year}</div>
           <CustomButton className='custom-button' onClick={()=>handleModal(post.imdbID)}>See More</CustomButton>
            </div>
       </div>
      ))}

<Modal isOpen={modal} ariaHideApp={false} style={customStyles}>
    
    {data !== null ? (
     <div className='movieModal'>
        <div className='movieModal__header'>
              <div className='movieModal__header__imageContainer'>
                     {data.Poster==='N/A' ? (
                       <div className='movieModal__header__imageContainer--placeholderImage'>Image Not Available</div>
                     ) : (
                       <img src={data.Poster} className='movieModal__header__imageContainer--image'/>
                     )}
                     <div className='movieModal__header__imageContainer--rating'>{data.imdbRating > 7 ? 'Blockbuster Movie' : 'Flop Movie'}</div>
                  </div> 

                <div className='movieModal__header__textContainer'>
                       <div className='movieModal__header__textContainer--title'>
                             <div><span>Title:</span> {data.Title}</div>
                             <div><span>Released:</span> {data.Released}</div>
                             <div><span>Genre:</span> {data.Genre}</div>
                             <div><span>Director:</span> {data.Director}</div>
                             <div><span>IMDB RATINGS:</span> {data.imdbRating}</div>
                             <div><span>IMDB Votes:</span> {data.imdbVotes}</div>
                             <div><span>Total Seasons:</span> {data.totalSeasons}</div>
                         </div>
                         <div className='movieModal__header__textContainer--plot'>
                             <div>
                               <span>PLOT: </span>
                               {data.Plot}</div> 
                         </div> 
                 </div>
               
                 <div className='movieModal__header__close' onClick={()=>setModal(false)}>
                 &#10005;
                   </div>

        </div>
     
     </div> 
    ) : (
      ''
    )}

    </Modal>

     
    </div>
  );
};

export default Posts;
