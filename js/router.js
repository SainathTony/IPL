class Router{
    routes = undefined;
    appContainer = undefined;

    hashChanged(){
        console.log('Hash changed=>', window.location.hash);
        if(window.location.hash.length > 0){
            this.routes.forEach(route => {
                console.log(window.location.hash.substr(2));
                if(route.isActiveRoute(window.location.hash.substr(1))){
                    this.gotoRoute(route.htmlName, route.name);
                }
            });
        }else{
            this.routes.forEach(route=>{
                if(route.defaultRoute)  {
                    this.gotoRoute(route.htmlName, route.name);
                }
            });
        }
    }
    
    constructor(routes){
        try{
            if(!routes){
                throw "error: routeres required";
            }
        }catch(e){
            console.log(e);
        }
        this.routes = routes;
        this.appContainer = document.getElementById("app");
        console.log('got routes', this.routes);

        window.addEventListener('hashchange', ()=>{
            this.hashChanged();
        });

        this.hashChanged();
    }

    gotoRoute(htmlName, name){
        const url = 'views/'+htmlName;
        console.log('got error error', htmlName, name);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status == 200){
                this.appContainer = document.getElementById('app');
                this.appContainer.innerHTML = this.responseText;
                if(name == 'teams'){
                    getAllTeams();
                }
                else if(name == 'error'){
                    console.log('error page loaded');
                    window.location.hash = '/error';
                    stopLoader();
                }else{
                    getTeamData(name);
                }
            }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}