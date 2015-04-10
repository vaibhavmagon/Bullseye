milestonesApp.controller("DashBoardCtrl", function($rootScope,$scope, $http) {

    /*if ($rootScope.authenticated == true) {*/

        $scope.timeRanges = [
            {
                "name":"January",
                "quarter":"1",
                "completeness":"done",
                "tasksCompleted" : 40,
                "starPerformers" : [] //users

            },
            {
                "name":"February",
                "quarter":"1",
                "completeness":"done",
                "tasksCompleted" : 28
            },
            {
                "name":"March",
                "quarter":"1",
                "completeness":"done",
                "tasksCompleted" : 30
            },
            {
                "name":"April",
                "quarter":"2",
                "completeness":"active",
                "tasksCompleted" : 35
            },
            {
                "name":"May",
                "quarter":"2",
                "completeness":"",
                "tasksCompleted" : 12
            },{
                "name":"June",
                "quarter":"2",
                "completeness":"",
                "tasksCompleted" : 40
            },
            {
                "name":"July",
                "quarter":"3",
                "completeness":"",
                "tasksCompleted" : 50
            },
            {
                "name":"August",
                "quarter":"3",
                "completeness":"",
                "tasksCompleted" : 13
            },
            {
                "name":"September",
                "quarter":"3",
                "completeness":"",
                "tasksCompleted" : 17
            },
            {
                "name":"October",
                "quarter":"4",
                "completeness":"",
                "tasksCompleted" : 21
            },
            {
                "name":"November",
                "quarter":"4",
                "completeness":"",
                "tasksCompleted" : 29
            },
            {
                "name":"December",
                "quarter":"4",
                "completeness":"",
                "tasksCompleted" : 18
            }

        ];
        var itrmArr = [];
        for(var i=0;i<$scope.timeRanges.length;i++){
            var obj={name:$scope.timeRanges[i].name,data:[$scope.timeRanges[i].tasksCompleted]};
            itrmArr.push(obj);
        }

        var options = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'User Module',
                x: -20 //center
            },
            xAxis: {
                title: {
                    text: 'Post Stats'
                },
                categories: ['Post Data']
            },
            yAxis: {
                title: {
                    text: 'Id associated'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: itrmArr
        };

        $('#container').highcharts(options);

        $scope.activeTimeRange = $scope.timeRanges[0];

        $scope.activeTimeRangeFunction = function(item){
            $scope.activeTimeRange = item;
        };

        $scope.editMilestone = function(item){
            console.log("%%%%%%%%%%%%%%%%%%",item);
        };

        $scope.list1 = [];
        $scope.list2 = [];
        $scope.list3 = [];

        $scope.list5 = [
            { 'title': 'Item 1', 'drag': true },
            { 'title': 'Item 2', 'drag': true },
            { 'title': 'Item 3', 'drag': true },
            { 'title': 'Item 4', 'drag': true },
            { 'title': 'Item 5', 'drag': true },
            { 'title': 'Item 6', 'drag': true },
            { 'title': 'Item 7', 'drag': true },
            { 'title': 'Item 8', 'drag': true }
        ];

        // Limit items to be dropped in list1
        $scope.optionsList1 = {
            accept: function(dragEl) {
                if ($scope.list1.length >= 2) {
                    return false;
                } else {
                    return true;
                }
            }
        };

        $scope.error = false;
        var presentUser = $rootScope.currentUser;

    /** DashBoard API Hit **/

        /*$http({
            url: "http://localhost:3000/getLandingFeed/" + presentUser.userId + "/0",
            method: "GET",
            crossDomain : true
        }).success(function(data,status,headers,config){
            if(data.message == "Success") {
                $scope.users=data;
            }else{
                $scope.message = data.message;
            }
        }).error(function(data,status,headers,config){
            console.log("Error In getLandingFeed",data);
            $scope.message = data.message;
        });*/


    /*** milestones Show API Hit ***/

       /* $http({
            url: "http://localhost:3000/webLandingPage/" + presentUser.userId,
            method: "GET",
            crossDomain : true
        }).success(function(data,status,headers,config){
                $scope.listMilestones = data;
        }).error(function(data,status,headers,config){
            console.log("Error In webLandingPage",data);
            $scope.message = data.message;
        });*/
        

  /*  } else {
        $location.path("/login");
        $scope.error = true;
    }*/

});
