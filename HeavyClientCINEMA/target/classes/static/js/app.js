var app = (function () {

  var cinemaName;
  var functionDate;
  var functionCinema;
  var originalFunctions;
  var seats;
  var modulo = appiclient;

  function _setCinemaName(cinema){
       cinemaName = cinema;
  }

  function _setFunctionDate (date){
    functionDate = date;
  }

  function _setDateToHour(cinema){
    return {name: cinema.movie.name, genre: cinema.movie.genre, hour: cinema.date.substring(11, 16)};
  }

  function getFunctionsByCinemaAndDate(){
    _setCinemaName($("#nameC").val());
    _setFunctionDate($("#dateC").val());
    //apimock.getFunctionsByCinemaAndDate(cinemaName, functionDate, _prettyPrint);
    modulo.getFunctionsByCinemaAndDate(cinemaName, functionDate, _prettyPrint);
  }

  function _prettyPrint(list){
    var table = $("#table1");
    var body = $("tbody");
    originalFunctions = list;
    functionCinema = list.map(_setDateToHour);
    $("#CinemaS").text("Cinema Selected: "+ cinemaName);
    $("#Movie").text("Movies:");
    body.remove();
    table.append("<tbody>");
    var newBody = $("tbody");
    newBody.append(functionCinema.map(_print));
    table.append(newBody);
    table.append("</tbody>");
    $("#Ava").text("Availability of: ");
    _resetCanvas();
  }

  function _print(res){
    var dateTime =  "".concat(functionDate, " ", res.hour);
    var boton = "<button type='button' onclick='app.getSeatsByFunction(\"" + res.name + '" , "' + dateTime + "\")' > Open Seats</button>"
    var temp = '<tr><td>' + res.name + '</td><td>' + res.genre + '</td><td>' + res.hour + '</td><td>' + boton + '</td></tr>';
    return temp;
  }


  function getSeatsByFunction(name, dateTime){
    originalFunctions.forEach(function(cinema) {
        if(cinema.movie.name===name  && cinema.date===dateTime){
            seats = cinema.seats;
        }
    });
    _drawSeats(name);
  }

  function _drawSeats(name){
    $("#Ava").text("Availability of: "+name);
    _resetCanvas();
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Screen", 140, 30);
    ctx.translate(20,50);

    for (var i = 0; i < seats.length; i++) {
        for (var j = 0; j < seats[0].length; j++) {
            if( !seats[i][j] ){
                ctx.fillStyle = "#ba0b0b";
            }else{
                ctx.fillStyle = "#61659b";
            }
            ctx.fillRect(j*30, i*30, 20, 20);
        }
    }
  }

  function _resetCanvas(){
    var c = document.getElementById("myCanvas");
    c.width = c.width;
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0,  c.width, c.height);
  }

  return {

        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate,
        getSeatsByFunction: getSeatsByFunction

  };

})();