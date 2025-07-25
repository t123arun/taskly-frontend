import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../store/slices/drawerSlice";
import { useEffect, useState } from "react";
import { fetchUserDetails, updateUserDetails } from "../store/slices/userSlice";

export default function UserDetails() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleUpload = () => {
    if (file) {
      dispatch(updateUserDetails(file)).then(() =>
        dispatch(fetchUserDetails())
      );
    }
    dispatch(closeDrawer());
  };

  if (loading) return <CircularProgress />;

  function handleCancel() {
    dispatch(closeDrawer());
  }

  return (
    <Box sx={{ width: 350, p: 4 }}>
      <Typography variant="h4" mb={2} color="secondary">
        Update Profile
      </Typography>
      <ButtonBase
        component="label"
        role={undefined}
        tabIndex={-1} // prevent label from tab focus
        aria-label="Avatar image"
        sx={{
          borderRadius: "40px",
          "&:has(:focus-visible)": {
            outline: "2px solid",
            outlineOffset: "2px",
          },
        }}
      >
        <Avatar
          alt="Upload new avatar"
          src={
            preview
              ? preview
              : user?.avatar
              ? `import.meta.env.BACKEND_URL${user.avatar}`
              : "/default-avatar.png"
          }
          sx={{ width: "250px", height: "250px", marginBottom: "20px" }}
        />
        <input
          type="file"
          accept="image/*"
          style={{
            border: 0,
            clip: "rect(0 0 0 0)",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            whiteSpace: "nowrap",
            width: "1px",
          }}
          onChange={handleChange}
        />
      </ButtonBase>
      <Button
        variant="contained"
        onClick={handleUpload}
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
