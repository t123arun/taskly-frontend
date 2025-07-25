import { useDispatch } from "react-redux";
import { closeDrawer } from "../store/slices/drawerSlice";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { showToast } from "../store/slices/toastSlice";
import { deleteBoard, updateBoard } from "../store/slices/boardSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

export default function EditProject({ project }) {
  const names = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(project.name);
  const [favourite, setFavourite] = useState(project.favourite);
  const [description, setDescription] = useState(project.description);
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleUpdate = () => {
    dispatch(
      updateBoard({
        boardId: project._id,
        name,
        description,
        favourite,
      })
    )
      .then(() => {
        dispatch(
          showToast({
            message: "Board Updated Successfully",
            severity: "success",
          })
        );
        dispatch(closeDrawer());
      })
      .catch((error) => {
        dispatch(
          showToast({ message: error || "Update failed", severity: "error" })
        );
      });
  };

  const handleDelete = () => {
    dispatch(deleteBoard(project._id))
      .unwrap()
      .then(() => {
        dispatch(
          showToast({ message: "Project Deleted", severity: "success" })
        );
        dispatch(closeDrawer());
        navigate("/workspace");
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
        Edit Project
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={favourite}
            onChange={(e) => setFavourite(e.target.checked)}
            icon={<StarBorderIcon />}
            checkedIcon={<StarIcon />}
            color="secondary"
            aria-label="Favourite"
          />
        }
        label="Favourite"
      />
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

      <FormControl fullWidth margin="normal" disabled>
        <InputLabel id="demo-multiple-chip-label">Members</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
