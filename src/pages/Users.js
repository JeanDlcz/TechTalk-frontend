import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EditRolesDialog } from "../components/DialogManage";
import toast from "react-hot-toast";
import { baseUrl } from "../Config";

dayjs.extend(relativeTime);

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditRolesDialogOpen, setIsEditRolesDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          `${baseUrl}/users`
        );

        const mappedUsers = usersResponse.data.map((user) => ({
          ...user,
          roleNames: user.roles.map((roleId) => mapRoleIdToRoleName(roleId)),
        }));

        setUsers(mappedUsers);
      } catch (error) {
        toast.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const mapRoleIdToRoleName = (roleId) => {
    switch (roleId) {
      case "644888ac94e168f50383b2f0":
        return "user";
      case "644888ac94e168f50383b2f1":
        return "moderator";
      case "644888ac94e168f50383b2f2":
        return "admin";
      default:
        return "unknown";
    }
  };

  const handleEditRoles = (userId) => {
    setSelectedUserId(userId);
    setIsEditRolesDialogOpen(true);
  };

  const handleUpdateRoles = async (newRoles) => {
    try {
      await axios.put(`${baseUrl}/users/update-role`, {
        userId: selectedUserId,
        roles: newRoles,
      });

      const updatedUsers = await axios.get(`${baseUrl}/users`);
      const mappedUsers = updatedUsers.data.map((user) => ({
        ...user,
        roleNames: user.roles.map((roleId) => mapRoleIdToRoleName(roleId)),
      }));

      setUsers(mappedUsers);
      toast.success("Update Rol Successful");
    } catch (error) {
      toast.error("Error updating user roles:", error);
    } finally {
      setSelectedUserId(null);
      setIsEditRolesDialogOpen(false);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-md">
        <h2 className="mb-4 text-xl font-bold text-gray-700">Users List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Roles</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}>
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    {user.roleNames ? user.roleNames.join(", ") : "No roles"}
                  </td>
                  <td className="py-2 px-4">
                    {dayjs(user.createdAt).fromNow()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded-md"
                      onClick={() => handleEditRoles(user._id)}
                    >
                      Edit Roles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUserId && (
        <EditRolesDialog
          open={isEditRolesDialogOpen}
          onAccept={handleUpdateRoles}
          onCancel={() => setIsEditRolesDialogOpen(false)}
        />
      )}
    </div>
  );
}

export default UserList;
