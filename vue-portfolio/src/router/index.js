import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../pages/HomePage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import ProjectDetail from '../pages/ProjectDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Homepage },
  { path: '/projects', name: 'Projects', component: ProjectsPage },
  { path: '/projects/:id', name: 'ProjectDetail', component: ProjectDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
