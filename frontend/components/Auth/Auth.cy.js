import React from "react";
import Auth from "./Auth";

describe("<Auth />", () => {
    it("valid", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Auth />);

        // see: https://on.cypress.io/using-cypress-faq#How-do-I-get-the-body-element
        cy.get("body").should("contain", "Login to Amaterasu");

        // Log into the app
        cy.get("input[type=email]").type("atilla@stevens.edu");
        cy.get("input[type=password]").type("Password1");

        // Click the login button
        cy.get("button").click();
    });

    it("invalid email", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Auth />);

        // see: https://on.cypress.io/using-cypress-faq#How-do-I-get-the-body-element
        cy.get("body").should("contain", "Login to Amaterasu");

        // Log into the app
        cy.get("input[type=email]").type("kdfvsklfdj");
        cy.get("input[type=password]").type("password");
    });

    it("invalid password", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Auth />);

        // see: https://on.cypress.io/using-cypress-faq#How-do-I-get-the-body-element
        cy.get("body").should("contain", "Login to Amaterasu");

        // Log into the app
        cy.get("input[type=email]").type("atilla@stevens.edu");
        cy.get("input[type=password]").type("_");
    });

    it("missing email", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Auth />);

        // see: https://on.cypress.io/using-cypress-faq#How-do-I-get-the-body-element
        cy.get("body").should("contain", "Login to Amaterasu");

        // Log into the app
        cy.get("input[type=email]").type("");
        cy.get("input[type=password]").type("password");
    });

    it("missing password", () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Auth />);

        // see: https://on.cypress.io/using-cypress-faq#How-do-I-get-the-body-element
        cy.get("body").should("contain", "Login to Amaterasu");

        // Log into the app
        cy.get("input[type=email]").type("atilla@stevens.edu");
        cy.get("input[type=password]").type("");
    });
});
