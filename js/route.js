class Route{
    name = undefined;
    htmlName = undefined;
    defaultRoute = undefined;

    constructor(name, htmlName, defaultRoute){
        try{
            if(!name || !htmlName){
                throw "error: parameters cannot be empty";
            }
        }catch(e){
            console.log(e);
        }
        this.name = name;
        this.htmlName = htmlName;
        this.defaultRoute = defaultRoute;
    }

    isActiveRoute(path){
        return path.replace('#', '') === this.name;
    }

}