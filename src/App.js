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
    min-width: 300px;
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`

const Header = styled.header`
  position: absolute;
  width: 100%;
  height: 3rem;
  background: #4bf;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  padding: 0.5rem;
  padding-top: 4rem;
`

export default () => (
  <Router>
    <div>
      <Header>
        <span>Just a typical voting app</span>
      </Header>
      <Container>
        <Routes />
      </Container>
    </div>
  </Router>
)
