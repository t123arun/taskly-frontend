import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createList,
  deleteList,
  fetchList,
  moveList,
  updateListName,
} from "../store/slices/listSlice";
import { Button, IconButton, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { useState } from "react";
import Card from "./Card";
import { openDrawer } from "../store/slices/drawerSlice";
import { fetchCardsByBoard, moveCard } from "../store/slices/cardSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { showToast } from "../store/slices/toastSlice";

export default function Lists({ boardId }) {
  const dispatch = useDispatch();
  const {
    items,
    loading: listLoading,
    error: listError,
  } = useSelector((state) => state.lists);

  const {
    cards,
    loading: cardLoading,
    error: cardError,
  } = useSelector((state) => state.cards);

  const [focusedId, setFocusedId] = useState(null);
  const [lists, setLists] = useState([]);

  const [addingList, setAddingList] = useState(false);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    if (items?.length) {
      const sorted = [...items].sort((a, b) => a.position - b.position);
      setLists(sorted);
    }
  }, [items]);
  // Sync Redux items to local lists when fetched
  useEffect(() => {
    dispatch(fetchList(boardId));
  }, []);

  useEffect(() => {
    if (boardId) {
      dispatch(fetchCardsByBoard(boardId));
    }
  }, [boardId]);

  if (listLoading || cardLoading) {
    return (
      <div className="flex gap-4 px-10 py-2">
        <Skeleton
          variant="rounded"
          width={250}
          sx={{ height: "calc(100vh - 200px)", background: "#ffffff" }}
        />
        <Skeleton
          variant="rounded"
          width={250}
          sx={{ height: "calc(100vh - 200px)", background: "#ffffff" }}
        />
        <Skeleton
          variant="rounded"
          width={250}
          sx={{ height: "calc(100vh - 200px)", background: "#ffffff" }}
        />
        <Skeleton
          variant="rounded"
          width={250}
          sx={{ height: "calc(100vh - 200px)", background: "#ffffff" }}
        />
        <Skeleton
          variant="rounded"
          width={250}
          sx={{ height: "calc(100vh - 200px)", background: "#ffffff" }}
        />
        <Skeleton
          variant="rounded"
          width={250}
          sx={{ height: "calc(100vh - 200px)", background: "#ffffff" }}
        />
        <Skeleton
          variant="rounded"
          width={250}
          sx={{ height: "calc(100vh - 200px)", background: "#ffffff" }}
        />
      </div>
    );
  }
  if (listError) return <div>List Error: {listError}</div>;
  if (cardError) return <div>Card Error: {cardError}</div>;

  const handleBlur = (listId, currentText) => {
    const trimmed = currentText.trim();
    if (trimmed && trimmed !== items.find((item) => item._id === listId).name) {
      dispatch(updateListName({ listId, name: trimmed }));
    }
  };

  const handleDelete = () => {
    if (!focusedId) return;
    dispatch(deleteList(focusedId));
    setFocusedId(null);
  };

  const handleDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "CARD") {
      dispatch(
        moveCard({
          cardId: draggableId,
          sourceListId: source.droppableId,
          destinationListId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    }

    if (type === "LIST") {
      const updated = [...lists];
      const [movedList] = updated.splice(source.index, 1);
      updated.splice(destination.index, 0, movedList);

      setLists(updated);

      dispatch(
        moveList({
          boardId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      ).then(() => dispatch(fetchList(boardId)));

      return;
    }
  };

  const handleAddList = async () => {
    if (!newListName.trim()) return;
    try {
      await dispatch(
        createList({ name: newListName, boardId, position: items?.length + 1 })
      ).unwrap();
      await dispatch(fetchList(boardId));
      setNewListName("");
      setAddingList(false);
      return;
    } catch (error) {
      dispatch(
        showToast({
          message: error?.message || "Failed to add list",
          severity: "error",
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-lists" type="LIST" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-row gap-4 px-4 md:px-10 py-2 overflow-x-auto "
          >
            {lists.map((list, listIndex) => (
              <Draggable
                draggableId={list._id}
                index={listIndex}
                key={list._id}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="min-w-[250px] max-w-[250px] h-[calc(100vh-200px)]  rounded-xl bg-white p-1"
                  >
                    <Droppable
                      droppableId={list._id}
                      key={list._id}
                      type="CARD"
                    >
                      {(provided) => (
                        <div
                          listindex={list.position}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex flex-col h-[calc(100vh-200px)]"
                        >
                          <div
                            onFocus={() => setFocusedId(list._id)}
                            onBlur={() => setFocusedId(null)}
                            className="relative font-semibold text-[24px] text-textGrey bg-orange mb-4 rounded-xl shadow-md flex justify-center gap-5"
                          >
                            <h4
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleBlur(list._id, e.target.innerText)
                              }
                              className={clsx(" group text-center", {
                                "w-64 outline-none truncate":
                                  focusedId === list._id,
                              })}
                            >
                              {list.name === null}
                              {list.name}
                            </h4>
                            {focusedId === list._id && (
                              <IconButton
                                size="small"
                                onClick={() => handleDelete(list._id)}
                                className={clsx(
                                  "absolute right-1 transition-opacity",
                                  {
                                    "opacity-100": focusedId === list._id,
                                    "opacity-0": focusedId !== list._id,
                                  }
                                )}
                              >
                                <DeleteIcon
                                  fontSize="small"
                                  color="secondary"
                                />
                              </IconButton>
                            )}
                          </div>
                          <Card
                            cards={
                              cards?.filter(
                                (card) => card.listId === list._id
                              ) || []
                            }
                            droppableProvided={provided}
                          />
                          <div className="text-center text-textGrey  rounded-[10px] shadow-sm border-2 border-dashed">
                            <Button
                              variant="secondary"
                              startIcon={<AddIcon />}
                              className="w-full"
                              onClick={() => {
                                dispatch(
                                  openDrawer({
                                    type: "createCard",
                                    props: { listId: list._id, boardId },
                                  })
                                );
                              }}
                            >
                              Add card
                            </Button>
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div className="min-w-[250px] max-w-[250px] h-[calc(100vh-200px)]  rounded-xl bg-white p-1">
              {addingList ? (
                <div className="font-semibold text-[24px] text-textGrey bg-orange mb-4 rounded-xl shadow-md flex justify-center gap-5">
                  <input
                    className="block px-2 w-40 text-center outline-none truncate bg-[rgba(255,255,255,0.5)] border-2 rounded-sm"
                    type="text"
                    name="projectname"
                    id="projectname"
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                  <IconButton onClick={handleAddList}>
                    <CheckCircleOutlineIcon color="secondary" />
                  </IconButton>
                </div>
              ) : (
                <div className="text-center text-textGrey  rounded-[10px] shadow-sm border-2 border-dashed">
                  <Button
                    variant="secondary"
                    startIcon={<AddIcon />}
                    className="w-full"
                    onClick={() => setAddingList(true)}
                  >
                    Add List
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
