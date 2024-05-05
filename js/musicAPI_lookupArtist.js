document.addEventListener('DOMContentLoaded', function() {
    searchMBID();
});

function searchMBID() {
    var mbid = '650e7db6-b795-4eb5-a702-5ea2fc46c848'; 
    var lookupUrl = 'https://musicbrainz.org/ws/2/artist/' + mbid + '?fmt=json';

    fetch(lookupUrl)
        .then(response => response.json())
        .then(data => displayArtist(data))
        .catch(error => console.error('Error:', error));
}

function displayArtist(artist) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    if (artist) {
        var artistInfo = document.createElement('p');
        artistInfo.innerHTML = `Artist: ${artist.name} <br> MBID: ${artist.id} <br> Country: ${artist.country || 'N/A'} <br> Disambiguation: ${artist.disambiguation || 'None'}`;
        resultsDiv.appendChild(artistInfo);
    } else {
        resultsDiv.innerHTML = 'No artist found with the provided MBID';
    }
}
