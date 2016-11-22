app.factory('dataServices',['$q','$resource',  function($q, $resource){
	
	function getLocation(){

		var url = "http://52.76.85.10/test/location.json";
        
        var delay = $q.defer();

        $resource(url,{}, {
            get: {
                method: 'GET',
                isArray: true,   
            }
        }).get({},function(res){ 
            
            delay.resolve(res);

        },function(res){ 
            
            delay.reject(res); 
        });

        return delay.promise;
	}

	function getDataList(){
		var url = "http://52.76.85.10/test/datalist.json";
        
        var delay = $q.defer();

        $resource(url,{}, {
            get: {
                method: 'GET',
                isArray: true,   
            }
        }).get({},function(res){ 
            
            delay.resolve(res);

        },function(res){ 
            
            delay.reject(res); 
        });

        return delay.promise;
	}

	function getProfile(id){
		var url = "http://52.76.85.10/test/profile/" + id + ".json";
        
        var delay = $q.defer();

        $resource(url,{}, {
            get: {
                method: 'GET',
                isArray: false,   
            }
        }).get({},function(res){ 
            
            delay.resolve(res);

        },function(res){ 
            
            delay.reject(res); 
        });

        return delay.promise;
	}

	return {
		getLocation: getLocation,
		getDataList: getDataList,
		getProfile: getProfile
	}
}]);