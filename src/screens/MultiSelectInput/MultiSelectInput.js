import React, { Fragment, useEffect, useState, useRef } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import "./MultiSelectInput.css";

//? PILL COMPONENT
const Pill = ({ image, text, onClick }) => {
  return (
    <span className="user_pill" onClick={onClick}>
      <img src={image} alt={text} />
      <span>{text} &times;</span>
    </span>
  );
};

//? MULTI SELECT COMPONENT
const MultiSelectInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const inputRef = useRef(null);

  console.log("userSelected-->", selectedUsers);
  console.log("selectedUserSet-->", selectedUserSet);
  console.log("activeSuggestion-->", activeSuggestion);

  // https://dummyjson.com/users/search?q=Jo

  //? METHOD 1 USING ASYNC AWAIT
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchFn = async () => {
      const userResult = await fetch(
        `https://dummyjson.com/users/search?q=${searchTerm}`
      ).then((res) => res.json());

      setSuggestions(userResult);
    };

    fetchFn();
  }, [searchTerm]);

  //? METHOD 2 WITHOUT ASYNC AWAIT
  // useEffect(() => {
  //   const fetchUsers = () => {
  //     if (searchTerm.trim() === "") {
  //       setSuggestions([]);
  //       return;
  //     }

  //     fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
  //       .then((res) => res.json())
  //       .then((data) => setSuggestions(data))
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   };

  //   fetchUsers();
  // }, [searchTerm]);

  console.log("suggestions", suggestions);

  // ? HANDLE SELECT USERS
  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  //? REMOVE USER PILL
  const handleRemoveUser = (user) => {
    console.log("user-->", user);
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  //? KEY UP AND BACK SPACE AND KEY DOWN HANDLER
  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.users.length
    ) {
      handleSelectUser(suggestions.users[activeSuggestion]);
    }
  };

  //? JSX START
  return (
    <Fragment>
      <div className="multi_select_body">
        <h4 className="mb-3">Multi Select Input UI</h4>
        <div className="user_search_container">
          <div className="user_search_input">
            {selectedUsers.map((user) => {
              return (
                <Pill
                  key={user.email}
                  image={user.image}
                  text={`${user.firstName} ${user.lastName}`}
                  onClick={() => handleRemoveUser(user)}
                />
              );
            })}
            <div>
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search For a User..."
                onKeyDown={handleKeyDown}
              />

              <ul className="suggestions_list">
                {suggestions?.users?.map((user, index) => {
                  return !selectedUserSet.has(user.email) ? (
                    <li
                      className={index === activeSuggestion ? "active" : ""}
                      key={user.email}
                      onClick={() => handleSelectUser(user)}
                    >
                      <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </li>
                  ) : (
                    <></>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <GoBackButton />
      </div>
    </Fragment>
  );
};

export default MultiSelectInput;
