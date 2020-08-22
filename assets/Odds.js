var oddsURL = 'https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/2020-08-22?key=2f97803631c047848ec7ec6fc3372e04'


$.ajax({
    url: oddsURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++){
        var awayTeam = response[i].AwayTeam;
        var homeTeam = response[i].HomeTeam;
        var pointSpread = response[i].PointSpread;
        var overUnder = response[i].OverUnder;

        var scoreCard = $('<div>');
        scoreCard.addClass('card');
        scoreCard.addClass('bettingCard');
        //visitor line
        var visitor = $('<div>')
        //visitor.addClass('visitor');
        visitor.text(awayTeam + '       O/U: ' + overUnder);
        //hometeam line
        var home = $('<div>')
        //home.addClass('home');
        home.text(homeTeam + '         ' + pointSpread);

        $(scoreCard).append(visitor);
        $(scoreCard).append(home);

        $('#betting').append(scoreCard);
    }
  })