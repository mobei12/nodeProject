/**
 * Created by jjh on 2017/6/28.
 * angular练习
 */
angular.module('x-admin', []).
controller('x-controller', function ($scope, $http) {
    $scope.currentUser="ZhangSan";
    $scope.content = '/welcome.html';

    $scope.menus = [
        {
            text: "系统管理",
            enabled: true,
            subMenus:[
                {
                    text: "用户管理",
                    enabled: true,
                    action:"/login.html"
                },
                {
                    text: "角色管理",
                    enabled: true,
                    action:"/role"
                },
                {
                    text: "权限管理",
                    enabled: true,
                    action:"/access"
                }
            ]
        },
        {
            text: "内容管理",
            enabled: true,
            subMenus:[
                {
                    text: "直播监控",
                    enabled: true,
                    action:"/stream-monitor"
                },
                {
                    text: "预约管理",
                    enabled: true,
                    action:"/book-mgr"
                }
            ]
        },
        {
            text: "推送管理",
            enabled: true,
            subMenus:[
                {
                    text: "推送列表",
                    enabled: true,
                    action:"/push-list"
                },
                {
                    text: "新增推送",
                    enabled: true,
                    action:"/add-push"
                }
            ]
        }
    ];

    $scope.setContent = function(action){
        console.log(action);
        $scope.content=action;
    };
});