import React from 'react'
import styled from 'styled-components'

import { Card } from '../components/Card'

const Center = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  & > * {
    vertical-align: middle;
  }
`

export default () => (
  <Center>
    <Card />
  </Center>
)
