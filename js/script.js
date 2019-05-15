/* global $ */

//console.log('hi');

$.ajax({
  url: "https://boiling-plateau-93045.herokuapp.com/https://www.metaweather.com/api/location/2459115/",
  method: "GET",
  success: function(response,status) {
    $('#date').append("<h1>" + response.consolidated_weather[0].applicable_date + "</h1>")
    $('#temp').append("<h1 id='round'> Current Temp: " + convert(Math.round(response.consolidated_weather[0].the_temp)) + "&#8457</h1>");
    $('#tempmin').append("<h1> Minimum Temp: " + convert(Math.round(response.consolidated_weather[0].min_temp)) + "&#8457</h1>");
    $('#tempmax').append("<h1> Maximum Temp: " + convert(Math.round(response.consolidated_weather[0].max_temp)) + "&#8457</h1>");
    $('#weathertype').append("<img src=" + weathericon(response.consolidated_weather[0].weather_state_abbr) + ">");
    console.log(status);
    
    if(70 > convert(Math.round(response.consolidated_weather[0].the_temp)) && convert(Math.round(response.consolidated_weather[0].the_temp)) > 50) {
      return $(".circleText").css("background" , "rgba(236, 175, 83, 0.5)");
    }
    else if(convert(Math.round(response.consolidated_weather[0].the_temp)) >= 70) {
      return $(".circleText").css("background" , "rgba(243, 24, 24, 0.5)");
    }
    else if(50 >= convert(Math.round(response.consolidated_weather[0].the_temp)) && convert(Math.round(response.consolidated_weather[0].the_temp)) > 30 ) {
      return $(".circleText").css("background" , "rgba(63, 245, 226, 0.5)");
    }
    else if(30 >= convert(Math.round(response.consolidated_weather[0].the_temp))) {
      return $(".circleText").css("background" , "rgba(29, 122, 245, 0.5)");
    }
  },
});

console.log(".circle");

function convert (x){
  return (x*9)/5+32;
}

function weathericon (x){
  return "https://www.metaweather.com/static/img/weather/png/64/" + x + ".png";
}