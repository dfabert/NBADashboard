//Date Calculator that may be needed for other APIs

var todayFull = new Date();
var day = todayFull.getDate();
        if(day <= 9){
            day = '0' + day;}
var month = todayFull.getMonth()+1;
        if(month <= 9){ 
            month = '0' + month;}
var year = todayFull.getFullYear();

var todayShort = year + '-' + month + '-' + day;

var yesterdayFull = new Date();
yesterdayFull.setDate(yesterdayFull.getDate() - 1);
var day = yesterdayFull.getDate();
        if(day <= 9){
            day = '0' + day;}
var month = yesterdayFull.getMonth()+1;
        if(month <= 9){ 
            month = '0' + month;}
var year = yesterdayFull.getFullYear();

var yesterdayShort = year + '-' + month + '-' + day;

//scoresURL is for the last 15 games, but we'll narrow it down to the last day's games.
var scoresURL = "https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4387";

$.ajax({
     url: scoresURL,
     method: "GET"
   }).then(function(response) {

    for (var i = 0; i < response.events.length; i++){
        var gameDate = response.events[i].dateEvent;

    //Pull Visiting Team Information
        var vTeam = response.events[i].strAwayTeam;
        var vScore = response.events[i].intAwayScore;
    //Pull Home Team Information
        var hTeam = response.events[i].strHomeTeam;
        var hScore = response.events[i].intHomeScore;

    //create card for the score
        var scoreCard = $('<div>');
        scoreCard.addClass('card');

        //visitor line
        var visitor = $('<div>');
        visitor.addClass('scoreLine');
        var visitorTeam = $('<div>');
        visitorTeam.text(vTeam);
        visitorTeam.addClass('team');
        var visitorScore = $('<div>');
        visitorScore.text(vScore);
        visitorScore.addClass('score');
        $(visitor).append(visitorTeam);
        $(visitor).append(visitorScore);
        
        //hometeam line
        var home = $('<div>');
        home.addClass('scoreLine');
        var homeTeam = $('<div>');
        homeTeam.text(hTeam);
        homeTeam.addClass('team');
        var homeScore = $('<div>');
        homeScore.text(hScore);
        homeScore.addClass('score');
        $(home).append(homeTeam); 
        $(home).append(homeScore);

        $(scoreCard).append(visitor);
        $(scoreCard).append(home);

        if(gameDate === yesterdayShort){
            $('#scores').append(scoreCard);
        }
        else if(gameDate === todayShort){
            $('#games').append(scoreCard);
        }
     }    

  });


//Games is for today's games
  var gamesURL = "https://www.thesportsdb.com/api/v1/json/40130162/eventsnextleague.php?id=4387"
                    
  $.ajax({
       url: gamesURL,
       method: "GET"
     }).then(function(response) {
        if(response == null){
            console.log('No More Games Tonight');

            //create card for the text
            var scoreCard = $('<div>');
            scoreCard.addClass('card');
            scoreCard.text('No More Games Tonight');
            $('#games').append(scoreCard);

        } else {
                for (var i = 0; i < response.events.length; i++){
                    var gameDate = response.events[i].dateEvent;
                    if(gameDate === todayShort){
                            //Pull Visiting Team Information
                                var vTeam = response.events[i].strAwayTeam;
                            //Pull Home Team Information
                                var hTeam = response.events[i].strHomeTeam;
                            //Time of the game (Local is Eastern Time)
                                var tipTime = response.events[i].strTime;

                                tipTime = tipTime.split(':');
                                tipTime.pop();
                                    if(tipTime[0] > 12){
                                        tipTime[0] = tipTime[0]-12;
                                        tipTime[2] = 'PM';
                                    }else{
                                        tipTime[2] = 'AM';
                                    }
                                    tipTime = tipTime[0] + ':' + tipTime[1] + '  ' + tipTime[2];
                                
                            //create card for the score
                                var scoreCard = $('<div>');
                                scoreCard.addClass('card');
                        
                            //create card for the score
                                var visitor = $('<div>');
                                visitor.addClass('scoreLine');
                                var visitorTeam = $('<div>');
                                visitorTeam.text(vTeam);
                                visitorTeam.addClass('team');
                                $(visitor).append(visitorTeam);


                            //hometeam line
                                var home = $('<div>');
                                home.addClass('scoreLine');
                                var homeTeam = $('<div>');
                                homeTeam.text(hTeam);
                                homeTeam.addClass('team');
                                var time = $('<div>');
                                time.text(tipTime);
                                time.addClass('time');
                                $(home).append(homeTeam);
                                $(home).append(time);
                        
                                $(scoreCard).append(visitor);
                                $(scoreCard).append(home);
                                $('#games').append(scoreCard);   //Using Scores for the last 15 games
                   } 
            }
        }    
  
    });


