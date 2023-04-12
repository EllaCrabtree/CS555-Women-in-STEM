import React from "react";
import Projects from "../../pages/projects";

describe("<Projects />", () => {
    it("renders", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Projects />);
    });
});
