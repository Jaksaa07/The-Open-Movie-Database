jQuery(document).ready(function ($) {
  $('button').on('click', function () {
    let pretraga = $('#naslov').val();
    let filmSerija = $('select').val();
    let godina = $('#godina').val();
    let url = `http://www.omdbapi.com/?apikey=ccefad79&t=${pretraga}&type=${filmSerija}`

    if (godina != '') {
      url = `http://www.omdbapi.com/?apikey=ccefad79&t=${pretraga}&type=${filmSerija}&y=${godina}`
    }

    $.ajax({
      type: "GET",
      url: url,
      success: (response) => {
        console.log(url);
        $('#podaci').empty();
        if (response.Response == "False") {
          $('#podaci').append(`<p class="text-muted fs-4">${response.Error}</p>`);
        } else {
          let slikaFilma = response.Poster;
          $('#slika').attr('src', slikaFilma);
          $('#podaci').append(`<p>Naslov: ${response.Title}</p>`);
          $('#podaci').append(`<p>Godina: ${response.Year}</p>`);
          $('#podaci').append(`<p>Datum objavljivanja: ${response.Released}</p>`);
          $('#podaci').append(`<p>Trajanje: ${response.Runtime}</p>`);
          $('#podaci').append(`<p>Režiser: ${response.Director}</p>`);
          $('#podaci').append(`<p>Glumci: ${response.Actors}</p>`);
          $('#podaci').append(`<p>Radnja: ${response.Plot}</p>`);
          if (filmSerija == 'series') {
            $('#podaci').append(`<p>Broj sezona: ${response.totalSeasons}</p>`);
          }
          $('#podaci').append(`<p>Ocjene gledalaca: </p>`);
          $('#podaci').append(`<ul id="izvori" style="list-style-type: none"></ul>`);
          response.Ratings.forEach((izvor) => {
            $('#izvori').append(`<li>${izvor.Source}: ${izvor.Value}</li>`);
          })
        }
      }
    })
    
  })
});