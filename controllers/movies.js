export const moviesHandler = async (request, response) => {
     console.log(request.query);
     try{
          await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${cityName}`)
     }
}







//TODO Create movie class; title, image, description