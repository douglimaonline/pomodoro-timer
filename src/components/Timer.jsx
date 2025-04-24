import { useState, useEffect } from 'react'
import './Timer.css'

const Timer = ({ time, endTimer }) => {
  const [totalSeconds, setTotalSeconds] = useState(0)

  useEffect(() => {
    setTotalSeconds(time * 1)
  }, [time])

  useEffect(() => {
    if (totalSeconds <= 0) return

    const intervalId = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId)
          endTimer(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [totalSeconds, endTimer])

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return (
    <div className="Timer">
      <img src="tomato.png" alt="tomato" />
      <h2>{`${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`}</h2>
    </div>
  )
}

export default Timer
