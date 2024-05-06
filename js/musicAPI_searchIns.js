function searchInstrument() {
    var instrumentName = document.getElementById('instrumentName').value;
    var searchUrl = `https://musicbrainz.org/ws/2/instrument/?query=${encodeURIComponent(instrumentName)}&fmt=json`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => displaySearchResults(data))
        .catch(error => console.error('Error:', error));
}

function displaySearchResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    if (data.instruments && data.instruments.length > 0) {
        data.instruments.forEach(instrument => {
            var instrumentInfo = document.createElement('p');
            instrumentInfo.innerHTML = `Instrument: ${instrument.name} <br> MBID: ${instrument.id}`;
            instrumentInfo.style.cursor = 'pointer';
            instrumentInfo.onclick = function() { fetchInstrumentDetails(instrument.id); };
            resultsDiv.appendChild(instrumentInfo);
        });
    } else {
        resultsDiv.innerHTML = 'No instruments found';
    }
}

