import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const makeRoom = () => {
    setRoom(uuidv4());
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            className="joinInput"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* <div>
          <input
            type="text"
            className="joinInput mt-20"
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div> */}
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit" onClick={makeRoom}>
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
