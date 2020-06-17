import React, { useState } from 'react';
import './movie-poster.scss';
import FormInput from './../../components/form-input/form-input';
import CustomButton from './../../components/custom-button/custom-button';
import { Spinner2 } from './../../components/with-spinner/spinner';
import Posts from './../../components/post/Posts';
import Pagination from './../../components/pagination/Pagination';
import axios from 'axios';

const MoviePoster= () =>{
    const[posts,setPosts]= useState([]);
    const[showSpinner,setShowSpinner]=useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const [movieDetails, setDetails] = useState({
        title: 'x men',
        year: '2000'
      });
    const { title, year } = movieDetails;
    const handleSubmit=(event)=>{
        event.preventDefault();
        handleSearch(title,year);
    };
    const handleChange = (event) => {
        const { value, name } = event.target;
        setDetails({ ...movieDetails, [name]: value });
      };
    const handleSearch= async (title,year)=>{
        setShowSpinner(prevState =>!prevState);
        const res = await axios.get(`http://www.omdbapi.com/?s=${title}&y=${year}&apikey=42d557f0`);
        setPosts(res.data.Search);
         setShowSpinner(prevState =>!prevState);
        };


    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber =>{
        setCurrentPage(pageNumber);
     }; 
   

   return(
       <div className='Movie'>
               <form onSubmit={handleSubmit} className='Movie__formposter' >
            <FormInput name='title'  label='Movie Title' type='text' value={title}  handleChange={handleChange} required />
            <FormInput name='year' label='Movie Release Year' type='text' value={year}  handleChange={handleChange} required />
                 {showSpinner ? (
                        <Spinner2 />
                    ) : (
                    <CustomButton type='submit' className='custom-button'>Search</CustomButton>
                    )}
        </form>
        <div className='Mpagination'>
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            />
            </div>
            <Posts posts={currentPosts} loading={showSpinner} />
            </div>
   );
};


export default MoviePoster;