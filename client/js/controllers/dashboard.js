milestonesApp.controller("DashBoardCtrl", ['$rootScope','$scope', '$routeParams', 'TrelloUser','List', 'Post','Board','$location','$http','$parse',
  function($rootScope,$scope,$routeParams,TrelloUser,List,Post,Board,$location,$http,$parse) {

    if ($rootScope.authenticated == true) {

      $scope.error = false;
      var presentUser = $rootScope.currentUser;
      var boardId;

      var socket = io.connect();
      $('form').submit(function(){
        var element = $('#m').val().trim();
        if(element != '') {
          socket.emit('chat message', element);
          element = $('#m').val('');
        }
        return false;
      });
      socket.on('new', function(msg){
        if(msg) {
          $('#messages').append($('<li>').text(msg));
        }
      });

      Board.getBoards({email: $rootScope.currentUser.email}, function (boards) {
        $scope.boards = boards;
        $scope.selectedBoard = boards[0];
        boardFunc(boards[0]);
      });

      $scope.boardIdVal = function(board){
        $scope.selectedBoard = board;
        boardFunc(board);
      };

      function boardFunc(board){
        if(board){
          boardId = board.boardId;
        }else{
          boardId = "1";
        }
        DetailPage(boardId);
      }

      function DetailPage(boardId) {
        $scope.defaultList = []; //default List Holder
        $scope.lists = []; //total List Holder

        $scope.activePost = {};

        $scope.itemInfo = function (item) {
          $scope.activePost = item;
        }

        $scope.editMode = false;

        var lists = loadLists();

        var posts = loadPosts();

        $scope.listData = {};
        $scope.listData.data = "";
        $scope.listData.name = "";

        $scope.submitList = function () {
          if ($scope.lists.length < 4) {
            List.create({
              listName: $scope.listData.name,
              listDescription: $scope.listData.data,
              boardId: boardId
            }, function (err, data) {
              if (err) {
                console.log(err);
              }
              $scope.lists.push({
                listName: $scope.listData.name,
                listDescription: $scope.listData.data,
                boardId: boardId
              });
              $scope.listData = {};
            });
          } else {
            alert("Maximum Reached!!! Cant be more than 4 lists in one board");
          }
        };

        $scope.postData = {};
        $scope.postData.data = "";
        $scope.postData.name = "";

        $scope.submitPost = function () { // by default creating it in list 1
          Post.create({
            title: $scope.postData.name,
            content: $scope.postData.data,
            stage: "list1",
            boardId: boardId
          }, function (err, data) {
            if (err) {
              console.log(err);
            }
            $scope.defaultList.push({
              title: $scope.postData.name,
              content: $scope.postData.data,
              stage: "list1",
              boardId: boardId
            });
            $scope.postData = {};
          });
        };

        $scope.deleteList = function (ele) { // deleting posts as well with lists in this scenario.
          Post.find({"filter": {"where": {"stage": ele.listArr}}}, function (posts) {
            for (var i = 0; i < posts.length; i++) {
              Post.delete({id: posts[i].id}, function (posts) {
                $scope.editMode = false;
                $scope[ele.stage].splice(1, 1);
              });
            }
            List.delete({id: ele.id}, function (lists) {
              loadLists();
            });
          });
        }

        $scope.editPostData = {};
        $scope.editPostData.content = "";
        $scope.editPostData.title = "";

        $scope.editMilestone = function (item) {
          $("#editModal").modal("show");
          $scope.editPostData.content = item.content;
          $scope.editPostData.title = item.title;
          $scope.editPostData.stage = item.stage;
          $scope.editPostData.id = item.id;
          $scope.editPostData.boardId = item.boardId;
        };

        $scope.editSavePost = function (editPostData) {
          Post.prototype$updateAttributes({id: editPostData.id}, editPostData, function (resp) {
            $scope.editPostData = {};
            $scope.editMode = false;
          });
        }

        $scope.deletePost = function (ele) {
          Post.delete({id: ele.id}, function (posts) {
            $scope.editMode = false;
            $scope[ele.stage].splice(1, 1);
          });
        }

        $scope.togglePost = function (ele) {
          $scope.editMode = ele;
        }

        function loadLists() {
          List.getLists({boardId: boardId}, function (lists) {
            $scope.lists = lists;
            angular.forEach($scope.lists, function (item) {
              var listName = item.listArr;
              $scope[listName] = [];
            });
          });
        }

        function loadPosts() {
          Post.getPosts({boardId: boardId}, function (posts) {
            if (posts.length > 0) {
              for (var i = 0; i < posts.length; i++) {
                if (posts[i].stage == 'list1') {
                  $scope.defaultList.push(posts[i]);
                } else if (posts[i].stage == 'list2') {
                  $scope.list1.push(posts[i]);
                } else if (posts[i].stage == 'list3') {
                  $scope.list2.push(posts[i]);
                } else if (posts[i].stage == 'list4') {
                  $scope.list3.push(posts[i]);
                }
              }
            }
          });
        };

        $scope.dropCallback = function (event, ui, element, item) {
          var obj = {stage: element.listArr};
          Post.prototype$updateAttributes({id: $scope.activePost.id}, obj, function (posts) {
            console.log("Updated Post: ", posts)
          });
        };
      }

    } else {
        $location.path("/login");
        $scope.error = true;
    }

}]);
