import { useState } from "react";
import { Friend } from "./Friend";

export function FriendsList({
  friends,
  onSelectFriend,
  selectedFriend,
  onDeleteFriend,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  let friendsPerPage = 4;

  const width = window.innerWidth;
  if (width < 850) friendsPerPage = 3;

  const totalPages = Math.ceil(friends.length / friendsPerPage);
  const startIndex = (currentPage - 1) * friendsPerPage;
  const endIndex = startIndex + friendsPerPage;

  const currentFriends = friends.slice(startIndex, endIndex);

  function handlePreviousPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  return (
    <div className="friends-list-container">
      <ul>
        {currentFriends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelectFriend={onSelectFriend}
            selectedFriend={selectedFriend}
            onDeleteFriend={onDeleteFriend}
          />
        ))}
      </ul>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="pagination-btn">
            Previous
          </button>
        )}

        <span>
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="pagination-btn">
            Next
          </button>
        )}
      </div>
    </div>
  );
}
