// src/apps/main.js

import Component from "../core/component.js";

export default class Main extends Component {
    constructor(ObjectForDI) {
        super(ObjectForDI);

        this.auth = this.state.authed;
        this.page
        if (this.auth === 1) {
            this.router.navigate("/franchiser");
            return ;
        } else if (this.auth === 2) {
            this.router.navigate("/franchisee");
            return ;
        } else {
            this.router.navigate("/entry");
            return ;
        }
    }

    template() {
        return '';
    }
}