function fetchArtistDetails() {
    var input = document.getElementById('artistInput').value;
    var baseURL = 'https://musicbrainz.org/ws/2/artist/';
    var query = input.includes('-') ? '/' + input : '?query=' + encodeURIComponent(input);
    var format = '&fmt=json';

    var url = baseURL + query + format;

    fetch(url)
        .then(response => response.json())
        .then(data => displayArtistDetails(data))
        .catch(error => console.error('Error:', error));
}

function displayArtistDetails(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.artists && data.artists.length > 0) {
        data.artists.forEach(artist => {
            var info = document.createElement('p');
            info.innerHTML = 'Name: ' + artist.name + '<br>' +
                             'Country: ' + (artist.country || 'N/A') + '<br>' +
                             'Disambiguation: ' + (artist.disambiguation || 'None');
            resultsDiv.appendChild(info);
        });
    } else if (data.name) {
        var info = document.createElement('p');
        info.innerHTML = 'Name: ' + data.name + '<br>' +
                         'Country: ' + (data.country || 'N/A') + '<br>' +
                         'Disambiguation: ' + (data.disambiguation || 'None');
        resultsDiv.appendChild(info);
    } else {
        resultsDiv.textContent = 'No artist found with the provided information';
    }
}
