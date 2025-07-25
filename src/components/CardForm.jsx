import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../store/slices/listSlice";
import { showToast } from "../store/slices/toastSlice";
import { createCard } from "../store/slices/cardSlice";

export default function CardForm({ listId, boardId, closeDrawer }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(
        createCard({
          name,
          description,
          listId: listId,
          boardId: boardId,
          imageUrl,
        })
      );
      dispatch(fetchList(boardId));
      dispatch(showToast({ message: "Card created!", severity: "success" }));
      closeDrawer();
    } catch (err) {
      dispatch(
        showToast({
          message: err.response?.data?.message || "Failed to create card",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: 350, p: 2 }}>
      <Typography variant="h6" mb={2}>
        Create new card
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Card Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        <TextField
          label="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          className="!mt-2"
        >
          {loading ? "Creating..." : "Add Card"}
        </Button>
      </form>
    </Box>
  );
}
