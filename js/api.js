// function apiCall(url){
//     var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//     fetch(proxyUrl + url).then(function(response){
//         if(!response.ok){
//             throw Error(response.statusText);
//         }
//         return response.json();
//     }).then(function(responseAsJson){
//         console.log(responseAsJson);
//         return responseAsJson;
//     }).catch(function(error){
//         console.log('Got error', error);
//     })
// }

console.log('API JS'); 

function getAllTeams(){
    showLoader();
    console.log('calling teams');
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://ipl-t20.herokuapp.com/teams';
    fetch(proxyUrl + url).then(function(response){
        if(!response.ok){
            throw Error(response.statusText);
        }
        return response.json();
    }).then(function(responseAsJson){
        //console.log(responseAsJson);
        var container = document.getElementById('container');
        //container.textContent = 'Hellow there';
        var grid = document.createElement('div');
        grid.setAttribute('class', 'grid');
        for(let team of responseAsJson){
            //console.log(team);
            localStorage.setItem(team.id+'year', team.winningYears);
            localStorage.setItem(team.id+'venue', team.venue);
            var ui = createTeamUi(team.id, team.teamName, team.winningYears, team.venue);
            grid.appendChild(ui);
        }
        container.appendChild(grid);
        stopLoader();
        
    }).catch(function(error){
        console.log('Got error', error);
        showErrorPage(error);
    })  
}

function getTeamData(team_name){
   showLoader();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://ipl-t20.herokuapp.com/teams/'+team_name;
    fetch(proxyUrl + url).then(function(response){
        if(!response.ok){
            throw Error(response.statusText);
        }
        return response.json();
    }).then(function(responseAsJson){
        console.log(responseAsJson);
        var title = document.getElementById('title');

        document.getElementById('team_logo').setAttribute('src', './assets/logos/'+getLogo(team_name));
        
        var captain = getCaptain(responseAsJson.team.captainId, responseAsJson.players);
        document.getElementById('team_cap').textContent = captain.name;
        var banner = document.getElementById('team_layer').classList.add(getCardClass(team_name));

        console.log('Team name=>', team_name);

        var winning_years = localStorage.getItem(team_name+'year');
        if(winning_years){
            document.getElementById('winning_years').textContent = winning_years;
        }else{
            document.getElementById('winning_years').style.display = 'none';
        }

        var venue_place = localStorage.getItem(team_name+'venue');
        document.getElementById('team_venue').textContent = venue_place;

        var container = document.getElementById('profiles_container');
        title.textContent = team_name;
        var grid = document.createElement('div');
        grid.setAttribute('class', 'grid');
        for(let player of responseAsJson.players){
            const ui = getProfileUI(team_name, player, responseAsJson.team);
            grid.appendChild(ui);
        }
        container.appendChild(grid);
        stopLoader();
    }).catch(function(error){
        console.log('Got error', error);
        //var container = document.getElementById('team_banner');
        //container.style.display = 'none';
        showErrorPage(error);
    })
}


function createTeamUi(id, name, _trophies, venue){
    var col = document.createElement('div');
    col.setAttribute('class', 'col');

    var card = document.createElement('div');
    card.setAttribute('class', 'card '+getCardClass(name));

    var card_view = document.createElement('div');
    card_view.setAttribute('class', 'card_view');

    var team_data = document.createElement('div');
    team_data.setAttribute('class', 'team-data');

    var img = document.createElement('img');
    img.setAttribute('src', './assets/logos/'+getLogo(name));

    var team_name = document.createElement('div');
    team_name.setAttribute('class', 'team_name');

    var h5 = document.createElement('h5');
    h5.textContent = name;

    var p = document.createElement('p');
    p.textContent = venue;

    var trophies = document.createElement('span');

    if(_trophies.length > 0){
        trophies.setAttribute('class', 'trophies');
        let trophy_years = '';
        _trophies.forEach(year => {
           trophy_years+=year+', '; 
        });
        var trophi_logo = document.createElement('i');
        var years = document.createElement('b');
        trophy_years = trophy_years.slice(0, trophy_years.length-2);
        years.textContent = trophy_years;
        trophi_logo.setAttribute('class', 'fa fa-trophy');
        trophies.appendChild(trophi_logo);
        trophies.appendChild(years);
    }else{
        trophies.setAttribute('class', 'no-trophy');
        //trophies.textContent = 'No trophies';
    }

    var anchor = document.createElement('a');
    anchor.setAttribute('href', '#/teams/'+id);
    anchor.textContent = 'View Team';

    team_name.appendChild(h5);
    team_name.appendChild(p);
    team_name.appendChild(trophies);

    team_data.appendChild(img);
    team_data.appendChild(team_name);

    card_view.appendChild(team_data);
    card_view.appendChild(anchor);

    card.appendChild(card_view);

    col.appendChild(card);

    return col;
}



