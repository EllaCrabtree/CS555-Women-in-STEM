import React from 'react'
import Auth from './Auth'

describe('<Auth />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Auth />)
  })
})