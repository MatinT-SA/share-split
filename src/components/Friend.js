import { Button } from "./Button";
import { MdDelete } from "react-icons/md";

export function Friend({
  friend,
  onSelectFriend,
  selectedFriend,
  onDeleteFriend,
}) {
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

      <div className="friend--btn">
        <Button
          onClick={() => onDeleteFriend(friend.id)}
          className="btn-delete-friend"
        >
          <MdDelete />
        </Button>
        <Button
          onClick={() => onSelectFriend(friend)}
          className="btn-select-friend"
        >
          {isSelected ? "Close" : "Select"}
        </Button>
      </div>
    </li>
  );
}
