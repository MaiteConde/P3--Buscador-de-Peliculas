axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=1')
    .then(res => {
        const peliculas = res.data.results;
        peliculasContainer.innerHTML = '';
        const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
        peliculas.forEach(pelicula => {
            const imagen = pelicula.poster_path ? `
        <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/image-not-available.jpg"'
            peliculasContainer.innerHTML += `
        <div class="pelicula">
            <h3 class="title">${pelicula.title}
        </h3>
        ${imagen}
    </div>`
        })
    })


const peliculasContainer = document.querySelector('main.peliculas');
document.querySelector('.buscarInput')
    .addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            fetch('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=' + event.target.value)
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
                    <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/notyetavailablekyle.jpg"'

                            peliculasContainer.innerHTML += `
                    <div class="pelicula">
                <h3 class="title">${pelicula.title}
                </h3>
                ${imagen}
            </div>`
                        })
                    } else {
                        peliculasContainer.innerHTML += `<div> <h2>No hay coincidencias</h2> </div>`
                    }

                })
        }
    })



axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
    .then(res => {
        const generos = res.data.genres;
        generos.forEach(genero => {
            document.querySelector('.dropdown-menu').innerHTML +=
                `<a class="dropdown-item" onclick ="pelisGen (event, ${genero.id})" id = '${genero.id}' href="#">${genero.name}</a>`;

        })
    })

    
//     pelisGen = (event, genreId) => {
//         axios.get ('https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&with_genres=${genreId}')
//         .then(res => {
//             const peliculas = res.data.results;
//             const long = peliculas.length
//      document.querySelector('main.peliculas').innerHTML = '';
//             const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
//             console.log(peliculas)
//             console.log(long)
//             if (long > 0) {
//                 peliculas.forEach(pelicula => {
//                     const imagen = pelicula.poster_path ? `
//             <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/notyetavailablekyle.jpg"'

//             document.querySelector('main.peliculas').innerHTML += `
//             <div class="pelicula">
//         <h3 class="title">${pelicula.title}
//         </h3>
//         ${imagen}
//     </div>`
//                 })
//             } else {
//                 peliculasContainer.innerHTML += ''
//             }

//         })
// }
const pelisGen = (event, genreId) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&with_genres=${genreId}`)
        .then(res => {
            const peliculas = res.data.results;
            const baseImgUrl = 'https://image.tmdb.org/t/p/w185';
            if (peliculas.length > 0) {
                document.querySelector('main.peliculas').innerHTML = '';
                peliculas.forEach(pelicula => {
                    const imagen = pelicula.poster_path ? `
                               <img src="${baseImgUrl}${pelicula.poster_path}" alt="">` : '<img src="./img/notyetavailablekyle.jpg"'
                    document.querySelector('main.peliculas').innerHTML += `
                <div class='pelicula'>
                <h3 class="title">${pelicula.title}
                 </h3>
                ${imagen}
                </div>`;
                })
            } else {
                document.querySelector('main.peliculas').innerHTML = '';
            }
        })
        .catch(error => console.error(error))
    }