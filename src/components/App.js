import { useState, useEffect } from "react";
import { FriendsList } from "./FriendsList";
import { FormAddFriend } from "./FormAddFriend";
import { FormSplitBill } from "./FormSplitBill";
import { Button } from "./Button";
import Logo from "./Logo";

const initialFriends = [
  {
    id: 118836,
    name: "Zach",
    image: "https://i.pravatar.cc/400?img=60",
    balance: -7,
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
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  // Local Storage
  const [friends, setFriends] = useState(() => {
    const savedFriends = localStorage.getItem("friends");
    return savedFriends ? JSON.parse(savedFriends) : initialFriends;
  });

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends));
  }, [friends]);

  function handleShowAddFriend() {
    setShowAddFriend((curShow) => !curShow);
    setSelectedFriend(null);
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

  function handleDeleteFriend(id) {
    setFriends((friends) => friends.filter((friend) => friend.id !== id));

    if (selectedFriend?.id === id) {
      setSelectedFriend(null);
    }
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);

    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 2000);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Logo />
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
          onDeleteFriend={handleDeleteFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}

      {showSuccessPopup && (
        <div className="popup">
          <div>
            <p>Split successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}
