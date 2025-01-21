// src/apps/main.js

import Component from "../core/component.js";

export default class Main extends Component {
    constructor(ObjectForDI) {
        super(ObjectForDI);

        this.auth = ObjectForDI.state.authed;
        console.log(this.auth);
        console.log("main loaded")
        if (this.auth === 1) {
            this.router.navigate("/franchiser");
        } else if (this.auth === 2) {
            this.router.navigate("/franchisee");
        } else {
            this.router.navigate("/error");
        }
    }

    template() {}

    #render() {}

    setEvent() {}

    renderSequnce(state) {}
}