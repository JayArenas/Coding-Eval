var app = angular.module("crudApp", ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<crud-app></crud-app>'
    })
    .when('/user/:userId', {
      template: '<user-details></user-details>'
    })
    .otherwise('/');
}]);


app.service("UserService", function () {
  var users = [];
  var id = 1;

  this.getUsers = function () {
    return users;
  };

  this.getUserById  = function () {
    if (users[i].id == user.id){
      var user  = user[i]
      console.log(user)
      return user;
  }
}

  this.addUser = function (user) {
    if (user.id == null) {
      user.id = id++;
    }

    users.push(angular.copy(user));
  };

  this.updateUser = function (updatedUser) {
    var index = users.findIndex((x) => x.id == updatedUser.id);

    for (i in users) {
      if (users[i].id == updatedUser.id) {
        users[index] = angular.copy(updatedUser);
      }
    }
  };

  this.deleteUser = function (user) {
    var index = users.indexOf(user);
    if (index !== -1) {
      users.splice(index, 1);
    }
  };

  this.viewUserDetails = function (user) {
    for (i in users) {
      if (users[i].id == user.id){
       var userId  = this.$routeParams = users[i].id
       return userId
      }
    }
  }

});

app.component("crudApp", {
  templateUrl: "./templates/eval-app.template.html",
  controller: [
    "UserService",
    function (UserService) {
      var $ctrl = this;

      $ctrl.users = UserService.getUsers();
      $ctrl.newUser = {};
      $ctrl.editingUser = null;

      $ctrl.addUser = function () {
        try {
          UserService.addUser($ctrl.newUser);
          $ctrl.newUser = {};
        } catch (error) {
          alert(error.message);
        }
      };

      $ctrl.editUser = function (user) {
        $ctrl.editingUser = angular.copy(user);
      };

      $ctrl.updateUser = function () {
        try {
          UserService.updateUser($ctrl.editingUser);
          $ctrl.editingUser = null;
        } catch (error) {
          alert(error.message);
        }
      };

      $ctrl.deleteUser = function (user) {
        UserService.deleteUser(user);
      };

      $ctrl.cancelEdit = function () {
        $ctrl.editingUser = null;
      };

      $ctrl.viewUserDetails = function (user) {
       var id = UserService.viewUserDetails(user);
       window.location('/user' + id)
      }
    },
  ],
});

app.component('userDetails', {
  templateUrl: 'user-info.template.html',
  controller: ['$routeParams', 'UserService', '$location', function ($routeParams, UserService) {
    var $ctrl = this;

    var userId = parseInt($routeParams.userId); 
    $ctrl.user = UserService.getUserById(userId)

  }]
});



