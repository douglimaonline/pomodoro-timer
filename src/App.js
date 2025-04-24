import { useEffect, useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import { SITETITLE, TitleEnum } from './enums/TitlesEnum'

const WORK = 25
const LONGBREAK = 15
const SHORTBREAK = 5
const bell = new Audio('bell.mp3')
bell.volume = 0.2

function App() {
  const [time, setTime] = useState(0)
  const [title, setTitle] = useState(TitleEnum.FOCUSTIME)
  const [cycle, setCycle] = useState(0)
  const [countFinished, setCountFinished] = useState(false)

  const handleStart = () => {
    setTime(WORK)
    setTitle(TitleEnum.WORK)
    document.title = `${SITETITLE}${TitleEnum.WORK}`
  }

  const handleReset = () => {
    setTime(0)
    setCycle(0)
    setTitle(TitleEnum.FOCUSTIME)
    document.title = `Pomodoro Timer`
  }

  useEffect(() => {
    if (countFinished) {
      if (cycle === 6) {
        setTitle(TitleEnum.LONGBREAK)
        setTime(LONGBREAK)
        document.title = `${SITETITLE}${TitleEnum.LONGBREAK}`
      } else if (cycle > 6) {
        setTitle(TitleEnum.WORK)
        setTime(WORK)
        document.title = `${SITETITLE}${TitleEnum.WORK}`
      } else if (cycle % 2 === 0) {
        setTitle(TitleEnum.SHORTBREAK)
        setTime(SHORTBREAK)
        document.title = `${SITETITLE}${TitleEnum.SHORTBREAK}`
      } else {
        setTitle(TitleEnum.WORK)
        setTime(WORK)
        document.title = `${SITETITLE}${TitleEnum.WORK}`
      }
      bell.play()
      setCountFinished(false)
      setCycle(cycle > 6 ? 0 : cycle + 1)
    }
  }, [countFinished])

  return (
    <div className="App">
      <h2>{title}</h2>
      <Timer time={time} endTimer={(finished) => setCountFinished(finished)} />
      <div className="Controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <p>
        Não conhece a técnica Pomodoro?{' '}
        <a
          href="https://pt.wikipedia.org/wiki/T%C3%A9cnica_pomodoro"
          target="blank"
        >
          clique aqui.
        </a>
      </p>
    </div>
  )
}

export default App
