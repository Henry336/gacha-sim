const History = ({ history, shown }) => {
    if (!shown) {
        return null
    }

    return (
        <div>
            {
                history.map(obj => (
                    <li key={obj.id}>
                        {obj.item}
                    </li>
                ))
            }
        </div>
    )
}

export default History