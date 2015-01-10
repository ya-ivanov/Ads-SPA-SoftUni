'use-strict';

(function(){

    var adsControllers = angular.module('adsControllers', []);

    adsControllers.controller('AdListCtrl', ['$http', function ($http) {
        if (isLogged() && window.location.hash == '#/home'){
            reroute('#/home-logged'); console.log('not allowed here');
            return;
        } else {
            var self = this;
            self.allAds = [];
            self.adsToLoad;
            self.publicAds = true;
            self.currentPage = 1;
            changeTitle('Ads - Home');


            self.getAllAds = function(){
                $http.get(baseURL + "ads?pageSize=1&StartPage=" + self.currentPage, {headers:headers})
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
                $http.get(baseURL +  "user/ads?pageSize=1&StartPage=" + self.currentPage, {headers:headers})
                    .success(function(data){
                        console.log(data);
                        self.allAds = data.ads;
                    })
                    .error(function(data){
                        console.error(data);
                    }
                );
            };

            self.loadPage = function(type){
                if (type == '+') self.currentPage++;
                else self.currentPage--;

                $http.get(baseURL + (self.publicAds ? 'ads?' : "user/ads?") + "pageSize=1&StartPage=" + (self.currentPage), {headers:headers})
                    .success(function(data){
                        console.log(data);
                        self.allAds = [];
                        self.allAds = data.ads;
                    })
                    .error(function(data){
                        console.error(data);
                    }
                );
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

        }
    }]);

    adsControllers.controller('LoggedHeaderCtrl', ['$http', function ($http) {
        if (!isLogged()){
            reroute('#/home'); console.log('not allowed here');
        } else {
            var self = this;
            self.username = JSON.parse(localStorage.getItem('user-data')).username;

            self.logOut = function(){
                localStorage.removeItem('user-data');
                headers = null;
                reroute('#/home');
            }
        }
    }]);

    adsControllers.controller('LogInCtrl', ['$http', function($http){
        if (isLogged()){
            reroute('#/home'); console.log('not allowed here');
        } else {
            changeTitle('Ads - Log in');
            var self = this;
            self.username = "";
            self.password = "";

            self.logIn = function(){
                if (self.username == "" || self.password == ""){
                    showErrorMessage('Passwords don\'t match. -' + self.password + "-");
                } else {
                    $http.post(baseURL + '/user/Login', JSON.stringify({
                            username: self.username,
                            password: self.password
                        })).success(function(data){
                        localStorage.setItem('user-data', JSON.stringify(data));
                        console.log(data);
                        headers = {"Authorization" : "Bearer " +  data.access_token};


                        reroute('#/home-logged');
                        showInfoMessage('Successfully logged in.');

                    }).error(function(data){
                        console.error(data);
                    });
                }
            }
        }
    }]);

    adsControllers.controller('RegisterCtrl', ['$http', function($http){
        if (isLogged()){
            reroute('#/home'); console.log('not allowed here');
        } else {
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
            self.town = "";

            self.register = function(){

                if (self.username.trim() == ""){ errors.push('Username field can\'t be empty'); }
                if (self.password.trim() == ""){ errors.push('Password field can\'t be empty'); }
                if (self.email.trim() == ""){ errors.push('Email field can\'t be empty'); }
                if (self.phoneNumber.trim() == ""){ errors.push('Phone number field can\'t be empty'); }
                if (self.fullName.trim() == ""){ errors.push('Full name field can\'t be empty'); }

                if (errors.length > 0){
                    showErrorMessage(errors.join('<br>'));
                    errors = [];
                    return;
                }

                if (!ck_email.test(self.email)) { errors.push('Invalid email.'); }
                if (!ck_username.test(self.username)) { errors.push('Invalid username.'); }
                if (self.password != self.password2) { errors.push('Passwords don\'t match.'); }

                if (errors.length > 0){
                    showErrorMessage(errors.join('<br>'));
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
                        townId: self.town
                    })).success(function(data){
                        reroute('#/login');
                        showInfoMessage('Successfully registered. You can log in now.');
                }).error(function(data){
                    console.error(data);
                });
            }
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
        if (!isLogged()){
            reroute('#/home'); console.log('not allowed here');
        } else {
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
                        reroute('#user/ads');
                        showInfoMessage('Ad successfully created.');
                    }
                ).error(onError);
            };
        }

    }]);

    adsControllers.controller('AdEditorCtrl', ['$http', function($http){
        if (!isLogged()){
            reroute('#/home'); console.log('not allowed here');
        } else {
            var self = this;

            self.id = window.location.hash.substr(window.location.hash.lastIndexOf('/#')+2);
            self.adToEdit = {};
            self.action = 'edit';
            self.changeImage = false;
            self.newImage = '';

            $("#changeAdImage").click(function(){
                $("#chosenImage").click();
                self.changeImage = true;
                self.noImage = false;
            });

            $("#removeImage").click(function(){
                self.noImage = true;
                document.querySelector('.adImage img').removeAttribute('src');
                document.querySelector('.adImage img').src = 'images/no_image.png';
            });

            self.getAd = function(id){
                $http.get(baseURL + "user/ads/" + id, {headers:headers})
                    .success(function(data){
                        console.log(data);
                        self.adToEdit = data;
                        self.newCity = self.adToEdit.townId;
                        self.newCategory = self.adToEdit.categoryId;
                    })
                    .error(function(data){
                        console.error(data);
                    }
                );
            };

            self.deleteAd = function(){
                $http.delete(baseURL + 'user/ads/' + self.id, {"headers":headers}).success(function(){
                    reroute('#user/ads');
                    showInfoMessage('Ad successfully deleted.');
                }).error(onError);
            };

            self.editAd = function(title, text, changeImage, imageDataUrl, categoryId, townId){
                if (self.noImage == true){
                    $http.put(baseURL + 'user/ads/' + self.id, {
                        "title":title,
                        "text": text,
                        "changeImage" : true,
                        "categoryId" : categoryId,
                        "townId":townId
                    }, {"headers":headers}).success(function(){
                        reroute('#user/ads');
                        showInfoMessage('Ad successfully edited.');
                    }).error(onError);
                } else {
                    $http.put(baseURL + 'user/ads/' + self.id, {
                        "title":title,
                        "text": text,
                        "changeImage" : changeImage,
                        "imageDataUrl": imageDataUrl,
                        "categoryId" : categoryId,
                        "townId":townId
                    }, {"headers":headers}).success(function(){
                        reroute('#user/ads')
                        showInfoMessage('Ad successfully edited.');
                    }).error(onError);
                }
            };

            self.rePublish = function(){
                $http.put(baseURL + 'user/ads/PublishAgain/' + self.id, {},{"headers":headers})
                    .success(function(data){
                        reroute('#user/ads');
                        showInfoMessage('Ad republished successfully.');
                    }).error(onError);
            };

            self.deactivate = function(){
                $http.put(baseURL + 'user/ads/Deactivate/' + self.id, {},{"headers":headers})
                    .success(function(data){
                        reroute('#user/ads');
                        showInfoMessage('Ad deactivated successfully.');
                    }).error(onError);
            };

            self.doAction = function(){
                var sure;
                if (self.action == 'delete'){
                    sure = confirm('Delete ad?');
                    sure ? self.deleteAd() : reroute('#user/ads');
                } else if (self.action == 'edit'){
                    sure = confirm('Edit ad?');
                    sure ? self.editAd(
                        self.adToEdit.title,
                        self.adToEdit.text,
                        self.changeImage,
                        $('#dataUrl').val() || self.adToEdit.imageDataUrl,
                        self.newCategory,
                        self.newCity
                    ) : reroute('#user/ads');
                } else if (self.action == 'rePublish'){
                    sure = confirm('Republish ad?');
                    sure ? self.rePublish() : "";
                } else if (self.action == 'deactivate'){
                    sure = confirm('Deactivate ad?');
                    sure ? self.deactivate() : "";
                }

            };

            self.getAd(self.id);
        }
    }]);

    adsControllers.controller('EditProfileCtrl', ['$http', function($http){
        if (!isLogged()){
            reroute('#/home'); console.log('not allowed here');
        } else {
            var self = this;
            self.cancel = function(){
                reroute('#user/ads');
            };

            self.name = '';
            self.phoneNumber = '';
            self.townId = '';
            self.email = '';

            (self.loadUser = function(){
                $http.get(baseURL + "user/Profile", {headers:headers})
                    .success(function(data){
                        self.name = data.name;
                        self.phoneNumber = data.phoneNumber;
                        self.townId = data.townId;
                        self.email = data.email;
                    })
                    .error(function(data){
                        console.error(data);
                    }
                );
            }());

            self.updateUser = function(){
                $http.put(baseURL + "user/Profile", {
                    "name": self.name,
                    "email": self.email,
                    "phoneNumber": self.phoneNumber,
                    "townId": self.townId
                }, {headers:headers})
                    .success(function(data){
                        //console.log(data);
                        reroute('#user/ads');
                        showInfoMessage('Successfully edited profile.');
                    })
                    .error(function(data){
                        console.error(data);
                    }
                );
            }
        }

    }]);

    adsControllers.controller('ChangePasswordCtrl', ['$http', function($http){

        var self = this;

        self.oldPassword = '';
        self.password = '';
        self.confirmPassword = '';

        self.changePassword = function(){
            if (self.password != self.confirmPassword){
                showErrorMessage('Passwords don\'t match.');
            } else {
                $http.put(baseURL + 'user/ChangePassword',
                    {
                        "oldPassword": self.oldPassword,
                        "newPassword": self.password,
                        "confirmPassword": self.confirmPassword
                    } , {headers:headers})
                    .success(function(data){
                        console.log(data);
                        showInfoMessage('Password changed successfully.');
                    })
                    .error(onError);
            }
        }

    }]);

    adsControllers.controller('AdminCtrl', ['$http', function($http){
        if (!isAdmin()){
            reroute('#/home-logged'); console.log('not allowed here');
        } else {
            changeTitle('Ads - Admin panel');
            var self = this;
            self.toManage = 'pick';
            self.categories = [];
            self.towns = [];
            self.users = [];


            self.loadCategories = function(){
                $http.get(baseURL + 'categories').success(function(data){
                    self.categories = data;
                }).error(onError);
            };

            self.deleteCategories = function(id){
                $http.delete(baseURL + 'admin/Categories/' + id, {'headers': headers}).success(function(data){
                    self.loadCategories();
                    showInfoMessage('Category successfully deleted.');
                }).error(onError);
            };

            self.createCategory = function(name){
                $http.post(baseURL + 'admin/Categories', {
                    "name" : name
                },  {'headers': headers}).success(function(data){
                    showInfoMessage('Category "' + name + '" successfully created.');
                    self.loadCategories();
                    self.newCategoryName = '';
                }).error(onError);
            };

            self.editCategories = function(id){
                var newName = prompt("Enter new name for the category:");
                $http.put(baseURL + 'admin/Categories/' + id, {'name' : newName}, {'headers': headers}).success(function(data){
                    self.loadCategories();
                    showInfoMessage('Category successfully edited.');
                }).error(onError);
            };

            self.loadTowns = function(){
                $http.get(baseURL + 'towns').success(function(data){
                    self.towns = data;
                }).error(onError);
            };

            self.deleteTown = function(id){
                $http.delete(baseURL + 'admin/Towns/' + id, {'headers': headers}).success(function(data){
                    self.loadTowns();
                    showInfoMessage('Town successfully deleted.');
                }).error(onError);
            };

            self.createTown = function(name){
                $http.post(baseURL + 'admin/Towns', {
                    "name" : name
                },  {'headers': headers}).success(function(data){
                    showInfoMessage('Town "' + name + '" successfully created.');
                    self.loadTowns();
                    self.newTownName = '';
                }).error(onError);
            };

            self.editTown = function(id){
                var newName = prompt("Enter new name for the town:");
                $http.put(baseURL + 'admin/Towns/' + id, {'name' : newName}, {'headers': headers}).success(function(data){
                    self.loadTowns();
                    showInfoMessage('Town successfully edited.');
                }).error(onError);
            };

            self.loadUsers = function(){
                $http.get(baseURL + 'admin/Users?PageSize=50', {'headers' : headers}).success(function(data){
                    self.users = data.users;
                    console.log(data)
                }).error(onError);
            };

            self.deleteUser = function(id){
                $http.delete(baseURL + 'admin/Users/' + id, {'headers': headers}).success(function(data){
                    self.loadCategories();
                    showInfoMessage('User successfully deleted.');
                }).error(onError);
            };


            self.loadCategories();
            self.loadTowns();
            self.loadUsers();
        }
    }]);

}());
