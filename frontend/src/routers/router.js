// src/routers/router.js

export default class Router {
    constructor(ObjectForDI, setState) {
        this.ObjectForDI = ObjectForDI;
        this.setState = setState;

        this.routes = this.defineRoute();
        this.cache = {};

        window.onpopstate = this.handlePopState.bind(this);
    }

    // addresses
    // add name | js path
    defineRoute() {
        return {
            '/error': () => this.loadComponent('/error'),
            '/entry': () => this.loadComponent('/entry'),
            '/login': () => this.loadComponent('/entry/login'),
            '/signup': () => this.loadComponent('/entry/signup'),
            '/main': () => this.loadComponent('/main'),
            '/franchisee': () => this.loadComponent('/main/franchisee'),
            '/franchiser': () => this.loadComponent('/main/franchiser'),
        }
    }

    navigate(path) {
        if (this.routes[path]) {
            this.routes[path]();
            window.history.pushState({}, "", path);
            this.setState({ locate: path });
        } else {
            console.error('Invalid path');
        }
    }

    handlePopState() {
        const path = window.location.pathname;
        if (this.routes[path]) {
            this.routes[path]();
        } else {
            console.alert('Invalid path');
        }
    }

    async loadComponent(componentName) {
        try {
            if (this.cache[componentName]) {
                const cachedComponent = this.cache[componentName];
                cachedComponent.renderSequnce(this.ObjectForDI.state);
                return;
            }

            const { default: Component } = await import(`../apps${componentName}.js`);
            const componentInstance = new Component(this.ObjectForDI);

            this.cache[componentName] = componentInstance;

            componentInstance.renderSequnce(this.ObjectForDI.state);
            
        } catch (error) {
            console.error(`Failed to load component: ${componentName}`, error);
            this.$parent.innerHTML = `<p>Page not found</p>`;
        }
    }
}