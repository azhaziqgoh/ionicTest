app.controller('profileCtrl',['$scope','dataServices','$filter','$state','$ionicPopup','$stateParams','$sce', function($scope,dataServices,$filter,$state,$ionicPopup,$stateParams,$sce){

	function load(){
		var cb = dataServices.getProfile($stateParams.data.id);

		cb.then(function(success){
			$scope.profile = success;
			console.log($scope.profile);
			setMap();
		},function(failed){
			var alertPopup = $ionicPopup.alert({
		     	title: 'Oops, Data Error!',
		     	template: '<p style="text-align:center"Fail to load data profile, please try again</p>'
		   	});
		})
	}

	function setMap(){
		$scope.maps = $sce.trustAsResourceUrl("https://maps.google.com/maps?q=" + $scope.profile.latitude + "," + $scope.profile.longitute + '&output=embed');
	}
	load();
	
}]);
