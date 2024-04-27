// src/routes.ts

// pages
import Login from "./pages/login/Auth";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
// import About from "./pages/About";

import { IRoute } from './interfaces'
import Category from "./pages/Category";
import Thematic from "./pages/Thematic";
import Content from "./pages/Content";

export const routes: Array<IRoute> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'login-route',
        title: 'Login',
        path: '/auth',
        enabled: true,
        component: Login
    },
    
    {
        key: 'about-route',
        title: 'Detail',
        path: '/detail/:id',
        enabled: true,
        component: Detail
    },
    {
        key: 'category-route',
        title: 'Category',
        path: '/category',
        enabled: true,
        component: Category
    },
    {
        key: 'thematic-route',
        title: 'Thematic',
        path: '/thematic',
        enabled: true,
        component: Thematic
    },
    {
        key: 'content-route',
        title: 'Content',
        path: '/content',
        enabled: true,
        component: Content
    }
]