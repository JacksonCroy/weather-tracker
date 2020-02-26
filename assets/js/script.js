$(document).ready(function() {
    appendData();

    $("#search-btn").click(function() {
        event.preventDefault();
        $(".weathercard").show();
        return getWeather(), getForcast(), saveData(), appendData();




    });


});

function saveData() {
    let savedCity = $("#search-value").val();
    localStorage.setItem("City", savedCity);

};

function appendData() {


    let showData = localStorage.getItem("City");
    $("#past-cities").prepend("<li>" + showData + "</li>")
    console.log(showData)



};

function getWeather() {
    var cityValue = $("#search-value").val();

    if (cityValue != '') {

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityValue + "&units=imperial" + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                var widget = showResults(data)
                var lat = data.coord.lat
                var lon = data.coord.lon
                console.log("lat: ", lat);
                console.log("lon: ", lon);
                getUv(lat, lon);
                $("#searched-weather").html(widget);

                $("#city").val('');
                console.log(data)






            }

        });

    }

};

function getUv(lat, lon) {
    console.log("get uv running");

    $.ajax({

        url: "https://api.openweathermap.org/data/2.5/uvi?&appid=c10bb3bd22f90d636baa008b1529ee25&lat=" + lat + "&lon=" + lon,
        type: "GET",
        dataType: "json",
        success: function(response) {

            console.log(response)
            console.log(response.value)

            var uV = response.value
            $("#searched-weather").append("<h3>" + "Uv Index: " + uV + "</h3>")


        }

    });
};




function showResults(data) {
    return '<h2>Current Weather for ' + data.name + ', ' + data.sys.country + '</h2>' +
        "<h3><strong>Weather</strong>: " + data.weather[0].main + "</h3>" +
        "<h3><strong>Description</strong>: " + data.weather[0].description + "</h3>" +
        "<h3><strong>Temperature</strong>: " + data.main.temp + " &deg;F</h3>" +
        "<h3><strong>Humidity</strong>: " + data.main.humidity + "%</h3>" +
        "<h3><strong>Max Temperature</strong>: " + data.main.temp_max + "&deg;F</h3>" +
        "<h3><strong>Wind Speed</strong>: " + data.wind.speed + "f/s</h3>";

};

function getForcast() {
    var cityValue = $("#search-value").val();

    if (cityValue != '') {

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityValue + "&units=imperial" + "&APPID=5250e1de6cda8e920104268edb88d12e",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                console.log(data)

                $("#mon").empty();
                $("#tues").empty();
                $("#wed").empty();
                $("#thur").empty();
                $("#fri").empty();
                $("#mon").append(

                    $("<p>").text("Temp: " + data.list[0].main.temp + "F"),
                    $("<p>").text("Description: " + data.list[0].weather[0].description),
                    $("<p>").text("Humidity: " + data.list[0].main.humidity + "%"),
                );
                $("#tues").append(

                    $("<p>").text("Temp: " + data.list[1].main.temp + "F"),
                    $("<p>").text("Description: " + data.list[1].weather[0].description),
                    $("<p>").text("Humidity: " + data.list[1].main.humidity + "%"),
                );
                $("#wed").append(

                    $("<p>").text("Temp: " + data.list[9].main.temp + "F"),
                    $("<p>").text("Description: " + data.list[9].weather[0].description),
                    $("<p>").text("Humidity: " + data.list[9].main.humidity + "%"),
                );
                $("#thur").append(

                    $("<p>").text("Temp: " + data.list[17].main.temp + "F"),
                    $("<p>").text("Description: " + data.list[17].weather[0].description),
                    $("<p>").text("Humidity: " + data.list[17].main.humidity + "%"),
                );
                $("#fri").append(

                    $("<p>").text("Temp: " + data.list[26].main.temp + "F"),
                    $("<p>").text("Description: " + data.list[26].weather[0].description),
                    $("<p>").text("Humidity: " + data.list[26].main.humidity + "%"),
                );
                $(".forcast").show();
            }

        });

    }

}