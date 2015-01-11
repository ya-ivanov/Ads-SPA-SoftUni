'use-strict';

(function(){
    var adsApp = angular.module('adsApp', [
        'ui.router',
        'adsControllers'
    ]);
    adsApp.config(function($stateProvider) {
        $stateProvider
            .state('home', {
                url: "/home",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header.html"}
                }
            })
            .state('logIn', {
                url: "/login",
                views: {
                    "mainView": { templateUrl: "./partials/login-view.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header.html"}
                }
            })
            .state('register', {
                url: "/register",
                views: {
                    "mainView": { templateUrl: "./partials/register-view.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header.html"}
                }
            })
            .state('index', {
                url: "",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header.html"}
                }
            })
            .state('home-logged', {
                url: "/home-logged",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            })
            .state('user-ads', {
                url: "/user/ads",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            })
            .state('user-ads-publish', {
                url: "/user/ads/publish",
                views: {
                    "mainView": { templateUrl: "./partials/publish-ad.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            })
            .state('user-ads-edit', {
                url: "/user/ads/edit/",
                views: {
                    "mainView": { templateUrl: "./partials/edit-ad.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            })
            .state('user-profile-edit', {
                url: "/user/profile",
                views: {
                    "mainView": { templateUrl: "./partials/edit-profile.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"},
                    "right-side-view": { templateUrl: "./partials/change-password.html" }
                }
            })
            .state('admin-panel', {
                url: "/admin/panel",
                views: {
                    "mainView": { templateUrl: "./partials/admin-panel.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            })
            .state('ads-by-category', {
                url: "/home/category/",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel.html" },
                    "header" : { templateUrl: "./partials/header.html"},
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" }

                }
            })
            .state('ads-by-category-logged', {
                url: "/home-logged/category/",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"},
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" }
                }
            })
            .state('ads-by-category-logged-user', {
                url: "/user/ads/category/",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"},
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" }

                }
            })
    });
}());


function changeTitle(title){
    document.title = title;
    document.querySelector('header > h1').innerHTML = title;
}

function reroute(newRoute){
    window.location.href = window.location.pathname + newRoute;
}

function noImage(elem){
    elem.setAttribute('src', 'images/no_image.png');
}

function onSuccess(data){
    console.log(data);
}

function onError(data){
    showErrorMessage(data.message || data);
    console.log(data);
}

function isLogged(){
    return localStorage.getItem('user-data') ? true : false;
}

function isAdmin(){
    try {
        return JSON.parse(localStorage.getItem('user-data')).isAdmin ? true : false;
    } catch(E) { return false}
}

function showErrorMessage(msg) {
    noty({
            text: msg,
            type: 'error',
            layout: 'topCenter',
            timeout: 3000}
    );
}

function showInfoMessage(msg) {
    noty({
            text: msg,
            type: 'info',
            layout: 'topCenter',
            timeout: 3000}
    );
}

function usernameClick(){
    !isAdmin() ? window.location.href = '#/user/ads' : window.location.href = '#/admin/panel';
}

try {var headers = {
    "Authorization": "Bearer " + JSON.parse(localStorage.getItem('user-data')).access_token
};}catch (E){}
