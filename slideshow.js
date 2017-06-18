	//module
	var app=angular.module("slideshow",[]);	
	//controller
	app.controller("ctrl",ctrl);
	ctrl.$inject=["$scope","$timeout"];
	function ctrl($scope,$timeout){
		//initializing the current index to zero to show first image
		$scope.currentindex=0;	
		//button function to view previous image
		$scope.prev=function(){
			if($scope.currentindex==0){
				$scope.currentindex=5;
			}
			$scope.currentindex=$scope.currentindex-1;
			
		}
		//button fucntion to view next image
		$scope.next=function(){
			if($scope.currentindex==4){
				$scope.currentindex=-1;
			}
			$scope.currentindex=$scope.currentindex+1;
			
		}
		//JSON array of Image description
		$scope.image_details=[
							{'image':"images/image1.jpg","desc":"FIAT"},
							{'image':"images/image2.jpg","desc":"VOLKSWAGEN"},
							{'image':"images/image3.jpg","desc":"LAMBORGHINI"},
							{'image':"images/image4.jpg","desc":"MERCEDES"},
							{'image':"images/image5.jpg","desc":"FORD"},
							];
		//checking the current index and showing that
		$scope.isindex=function (x){
				if($scope.currentindex==x){
				return true;
				}
				else{
				return false;
				}
		
		}
		//automatic sliding of the images
		var auto=function(){
		   if($scope.currentindex==4){
				$scope.currentindex=-1;
			}
			$scope.currentindex=$scope.currentindex+1;
			//calling auto function every 1 second
			$timeout(auto,1000);
		}
		auto();
		
	}

