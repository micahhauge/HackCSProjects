<template>
  <div>
    <app-nav></app-nav>
    <div class="container">
    <div class="text-center">
      <h3 class="" id="title">Create a Project</h3>
    </div>

    <div class="row">
      <div class="col-6 mx-auto">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label> Project Name: </label>
            <input class="form-control" v-model="project.name"/>
          </div>

          <div class="form-group">
            <label> Project Description: </label>
            <textarea class="form-control" id="exampleTextarea" rows="10" v-model="project.description"></textarea>
          </div>
          <button type="submit" class="btn btn-success">Create Project</button>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import AppNav from './AppNav';
import { isLoggedIn, getProfile } from '../../utils/auth';
import { postProject } from '../../utils/projects-api';

export default {
  name: 'privateBattles',
  components: {
    AppNav,
  },
  data() {
    return {
      project: {
        name: '',
        description: '',
        creator_name: "",
	      creator_id: "",
        // password: '',
      },
    };
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    },
    postProject() {
      return postProject();
    },
    handleSubmit() {
      // Send data to the server or update your stores and such.
      postProject(this.project)
        .then( () => { this.$router.push('/') });
    }
  },
  mounted() {
    // this.getPrivateProjects();
    getProfile((profile) => {
      this.$set(this.project, 'creator_name', profile.name)
      this.$set(this.project, 'creator_id', profile.sub)

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
