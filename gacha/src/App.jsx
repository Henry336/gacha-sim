import { useState, useEffect } from 'react'
import axios from 'axios'
import Chance from 'chance'
import History from './components/History'
import Rates from './components/Rates'
import './App.css'

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
  const [showRates, setShowRates] = useState(false)
  const [rarity, setRarity] = useState("")

  const C = {
    rarity: "Common",
    items: [
      "Noelle (OG)",
      "Noelle (Summer Breeze)",
      "Noelle (Stylish)"
    ],
    chances: [1, 2, 3]
  }

  const R = {
    rarity: "Rare",
    items: [
      "Naruto", 
      "Sasuke"
    ],
    chances: [3, 1]
  }

  const E = {
    rarity: "Epic",
    items: [
      "Noelle (Succubus)",
      "Noelle (Angel) "
    ],
    chances: [1, 1]
  }

  const L = {
    rarity: "Legendary",
    items: [
      "????????????", 
      "Noelle (Halls of NUS Shirt)", 
      "CAPYBARA NOELLE"
    ],
    chances: [10, 5, 2]
  }

  const rarities = [C, R, E, L]
  const rarity_chances = [60, 25, 10, 5] // represents common, rare, epic, legendary item chances, respectively

  const handleSinglePull = () => {
    const selected_rarity = new Chance().weighted(rarities, rarity_chances)
    const selected_item = new Chance().weighted(selected_rarity.items, selected_rarity.chances)

    const newObj = {
      rarity: selected_rarity.rarity,
      item: selected_item,
      id: id
    }

    setReward(selected_item)
    setHistory(prevHistory => prevHistory.concat(newObj))
    setTotalpulls(prev => prev + 1)
    setId(prev => prev + 1)
    setRarity("(" + newObj.rarity + ")")
  }

  const handleTenPull = () => {
    const newEntries = []
    let lastItem = ''
    let lastRarity = ''
    let nextId = id

    const chance = new Chance()

    for (let i = 0; i < 10; i++) {
      const selected_rarity = chance.weighted(rarities, rarity_chances)
      const selected_item = chance.weighted(selected_rarity.items, selected_rarity.chances)

      newEntries.push({
        rarity: selected_rarity.rarity,
        item: selected_item,
        id: nextId
      })

      lastItem = selected_item
      lastRarity = selected_rarity.rarity
      nextId += 1
    }

    setReward(lastItem)
    setHistory(prevHistory => prevHistory.concat(newEntries))
    setTotalpulls(prev => prev + 10)
    setId(nextId)
    setRarity("(" + lastRarity + ")")
  }

  const handleShow = () => {
    setShown(!shown)

    let temp = (shown) ? "Show" : "Hide"
    setText(temp)
  }

  const handleRates = () => {
    setShowRates(!showRates)
  }

return (
    <div className="app-container">
      <h1>Gacha Simulator</h1>
      
      <div className="banner-container">
        <img 
          src="https://static.wikia.nocookie.net/gensin-impact/images/2/27/Wish_Beginners.png/revision/latest/scale-to-width-down/1200?cb=20260529102853"
          alt="gacha banner" 
          className="banner-image"
        />
      </div>

      <div className="action-bar">
        <button className="info-btn" onClick={handleRates}>i</button>
        <div className="pull-buttons">
          <button className="pull-btn" onClick={handleSinglePull}>x1 Draw</button>
          <button className="pull-btn ten-pull" onClick={handleTenPull}>x10 Draw</button>
        </div>
      </div>

      <div className="results-panel">
        <p className="reward-text">Reward Obtained: <strong>{reward}</strong> <span className="rarity">{rarity}</span></p>
        <p className="total-pulls">Total Pulls: {totalpulls}</p>
      </div>

      <div className="history-section">
        <Rates chances={rarity_chances} shown={showRates}/>
        <h4>History</h4>
        <button className="secondary-btn" onClick={handleShow}>{text}</button>
        <History history={history} shown={shown}/>
      </div>
    </div>
  )
}

export default App