//Getting the teams' links for header and dropdown
     var teamsURL = "https://www.thesportsdb.com/api/v1/json/40130162/lookup_all_teams.php?id=4387"

        $.ajax({
            url: teamsURL,
            method: "GET"
            }).then(function(response) {
        for (var i = 0; i < response.teams.length; i++){
            var team = response.teams[i].strTeam;
            var teamID = response.teams[i].idTeam;
            var teamLogo = response.teams[i].strTeamBadge;
            var teamIcon = $('<img>');
            var teamLink = response.teams[i].strWebsite;
            var teamLink = 'https://' + teamLink;
            var link = $('<a>');

            teamIcon.addClass('icon');
            teamIcon.attr('src', teamLogo);

            link.attr('href', teamLink);
            link.attr('target', '_blank');

            $(link).append(teamIcon);

            $('#teamLinks, #teamLinksFooter').append(link);  
            
            var dropTeam = $('<div>')
            dropTeam.append(team);
            dropTeam.attr('onclick', 'teamTakeover(' + teamID + ')');
            $('#dropdown').append(dropTeam);
        }
     })


    var standingsURL = "https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=4387&s=2020-2021";
     
    $.ajax({
         url: standingsURL,
         method: "GET"
       }).then(function(response) {
          for (var i = 0; i < response.table.length; i++){
              var team = response.table[i].name;
              var wins = response.table[i].win;
              var loss = response.table[i].loss;

              var recordArray = [team, wins, loss];
              var recordCard = $('<tr>');

              for (var j = 0; j < recordArray.length; j++){
                var newCell = $('<td>');
                $(newCell).append(recordArray[j]);
                $(recordCard).append(newCell);
              }
              $('#records').append(recordCard);
            }
        })

//function to listen for click on drop down
        function dropDown() {
            document.getElementById("dropdown").classList.toggle("show");
        }

        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                    }
                }
            }
        } 



//When user selects favorite team from dropdown menu

    function teamTakeover(teamID) {

        $('#favTeamSubHeader').empty();
        var teamURL = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=' + teamID;
        localStorage.setItem('favTeam', teamID);


        $.ajax({
            url: teamURL,
            method: 'GET'
        }).then(function(response) {
            var takeOverTeam = response.teams[0].strTeam;
            var takeOverImage = response.teams[0].strTeamFanart1;
            var takeOverBadge = response.teams[0].strTeamBadge;
            var takeOverJersey = response.teams[0].strTeamJersey;
            var takeOverLogo = response.teams[0].strTeamLogo;

            //Image for Background
            takeOverBG = $('<img>');
            takeOverBG.attr('src', takeOverImage);
            $('.background').attr('style', "background-image: url('"+ takeOverImage + "');");

            //Class changes for background
            $('header').attr('class', 'headerTakeOver');
            $('h5').attr('class', 'card');

            takeOverSubHeader = $('<div>');
            takeOverSubHeader.addClass('favCard');
            
            takeOverBadgeImage = $('<img>');
            takeOverBadgeImage.attr('src', takeOverBadge);
            takeOverBadgeImage.addClass('subheaderimages');
            takeOverBadgeImage.attr('id', 'badge')

            takeOverJerseyImage = $('<img>');
            takeOverJerseyImage.attr('src', takeOverJersey);
            takeOverJerseyImage.addClass('subheaderimages');
            takeOverJerseyImage.attr('id', 'jersey');

            takeOverSubHeader.append(takeOverBadgeImage, takeOverJerseyImage);

            $('#favTeamSubHeader').append(takeOverSubHeader);
        })

        var lastFiveGamesURL = 'https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=' + teamID;

        $.ajax({
            url: lastFiveGamesURL,
            method: 'GET'
        }).then(function(response) {
                    var dayPlayed = response.results[0].dateEventLocal;
                    var video = response.results[0].strVideo;
                //Pull Visiting Team Information
                    var vTeam = response.results[0].strAwayTeam;
                    var vScore = response.results[0].intAwayScore;
                //Pull Home Team Information
                    var hTeam = response.results[0].strHomeTeam;
                    var hScore = response.results[0].intHomeScore;

                    if(vScore == 'null'){
                        console.log('going to penultimate game');
                        var dayPlayed = response.results[1].dateEventLocal;
                        var video = response.results[1].strVideo;
                    //Pull Visiting Team Information
                        var vTeam = response.results[1].strAwayTeam;
                        var vScore = response.results[1].intAwayScore;
                    //Pull Home Team Information
                        var hTeam = response.results[1].strHomeTeam;
                        var hScore = response.results[1].intHomeScore;
                    }

                    if(dayPlayed === todayShort){
                        dayPlayed = 'Played Today';
                    }
                    else if(dayPlayed === yesterdayShort){
                        dayPlayed = 'Played Yesterday';
                    }
                    else{
                        dayPlayed = 'Played: ' + dayPlayed;
                    }

                //create card for the score
                    var scoreCard = $('<div>');

                //visitor line
                    var visitor = $('<div>');
                    visitor.addClass('scoreLine');
                    var visitorTeam = $('<div>');
                    visitorTeam.text(vTeam);
                    visitorTeam.addClass('team');
                    var visitorScore = $('<div>');
                    visitorScore.text(vScore);
                    visitorScore.addClass('score');
                    $(visitor).append(visitorTeam);
                    $(visitor).append(visitorScore);
                    
                //hometeam line
                    var home = $('<div>');
                    home.addClass('scoreLine');
                    var homeTeam = $('<div>');
                    homeTeam.text(hTeam);
                    homeTeam.addClass('team');
                    var homeScore = $('<div>');
                    homeScore.text(hScore);
                    homeScore.addClass('score');
                    $(home).append(homeTeam); 
                    $(home).append(homeScore);

                //Date Played
                    var played = $('<div>');
                    played.text(dayPlayed);

                //Highlight Link
                    var link = $('<a>');
                    link.text('Game Highlights');
                    link.attr('href', video);
                    link.attr('target', '_blank');

                //Append to scorecard at top
                    $(scoreCard).append(played,visitor, home, link);
                    $('#badge').after(scoreCard);

        })      


    }

//Recalling favorite team from local storage
    $(document).ready(function(){
        var teamID = localStorage.getItem('favTeam');

        if(teamID != null)
            {
               teamTakeover(teamID); 
            }else{
                teamTakeover(134880);  //Defaults to Atlanta Hawks
            }
    })
