import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import Books from './components/Books';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            name: 'books',
            path: '/books',
            component: Books
        },
        {
            name: 'addbook',
            path: '/books/add',
            component: AddBook
        },
        {
            name: 'editbook',
            path: '/books/edit/:id',
            component: EditBook
        },
    ]
});

export default router;