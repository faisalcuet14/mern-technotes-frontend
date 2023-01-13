import React, { useEffect, useState } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();
  const navigate = useNavigate();

  // form control inputs and validation states
  const [username, setUsername] = useState(user.username);
  const [validUsername, setvalidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setvalidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [isActive, setIsActive] = useState(user.active);

  // validate username and password
  useEffect(() => {
    setvalidUsername(USER_REGEX.test(username));
    setvalidPassword(PWD_REGEX.test(password));
  }, [username, password]);

  // clear form input and navigate to users list when user is successfully updated
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      setIsActive(false);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // handle form input
  const handleUsernameChanged = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChanged = (e) => {
    setPassword(e.target.value);
  };
  const handleIsActiveChanged = () => {
    setIsActive((prev) => !prev);
  };
  const handleRolesChanged = (e) => {
    const values = Array.from(
      // value comes as HTML Collection, which is not an array
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  // handle user update button click
  const handleSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({
        id: user.id,
        username,
        password,
        roles,
        active: isActive,
      });
    } else {
      await updateUser({
        id: user.id,
        username,
        roles,
        active: isActive,
      });
    }
  };

  // handle delete user button click
  const handleDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  // check to see if user data is updatable
  const canSave = password
    ? [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    : [roles.length, validUsername].every(Boolean) && !isLoading;

  // create programmable selectable class name for html-css
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  // error content
  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  // create roles options for jsx
  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={handleSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={handleDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={handleUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={isActive}
            onChange={handleIsActiveChanged}
          />
        </label>

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={handleRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default EditUserForm;
