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
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            }).state('user-ads', {
                url: "/user/ads",
                views: {
                    "mainView": { templateUrl: "./partials/all-ads.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            }).state('user-ads-publish', {
                url: "/user/ads/publish",
                views: {
                    "mainView": { templateUrl: "./partials/publish-ad.html" },
                    "left-side-view": { templateUrl: "./partials/left-side-panel-loged.html" },
                    "right-side-view": { templateUrl: "./partials/right-side-panel.html" },
                    "header" : { templateUrl: "./partials/header-logged.html"}
                }
            })
    });
}());