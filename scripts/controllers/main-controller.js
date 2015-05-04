'use strict';

angular.module('nearbyrestaurants')
        .controller('mainController', function ($scope, $http) {

          $scope.options = [
            { label: 'Distance', value: '-distance' },
            { label: 'Price', value: 'price' },
            { label: 'Rating', value: '-rate' }
          ];

          $scope.defaultSelected = $scope.options[0];


          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
          } else {
            error('not supported');
          }


          function error(msg) {
            console.log("Geolacation Failed");
          }


          var map;
          var infowindow;
          var service;

          function success(position) {

            var mapcanvas = document.createElement('div');
            mapcanvas.id = 'mapcanvas';
            mapcanvas.style.height = '630px';
            //mapcanvas.style.width = '900px';

            $('#js_map-box').append(mapcanvas);

            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var myOptions = {
              zoom: 15,
              center: latlng,
              mapTypeControl: false
            };

            map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

            var marker = new google.maps.Marker({
                position: latlng,
                map: map
            });

            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');


            var iw = new google.maps.InfoWindow({
              content: "Restaurant name "+position.coords.accuracy+" "
            });

            google.maps.event.addListener(marker, "click", function (e) { iw.open(map, this); });

            var request = {
               location: latlng,
               radius: 500,
               types: ['food']
             };

             infowindow = new google.maps.InfoWindow();
             service = new google.maps.places.PlacesService(map);
             service.nearbySearch(request, callback);
         }

          function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
              }
            }
          }

          function createMarker(place) {
            var placeLoc = place.geometry.location;

            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });

            /*  console.log(place.geometry.location);

             var ApiKey = "AIzaSyAneGsXcNH6G1mSV4bjB2m1LR--rxAtnl8";
            var GoogleApiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
            var ApiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&alt=json-in-script&callback=JSON_CALLBACK&key="+ApiKey;

            //var photoRef = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="++"&key="+ApiKey;

             $http.jsonp(ApiUrl)
                  .success(function(data) {
                    console.log("sucess!");
                    console.log(data);
                  })
                  .error(function(data) {
                    console.log("error !");
                  });*/

          }



          var apidata= [
                  {
                     "geometry" : {
                        "location" : {
                           "lat" : -33.867591,
                           "lng" : 151.201196
                        }
                     },
                     "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/travel_agent-71.png",
                     "id" : "a97f9fb468bcd26b68a23072a55af82d4b325e0d",
                     "name" : "Australian Cruise Group",
                     "opening_hours" : {
                        "open_now" : false,
                        "weekday_text" : []
                     },
                     "photos" : [
                        {
                           "height" : 1607,
                           "html_attributions" : [],
                           "photo_reference" : "CnRnAAAAgRIDb_yEN5U0JTOsZ_YuvkZ8Ubjr2KSzEYXn2_UIw4C2QxweNH4mv4FP-9SkdB6B_Ypf9GoUooazqONKKmI2TI1ZObcHfPzVOBO3RWkieo0wCIevssFJIBS-nSAl6aKKU4yHIleCGfFt3tw1Vm-HOhIQgrnUAysIrBh4T91J43a_FRoUX-V_-9wDDKzr-kEhYu9wPK1VRlQ",
                           "width" : 1969
                        }
                     ],
                     "place_id" : "ChIJrTLr-GyuEmsRBfy61i59si0",
                     "reference" : "CnRqAAAAs0NN4kO3cbRv3asTQQSMxyycOqeUd6YSasQyFWWh2kyDVvrRxBVOQ6mazkRWoTa2WLbyLrQoXt1M-xn6blrixp66_8GtQuh_q1af4vwrdglBw1ZbZ3qqBdTr6vtzP9YR_gU5RgQs0CancfRJU9w75hIQmUBf1cUhhcUsJMZZ6sjiPxoUcxQF-MVkJcrgHjWevZ_J-ynCapM",
                     "scope" : "GOOGLE",
                     "types" : [ "travel_agency", "restaurant", "food", "establishment" ],
                     "vicinity" : "32 The Promenade, King Street Wharf 5, Sydney"
                  },
                  {
                     "geometry" : {
                        "location" : {
                           "lat" : -33.870943,
                           "lng" : 151.190311
                        }
                     },
                     "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
                     "id" : "e644f7f34cf875b9919c6548f1b721947362850a",
                     "name" : "Lunch Cruise with Jazz on Sydney Harbour",
                     "opening_hours" : {
                        "open_now" : false,
                        "weekday_text" : []
                     },
                     "photos" : [
                        {
                           "height" : 565,
                           "html_attributions" : [],
                           "photo_reference" : "CnRnAAAAYGgrNekG2Gw9wQT7aFP7mCZ-HKGDt0dURvneoBQahcyYDi__vBmSnYaA3_4MRGxut8iM321Y4r3aHQauaqIZRk-7vgl6NnZv1U2IwYQLphlOICZXnw9Dpt5EjIImrk6tPOGn7nFr1MH0S026DGLEcxIQcqbyFShwOLKrrVSn5SgJXRoUWJ0CgeB6Cde1yOBJQjCkghXeXf0",
                           "width" : 850
                        }
                     ],
                     "place_id" : "ChIJLfySpTOuEmsRPCRKrzl8ZEY",
                     "reference" : "CoQBewAAALvmpMLEYuO-p5G-f3tV5q-QMCoFevyQ2AFZPtxJmQ5xZC6USuir_xSXUNci7zZkg1uqSpl1vQbbQYhW66cB98yXbJ7BpEPbtNBJNqbZGORDu8YJmdrPAJeScysyLsEfSwH8-RPxK-_HJ0PoVWe_sCpV-lA_GERVvR6i2eiR7Q_nEhCfI6ykCQmqySFc_CHjpAW8GhTsttUpHIyw5vod_jNoscsxhWCs1A",
                     "scope" : "GOOGLE",
                     "types" : [ "bar", "restaurant", "food", "establishment" ],
                     "vicinity" : "37 Bank St, Pyrmont"
                  },
                  {
                     "geometry" : {
                        "location" : {
                           "lat" : -33.86879,
                           "lng" : 151.194217
                        }
                     },
                     "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                     "id" : "21a0b251c9b8392186142c798263e289fe45b4aa",
                     "name" : "Rhythmboat Cruises",
                     "opening_hours" : {
                        "open_now" : false,
                        "weekday_text" : []
                     },
                     "photos" : [
                        {
                           "height" : 467,
                           "html_attributions" : [],
                           "photo_reference" : "CnRnAAAANGo7AMVt3RiRREQI-0Ukk_zCPsWwNpQAc-2hBUrljYiYv7a2aAKCnUyHM70n11OEM2OYLRWpAnR_uBqdaKpGNZtDlPaihsGQiGqDCKPrRU5WCcZVlCsE17_2Q4ycaSJU4eure0J5cLj7_iPvPgTgZRIQ5JxAmODs82-FqruXnzkaXxoUbhhsfptJPhuRNkPeCWnxLitKpz0",
                           "width" : 573
                        }
                     ],
                     "place_id" : "ChIJyWEHuEmuEmsRm9hTkapTCrk",
                     "reference" : "CnRmAAAA7BHyk8VJWNjqrwh_OOLl3jRjyKLfpL95EVmzIMaF9WjHawB3h7EQgM9CnYx7nf6n52hztHfGywPfINz9R3Bkej7hkclqnLd_S9iIozQ8YVFD0OZPvxX9jsN-NfgPxkVZEbw_mHd-cX8GyKbgAFaf-xIQq4-J5Ehd89e6R9lofPgnohoUHmYxkWCe6OviRmDeO6rcMvV-PwM",
                     "scope" : "GOOGLE",
                     "types" : [ "restaurant", "food", "establishment" ],
                     "vicinity" : "Pyrmont Bay Wharf (Near Australia Maritime Museum), Pyrmont, NSW 2009"
                  }

          ];

          var tmp =[];
          angular.forEach(apidata, function(data, $index) {
            data.photos[0].photo_reference = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+data.photos[0].photo_reference+"&key=AIzaSyAneGsXcNH6G1mSV4bjB2m1LR--rxAtnl8";
            data.distance = data.photos[0].height/10;
            data.price = "$$$$";
            data.rate = 4.5;
            data.review = 943;
            data.index = $index +1;
              tmp.push(data);
          });

          $scope.ApiResponse = tmp;




        });
