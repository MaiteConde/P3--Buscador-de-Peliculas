axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=cea68b520beecac6718820e4ac576c3a&language=en-US&page=1')
    .then(res => {
        const peliculas = res.data.results;
        peliculasContainer.innerHTML = '<div class="titlePag"><h1>Now playing</h1></div>';
        const baseImgUrl = 'https://image.tmdb.org/t/p/w185';

        peliculas.forEach(pelicula => {
            const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg" class ="noDis"'
            peliculasContainer.innerHTML += ` 
            
        <div onclick = "renderPeli(${pelicula.id})"  class="pelicula">
        
        ${imagen}
        <div class = "info">
            <h3 class="title">${pelicula.title} 
        </h3>
       <p> ${pelicula.release_date} </p>
      </div>
    </div>`

        })
    })


const peliculasContainer = document.querySelector('main.peliculas');
document.querySelector('.buscarInput')
    .addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            fetch('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=en-EN&query=' + event.target.value)
                .then(res => res.json())
                .then(res => {
                    const peliculas = res.results;
                    const long = peliculas.length
                    peliculasContainer.innerHTML = '';
                    const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
                    console.log(peliculas)
                    console.log(long)
                    if (long > 0) {
                        peliculas.forEach(pelicula => {
                            const imagen = pelicula.poster_path ? `
                    <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg" class ="noDis"'

                            peliculasContainer.innerHTML += `

                            <div onclick = "renderPeli(${pelicula.id})"  class="pelicula">
                            ${imagen}
                            <div class = "info">
                                <h3 class="title">${pelicula.title} 
                            </h3>
                           <p> ${pelicula.release_date} </p>
                          </div>
                        </div>`
                        })
                    } else {
                        peliculasContainer.innerHTML += `<div class ="noCoin"> 
                        <img src="./img/pngguru.com.png" alt="">
                        <h2>No se han encontrado películas con esta búsqueda</h2>
                        </div>`
                    }
                })
       }
    })
axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=en-EN')
    .then(res => {
        const generos = res.data.genres;
        generos.forEach(genero => {
            document.querySelector('.dropdown-menu').innerHTML +=
                `<a class="dropdown-item" onclick ="pelisGen (event, ${genero.id})" id = '${genero.id}' href="#">${genero.name}</a>`;

        })
    })

const pelisGen = (event, genreId) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&with_genres=${genreId}`)
        .then(res => {
            const peliculas = res.data.results;
            const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
            if (peliculas.length > 0) {
                document.querySelector('main.peliculas').innerHTML = '';
                peliculas.forEach(pelicula => {
                    const imagen = pelicula.poster_path ? `
                               <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg" class ="noDis"'
                    document.querySelector('main.peliculas').innerHTML += `

                    <div onclick = "renderPeli(${pelicula.id})"  class="pelicula">
                    ${imagen}
                    <div class = "info">
                        <h3 class="title">${pelicula.title} 
                    </h3>
                   <p> ${pelicula.release_date} </p>
                  </div>
                </div>`;
                })
            } else {
                document.querySelector('main.peliculas').innerHTML = '';
            }
        })
        .catch(error => console.error(error))
}

const renderPeli = async id => {
    const res = await axios.get(` https://api.themoviedb.org/3/movie/${id}?api_key=cea68b520beecac6718820e4ac576c3a&append_to_response=credits`)
    const pelicula = res.data;
    const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
    const homepage = pelicula.homepage ? `<p>Homepage: <a href="${pelicula.homepage}">${pelicula.homepage} </a></p>
            ` : `Homepage: not available`;
    const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg" class ="noDis"'
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${pelicula.id}/similar?api_key=cea68b520beecac6718820e4ac576c3a&page=1`)
    let similaresDivs='';
    const similares = data.results
    similares.forEach(similar =>{
        const similarImg = similar.poster_path ? `
        <img src="${baseImgUrl}${similar.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg" class ="noDis"'
        similaresDivs+= `<div  class="peliSimilar"  onclick = "renderPeli(${similar.id})">
        ${similarImg}
        <div class ="similarinfos">
            <h3 class="title">${similar.title}
        </h3>
        </div>
       </div>`
    })
    peliculasContainer.innerHTML = `
        <div  class="peli">
        ${imagen}
        <div class ="infos">
            <h3 class="title">${pelicula.title}
        </h3>
       <p>${pelicula.overview} </p>
       <p>Main genre: ${pelicula.genres[0].name} </p>
       <p>Rating: ${pelicula.popularity} </p>
       ${homepage}

       </div>
       <p> Similar movies: </p>
       <div class="similarMovies"> ${similaresDivs}</div>
    </div>`


}

const goPopular = () => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=en-EN&page=1')
        .then(res => {
            const peliculas = res.data.results;
            peliculasContainer.innerHTML = '<div class="titlePag"><h1>Most popular</h1></div>';
            const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
            peliculas.forEach(pelicula => {
                const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg" class ="noDis"'
                peliculasContainer.innerHTML += `

        <div onclick = "renderPeli(${pelicula.id})"  class="pelicula">
        ${imagen}
        <div class = "info">
            <h3 class="title">${pelicula.title} 
        </h3>
       <p> ${pelicula.release_date} </p>
      </div>
    </div>`
            })
        })
}

const goInicio = () => {
    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=cea68b520beecac6718820e4ac576c3a&language=en-US&page=1')
        .then(res => {
            const peliculas = res.data.results;
            peliculasContainer.innerHTML = '<div class="titlePag"><h1>Now playing</h1></div>';
            const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
            peliculas.forEach(pelicula => {
                const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg" class ="noDis"'
                peliculasContainer.innerHTML += `

        <div onclick = "renderPeli(${pelicula.id})"  class="pelicula">
        ${imagen}
        <div class = "info">
            <h3 class="title">${pelicula.title} 
        </h3>
       <p> ${pelicula.release_date} </p>
      </div>
    </div>`
            })
        })
}

const goUpcom = () => {
    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=cea68b520beecac6718820e4ac576c3a&language=en-US&page=1')
        .then(res => {
            const peliculas = res.data.results;
            peliculasContainer.innerHTML = '<div class="titlePag"><h1>Upcoming</h1></div>';
            const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
            peliculas.forEach(pelicula => {
                const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg" class ="noDis"'
                peliculasContainer.innerHTML += `

        <div onclick = "renderPeli(${pelicula.id})"  class="pelicula">
        ${imagen}
        <div class = "info">
            <h3 class="title">${pelicula.title} 
        </h3>
       <p> ${pelicula.release_date} </p>
      </div>
    </div>`
            })
        })
}