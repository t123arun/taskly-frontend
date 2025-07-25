import { Draggable } from "@hello-pangea/dnd";
import { openDrawer } from "../store/slices/drawerSlice";
import { useDispatch } from "react-redux";

export default function Card({ cards, droppableProvided }) {
  const dispatch = useDispatch();

  return (
    <div
      ref={droppableProvided.innerRef}
      {...droppableProvided.droppableProps}
      className=" overflow-auto "
    >
      {cards.map((card, cardIndex) => (
        <Draggable draggableId={card._id} index={cardIndex} key={card._id}>
          {(provided, snapshot) => (
            <div
              className={`p-[10px] rounded-[10px] bg-white font-regular  hover:border-textGrey mb-3 max-h-[350px] transition-all duration-300 ease-in-out ${
                snapshot.isDragging
                  ? "border-2 border-textGrey scale-105 shadow-2xl"
                  : "border-2 border-transparent shadow-lg"
              }`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={() =>
                dispatch(openDrawer({ type: "editCard", props: { card } }))
              }
            >
              <p className="text-[20px] text-textBlack mb-2">{card.name}</p>
              {card.imageUrl && (
                <img
                  src={card.imageUrl}
                  alt="card image"
                  className="my-2 max-h-[150px] object-contain rounded-lg"
                />
              )}
              <p className="text-[18px] text-textGrey bg-slate-50 p-2 truncate">
                {card.description}
              </p>
            </div>
          )}
        </Draggable>
      ))}
      {droppableProvided.placeholder}
    </div>
  );
}
