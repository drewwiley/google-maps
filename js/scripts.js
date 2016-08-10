//initialize ng-app module
var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller('googleMapsController', function($scope, $http){
//Set default lat and long values
	var myLatlng = {lat: 40.0000, lng: -98.0000};
	var map = new google.maps.Map(document.getElementById('map'), {
  		zoom: 4,
  		center: myLatlng
	});
 //create markers array
	var markers = [];
	//create marker objects for markers array
	function createMarker(city){
		console.log(city);
		var cityLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
	  		{
	    		position: cityLatlng,
	    		map: map,
	    		title: city.city
	  		}
		);
	//create info window variable and set it to city name	
		var infoWindow = new google.maps.InfoWindow({
			content: city.city

		});
	//add event listener for clicks in order to display info window
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.open(map, marker);

		});
		markers.push(marker);
	}
	//click listener for our ng-repeat table of city names that will display marker when clicked
	$scope.triggerClick = function(index) {
		google.maps.event.trigger(markers[index], "click");
	}

	//make cities array available to the DOM
	$scope.cities = cities;

	//loop through array of cities and create a marker for each
	for(var i = 0; i<$scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}


});