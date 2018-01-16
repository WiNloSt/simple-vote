import React from 'react'
import styled from 'styled-components'

import { Card } from '../components/Card'
import { Interactable } from '../components/Interactable'

const deacceleration = 0.005

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
  speedLogs = speedLogs.slice(2)
  while (speedLogs.length !== 0) {
    const speed = speedLogs.shift()
    if (Math.abs(speed) > 2) {
      console.log('speed=', speed)
      return speed
    }
  }
  return 0
}

const calculateSpeed = (speed, deltaTime) => {
  const direction = Math.sign(speed)
  const newSpeed = speed - deacceleration * deltaTime * direction || speed // first time deltaTime would be undefined
  // it's going to a different direction
  if (newSpeed * speed < 0) {
    return 0
  }

  return newSpeed
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
      console.log(this.currentSpeed)
      this.speedLogs.unshift(this.currentSpeed)

      // keep last 5 speed values
      if (this.speedLogs.length > 5) {
        this.speedLogs.pop()
      }
    })
  }

  animateCards = (speed, deltaTime) => {
    if (speed === 0) return

    const newSpeed = calculateSpeed(speed, deltaTime)
    this.lastX += newSpeed
    this.carousel.style.transform = `translateX(${this.lastX}px`

    window.requestAnimationFrame(startTime => {
      const deltaTime = startTime - this.lastFrameStartTime
      this.lastFrameStartTime = startTime
      this.animateCards(newSpeed, deltaTime)
    })
  }

  onInputUp = ({ deltaX }) => {
    this.lastX += deltaX
    const dragSpeed = calculateDragSpeed(this.speedLogs)
    this.speedLogs = []
    this.animateCards(10)
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
