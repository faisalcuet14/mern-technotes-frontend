import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";
import Login from "./features/auth/Login";
import Public from "./components/Public";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";

import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import NewNote from "./features/notes/NewNote";
import EditNote from "./features/notes/EditNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* dash route */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          {/* users route */}
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="new" element={<NewUserForm />} />
            <Route path=":id" element={<EditUser />} />
          </Route>
          {/* notes route */}
          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path="new" element={<NewNote />} />
            <Route path=":id" element={<EditNote />} />
          </Route>
        </Route>
        {/* End dash */}
      </Route>
    </Routes>
  );
}

export default App;
