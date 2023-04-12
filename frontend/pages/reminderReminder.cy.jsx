import React from 'react'
import Reminder from './reminder'

describe('<Reminder />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Reminder />)
  })
})