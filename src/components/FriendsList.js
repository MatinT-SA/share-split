import { useState } from "react";
import { Friend } from "./Friend";

export function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  const [currentPage, setCurrentPage] = useState(1);
  const friendsPerPage = 6;

  const totalPages = Math.ceil(friends.length / friendsPerPage);
  const startIndex = (currentPage - 1) * friendsPerPage;
  const endIndex = startIndex + friendsPerPage;
  const currentFriends = friends.slice(startIndex, endIndex);

  function handleNextPage() {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }

  function handlePreviousPage() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  return (
    <div>
      <ul>
        {currentFriends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelectFriend={onSelectFriend}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
