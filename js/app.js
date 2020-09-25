'use strict';


class App{  
    constructor(routes){
        this.router = new Router(routes);
    }
}

const routes = [
    new Route('teams', 'teams.html', true),
    new Route('chennai-super-kings', 'team.html'),
    new Route('delhi-capitals', 'team.html'),
    new Route('kings-xi-punjab', 'team.html'),
    new Route('kolkata-knight-riders', 'team.html'),
    new Route('mumbai-indians', 'team.html'),
    new Route('rajasthan-royals', 'team.html'),
    new Route('royal-challengers-bangalore', 'team.html'),
    new Route('sunrisers-hyderabad', 'team.html'),
    new Route('error', 'error.html')

];

document.addEventListener('DOMContentLoaded', function(event){
    app = new App(routes);
});


// (function(){
//     function init(){
//         var router = new Router([
//             new Route('teams', 'teams.html', true),
//             new Route('sunrisers', 'team.html')
//         ]);
//     }
//     init();
// }());