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

const calculateDragSpeed = speedLogs => {
  while (speedLogs.length !== 0) {
    const speed = speedLogs.shift()
    if (Math.abs(speed) > 1) {
      return speed
    }
  }
  return 0
}

class Carousel extends React.Component {
  lastX = 0
  lastDeltaX = 0
  currentSpeed = 0
  lastFrameStartTime = 0
  speedLogs = []

  onInputDown = () => {
    this.currentSpeed = 0
  }

  onDrag = ({ deltaX }) => {
    const { lastX } = this
    window.requestAnimationFrame(startTime => {
      // do nothing if it's the same frame
      if (startTime === this.lastFrameStartTime) return

      this.currentSpeed = (deltaX - this.lastDeltaX) / (startTime - this.lastFrameStartTime)
      this.lastFrameStartTime = startTime
      this.lastDeltaX = deltaX
      this.carousel.style.transform = `translateX(${lastX + deltaX}px`
      this.speedLogs.unshift(this.currentSpeed)

      // keep last 5 speed values
      if (this.speedLogs.length > 5) {
        this.speedLogs.pop()
      }
    })
  }

  onInputUp = ({ deltaX }) => {
    this.lastX += deltaX
    const dragSpeed = calculateDragSpeed(this.speedLogs)
    this.speedLogs = []
    console.log(dragSpeed)
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
