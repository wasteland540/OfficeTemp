//Define an angular module for our app
var app = angular.module('myApp', ['googlechart', 'ngMaterial']);

app.controller('tempController', function($scope, $http, $timeout) {
      
  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  
  $scope.lastLogDate = new Date();
  $scope.averageTemp = 0.0;
        
  //init date range
  $scope.from = getMonday(new Date());
  $scope.to = new Date($scope.from.getFullYear(), $scope.from.getMonth(), $scope.from.getDate()+7);
  
  //start init angular-google-chart
  $scope.myChartObject = {};
  $scope.myChartObject.type = "AnnotationChart";

  $scope.myChartObject.data = {  
    "cols": [
    {id: "dates", label: "Dates", type: "date"},
    {id: "temp-data", label: "Temperature", type: "number"}
  ]};
 
  $scope.myChartObject.options = {
    displayAnnotations: false
  };
  //end init angular-google-chart
    
  initTemps(); // Load all available temps in init date range 
  
  function initTemps(){  
    getTempsInRange();
  };
  
  //function for query btn
  $scope.getTempsDateRange = function () {
      getTempsInRange();
  };
  
  function getTempsInRange(){
        $http.post("ajax/getTempsByDate.php?from="+formatDate($scope.from) +"&to="+formatDate($scope.to)).success(function(data){     
               
        var temps = data.Temps;
        $scope.myChartObject.data.rows = createChartRows(temps);      
        
        //set last log date
        $scope.lastLogDate = Date.parse(data.LastLogDate);        
        
        var averageBuff = 0.0;
        temps.forEach(function(element) {
            averageBuff += parseFloat(element.Temp);
        });
        
        averageBuff = averageBuff / (temps.length);
        $scope.averageTemp = Round(averageBuff, 2);
    })
    .error(function (error) {
        console.log(error);
    });
  }
  
  function createChartRows(temps){
     var rows = [];
        
     temps.forEach(function (entry) {            
        rows.push({
            c: [
                {v: fromMySqlDate(entry.Date)},
                {v: parseFloat(entry.Temp)}
            ]
        });   
     });
        
     return rows;
  }
  
  function formatDate(date){      
      return date.getFullYear() +"-"+(date.getMonth()+1)+"-"+date.getDate();
  }
  
  function fromMySqlDate(dateString){
      // Split timestamp into [ Y, M, D, h, m, s ]
    var t = dateString.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    
    return d;
  }  
  
  function Round(num, places) 
  { 
      return +(Math.round(num + "e+" + places)  + "e-" + places);
  }

});
