var app=angular.module("snake",[]);	
	//controller
	var BOARD_SIZE=30;
	app.controller("ctrl",ctrl);
	ctrl.$inject=["$scope","$timeout"];
	function ctrl($scope,$timeout){
		//setting the JSON object array of default color
		colour={"fruit":"red","snake":"green","end":"yellow","board":"black"};	
		//initialize fruit
		fruit={"row":0,"col":0};
		//snake body
		snakebody=[];
		//direction of the snake
		var direc="s";
		$scope.okstart=false;
		$scope.started=false;
		$scope.over=false;
		$scope.score=0;
		var timer=200;
		//variable to check game over
		var gameOver=false;
		//setting up the board
		var setupBoard=function() {
			$scope.board = [];
			for (var i = 0; i < BOARD_SIZE; i++) {
					$scope.board[i] = [];
					for (var j = 0; j < BOARD_SIZE; j++) {
						$scope.board[i][j] = false;
					}
				}
			}	
			
		//creating a fruit
		var fruits=function(){
			 x=fruit.row =Math.floor((Math.random()*BOARD_SIZE));
			 y=fruit.col=Math.floor((Math.random()*BOARD_SIZE));	
			 
			 console.log($scope.board[x][y]);
			 if($scope.board[x][y]){
			 fruits();
			 }
			
		}
		//initialize snake
		var snakeinit =function(){
				snakebody.push({"row":7,"col":8});
				$scope.board[7][8]=true;
				snakebody.unshift({"row":7,"col":7});
				$scope.board[7][7]=true;
				snakebody.unshift({"row":7,"col":6});
				$scope.board[7][6]=true;
		}
		//setting background-color
		$scope.curcolor=function(col,row){
			if(gameOver){
				$scope.okstart=false;
				$scope.over=true;
				return "blue";
			}
			else if(col==fruit.row && row==fruit.col){
				return colour.fruit;
			}
			else if(snakebody[0].row==col && snakebody[0].col==row){
				return "yellow";
			}
			else if($scope.board[col][row]==true){
				return colour.snake;
			}
			return colour.board;
		}
		//adding head and removing tail
		var run=function(){
			if(direc=="up"){
			if(snakebody[0].col-1==-1 || $scope.board[snakebody[0].row][snakebody[0].col-1]){
				gameOver=true;
			}
			
			else if(snakebody[0].row==fruit.row && snakebody[0].col-1==fruit.col){
				eatfruit(snakebody[0].row	,snakebody[0].col-1);
			}
			else{
				snakebody.unshift({"row":snakebody[0].row,"col":snakebody[0].col-1});
				$scope.board[snakebody[0].row][snakebody[0].col]=true;
				x=snakebody.pop();
				$scope.board[x.row][x.col]=false;
				}
			}
			else if(direc=="down"){
				if(snakebody[0].col+1==BOARD_SIZE  || $scope.board[snakebody[0].row][snakebody[0].col+1]){
				gameOver=true;
			}
			
			else if(snakebody[0].row==fruit.row && snakebody[0].col+1==fruit.col){
				eatfruit(snakebody[0].row,snakebody[0].col+1);
			}
			else{
				snakebody.unshift({"row":snakebody[0].row,"col":snakebody[0].col+1});
				$scope.board[snakebody[0].row][snakebody[0].col]=true;
				x=snakebody.pop();
				$scope.board[x.row][x.col]=false;
			}}
			else if(direc=="left"){
				if(snakebody[0].row-1==-1  || $scope.board[snakebody[0].row-1][snakebody[0].col]){
				gameOver=true;
			}
			
			else if(snakebody[0].row-1==fruit.row && snakebody[0].col==fruit.col){
				eatfruit(snakebody[0].row-1,snakebody[0].col);
			}
			else{
				snakebody.unshift({"row":snakebody[0].row-1,"col":snakebody[0].col});
				$scope.board[snakebody[0].row][snakebody[0].col]=true;
				x=snakebody.pop();
				$scope.board[x.row][x.col]=false;
			}}
			else if(direc=="right"){
			if(snakebody[0].row+1==BOARD_SIZE  || $scope.board[snakebody[0].row+1][snakebody[0].col]){
				gameOver=true;
			}
			else if(snakebody[0].row+1==fruit.row && snakebody[0].col==fruit.col){
				eatfruit(snakebody[0].row+1,snakebody[0].col);			}
			
			else{
				snakebody.unshift({"row":snakebody[0].row+1,"col":snakebody[0].col});
				$scope.board[snakebody[0].row][snakebody[0].col]=true;
				x=snakebody.pop();
				$scope.board[x.row][x.col]=false;
			}}
		$timeout(run,timer);
		}
		var eatfruit=function(x,y){
			snakebody.unshift({"row":x,"col":y});
			$scope.board[x][y]=true;
			$scope.score+=1;
			fruits();
			if($scope.score%5==0){
			timer-=10;
			}
		}
		
		$scope.move=function(k){
			var x=k.keyCode;
			if(x==38  && direc!="down"){direc="up";}
			else if(x==40 && (direc!="s" && direc!="up")){direc="down";}
			else if(x==37 && direc!="right"){direc="left";}
			else if(x==39 && direc!="left"){direc="right";}

		}
		$scope.initiate=function(){
		
		setupBoard();
		snakeinit();
		fruits();
		$scope.okstart=true;
		$scope.started=true;
		run();
		}
	}