function getLogo(name){
    if(name === 'Chennai Super Kings' || name === 'chennai-super-kings'){
        return 'csk.png';
    }else if(name === 'Delhi Capitals' || name === 'delhi-capitals'){
        return 'dc.png';
    }else if(name === 'Kings XI Punjab' || name === 'kings-xi-punjab'){
        return 'kxp.png';
    }else if(name === 'Royal Challengers Bangalore' || name === 'royal-challengers-bangalore'){
        return 'rcb.png';
    }else if(name === 'Kolkata Knight Riders' || name === 'kolkata-knight-riders'){
        return 'kkr.png';
    }else if(name === 'Mumbai Indians' || name === 'mumbai-indians'){
        return 'mi.png';
    }else if(name === 'Rajasthan Royals' || name === 'rajasthan-royals'){
        return 'rr.png';
    }else{
        return 'srh.png';
    }
}

function getCardClass(name){
    if(name === 'Chennai Super Kings' || name === 'chennai-super-kings'){
        return 'csk';
    }else if(name === 'Delhi Capitals' || name === 'delhi-capitals'){
        return 'dd';
    }else if(name === 'Kings XI Punjab' || name === 'kings-xi-punjab'){
        return 'kxp';
    }else if(name === 'Royal Challengers Bangalore' || name === 'kolkata-knight-riders'){
        return 'rcb';
    }else if(name === 'Kolkata Knight Riders' || name === 'mumbai-indians'){
        return 'kkr';
    }else if(name === 'Mumbai Indians' || name === 'rajasthan-royals'){
        return 'mi';
    }else if(name === 'Rajasthan Royals' || name === 'royal-challengers-bangalore'){
        return 'rr';
    }else{
        return 'srh';
    }    
}


function getProfileUI(team_name, player, team){
    var col = document.createElement('div');
    col.setAttribute('class', 'col');

    var card = document.createElement('div');
    card.setAttribute('class', 'card '+getCardClass(team_name));

    var profile_image = document.createElement('div');
    profile_image.setAttribute('class', 'profile_image');

    var card_body = document.createElement('div');
    card_body.setAttribute('class', 'card-body');

    var player_data = document.createElement('div');
    player_data.setAttribute('class','player_data');

    icon_container = document.createElement('div');
    icon_container.setAttribute('class', 'icon_container');

    if(isCaptain(player.id, team)){
        var captain_icon = document.createElement('i');
        captain_icon.setAttribute('class', 'fa fa-copyright captain');
        icon_container.appendChild(captain_icon);
    }
    if(isWicketKeeper(player.id, team)){
        var wicket_icon = document.createElement('i');
        wicket_icon.setAttribute('class', 'fa fa-th-list keeper');
        icon_container.appendChild(wicket_icon);
    }
    if(player.nationality != 'Indian'){
        var nationality = document.createElement('i');
        nationality.setAttribute('class', 'fa fa-plane foreign');
        icon_container.appendChild(nationality);
    }

    var content = document.createElement('div');
    content.setAttribute('class', 'content');

    var img = document.createElement('img');
    img.setAttribute('src', player.image);

    var first_name = document.createElement('h3');
    var last_name = document.createElement('h5');
    var year = document.createElement('span');

    player_name = player.name.split(' ');
    first_name.textContent = player_name[0];
    last_name.textContent = player_name[1];
    year.textContent = 'IPL 2019';

    var stats = document.createElement('div');
    stats.setAttribute('class', 'player_stats');

    for(var key in player.stats){
        if(player.stats.hasOwnProperty(key)){
            var item = document.createElement('div');
            item.setAttribute('class', 'stat');
            var item_val = document.createElement('h5');
            item_val.textContent = player.stats[key];
            var title = document.createElement('span');
            title.textContent = key;
            item.appendChild(item_val);
            item.appendChild(title);
            stats.appendChild(item);
        }
    }
    


    var anchor = document.createElement('a');
    anchor.textContent = 'View Profile';

    player_data.appendChild(first_name);
    player_data.appendChild(last_name);
    player_data.appendChild(year);

    card_body.appendChild(player_data);
    card_body.appendChild(stats);
    card_body.appendChild(icon_container);

    profile_image.appendChild(img);

    card.appendChild(profile_image);
    card.appendChild(card_body);

    col.appendChild(card);

    return col;
}


function showErrorPage(error){
    let app = new App(routes);
    console.log('sending error.html');  
    app.router.gotoRoute('error.html', 'error');
    stopLoader();
    document.getElementById('errorInfo').textContent = error;
    alert(error);
}


function getCaptain(captainId, players){
    for(var player of players){
        if(player.id === captainId){
            return player;
        }
    }
    return null;
}

function isCaptain(playerId, team){
    if(playerId === team.captainId){
        return true;
    }else{
        return false;
    }
}
function isWicketKeeper(playerId, team){
    if(playerId === team.wicketKeeperId){
        return true;
    }else{
        return false;
    }
}


function stopLoader(){
    console.log('loader stopped');
    document.getElementById('app').style.opacity = 1;
    document.getElementById('loader').style.opacity = 0;
}

function showLoader(){
    console.log('loader started');
    document.getElementById('app').style.opacity = 0;
    document.getElementById('loader').style.opacity = 1;
}
// getAllTeams();
