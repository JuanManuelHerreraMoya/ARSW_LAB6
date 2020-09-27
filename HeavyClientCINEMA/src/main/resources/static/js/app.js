var app = (function () {

  var cinemaName;
  var functionDate;
  var functionCinema;
  var originalFunction;

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
    apimock.getFunctionsByCinemaAndDate(cinemaName, functionDate, _prettyPrint);
  }

  function _prettyPrint(list){
    var table = $("#table1");
    var body = $("tbody");
    originalFunction = list;
    functionCinema = list.map(_setDateToHour);
    $("#CinemaS").text("Cinema Selected: "+ cinemaName);
    $("#Movie").text("Movies:");
    body.remove();
    table.append("<tbody>");
    var newBody = $("tbody");
    newBody.append(functionCinema.map(_print));
    table.append(newBody);
    table.append("</tbody>");
  }

  function _print(res){
    var temp = '<tr><td>' + res.name + '</td><td>' + res.genre + '</td><td>' + res.hour + '</td><td>' + "Disponible" + '</td></tr>';
    return temp;
  }

  return {

        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate

  };

})();