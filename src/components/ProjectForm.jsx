// src/components/ProjectForm.jsx
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../store/slices/toastSlice";
import { fetchBoards } from "../store/slices/boardSlice";

export default function ProjectForm({ closeDrawer }) {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "/boards",
        {
          name: projectName,
          description,
          favourite: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchBoards());

      dispatch(showToast({ message: "Project created!", severity: "success" }));

      setProjectName("");

      setDescription("");

      closeDrawer();
    } catch (err) {
      dispatch(
        showToast({
          message: err.response?.data?.message || "Failed to create project",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: 350, p: 3 }}>
      <Typography variant="h6" mb={2}>
        Create New Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          fullWidth
          required
          autoFocus
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          margin="normal"
          disabled={loading}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          disabled={loading}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Creating..." : "Save Project"}
        </Button>
      </form>
    </Box>
  );
}
