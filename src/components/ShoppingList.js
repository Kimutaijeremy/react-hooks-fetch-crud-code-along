import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
  }

  function handleUpdateItem(updatedItem) {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  function handleDeleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const itemsToDisplay = items.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter onCategoryChange={setSelectedCategory} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
