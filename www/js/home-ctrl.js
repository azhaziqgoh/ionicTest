app.controller('homeCtrl',['$scope','dataServices','$filter','$state','$ionicPopup', function($scope,dataServices,$filter,$state,$ionicPopup){
	
	$scope.filterLoc;
	$scope.selectedLocation;
	$scope.selected = false;

	$scope.setList = function(search){
		$scope.selected = false;
		$scope.filterLoc = $filter("locationFilter")($scope.locations, search)
	}

	$scope.setModal = function(location){
		$scope.search = location.area + "," + location.city;
		$scope.selectedLocation = location;
		$scope.selected = true;
	}

	$scope.findDoctor = function(){

		if($scope.selectedLocation){
			$state.go('search', { data: { selectedLocation: $scope.selectedLocation } });	
		} else {
			
			var alertPopup = $ionicPopup.alert({
		     	title: 'Oops, Action Missing!',
		     	template: '<p style="text-align:center">Please Select Location First</p>'
		   	});
		}
		
	}

	function load(){

		var cb = dataServices.getLocation()

		cb.then(function(success){
			$scope.locations = success;
		},function(failed){
			var alertPopup = $ionicPopup.alert({
		     	title: 'Oops, Data Error!',
		     	template: '<p style="text-align:center"Fail to load location, please try again</p>'
		   	});
		})
	}

	load();
	
}]);

app.filter('locationFilter',[function(){
	return function(location,searchtext){
                
	    var output;

	    if(searchtext == undefined){
	        output = location;
	    } else {

	        var tempArr = [];

	        for(var i = 0; i < location.length; i++){

	            if(location[i].area.toLowerCase().indexOf(searchtext.toLowerCase()) == 0){

	                tempArr.push(location[i]);

	            } else if(location[i].city.toLowerCase().indexOf(searchtext.toLowerCase()) == 0){

	                tempArr.push(location[i]);

	            }

	            output = tempArr;
	        }
	    }
	    
	    return output;
	}

}])