import React from "react";
import Project from "../../pages/project/[projectId]/index";

describe("<Project />", () => {
    it("renders", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Project />);
    });
});
