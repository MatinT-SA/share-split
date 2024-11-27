import { FaUser, FaImage, FaHandHoldingUsd } from "react-icons/fa";
import {
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineTeam,
} from "react-icons/ai";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Zach",
    image: "https://i.pravatar.cc/400?img=60",
    balance: -7,
  },
  {
    id: 933372,
    name: "Julia",
    image: "https://i.pravatar.cc/400?img=5",
    balance: 20,
  },
  {
    id: 499476,
    name: "Amir",
    image: "https://i.pravatar.cc/400?img=68",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((curShow) => !curShow);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>
        <FaUser className="icons" />
        Friend Name
      </label>
      <input type="text" />

      <label>
        <FaImage className="icons" />
        Image URL
      </label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>
        <AiOutlineFileText style={{ marginRight: "8px" }} />
        Bill
      </label>
      <input type="text" />

      <label>
        <AiOutlineUser style={{ marginRight: "8px" }} />
        Your Expense
      </label>
      <input type="text" />

      <label>
        <AiOutlineTeam style={{ marginRight: "8px" }} />
        Friend's Expense
      </label>
      <input type="text" disabled />

      <label>
        <FaHandHoldingUsd style={{ marginRight: "8px" }} />
        Who's Paying?
      </label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
    </form>
  );
}
