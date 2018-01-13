import React from 'react'

export class Interactable extends React.Component {
  onMouseDown = e => {
    this.isInputDown = true
    this.initialX = e.clientX
    this.initialY = e.clientY
  }

  onMouseUp = () => {
    this.isInputDown = false
    this.props.onInputUp && this.props.onInputUp(this.delta)
  }

  onTouchStart = e => {
    this.initialX = e.touches[0].clientX
    this.initialY = e.touches[0].clientY
  }

  onTouchEnd = () => {
    this.props.onInputUp && this.props.onInputUp(this.delta)
  }

  onMouseMove = e => {
    if (!this.isInputDown) return

    if (this.props.onDrag) {
      this.delta = {
        deltaX: e.clientX - this.initialX,
        deltaY: e.clientY - this.initialY,
      }
      this.props.onDrag(this.delta)
    }
  }

  onTouchMove = e => {
    if (this.props.onDrag) {
      this.delta = {
        deltaX: e.touches[0].clientX - this.initialX,
        deltaY: e.touches[0].clientY - this.initialY,
      }
      this.props.onDrag(this.delta)
    }
  }

  render () {
    const listeners = {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      onTouchMove: this.onTouchMove,
      onMouseMove: this.onMouseMove,
    }

    return React.cloneElement(React.Children.only(this.props.children), listeners)
  }
}
