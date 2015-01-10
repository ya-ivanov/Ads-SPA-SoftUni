'use-strict';

(function(){
    var adsApp = angular.module('adsApp', [
        'ui.router',
        'adsControllers'
    ]);

    var leftSide = (JSON.parse(localStorage.getItem('user-data')).isAdmin == "true"  ? "./partials/left-side-panel-admin.html" : "./partials/left-side-panel-loged.html") ;


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
            }).state('logIn', {
                url: "/login",
                views: {
                    "mainView": { templateUrl: "./partials/login-view.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header.html"}
                }
            }).state('register', {
                url: "/register",
                views: {
                    "mainView": { templateUrl: "./partials/register-view.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header.html"}
                }
            }).state('index', {
                url: "",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header.html"}
                }
            }).state('home-logged', {
                url: "/home-logged",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: leftSide },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            }).state('user-ads', {
                url: "/user/ads",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: leftSide },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            }).state('user-ads-publish', {
                url: "/user/ads/publish",
                views: {
                    "mainView": { templateUrl: "./partials/publish-ad.html" },
                    "left-side-view": { templateUrl: leftSide },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            }).state('user-ads-edit', {
                url: "/user/ads/edit/",
                views: {
                    "mainView": { templateUrl: "./partials/edit-ad.html" },
                    "left-side-view": { templateUrl: leftSide },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            }).state('user-profile-edit', {
                url: "/user/profile",
                views: {
                    "mainView": { templateUrl: "./partials/edit-profile.html" },
                    "left-side-view": { templateUrl: leftSide },
                    "header" : { templateUrl: "./partials/header-logged.html"},
                    "right-side-view": { templateUrl: "./partials/change-password.html" }
                }
            }).state('admin-panel', {
                url: "/admin/panel",
                views: {
                    "mainView": { templateUrl: "./partials/admin-panel.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-admin.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            })

    });
}());

