milestonesApp.controller("DashBoardCtrl", ['$rootScope','$scope', '$routeParams', 'User','List', 'Post', '$location','$http','$parse',
  function($rootScope,$scope,$routeParams,User,List,Post,$location,$http,$parse) {

    var boardId = "1"; // By Default Taking Only One Board.
    /*if ($rootScope.authenticated == true) {*/

    $scope.defaultList = []; //default List Holder
    $scope.lists = []; //total List Holder

    $scope.activePost = {};

    $scope.itemInfo = function(item){
      $scope.activePost = item;
      console.log("***************", $scope.activePost);
    }

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
          boardId: boardId
        }, function (err, data) {
          if (err) {
            console.log(err);
          }
          $scope.lists.push({listName: $scope.listData.name, listDescription: $scope.listData.data, boardId: boardId});
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
      Post.create({title: $scope.postData.name,content:$scope.postData.data,stage:"list1",boardId:boardId}, function (err,data) {
        if(err){
          console.log(err);
        }
        $scope.defaultList.push({title: $scope.postData.name,content:$scope.postData.data,stage:"list1",boardId:boardId});
        $scope.postData = {};
      });
    };

    $scope.deleteList=function(ele){
       List.delete({id:ele.id},function(lists){
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
        $scope.editPostData = {};
        $scope.editMode = false;
      });
    }

    $scope.deletePost=function(ele){
      Post.delete({id:ele.id},function(posts){
        $scope.editMode = false;
      });
    }

    $scope.togglePost = function(ele){
      $scope.editMode = ele;
    }

    function loadLists(){
        List.getLists({boardId: boardId}, function (lists) {
          $scope.lists = lists;
          angular.forEach($scope.lists, function (item) {
            var listName = item.listArr;
            $scope[listName] = [];
          });
        });
    }

    function loadPosts(){
      Post.getPosts({boardId:boardId}, function (posts) {
        for(var i=0;i<posts.length;i++){
          if(posts[i].stage == 'list2'){
            $scope.list1.push(posts[i]);
          }else if(posts[i].stage == 'list3'){
            $scope.list2.push(posts[i]);
          }else if(posts[i].stage == 'list4'){
            $scope.list3.push(posts[i]);
          }else {
            $scope.defaultList.push(posts[i]);
          }
        }
      });
    };

    $scope.dropCallback = function(event,ui,element,item) {
      var obj = {stage: element.listArr};
      Post.prototype$updateAttributes({id: $scope.activePost.id}, obj, function (posts) {
        console.log("Updated Post: ",posts)
      });
    };

    $scope.error = false;
    var presentUser = $rootScope.currentUser;

  /*  } else {
        $location.path("/login");
        $scope.error = true;
    }*/

}]);
