import React from 'react'

import styled from 'styled-components'

const baseSize = 100

const Box = styled.div`
  display: inline-block;
  background: pink;
  width: ${baseSize * 2.5}px;
  height: ${baseSize * 3.5}px;
  margin: 1em 0.5em;
  border-radius: 1em;
`

export const Card = () => <Box />
