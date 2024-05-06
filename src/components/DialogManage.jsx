import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

export function EditRolesDialog({ open, onAccept, onCancel }) {
  const [selectedRole, setSelectedRole] = useState("user");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleAccept = () => {
    onAccept(selectedRole);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setDialogOpen(false);
  };

  return (
    <Dialog
      className="w-64 h-44 mx-auto my-20 bg-white p-4 rounded-md shadow-md"
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
    >
      <DialogBody className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Role:
        </label>
        <select
          className="border w-full p-2"
          onChange={handleRoleChange}
          value={selectedRole}
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </DialogBody>
      <DialogFooter className="flex justify-end ">
        <Button className="mx-4" color="red" size="sm" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="blue" size="sm" onClick={handleAccept}>
          Accept
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
