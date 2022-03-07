import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Todo.css";

// to get the data from LS
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists") || "[]");
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputDate] = useState("");

  const [items, setItems] = useState<any>(getLocalItems());

  const addItem = () => {
    if (!inputData) {
    } else {
      setItems([...items, inputData]);
      setInputDate("");
    }
  };

  // delete item

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((element: string, index: number) => {
      return index !== id;
    });
    setItems(updatedItems);
  };

  // remove all

  const removeAll = () => {
    setItems([]);
  };

  // add data to localStorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="" alt="" />
          </figure>

          <div className="addItems">
            <TextField
              className="inputField"
              label="Add Item"
              variant="outlined"
              value={inputData}
              onChange={(e) => setInputDate(e.target.value)}
            />
            <Button className="addItem" variant="contained" onClick={addItem}>
              Add Item
            </Button>
          </div>

          <div className="showItems mt-4">
            {items.map((element: string, index: number) => {
              return (
                <div className="singleItem " key={index}>
                  <div className="singleItemText d-flex justify-between">
                    <h3>{element}</h3>
                    <i
                      className="far fa-trash-alt"
                      title="Delete Item"
                      onClick={() => deleteItem(index)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clear all button  */}
          <div className="deleteAll mt-4">
            <Button variant="contained" onClick={removeAll}>
              Check List
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
