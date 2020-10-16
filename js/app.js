'use strict';


class App{  
    constructor(routes){
        this.router = new Router(routes);
    }
}

const routes = [
    new Route('/', 'teams.html', true),
    new Route('#/teams', 'teams.html'),
    new Route('#/teams/:id', 'team.html'),
    new Route('#/error', 'error.html'),
    new Route("#/error404", 'error404.html'),

];

document.addEventListener('DOMContentLoaded', function(event){
    let app = new App(routes);
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