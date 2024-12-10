
const useStore = ({ useState, useCallback }) => {
  const [ items, setItems ] = useState()

  const addItem = useCallback(newItem =>
    setItems(prevItems => [
      newItem,
      ...prevItems
    ])
  , [])

  const getItem = useCallback(id =>
    (items || []).find(item => item.id === id)
  , [ items ])

  const updateItem = useCallback(updatedItem =>
    setItems((prevItems = []) =>
      prevItems.map(item => ({
        ...(
          item.id === updatedItem.id
            ? { ...item, ...updatedItem }
            : item
          )
      }))
    )
  , [])

  const removeItem = useCallback(id =>
    setItems(prevItems => [
      ...prevItems.filter(item => item.id !== id)
    ])
  , [])

  const resetItems = useCallback(() =>
    setItems()
  , [])

  return {
    items,
    getItem,
    addItem,
    setItems,
    resetItems,
    updateItem,
    removeItem,
  }
}

export default useStore
