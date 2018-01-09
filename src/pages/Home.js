import React from 'react'
import styled from 'styled-components'

import { Card } from '../components/Card'

const Center = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const Carousel = styled.div`
  overflow: scroll;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
`

export default () => (
  <Center>
    <Carousel>
      <Card />
      <Card />
      <Card />
    </Carousel>
  </Center>
)
