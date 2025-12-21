const Filter = ({newFilter, setNewFilter}) => {
    const handleFilterInputChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
    <div>filter shown with <input value={newFilter} onChange={handleFilterInputChange} /></div>
    )
}

export default Filter