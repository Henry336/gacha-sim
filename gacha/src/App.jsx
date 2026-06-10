import { useState, useEffect } from 'react'
import axios from 'axios'
import Chance from 'chance'
import History from './components/History'

// const chance = new Chance();
// const result = chance.weighted(['Sword', 'Shield'], [80, 20]);

function App() {
  const [tokens, setTokens] = useState(0)
  const [totalpulls, setTotalpulls] = useState(0)
  const [history, setHistory] = useState([])
  const [prevPull, setPrevPull] = useState('')
  const [reward, setReward] = useState('')
  const [shown, setShown] = useState(false)
  const [text, setText] = useState("Show")
  const [id, setId] = useState(1)

  const C = {
    items: [
      "Noelle (OG)",
      "Noelle (Summer Breeze)",
      "Noelle (Stylish)"
    ],
    chances: [1, 2, 3]
  }

  const R = {
    items: [
      "Naruto", 
      "Sasuke"
    ],
    chances: [3, 1]
  }

  const E = {
    items: [
      "Noelle (Succubus)",
      "Noelle (Angel) "
    ],
    chances: [1, 1]
  }

  const L = {
    items: [
      "????????????", 
      "Noelle (Halls of NUS Shirt)", 
      "CAPYBARA NOELLE"
    ],
    chances: [10, 5, 2]
  }

  const rarities = [C, R, E, L]
  const rarity_chances = [60, 25, 10, 5] // represents common, rare, epic, legendary item chances, respectively

  const handlePull = () => {
    const selected_rarity = new Chance().weighted(rarities, rarity_chances)
    const selected_item = new Chance().weighted(selected_rarity.items, selected_rarity.chances)

    const newObj = {
      item: selected_item,
      id: id
    }

    setReward(selected_item)
    setHistory(history.concat(newObj))
    setTotalpulls(totalpulls + 1)
    setId(id + 1)
  }

  const handleShow = () => {
    setShown(!shown)

    let temp = (shown) ? "Show" : "Hide"
    setText(temp)
  }

  return (
    <div>
      <h1>Gacha Simulator</h1>
      <h4>Image here</h4>
      <button>i (for rates)</button>
      <button onClick={handlePull}>x1 Draw</button>
      <p>Reward Obtained: {reward}</p>
      <p>Total Pulls: {totalpulls}</p>
      <h4>History</h4>
      <button onClick={handleShow}>{text}</button>
      <History history={history} shown={shown}/>
    </div>
  )
}

export default App