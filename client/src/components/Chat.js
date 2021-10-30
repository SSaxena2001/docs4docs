import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import TextContainer from "./TextContainer";

let socket;

const Chat = () => {
  return (
    <div>
      <h1>Hello Chat!</h1>
    </div>
  );
};

export default Chat;
