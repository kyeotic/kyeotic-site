import React, { useState, useRef } from 'react'

import { GradientPinkRed as Gradient } from '@vx/gradient'
import { useSpring, animated, useChain, interpolate } from 'react-spring'
import './app.css'

// const dashPath = 'M 100 550 L 700 550 L 700 475 L 100 475 Z'
const dashPath = 'M 0 200 L 200 200 L 200 165 L 0 165 Z'
const arrowPth = 'M 175 100 L 75 0 L 25 0 L 125 100 L 25 200 L 75 200 Z'

function Shell() {
  const [active, setActive] = useState(false)
  const [swipingRightDone, setRightDone] = useState(false)
  const [swipingLeftDone, setLeftDone] = useState(false)
  const [hovered, setHover] = useState(false)
  const toggleActive = () => setActive(!active)

  // Dash rotate
  const dashRotateRef = useRef()
  const dashProps = useSpring({
    ref: dashRotateRef,
    transform: !active
      ? 'translate(0px, 0px) rotate(0deg)'
      : 'translate(0px, 0px) rotate(-90deg)'
  })

  // Arrow Swipe Right
  const rightStart = '0px'
  const rightEnd = '900px'
  const arrowSwipeRightRef = useRef()
  const { translateX } = useSpring({
    ref: arrowSwipeRightRef,
    translateX: !active ? rightStart : rightEnd,
    onFrame: ({ translateX }) => {
      translateX === rightEnd && setRightDone(true)
      translateX === rightStart && setRightDone(false)
    }
  })

  // Arrow Rotate
  const arrowRotateRef = useRef()
  const { rotation } = useSpring({
    ref: arrowRotateRef,
    rotation: !active ? '0deg' : '180deg'
  })

  // Arrow Swipe LEft
  const leftStart = '900px'
  const leftEnd = '170px'
  const arrowSwipeLeftRef = useRef()
  const { translateXLeft } = useSpring({
    ref: arrowSwipeLeftRef,
    translateXLeft: !active ? leftStart : leftEnd,
    onFrame: ({ translateXLeft }) => {
      translateXLeft === leftEnd && setLeftDone(true)
      translateXLeft === leftStart && setLeftDone(false)
    }
  })

  if (swipingRightDone) console.log('right finished')
  if (swipingLeftDone) console.log('left done')

  let useRight =
    (active && !swipingRightDone) ||
    (!active && !swipingLeftDone && !swipingLeftDone)
  console.log('use', active, useRight)

  useChain(
    active
      ? [arrowSwipeRightRef, dashRotateRef, arrowRotateRef, arrowSwipeLeftRef]
      : [arrowSwipeLeftRef, arrowRotateRef, dashRotateRef, arrowSwipeRightRef]
  )

  return (
    <div className="shell" onClick={toggleActive}>
      <animated.div
        style={{
          position: 'absolute ',
          transform: interpolate(
            [translateX, translateXLeft, rotation],
            (x, xLeft, r) =>
              `translate(${useRight ? x : xLeft}, 0px) rotate(${r})`
          )
        }}
      >
        <svg width="200" viewBox="0 0 200 200">
          <Gradient id="gradient-arrow" />
          <g fill="url(#gradient-arrow)">
            <path d={arrowPth} />
          </g>
        </svg>
      </animated.div>
      <animated.div
        style={{
          position: 'absolute',
          // top: '450px',
          left: '200px',
          transformOrigin: 'bottom left',
          ...dashProps
        }}
      >
        <svg width="200" viewBox="0 0 200 200">
          <Gradient id="gradient-dash" />
          <g fill="url(#gradient-dash)">
            <path d={dashPath} />
          </g>
        </svg>
      </animated.div>
    </div>
  )
}

export default function App() {
  return <Shell />
  // <Canvas>
  // </Canvas>
}
