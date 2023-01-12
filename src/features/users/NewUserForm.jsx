import React, { useEffect, useState } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  // form data
  const [username, setUsername] = useState("");
  const [validUsername, setvalidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setvalidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  // validate username and password
  useEffect(() => {
    setvalidUsername(USER_REGEX.test(username));
    setvalidPassword(PWD_REGEX.test(password));
  }, [username, password]);
  // clear form input and navigate to users route when form submission is successful
  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  // handle form input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRolesChange = (e) => {
    const values = Array.from(
      // value comes as HTML Collection, which is not an array
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  // check if data is valid to save in database
  const canSave =
    [validUsername, validPassword, roles.length].every(Boolean) && !isLoading;

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  // create roles options for jsx
  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  // create programmable selectable class name for html-css
  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";
  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
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
          onChange={handleUsernameChange}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

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
          onChange={handleRolesChange}
        >
          {options}
        </select>
      </form>
    </>
  );
};

export default NewUserForm;
