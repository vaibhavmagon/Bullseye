milestonesApp.controller("DashBoardCtrl", ['$rootScope','$scope', '$routeParams', 'User','List', 'Post', '$location','$http','$parse',
  function($rootScope,$scope,$routeParams,User,List,Post,$location,$http,$parse) {

    var boardId = "1";
    /*if ($rootScope.authenticated == true) {*/

    $scope.defaultList = [];
    $scope.lists = [];
   /* $scope.list1 = [];
    $scope.list2 = [];
    $scope.list3 = [];*/

    $scope.editMode = false;

    var lists = loadLists();

    var posts = loadPosts();

    $scope.listData = {};
    $scope.listData.data = "";
    $scope.listData.name = "";

    $scope.submitList=function(){
      if($scope.lists.length < 4) {
        List.create({
          listName: $scope.listData.name,
          listDescription: $scope.listData.data,
          boardId: "1"
        }, function (err, data) {
          if (err) {
            console.log(err);
          }
          $scope.lists.push({listName: $scope.listData.name, listDescription: $scope.listData.data, boardId: "1"});
          loadLists();
          $scope.listData = {};
        });
      }else{
        alert("Maximum Reached!!! Cant be more than 4 lists in one board");
      }
    };

    $scope.postData = {};
    $scope.postData.data = "";
    $scope.postData.name = "";

    $scope.submitPost=function(){
      Post.create({title: $scope.postData.name,content:$scope.postData.data,stage:"isDiscussion",boardId:"1"}, function (err,data) {
        if(err){
          console.log(err);
        }
        $scope.defaultList.push({title: $scope.postData.name,content:$scope.postData.data,stage:"isDiscussion",boardId:"1"});
        loadPosts();
        $scope.postData = {};
      });
    };

    $scope.deleteList=function(ele){
       List.delete({id:ele.id},function(lists){
         loadLists();
       });
    }

    $scope.editPostData = {};
    $scope.editPostData.content = "";
    $scope.editPostData.title = "";

    $scope.editMilestone = function(item){
      $("#editModal").modal("show");
      $scope.editPostData.content = item.content;
      $scope.editPostData.title = item.title;
      $scope.editPostData.stage = item.stage;
      $scope.editPostData.id = item.id;
      $scope.editPostData.boardId = item.boardId;
    };

    $scope.editSavePost = function(editPostData){
      Post.prototype$updateAttributes({id: editPostData.id}, editPostData, function (resp) {
        loadPosts();
        $scope.editPostData = {};
        $scope.editMode = false;
      });
    }

    $scope.deletePost=function(ele){
      List.delete({id:ele.id},function(lists){
        loadPosts();
        $scope.editMode = false;
      });
    }

    $scope.togglePost = function(ele){
      $scope.editMode = ele;
    }

    var arrList = [];
    function loadLists(){
        List.getLists({boardId: boardId}, function (lists) {
          $scope.lists = lists;
          angular.forEach($scope.lists, function (item) {
            var listName = item.listArr;
            arrList.push(listName);
            $scope[listName] = [];
          });
        });
    }

    function loadPosts(){
      Post.getPosts({boardId:boardId}, function (posts) {
        $scope.defaultList = posts;
      });
    };

    $scope.dropCallback = function(event, ui) {
      for(var i=0;i<arrList.length;i++){
        var listName = arrList[i];
        console.log($scope[listName]);
        var length = $scope[listName].length;
        if(length){
          length = length+1;
          console.log("$$$$$$$$$$$$$",listName);
        }
      }
      console.log('hey, you dumped me :-(' , ui);
    };

    $scope.error = false;
    var presentUser = $rootScope.currentUser;

  /*  } else {
        $location.path("/login");
        $scope.error = true;
    }*/

}]);
