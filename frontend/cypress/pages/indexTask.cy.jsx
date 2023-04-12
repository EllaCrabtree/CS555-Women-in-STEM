import React from "react";
import Task from "../../pages/project/[projectId]/task/[taskId]/index";

describe("<Task />", () => {
    it("renders", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Task />);
    });
});
