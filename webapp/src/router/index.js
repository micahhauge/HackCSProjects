import Vue from 'vue';
import Router from 'vue-router';
import PrivateProjects from '@/components/PrivateProjects';
import PublicProjects from '@/components/publicProjects';
import CreateProject from '@/components/CreateProject';
import Callback from '@/components/callback';
import { requireAuth } from '../../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PublicProjects',
      component: PublicProjects,
    },
    {
      path: '/CreateProject',
      name: 'Create Project',
      beforeEnter: requireAuth,
      component: CreateProject,
    },
    {
      path: '/PrivateProjects',
      name: 'PrivateProjects',
      beforeEnter: requireAuth,
      component: PrivateProjects,
    },
    {
      path: '/callback',
      component: Callback,
    },
  ],
});
