//your api key: AIzaSyAGB3TpdaKMgzK898HRkJop332i_ya9BSE
// /*Created by h205p3 on 3/13/17.*/

function getAddress() {
    var rawAddress = document.getElementById("addressInput").value;
    var refinedAddress = rawAddress.replace(/ /g, "+");
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': refinedAddress}, function (results, status) {

        if (status === google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            getSunsetTime(latitude, longitude);
        }
    });
}

function getSunsetTime(latitude, longitude) {
   url = 'http://api.sunrise-sunset.org/json?lat=' + latitude + '&lng=' + longitude + '&date=today&callback=mycallback';

    $.ajax({

        url: url,
        type: 'GET',
    crossDomain: true,
        dataType: 'jsonp',
        success: function(result) {
            display(result);

        },
    error: function() {

            alert('Failed!');

        }
});


}

function display(object) {
    var UCTsunrise = object.results.sunrise;

    var UCTsunset = object.results.sunset;
    console.log(UCTsunrise);
    console.log(UCTsunset);
    refineTime(UCTsunrise);
    refineTime(UCTsunset);
}

function refineTime(string) {
    var timeArray = string.split(':');
    for (var i = timeArray[2].length - 1; i>=0; i--) {

        if (timeArray[2][i] === 'P') {
            timeArray[0]= +timeArray[0] + +12;
        }

    }
    timeArray[0] -= 7;
    if (timeArray[0] < 0) {
        timeArray[0] = 24 + timeArray[0];
        var o = timeArray[2].lastIndexOf("P" || "A");
        if (o === "P") {

        } else if (o = "A") {

        }
        console.log(o);
        timeArray[2]
    }
    console.log(timeArray);
}