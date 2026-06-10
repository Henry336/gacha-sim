const Rates = ({ chances, shown }) => {
    if (!shown) {
        return null
    }

    return (
        <div>
            <h2>Rates</h2>
            <li>Common: {chances[0]}%</li>
            <li>Rare: {chances[1]}%</li>
            <li>Epic: {chances[2]}%</li>
            <li>Legendary: {chances[3]}%</li>
        </div>
    )
}

export default Rates