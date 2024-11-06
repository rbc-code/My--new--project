document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fromStation = document.getElementById('fromStation').value;
    const toStation = document.getElementById('toStation').value;
    const travelDate = document.getElementById('travelDate').value;
    const numTickets = document.getElementById('numTickets').value;
    // const trainNo = document.getElementById('trainNo').value;

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const availableTrains = data.trains.filter(train => 
                train.from.toLowerCase() === fromStation.toLowerCase() &&
                train.to.toLowerCase() === toStation.toLowerCase()
            );

            displayTrains(availableTrains, numTickets);
        })
        .catch(error => {
            console.error('Error fetching train data:', error);
        });
});

function displayTrains(trains, numTickets) {
    const trainResultsDiv = document.getElementById('trainResults');
    trainResultsDiv.innerHTML = '';

    if (trains.length === 0) {
        trainResultsDiv.innerHTML = '<p>No trains available.</p>';
    } else {
        const resultsList = document.createElement('ul');
        trains.forEach(train => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${train.name}</strong><br>
                Train No. ${train.trainNo}<br>
                Departure: ${train.departure}<br>
                Arrival: ${train.arrival}<br>
                Price per Ticket: ₹${train.price}<br>
                Total Price for ${numTickets} tickets: ₹${train.price * numTickets}<br>
                <button onclick="document.location.href='ticket.html'">Book Now</button>
            `;
            resultsList.appendChild(listItem);
        });
        trainResultsDiv.appendChild(resultsList);
    }
}

