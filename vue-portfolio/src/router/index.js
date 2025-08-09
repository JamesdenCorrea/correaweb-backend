import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../pages/HomePage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import ProjectDetail from '../pages/ProjectDetail.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Homepage,
    meta: {
      title: 'Jamesden Correa - Full Stack Developer',
      description: 'Passionate full-stack web developer with expertise in modern web technologies. Explore my projects and get in touch!'
    }
  },
  { 
    path: '/projects', 
    name: 'Projects', 
    component: ProjectsPage,
    meta: {
      title: 'Projects - Jamesden Correa',
      description: 'Discover my latest web development projects and technical implementations.'
    }
  },
  { 
    path: '/projects/:id', 
    name: 'ProjectDetail', 
    component: ProjectDetail, 
    props: true,
    meta: {
      title: 'Project Details - Jamesden Correa',
      description: 'Detailed view of my web development project.'
    }
  },
  {
    // Catch-all route for 404 pages
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
    meta: {
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Enhanced scroll behavior for smooth navigation
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (from browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    
    // If navigating to a hash anchor
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Account for sticky header
      }
    }
    
    // For route changes, scroll to top smoothly
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

// Global navigation guards for meta tags and analytics
router.beforeEach((to, from, next) => {
  // Update document title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
  
  // Close mobile menu if open (helps with navigation UX)
  const body = document.body
  if (body.classList.contains('menu-open')) {
    body.classList.remove('menu-open')
  }
  
  next()
})

// After navigation completes
router.afterEach((to, from) => {
  // Add a small delay to ensure DOM is ready for any scroll operations
  setTimeout(() => {
    // If there's a hash in the URL, scroll to that element
    if (to.hash) {
      const element = document.querySelector(to.hash)
      if (element) {
        const headerHeight = 80 // Account for sticky header
        const elementPosition = element.offsetTop - headerHeight
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
      }
    }
  }, 100)
})

export default router