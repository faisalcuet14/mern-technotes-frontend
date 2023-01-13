import React from "react";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  } else if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length
      ? ids.map((id) => <User key={id} userId={id} />)
      : null;
    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              UserName
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default UsersList;
