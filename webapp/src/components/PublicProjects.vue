<template>
  <div>
    <app-nav></app-nav>
    <div class="container">
      <h3 class="" id="title">Explore Projects</h3>
    <hr/>

    <div class="row">

    <div class="col-sm-4" v-for="project in publicProjects">
      <div class="card border-light mb-3" style="max-width: 20rem;">
        <div class="card-header">{{ project.name }}</div>
        <div class="card-body">
          <h4 class="card-title">{{ project.name }}</h4>
          <p class="card-text"> Creator: {{ project.creator_name }}</p>
          <p class="card-text"> {{ project.description }}</p>
          <div class="btn-group float-left">
            <button class="btn btn-primary">More Info</button>
            <button class="btn btn-primary">Join Project</button>
          </div>
        </div>
      </div>
    </div>

    </div>

    <div class="col-sm-12">
      <div class="jumbotron text-center" v-if="isLoggedIn()">
        <h2>View Private Projects</h2>
        <router-link class="btn btn-lg btn-success" to="/private-projects">Private Projects</router-link>
      </div>
      <div class="jumbotron text-center" v-else>
        <h2>Create a Project by Logging In</h2>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import { isLoggedIn, getProfile } from '../../utils/auth';
import { getPublicProjects } from '../../utils/projects-api';

export default {
  name: 'publicProjects',
  components: {
    AppNav,
  },
  data() {
    return {
      publicProjects: '',
    };
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    getPublicProjects() {
      getPublicProjects().then((projects) => {
        this.publicProjects = projects;
      });
    },
  },
  mounted() {
    this.getPublicProjects();
    getProfile((user) => {
      console.log(user);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #title {
    padding-top: 30px;
  }
</style>
