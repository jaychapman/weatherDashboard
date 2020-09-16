// No code above this line - it is before document.ready

// Document Ready

$(document).ready(function(){

  // Begin Code Here

  // Variables

  //Date Variables
  const today = moment();
  var todaysDateDisplay = today.format("dddd, MMMM Do");

  var fiveDayToday = moment().day();
  
// If Else if statement to display day of the week for 5 day forecast
  if(fiveDayToday === 0){
    var dayDisplay = 'Monday';
    var dayDisplay2 = 'Tuesday';
    var dayDisplay3 = 'Wednesday';
    var dayDisplay4 = 'Thursday';
    var dayDisplay5 = 'Friday';
  }else if(fiveDayToday === 1){
    var dayDisplay = 'Tuesday';
    var dayDisplay2 = 'Wednesday';
    var dayDisplay3 = 'Thursday';
    var dayDisplay4 = 'Friday';
    var dayDisplay5 = 'Saturday';
  }else if(fiveDayToday === 2){
    var dayDisplay = 'Wednesday';
    var dayDisplay2 = 'Thursday';
    var dayDisplay3 = 'Friday';
    var dayDisplay4 = 'Saturday';
    var dayDisplay5 = 'Sunday';
  }else if(fiveDayToday === 3){
    var dayDisplay = 'Thursday';
    var dayDisplay2 = 'Friday';
    var dayDisplay3 = 'Saturday';
    var dayDisplay4 = 'Sunday';
    var dayDisplay5 = 'Monday';
  }else if(fiveDayToday === 4){
    var dayDisplay = 'Friday';
    var dayDisplay2 = 'Saturday';
    var dayDisplay3 = 'Sunday';
    var dayDisplay4 = 'Monday';
    var dayDisplay5 = 'Tuesday';
  }else if(fiveDayToday === 5){
    var dayDisplay = 'Saturday';
    var dayDisplay2 = 'Sunday';
    var dayDisplay3 = 'Monday';
    var dayDisplay4 = 'Tuesday';
    var dayDisplay5 = 'Thursday';
  }else if(fiveDayToday === 6){
    var dayDisplay = 'Sunday';
    var dayDisplay2 = 'Monday';
    var dayDisplay3 = 'Tuesday';
    var dayDisplay4 = 'Wednesday';
    var dayDisplay5 = 'Thursday';
  }else{
    var dayDisplay = "";
  }

 

  // Weather Variables
  var fiveDayDisplay = $('#weatherDisplay');
  


  // Hides forecast heading
  $('#forecastHeading').css('visibility', 'hidden');
  $('#fiveDayDisplay').css('visibility', 'hidden');


  // Check local storage for previous searches

  // Check firstCity
  if (localStorage.getItem("city1")===null){
    $("#firstCity").text("");
  }else{
    $("#firstCity").text(localStorage.getItem("city1"));
  }
  
  // Display previous searches
  $('#secondCity').text(localStorage.getItem('city2'));
  $('#thirdCity').text(localStorage.getItem('city3'));
  $('#fourthCity').text(localStorage.getItem('city4'));
  $('#fifthCity').text(localStorage.getItem('city5'));

  // Click event to search city weather
  $('#button-addon2').click(function(){

    

    if (localStorage.getItem("city1")===null){
      var city1 = $('#enterCity').val();
      localStorage.setItem('city1', city1);
    }else{
      var city2 = localStorage.setItem('city2', localStorage.getItem('city1'));
      var city1 = $('#enterCity').val();
      localStorage.setItem('city1', city1);
    }


    location.reload();

  });

  return searchWeather();

  // Weather Search Function

  function searchWeather(){


    // Clears previous data
    $('#todaysDate').empty();
    $("#weatherDisplay").empty();
    $('#noInput').empty();
    $('fiveDayDisplay').empty();
    $('#day1').empty();
    $('#day2').empty();
    $('#day3').empty();
    $('#day4').empty();
    $('#day5').empty();

    //var citySearch = $('#enterCity').val();
    var citySearch = localStorage.getItem("city1");

    if (citySearch !=''){

      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=b3638386ccdc592a46f56c5eaae8840b",
        type: "GET",
        dataType: "json",
        success: function(data){

            $('#todaysDate').css("visibility", "visible");
            $('#weatherDisplay').css("visibility", "visible");

            //var results = resultsDisplay(data)
            console.log(data);

            // Date Display
            $('#todaysDate').append('<h4>'+ todaysDateDisplay +'</h4>');


            // City Name
            fiveDayDisplay.append('<div><h3>' + data.city.name + '</h3></div>');

            //temp
            //console.log(data.list[0].main.temp);
            fiveDayDisplay.append('<p>Temperature: ' + data.list[0].main.temp + ' &#176 F</p>');
            //cityTemp = 'Temperature: '

            // humidity
            //console.log(data.list[0].main.humidity);
            fiveDayDisplay.append('<p>Humidity: ' + data.list[0].main.humidity + ' %</p>');

            // wind speed
            //console.log(data.list[0].wind.speed);
            fiveDayDisplay.append('<p>Wind Speed: ' + data.list[0].wind.speed + ' MPH</p>');

            // uv index
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;



              // ajax call to get uv value
              $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=b3638386ccdc592a46f56c5eaae8840b&lat=" + lat + "&lon=" + lon,
                type: "GET",
                dataType: 'json',
                success: function(data){

                  //console.log(data[0].value);
                  fiveDayDisplay.append('<p>UV Index: <span id="uvId">' + data[0].value + '</span></p>');

                    if(data[0].value > 7){
                      $('#uvId').css("background-color", "red");
                      $('#uvId').css("color", "white");
                      $('#uvId').css("padding", "0.3rem");

                    }else if(data[0].value < 3){
                      $('#uvId').css("background-color", "green");
                      $('#uvId').css("color", "white");
                      $('#uvId').css("padding", "0.3rem");
                    }else{
                      $('#uvId').css("background-color", "yellow");
                      $('#uvId').css("padding", "0.3rem");
                    }

                }

              });
            

              // 5 day forecast
              $('#forecastHeading').css("visibility", "visible");
              $('#fiveDayDisplay').css('visibility', 'visible');

              // Day 1
              $('#day1').append('<h5>'+ dayDisplay +'</h5>');
              // Add if statement
              $('#day1').append('<p id="fas"><i class="fas fa-sun"></i></p>')
              $('#day1').append('<p>Temp: '+ data.list[4].main.temp +' &#176 F</P>');
              $('#day1').append('<p>Humidity: '+ data.list[4].main.humidity +' %</P>');

              // Day 2
              $('#day2').append('<h5>'+ dayDisplay2 +'</h5>');
              // Add if statement
              $('#day2').append('<p id="fas"><i class="fas fa-cloud-showers-heavy"></i></p>')
              $('#day2').append('<p>Temp: '+ data.list[12].main.temp +' &#176 F</P>');
              $('#day2').append('<p>Humidity: '+ data.list[12].main.humidity +' %</P>');


              // Day 3
              $('#day3').append('<h5>'+ dayDisplay3 +'</h5>');
              // Add if statement
              $('#day3').append('<p id="fas"><i class="fas fa-sun"></i></p>')
              $('#day3').append('<p>Temp: '+ data.list[20].main.temp +' &#176 F</P>');
              $('#day3').append('<p>Humidity: '+ data.list[20].main.humidity +' %</P>');

              // Day 4
              $('#day4').append('<h5>'+ dayDisplay4 +'</h5>');
              // Add if statement
              $('#day4').append('<p id="fas"><i class="fas fa-sun"></i></p>')
              $('#day4').append('<p>Temp: '+ data.list[28].main.temp +' &#176 F</P>');
              $('#day4').append('<p>Humidity: '+ data.list[28].main.humidity +' %</P>');

              // Day 5
              $('#day5').append('<h5>'+ dayDisplay5 +'</h5>');
              // Add if statement
              $('#day5').append('<p id="fas"><i class="fas fa-sun"></i></p>')
              $('#day5').append('<p>Temp: '+ data.list[36].main.temp +' &#176 F</P>');
              $('#day5').append('<p>Humidity: '+ data.list[36].main.humidity +' %</P>');

        }
      });

    }else{
      //var citySearch = localStorage.getItem("city1");
      //function searchWeather();
      $('#weatherDisplay').css("visibility", "hidden");
      $('#forecastHeading').css("visibility", "hidden");
      $('#fiveDayDisplay').css('visibility', 'hidden');
      $('#noInput').append("<h3>Please enter a city</h3>");

    }

  }

    
  
  // End Code Here
  
  });
  
  // No code below this line - this is outside of the document.ready
  
  