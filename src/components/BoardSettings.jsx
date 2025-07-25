import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../store/slices/drawerSlice";
import { fetchBoardTheme, updateBoardTheme } from "../store/slices/boardSlice";
import { showToast } from "../store/slices/toastSlice";
import { useState } from "react";

export default function BoardSettings() {
  const dispatch = useDispatch();
  dispatch(fetchBoardTheme());
  const currentTheme = useSelector((state) => state.boards.theme);

  const [theme, setTheme] = useState(currentTheme);

  function handleBoardTheme() {
    dispatch(updateBoardTheme({ boardTheme: theme }))
      .then(() => {
        dispatch(
          showToast({
            message: "Board Updated Successfully",
            severity: "success",
          })
        );
        dispatch(fetchBoardTheme());
        dispatch(closeDrawer());
      })
      .catch((error) => {
        dispatch(
          showToast({ message: error || "Update failed", severity: "error" })
        );
      });
  }

  function handleCancel() {
    dispatch(closeDrawer());
  }

  return (
    <Box sx={{ width: 350, p: 4 }}>
      <Typography variant="h4" mb={2} color="secondary">
        Change Theme
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{ fontSize: "28px" }}
        >
          Select Theme !!
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="defaultTheme"
            control={<Radio />}
            label="Default"
          />
          <FormControlLabel
            value="greenTheme"
            control={<Radio />}
            label="Olive Green"
          />
          <FormControlLabel
            value="blueTheme"
            control={<Radio />}
            label="Sky Blue"
          />
          <FormControlLabel
            value="brownTheme"
            control={<Radio />}
            label="Coffee Brown"
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleBoardTheme}
        fullWidth
        sx={{ mb: 2 }}
      >
        Save
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </Box>
  );
}
