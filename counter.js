var app=angular.module("app",[]);

app.controller("ctrl",ctrl);
ctrl.$inject=["$scope","$timeout"];
function ctrl($scope,$timeout){
	var conv=function(){
		var h=parseInt($scope.x/(60*60));
		var mh=parseInt($scope.x%(60*60));

		var m=parseInt(mh/(60));
		var mm=parseInt(mh%(60));

		var s=mm;
	
		$scope.jarr=[{"h":h,"m":m,"s":s}];
	}
	$scope.co=function(){
		if($scope.x==0){
		$scope.to=" TimeOut !!!!!!!!!!!!!";
		return;
		}
		else{
		$scope.to="";
		}
		$scope.x--;
		conv();
		$timeout($scope.co, 1000);
	}
	//co();
}