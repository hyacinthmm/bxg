define(function(){
    
    return {
        getQueryObj :function (){
            var kvp=location.search.slice(1).split("&");
            var result={};
            for(var i=0;i<kvp.length;i++){
                var kv=kvp[i].split("=");
                result[kv[0]]=kv[1];
            
            }
            return result;
        },
    
        getQuery :function (key){
            return this.getQueryObj()[key];
        }
    }
})