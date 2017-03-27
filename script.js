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
    var t = timeArray[2];
    var i = t.substring(t.length-2, t.length);
    timeArray.splice(2, 1, i);
    timeArray[0] = +timeArray[0];
    timeArray[1] = +timeArray[1];
    if (t === "PM") {
         timeArray[0] += 12;
        timeArray[2] = "AM"
        console.log(timeArray);
    }
    //timeArray[0]
    console.log(timeArray);
}