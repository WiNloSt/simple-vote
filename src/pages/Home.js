import React from 'react'
import styled from 'styled-components'

import { Card } from '../components/Card'
import { Interactable } from '../components/Interactable'

const Center = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CarouselContainer = styled.div`
  white-space: nowrap;
  text-align: center;
  user-select: none;
`

class Carousel extends React.Component {
  lastX = 0

  onDrag = ({ deltaX }) => {
    const { lastX } = this
    window.requestAnimationFrame(() => {
      this.carousel.style.transform = `translateX(${lastX + deltaX}px`
    })
  }

  onInputUp = ({ deltaX }) => {
    this.lastX += deltaX
  }

  setRef = c => {
    this.carousel = c
  }

  render () {
    return (
      <Interactable onDrag={this.onDrag} onInputUp={this.onInputUp}>
        <CarouselContainer innerRef={this.setRef}>{this.props.children}</CarouselContainer>
      </Interactable>
    )
  }
}

export default () => (
  <Center>
    <Carousel>
      <Card />
      <Card />
      <Card />
    </Carousel>
  </Center>
)
