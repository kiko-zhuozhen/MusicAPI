document.getElementById('searchButton').addEventListener('click', function() {
    var mbid = document.getElementById('instrumentName').value;
    if (mbid.trim()) {
        fetchInstrumentDetails(mbid);
    } else {
        alert("Please enter a valid MBID.");
    }
});

function fetchInstrumentDetails(mbid) {
    var detailsUrl = `https://musicbrainz.org/ws/2/instrument/${mbid}?fmt=json`;

    fetch(detailsUrl)
        .then(response => response.json())
        .then(data => displayInstrumentDetails(data))
        .catch(error => console.error('Error:', error));
}

function displayInstrumentDetails(instrument) {
    var detailsDiv = document.getElementById('instrumentDetails');
    detailsDiv.innerHTML = ''; 

    if (instrument) {
        var instrumentInfo = document.createElement('p');
        instrumentInfo.innerHTML = `Name: ${instrument.name}<br>` +
                                   `MBID: ${instrument.id}<br>` +
                                   `Description: ${instrument.description || 'No description available'}<br>` +
                                   `Disambiguation: ${instrument.disambiguation || 'None'}`;
        detailsDiv.appendChild(instrumentInfo);
    } else {
        detailsDiv.innerHTML = 'No instrument found with the provided MBID';
    }
}

