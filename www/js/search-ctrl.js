app.controller('searchCtrl',['$scope','dataServices','$filter','$state','$ionicPopup','$stateParams', function($scope,dataServices,$filter,$state,$ionicPopup,$stateParams){

	var pageMax;

	$scope.currentPage = '1';

	$scope.changeList = function (){
		//Set based on current list
		setList();

		//load new list for updating purposes
		load();
	}

	$scope.gotoProfile = function(id){
		$state.go('profile',{ data: { id: id } });
	}

	function load(){
		var cb = dataServices.getDataList();

		cb.then(function(success){
			$scope.dataLists = success;
			limitList();
		},function(failed){
			var alertPopup = $ionicPopup.alert({
		     	title: 'Oops, Data Error!',
		     	template: '<p style="text-align:center"Fail to load data list, please try again</p>'
		   	});
		})
	}

	function limitList(){

		pageMax = Math.ceil($scope.dataLists.length/10);

		var listHolder = [];

		var arr = [];

		var j = 1;

		for (var i = 0; i < $scope.dataLists.length; i++){

			if(j != 10){
				arr.push($scope.dataLists[i]);
				j++;
			} else {
				arr.push($scope.dataLists[i]);
				listHolder.push(arr);
				arr = [];
				j = 1;
			}

			if(i+1 >=  $scope.dataLists.length && arr.length <= 9){
				listHolder.push(arr);
			}
		}

		$scope.listByPages = listHolder;
		setList();
	}

	function setList(){
		$scope.currentShowList = $scope.listByPages[parseInt($scope.currentPage) - 1];
	}

	load();
	
}]);
