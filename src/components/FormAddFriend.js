import { useState } from "react";
import { FaUser, FaImage } from "react-icons/fa";
import { Button } from "./Button";

export function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/400");
  const [defaultImage, setDefaultImage] = useState(
    `https://i.pravatar.cc/400?u=${crypto.randomUUID()}`
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: image === "https://i.pravatar.cc/400" ? defaultImage : image,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setDefaultImage(`https://i.pravatar.cc/400?u=${crypto.randomUUID()}`);
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
        autoFocus
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
