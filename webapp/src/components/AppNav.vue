<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">MTSU CS Projects</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation" style="">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor03">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Projects</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/CreateProject">Create</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
        <button class="btn btn-danger my-2 my-sm-0 btn-margin-left" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <button class="btn btn-info my-2 my-sm-0 btn-margin-left" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <!-- <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
          <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button> -->
        </li>
      </ul>

    </div>
  </nav>

  <!-- <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand"> The Ultimate Project Battle Ground</router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out </button>
        <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button>
      </li>
    </ul>
  </nav> -->
</template>

<script>
import { isLoggedIn, login, logout } from '../../utils/auth';

export default {
  name: 'app-nav',
  methods: {
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .navbar-right { margin-right: 0px !important} */

.btn-margin-left {
    margin-left: 2px;
}
.btn-margin-right {
    margin-right: 2px;
}

.log {
  margin: 5px 10px 0 0;
}
</style>
