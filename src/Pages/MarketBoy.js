import React, { useState, useEffect } from "react";
import { firestore, collection, addDoc, getDocs } from "./Firebase"; // Adjust the path accordingly

const MarketBoy = () => {
  const [fishData, setFishData] = useState([]);
  const [newFishName, setNewFishName] = useState("");
  const [newFishQuantity, setNewFishQuantity] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Reference to the 'fishData' collection in Firestore
  const fishDataCollection = collection(firestore, "fishData");

  // Fetch initial data from Firestore on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(fishDataCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFishData(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, [fishDataCollection]);

  const handleAddFish = async () => {
    try {
      if (newFishName && newFishQuantity) {
        // Adding new fish to the collection
        const docRef = await addDoc(fishDataCollection, {
          name: newFishName,
          quantity: parseInt(newFishQuantity, 10),
        });

        // Fetch updated data after adding a new fish
        const querySnapshot = await getDocs(fishDataCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFishData(data);

        // Reset input fields after adding a new fish
        setNewFishName("");
        setNewFishQuantity("");

        console.log("Fish added with ID: ", docRef.id);
      } else {
        alert("Please enter both fish name and quantity.");
      }
    } catch (error) {
      console.error("Error adding fish to Firestore:", error);
    }
  };
  const handleEditFish = (index) => {
    const fishToEdit = fishData[index];
    setNewFishName(fishToEdit.name);
    setNewFishQuantity(fishToEdit.quantity.toString());
    setEditIndex(index);
  };

  const handleDeleteFish = (index) => {
    const updatedFishData = [...fishData];
    updatedFishData.splice(index, 1);
    fishDataCollection.set(updatedFishData);
  };

  return (
    <div className="market_cont">
      <h2>Market</h2>
      <div className="input_cont">
        <label>
          Fish Name:
          <input
            type="text"
            value={newFishName}
            onChange={(e) => setNewFishName(e.target.value)}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={newFishQuantity}
            onChange={(e) => setNewFishQuantity(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleAddFish} className="button_add">
        {editIndex !== null ? "Edit Fish" : "Add Fish"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Fish Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fishData.map((fish, index) => (
            <tr key={index}>
              <td>{fish.name}</td>
              <td>{fish.quantity}</td>
              <td>
                <button onClick={() => handleEditFish(index)}>Edit</button>
                <button onClick={() => handleDeleteFish(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Input fields for adding/editing a fish */}
    </div>
  );
};

export default MarketBoy;
