import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const users = useSelector(selectAllUsers);
  // console.log(users);
  return users?.length ? (
    <NewNoteForm users={users} />
  ) : (
    <p>No users to create note...</p>
  );
};

export default NewNote;
