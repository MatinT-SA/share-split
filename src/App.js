import { useState } from "react";
import { FaUser, FaImage, FaHandHoldingUsd } from "react-icons/fa";
import {
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineTeam,
} from "react-icons/ai";

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
  {
    id: 734912,
    name: "Samaneh",
    image: "https://i.pravatar.cc/400?img=32",
    balance: 10,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((curShow) => !curShow);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((curSelect) =>
      curSelect?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/400");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}/${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/400");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>
        <FaUser className="icons" />
        Friend Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>
        <FaImage className="icons" />
        Image URL
      </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>
        <AiOutlineFileText className="icons" />
        Bill
      </label>
      <input type="text" />

      <label>
        <AiOutlineUser className="icons" />
        Your Expense
      </label>
      <input type="text" />

      <label>
        <AiOutlineTeam className="icons" />
        {selectedFriend.name}'s Expense
      </label>
      <input type="text" disabled />

      <label>
        <FaHandHoldingUsd className="icons" />
        Who's Paying?
      </label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
    </form>
  );
}
