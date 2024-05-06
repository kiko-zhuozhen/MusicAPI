function searchMBID() {
    var artistName = document.getElementById('artistName').value;
    var searchUrl = 'https://musicbrainz.org/ws/2/artist/?query=' + encodeURIComponent(artistName) + '&fmt=json';

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error:', error));
}

function displayResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.artists && data.artists.length > 0) {
        data.artists.forEach(artist => {
            var artistInfo = document.createElement('p');
            artistInfo.innerHTML = `Artist: ${artist.name} <br> MBID: ${artist.id}`;
            resultsDiv.appendChild(artistInfo);
        });
    } else {
        resultsDiv.innerHTML = 'No results found';
    }
}

