appiclient = (function (){

    function getFunctionsByCinemaAndDate(cinema, date, callback){

        $.get("http://localhost:8080/cinemas/"+cinema+"/"+date, function(data){
                console.log(data);
                console.log(cinema);
                console.log(date);
                callback(data);
            }, 'json');
    }

    function getFunctionsByCinema(cinema, callback){

        $.get("http://localhost:8080/cinemas/"+cinema, function(data){
                callback(data);
            }, 'json');
    }

    return{
        getFunctionsByCinema: getFunctionsByCinema,
        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate
    };

})();