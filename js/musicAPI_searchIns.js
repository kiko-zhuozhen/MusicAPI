// Search for instruments by name
function searchInstrument() {
    var instrumentName = document.getElementById('instrumentName').value;
    var searchUrl = `https://musicbrainz.org/ws/2/instrument/?query=${encodeURIComponent(instrumentName)}&fmt=json`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => displaySearchResults(data))
        .catch(error => console.error('Error:', error));
}

// Display search results and handle user selection
function displaySearchResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

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

// Fetch and display details for a specific instrument by MBID
function fetchInstrumentDetails(mbid) {
    var detailsUrl = `https://musicbrainz.org/ws/2/instrument/${mbid}?fmt=json`;

    fetch(detailsUrl)
        .then(response => response.json())
        .then(data => displayInstrumentDetails(data))
        .catch(error => console.error('Error:', error));
}

// Display detailed information about the selected instrument
function displayInstrumentDetails(instrument) {
    var detailsDiv = document.getElementById('instrumentDetails');
    detailsDiv.innerHTML = '';

    var details = document.createElement('p');
    details.innerHTML = `Name: ${instrument.name}<br>Description: ${instrument.description || 'No description available.'}<br>Disambiguation: ${instrument.disambiguation || 'None'}`;
    detailsDiv.appendChild(details);
}
