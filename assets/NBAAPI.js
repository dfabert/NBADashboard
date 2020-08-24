//Date Calculator that may be needed for other APIs

// var todayFull = new Date();
// var day = todayFull.getDate();
//         if(month < 9){
//             month = '0' + month;}
// var month = todayFull.getMonth()+1;
//         if(month < 9){ 
//             month = '0' + month;}
// var year = todayFull.getFullYear();

// var todayShort = year + '-' + month + '-' + day;

// console.log(todayShort);


//scoresURL is for the last 15 games
var scoresURL = "https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4387"

$.ajax({
     url: scoresURL,
     method: "GET"
   }).then(function(response) {
    for (var i = 0; i < response.events.length; i++){
    //Pull Visiting Team Information
        var vTeam = response.events[i].strAwayTeam;
        var vScore = response.events[i].intAwayScore;
    //Pull Home Team Information
        var hTeam = response.events[i].strHomeTeam;
        var hScore = response.events[i].intHomeScore;

    //Status or quater of the game
    //    var status = response.data[i].status;

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

        $('#scores').append(scoreCard);   //Using Scores for the last 15 games
     }    

  });


  //Games is for the next 15 events
  var gamesURL = "https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4387"
                    
  
  $.ajax({
       url: gamesURL,
       method: "GET"
     }).then(function(response) {

        console.log(response);

      for (var i = 0; i < response.events.length; i++){
      //Pull Visiting Team Information
          var vTeam = response.events[i].strAwayTeam;
      //Pull Home Team Information
          var hTeam = response.events[i].strHomeTeam;
      //Time of the game (Local is Eastern Time)
          var tipTime = response.events[i].strTimeLocal;

          console.log(tipTime);

          tipTime = tipTime.split(':');
          tipTime.pop();
            if(tipTime[0] > 12){
                tipTime[0] = tipTime[0]-12;
                tipTime[2] = 'PM';
            }else{
                tipTime[2] = 'AM';
            }

            tipTime = tipTime[0] + ':' + tipTime[1] + '  ' + tipTime[2];


          console.log(tipTime);
          



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
  
    });


    //Getting the teams' links for header and dropdown
     var teamsURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4387"

     
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

            $('#teamLinks').append(link);      
            
            var dropTeam = $('<div>')
            dropTeam.append(team);
            dropTeam.attr('onclick', 'teamTakeover(' + teamID + ')');
            $('#dropdown').append(dropTeam);
        }
     })


    var standingsURL = "https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=4387&s=2019-2020";
  
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

        var teamURL = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=' + teamID;

        $.ajax({
            url: teamURL,
            method: 'GET'
        }).then(function(response) {
            takeOverTeam = (response.teams[0].strTeam);
            takeOverImage = (response.teams[0].strTeamFanart1);
            takeOverBG = $('<img>')
            takeOverBG.attr('src', takeOverImage);
            $('.background').attr('style', "background-image: url('"+ takeOverImage + "');");
            $('header').attr('class', 'headerTakeOver');
            $('h5').attr('class', 'card');

            localStorage.setItem('favTeam', teamID);
        })
    }

    $(document).ready(function(){
        var teamID = localStorage.getItem('favTeam');

        if(teamID != null)
            {
               teamTakeover(teamID); 
            }
    })
