import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../store/slices/drawerSlice";
import ProjectForm from "./ProjectForm";
import CardForm from "./CardForm";
import EditCardDrawer from "./EditCardDrawer";
import EditProject from "./EditProject";
import BoardSettings from "./BoardSettings";
import UserDetails from "./UserDetails";

export default function GlobalDrawer() {
  const dispatch = useDispatch();
  const { open, type, props } = useSelector((state) => state.drawer);

  const handleClose = () => dispatch(closeDrawer());

  const renderContent = () => {
    switch (type) {
      case "createProject":
        return <ProjectForm closeDrawer={handleClose} />;
      case "createCard":
        if (!props?.listId || !props?.boardId) {
          console.warn("Missing listId or boardId for createCard drawer.");
          return null;
        }
        return (
          <CardForm
            listId={props.listId}
            boardId={props.boardId}
            closeDrawer={handleClose}
          />
        );
      case "userDetails":
        return <UserDetails />;
      case "editCard":
        return <EditCardDrawer {...props} />;
      case "editBoard":
        return <EditProject {...props} />;
      case "boardSettings":
        return <BoardSettings />;
      default:
        return null;
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      {renderContent()}
    </Drawer>
  );
}
