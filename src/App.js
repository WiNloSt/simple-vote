import React from 'react'
import { Router } from 'react-static'
import styled, { injectGlobal } from 'styled-components'
import 'normalize.css'
import Routes from 'react-static-routes'

injectGlobal`
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    padding: 0;
    color: #555;
  }
`

const Header = styled.header`
  background: #4bf;
  color: #fff;
  text-align: center;
  padding: 1rem;
`
const Container = styled.div`
  padding: 0.5rem;
`

export default () => (
  <Router>
    <div>
      <Header>Just a typical voting app</Header>
      <Container>
        <Routes />
      </Container>
    </div>
  </Router>
)
