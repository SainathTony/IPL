class Router{
    routes = undefined;
    appContainer = undefined;

    hashChanged(){
        let request = this.parseRequestURL();
        let parsedURL = (request.resource ? '/' + request.resource: '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb: '');
        console.log('parsedURL=>', parsedURL);
        if(parsedURL == '/'){
            this.gotoRoute('teams.html', 'teams');
        }
        else if(parsedURL == '/teams/:id'){
            this.gotoRoute('team.html', request.id);
        }
        else if(parsedURL == '/error'){
            this.gotoRoute('team.html', request.id);
        }else{
            this.gotoRoute('error404.html', 'error404');
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

    parseRequestURL(){
        let url = location.hash.slice(1).toLocaleLowerCase() || '/';
        let r = url.split('/');
        let request = {
            resource: null,
            id: null,
            verb: null
        }
        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];

        return request;
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
                else if(name == 'error404'){
                    console.log('name is error404');
                    window.location.hash = '/error404'
                    stopLoader();
                }
                else if(name == 'error'){
                    console.log('name is error404');
                    window.location.hash = '/error'
                    stopLoader();
                }else{
                    console.log('team data');
                    getTeamData(name);
                }
            }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}