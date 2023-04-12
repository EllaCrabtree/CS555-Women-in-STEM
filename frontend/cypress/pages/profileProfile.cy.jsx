import React from "react";
import Profile from "../../pages/profile";

describe("<Profile />", () => {
    it("renders", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Profile />);
    });
});
