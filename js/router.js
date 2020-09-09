'use strict';


// class Router{
//     constructor(routes){
//         this.routes = routes;
//         this.rootElem = document.getElementById('app');
//     }
//     init(){
//         var r = this.routes;
//         window.addEventListener('hashchange', function(e){
//             this.hasChanged(this, r);
//         })
//     }
//     hasChanged(scope, r){
//         if(window.location.hash.length > 0){
//             for(var i=0, length = r.length; i<length; i++){
//                 var route = r[i];
//                 if(route.isActiveRoute(window.location.hash.substr(1))){
//                     scope.goToRoute(route.htmlName);
//                 }
//             }
//         }else{
//             for(var i=0, length = r.length; i<length; i++){
//                 var route = r[i];
//                 if(route.default){
//                     scope.goToRoute(route.htmlName);
//                 }
//             }
//         }
//     }

//     goToRoute(htmlName){
//         var url = 'views/'+htmlName,
//         xhttp = new     XMLHttpRequest();
//         xhttp.onreadystatechange = function(){
//             if(this.readyState === 4 && this.status == 200){
//                 this.rootElem.innerHTML = this.responseText;
//             }
//         };
//         xhttp.open('GET', url, true);
//         xhttp.send();
//     }
// }

function Router(routes){
    try{
        if(!routes){
            throw 'error: router parsms requied';
        }
        this.constructor(routes);
        this.init();
    }catch(e){
        console.log(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function(routes){
        this.routes = routes,
        this.rootElem = document.getElementById('app');
    },
    
    init: function(){
        var r = this.routes;
        (function(scope, r){
            window.addEventListener('hashchange', function(e){
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },

    hasChanged: function(scope, r){
        if(window.location.hash.length > 0){
            for(var i=0, length = r.length; i<length; i++){
                var route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))){
                    scope.goToRoute(route.htmlName, route.name);
                }
            }
        }else{
            for(var i=0, length = r.length; i<length; i++){
                var route = r[i];
                if(route.default){
                    scope.goToRoute(route.htmlName, route.name);
                }
            }
        }
    },

    goToRoute: function(htmlName, name){
        console.log(htmlName, name);
        (function(scope){
            var url = 'views/'+htmlName,
            xhttp = new     XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState === 4 && this.status == 200){
                    scope.rootElem.innerHTML = this.responseText;
                    if(name == 'teams'){
                        getAllTeams();
                    }else{
                        getTeamData(name);
                    }
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }

};