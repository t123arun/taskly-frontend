import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../store/slices/drawerSlice";
import { deleteCard, updateCard } from "../store/slices/cardSlice";
import { showToast } from "../store/slices/toastSlice";

export default function EditCardDrawer({ card }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [imageUrl, setImageUrl] = useState(card.imageUrl || "");

  const handleUpdate = () => {
    dispatch(updateCard({ cardId: card._id, name, description, imageUrl }))
      .then(() => {
        dispatch(
          showToast({
            message: "Card Updated Successfully",
            severity: "success",
          })
        );
        closeDrawer();
      })
      .catch((error) => {
        dispatch(
          showToast({ message: error || "Update failed", severity: "error" })
        );
      });
  };

  const handleDelete = () => {
    dispatch(deleteCard(card._id))
      .unwrap()
      .then(() => {
        dispatch(showToast({ message: "Card Deleted", severity: "success" }));
        dispatch(closeDrawer());
      })
      .catch((error) => {
        dispatch(
          showToast({
            message: typeof error === "string" ? error : "Delete failed!!",
            severity: "error",
          })
        );
      });
  };

  return (
    <Box sx={{ width: 350, px: 4, py: 6 }}>
      <Typography variant="h4" sx={{ borderBottom: 2, mb: 2 }}>
        Edit Card
      </Typography>
      <TextField
        label="Card Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handleUpdate}
        fullWidth
        sx={{ mt: 2 }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={handleDelete}
        fullWidth
        sx={{ mt: 1 }}
      >
        Delete
      </Button>
    </Box>
  );
}
