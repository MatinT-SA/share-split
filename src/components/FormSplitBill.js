import { useState } from "react";
import {
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineTeam,
} from "react-icons/ai";
import { FaHandHoldingUsd } from "react-icons/fa";
import { Button } from "./Button";

export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const friendExpense = bill ? bill - myExpense : "";
  const [turn, setTurn] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !myExpense) return;

    onSplitBill(turn === "user" ? friendExpense : -myExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>
        <AiOutlineFileText className="icons" />
        Bill
      </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>
        <AiOutlineUser className="icons" />
        Your Expense
      </label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      />

      <label>
        <AiOutlineTeam className="icons" />
        {selectedFriend.name}'s Expense
      </label>
      <input type="text" disabled value={friendExpense} />

      <label>
        <FaHandHoldingUsd className="icons" />
        Who's Paying?
      </label>
      <select value={turn} onChange={(e) => setTurn(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
