'use-strict';

(function(){

    var adsControllers = angular.module('adsControllers', []);

    adsControllers.controller('AdListCtrl', ['$http', function ($http) {
        var self = this;
        self.allAds = [];
        self.adsToLoad;
        self.publicAds = true;
        changeTitle('Ads - Home');


        self.getAllAds = function(){
            $http.get(baseURL + "ads", {headers:headers})
                .success(function(data){
                    console.log(data);
                    self.allAds = data.ads;
                })
                .error(function(data){
                    console.error(data);
                }
            );
        };

        self.getAllUserAds = function(){
            $http.get(baseURL +  "user/ads", {headers:headers})
                .success(function(data){
                    console.log(data);
                    self.allAds = data.ads;
                })
                .error(function(data){
                    console.error(data);
                }
            );
        };

        self.deleteAd = function(adId){
            console.log(headers);
            $http.delete(baseURL + 'admin/ads/' + adId, {"headers":headers}).success(function(){
                self.adsToLoad();
            }).error(onError);

        };

        if (window.location.hash == "#/user/ads"){
            self.publicAds = false;
            self.getAllUserAds();
            self.adsToLoad = self.getAllUserAds;
        } else {
            self.publicAds = true;
            self.getAllAds();
            self.adsToLoad = self.getAllAds;
        }

    }]);

    adsControllers.controller('LoggedHeaderCtrl', ['$http', function ($http) {
        var self = this;
        self.username = JSON.parse(localStorage.getItem('user-data')).username;

        self.logOut = function(){
            localStorage.removeItem('user-data');
            headers = null;
            reroute('#/home');
        }

    }]);

    adsControllers.controller('LogInCtrl', ['$http', function($http){
        changeTitle('Ads - Log in');
        var self = this;
        self.username = "";
        self.password = "";

        self.logIn = function(){
            if (self.username == "" || self.password == ""){
                alert('Passwords don\'t match. -' + self.password + "-");
            } else {
                $http.post(baseURL + '/user/Login', JSON.stringify({
                        username: self.username,
                        password: self.password
                    })).success(function(data){
                    localStorage.setItem('user-data', JSON.stringify(data));
                    console.log(data);
                    headers = {"Authorization" : "Bearer " +  data.access_token};
                    reroute('#/home-logged');
                }).error(function(data){
                    console.error(data);
                });
            }
        }

    }]);

    adsControllers.controller('RegisterCtrl', ['$http', function($http){
        changeTitle('Ads - Register');
        var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var ck_username = /^[A-Za-z0-9_]{1,20}$/;
        var errors = [];

        var self = this;
        self.username = "";
        self.password = "";
        self.password2 = "";
        self.email = "";
        self.phoneNumber = "";
        self.fullName = "";
        self.town = "sofia";

        self.register = function(){

            if (self.username.trim() == ""){ errors.push('Username field can\'t be empty'); }
            if (self.password.trim() == ""){ errors.push('Password field can\'t be empty'); }
            if (self.email.trim() == ""){ errors.push('Email field can\'t be empty'); }
            if (self.phoneNumber.trim() == ""){ errors.push('Phone number field can\'t be empty'); }
            if (self.fullName.trim() == ""){ errors.push('Full name field can\'t be empty'); }

            if (errors.length > 0){
                alert(errors.join('\n'));
                errors = [];
                return;
            }

            if (!ck_email.test(self.email)) { errors.push('Invalid email.'); }
            if (!ck_username.test(self.username)) { errors.push('Invalid username.'); }
            if (self.password != self.password2) { errors.push('Passwords don\'t match.'); }

            if (errors.length > 0){
                alert(errors.join('\n'));
                errors = [];
                return;
            }

            $http.post(baseURL + "user/register", JSON.stringify({
                    username: self.username,
                    password: self.password,
                    confirmPassword: self.password2,
                    name: self.fullName,
                    email: self.email,
                    phone: self.phoneNumber,
                    townId: 1
                })).success(function(data){
                console.log(data);
            }).error(function(data){
                console.error(data);
            });
        }

    }]);

    adsControllers.controller('CategoryFilterCtrl', ['$http', function($http){
        var self = this;
        self.categories = [];

        self.getAllCategories = function(){
            $http.get(baseURL + 'categories').success(function(data){
                self.categories = data;
            }).error(onError);
        }();
    }]);

    adsControllers.controller('CityFilterCtrl', ['$http', function($http){
        var self = this;
        self.towns = [];

        self.getAllTowns = function(){
            $http.get(baseURL + 'towns').success(function(data){
                self.towns = data;
            }).error(onError);
        }();
    }]);

    adsControllers.controller('AdCreatorCtrl', ['$http', function($http){
        var self = this;
        self.title = "";
        self.text = "";
        self.categoryId  = "";
        self.townId  = "";

        self.createAd = function(){
            self.imageUrlData = document.getElementById('dataUrl').value;

            $http.post(baseURL + 'user/ads',{
                    "title" : self.title,
                    "text" : self.text,
                    "imageDataUrl" : self.imageUrlData,
                    "categoryId" : self.categoryId,
                    "townId" : self.townId
                },
                {"headers":headers})
            .success(function(data){
                console.log(data)
            }
            ).error(onError);
        };
    }]);

}());

