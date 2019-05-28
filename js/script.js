/* global $ */
$("#submit").click(function(){
  weather();
});
//console.log('hi');
function weather(){
  var city=$('input').val();

$.ajax({
  url:"https://boiling-plateau-93045.herokuapp.com/https://www.metaweather.com/api/location/search/?query=" + city,
  method:"Get",
  success:function(response){
    console.log(response);
    console.log(response[0].woeid);
    var cityid=response[0].woeid;
    $.ajax({
  url: "https://boiling-plateau-93045.herokuapp.com/https://www.metaweather.com/api/location/" + cityid + "/",
  method: "GET",
  success: function(response,status) {
    $('#date').append("<h1>" + formatDate(response.consolidated_weather[0].applicable_date)+ "</h1>")
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
    
  }
  
})
}


console.log(".circle");

function convert (x){
  return (x*9)/5+32;
}

function weathericon (x){
  return "https://www.metaweather.com/static/img/weather/png/64/" + x + ".png";
}

function formatDate(date){
  var newDate= new Date(date).toUTCString();
  var dateString= "";
  var month= newDate.getMonth();
  return dateString;
  
  
}