import React from 'react'
import styled from 'styled-components'

import { Card } from '../components/Card'
import { Interactable } from '../components/Interactable'

const deacceleration = 0.1
const springK = 0.01

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
  // speedLogs = speedLogs.slice(2)
  while (speedLogs.length !== 0) {
    const speed = speedLogs.shift()
    if (Math.abs(speed) > 200) {
      console.log('drag speed', speed)
      return Math.min(1000, Math.max(-1000, speed))
    }
  }
  return 0
}

class Carousel extends React.Component {
  startX = 0
  lastX = 0
  lastDeltaX = 0
  currentSpeed = 0
  lastFrameStartTime = 0
  speedLogs = []

  onInputDown = () => {
    console.log('call na ja')
    this.currentSpeed = 0
    this.startX = this.lastX
  }

  onDrag = ({ deltaX }) => {
    const { lastX } = this
    window.requestAnimationFrame(startTime => {
      // do nothing if it's the same frame
      if (startTime === this.lastFrameStartTime) return

      this.currentSpeed = (deltaX - this.lastDeltaX) / (startTime - this.lastFrameStartTime) * 1000
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

  animateCards = (speed, initialX, deltaTime) => {
    if (speed === 0) return

    const newSpeed = this.calculateSpeed(speed, initialX, deltaTime)
    const distant = newSpeed * deltaTime / 1000 || 0
    this.lastX += distant
    this.carousel.style.transform = `translateX(${this.lastX}px`

    window.requestAnimationFrame(startTime => {
      const deltaTime = startTime - this.lastFrameStartTime
      this.lastFrameStartTime = startTime
      this.animateCards(newSpeed, initialX, deltaTime)
    })
  }

  calculateSpeed = (speed, initialX, deltaTime) => {
    const direction = Math.sign(speed)
    const acceleration = -deacceleration - Math.abs(this.lastX - initialX) * springK
    const newSpeed = speed + acceleration * deltaTime * direction || speed // first time deltaTime would be undefined
    console.log(
      `speed: ${speed}, initialX: ${initialX}, lastX: ${this.lastX}, newSpeed: ${newSpeed}`,
    )
    // it's going to a different direction
    if (newSpeed * speed < 0) {
      return 0
    }

    return newSpeed
  }

  onInputUp = ({ deltaX }) => {
    this.lastX += deltaX
    const dragSpeed = calculateDragSpeed(this.speedLogs)
    this.speedLogs = []
    console.log(this.lastX, this.startX)
    if (Math.abs(this.lastX - this.startX) > 50) {
      this.animateCards(dragSpeed, this.lastX)
    }
  }

  setRef = c => {
    this.carousel = c
  }

  render () {
    return (
      <Interactable onDrag={this.onDrag} onInputUp={this.onInputUp} onInputDown={this.onInputDown}>
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
