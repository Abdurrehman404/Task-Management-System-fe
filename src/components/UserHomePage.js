import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Typography, Stack, Button, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import UserDrawer from "./UserDrawer";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import Cookies from "js-cookie";
import { useGlobalUser } from "../contexts/UserContext";
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CreateList from "./CreateList";
import DropDown from "./DropDown";
import EditCard from "./EditCard";
import DeleteDialog from "./DeleteDialog";
import EditField from "./EditField";
import useToggleState from "../hooks/useToggleState";

function UserHomePage() {
  const navigate = useNavigate();
  const { globalUser } = useGlobalUser();
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  const [taskClicked, setTaskClicked] = useState(false);
  const [listClicked, setListClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditing, toggle] = useToggleState(false);
  const [boardName, setBoardName] = useState("");

  useEffect(() => {
    let tmpBoard = {};
    let globalUserCookie = JSON.parse(Cookies.get("globalUserCookie"));
    let userName = globalUserCookie.userName;
    async function getReqBoard() {
      try {
        let fetchedBoard = await getBoard();
        setBoard(fetchedBoard);
        setBoardName(fetchedBoard.boardName);
        tmpBoard = fetchedBoard;
        const listIds = tmpBoard.listIds;
        setLists([]);
        for (let id of listIds) {
          await getLists(id);
        }
      } catch (err) {
        console.log("Error while fetching board");
        console.log(err);
      }
    }

    async function getBoard() {
      return new Promise((resolve, reject) => {
        async function getBoardBackend() {
          try {
            const getTheBoard = await axios.get(`board/${userName}`);
            console.log(getTheBoard);
            resolve(getTheBoard.data.dto);
          } catch (err) {
            console.log("Error fetching the board");
            console.log(err);
            reject();
          }
        }
        getBoardBackend();
      });
    }

    async function getLists(id) {
      return new Promise((resolve, reject) => {
        async function getCards() {
          try {
            const getListReq = await axios.get(`boardLists/${id}`);
            const cardIDs = getListReq.data.dto.cardList;
            const cardList = await getReqCards(cardIDs);
            getListReq.data.dto = { ...getListReq.data.dto, cardList };
            setLists((lists) => [...lists, getListReq.data.dto]);
            resolve();
          } catch (err) {
            console.log("Error while fetching list ");
            console.log(err);
            reject();
          }
        }
        getCards();
      });
    }

    async function getReqCards(cardIds) {
      return new Promise((resolve, reject) => {
        try {
          const cards = [];
          for (let cardID of cardIds) {
            const card = axios.get(`cards/${cardID}`);
            cards.push(card);
          }
          Promise.all(cards).then((cardsResponse) => {
            let allCards = cardsResponse.map((res) => res.data.dto);
            allCards = allCards.filter((card) => card !== "");
            resolve(allCards);
          });
        } catch (err) {
          console.log("Error while fetching cards for lists");
          console.log(err);
          reject(null);
        }
      });
    }
    getReqBoard();
  }, [globalUser]);

  // Every list updated on backend whenever the list state changes
  const listUpdateBackend = () => {
    lists.forEach((list) => {
      const cardList = [];
      for (let card of list.cardList) {
        cardList.push(card.id);
      }
      const tmpList = { ...list, cardList };
      axios.post("boardLists/update", tmpList).catch((err) => {
        console.log("Error while updating list");
        console.log(err);
      });
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addCard = (newCard) => {
    setLists((lists) =>
      lists.map((list) => {
        if (list.title.toLowerCase() === "To Do".toLowerCase()) {
          list.cardList = [...list.cardList, newCard];
          const cardList = [];
          for (let card of list.cardList) {
            cardList.push(card.id);
          }
          const tmpList = { ...list, cardList };
          axios.post("boardLists/update", tmpList).catch((err) => {
            console.log("Error while updating list");
            console.log(err);
          });
        }
        return list;
      })
    );
  };

  const deleteCard = () => {
    setLists((lists) =>
      lists.map((list) => {
        if (list.cardList.includes(selectedCard)) {
          list.cardList = list.cardList.filter((obj) => {
            return obj !== selectedCard;
          });
        }
        return list;
      })
    );
    listUpdateBackend();
    const tmpCardId = { id: selectedCard.id };
    axios.post("cards/delete", tmpCardId).catch((err) => {
      console.log("Error deleting card");
      console.log(err);
    });
  };

  const editCardDialog = (card) => {
    setSelectedCard(card);
    setShowEditDialog(true);
  };
  const deleteCardDialog = (card) => {
    setSelectedCard(card);
    setShowDeleteDialog(true);
  };

  const editCardDetails = (editedCard) => {
    setLists((lists) =>
      lists.map((list) => {
        let found = list.cardList.find((card) => card.id === editedCard.id);
        if (found !== undefined) {
          list.cardList = list.cardList.map((obj) => {
            if (obj.id === editedCard.id) {
              obj = { ...editedCard };
            }
            return obj;
          });
        }
        return list;
      })
    );
    const tmpCard = { ...editedCard };
    axios.post("cards/update", tmpCard).catch((err) => {
      console.log("Error updating card");
      console.log(err);
    });
  };

  const addList = (newList) => {
    const tmpLists = [...lists, newList];
    const listIds = tmpLists.map((tmpList) => {
      return tmpList.id;
    });
    const listIdInBoard = board.listIds;
    if (!listIds.every((list) => listIdInBoard.includes(list))) {
      const updatedBoard = { ...board, listIds };
      setBoard(updatedBoard);
      console.log("Updated board", updatedBoard);
      axios.post("board/update", updatedBoard).catch((err) => {
        console.log("Error while updating board");
        console.log(err);
      });
    }

    setLists((lists) => [...lists, newList]);
  };

  const handleSignOutClick = () => {
    Cookies.remove("token", { sameSite: "Lax", secure: true });
    Cookies.remove("globalUserCookie", { sameSite: "Lax", secure: true });
    navigate("/credential-page");
  };

  const onDragEnd = (result, lists, setLists) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = lists.find((obj) => {
        return obj.id === source.droppableId;
      });
      const destColumn = lists.find((obj) => {
        return obj.id === destination.droppableId;
      });
      const sourceCardList = [...sourceColumn.cardList];
      const destCardList = [...destColumn.cardList];
      const [removed] = sourceCardList.splice(source.index, 1);
      destCardList.splice(destination.index, 0, removed);
      setLists((lists) =>
        lists.map((obj) => {
          if (obj.id === source.droppableId) {
            obj.cardList = [...sourceCardList];
          } else if (obj.id === destination.droppableId) {
            obj.cardList = [...destCardList];
          }
          return obj;
        })
      );
    } else {
      const column = lists.find((obj) => {
        return obj.id === source.droppableId;
      });
      const copiedCardList = [...column.cardList];
      const [removed] = copiedCardList.splice(source.index, 1);
      copiedCardList.splice(destination.index, 0, removed);
      setLists((lists) =>
        lists.map((obj) => {
          if (obj.id === source.droppableId) {
            obj.cardList = [...copiedCardList];
          }
          return obj;
        })
      );
    }
    listUpdateBackend();
  };

  const editField = (field, value) => {
    setBoardName(value);
    setBoard((board) => ({ ...board, boardName: value }));
    let tmpBoard = { ...board, boardName: value };
    axios.post("board/update", tmpBoard).catch((err) => {
      console.log("Error while updating Board Name");
      console.log(err);
    });
  };

  const editListName = (id, title) => {
    setLists((lists) =>
      lists.map((list) => {
        if (list.id === id) {
          list.title = title;
          let tmpList = { ...list };
          tmpList.title = title;
          axios.post("boardLists/update", tmpList).catch((err) => {
            console.log("Error updating list while changing title");
            console.log(err);
          });
        }
        return list;
      })
    );
    listUpdateBackend();
  };

  const deleteList = (id) => {
    let listIds = board.listIds.filter((listID) => {
      return listID !== id;
    });
    setBoard((board) => ({ ...board, listIds }));
    axios.post("board/update", { ...board, listIds }).catch((err) => {
      console.log("Error while updating Board");
      console.log(err);
    });
    setLists((lists) =>
      lists.filter((list) => {
        return list.id !== id;
      })
    );
    axios.post("boardLists/delete", { id }).catch((err) => {
      console.log("Error deleting list");
      console.log(err);
    });
  };

  return (
    <Box ml={0}>
      <Stack direction="row">
        <UserDrawer
          setTaskClicked={setTaskClicked}
          setListClicked={setListClicked}
          open={open}
          setOpen={setOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />

        <Stack direction="column">
          <Stack direction="row">
            <Tooltip
              title="Open side drawer"
              placement="bottom"
              arrow
              enterDelay={400}
              leaveDelay={200}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  mr: 0.5,
                  ml: 1,
                  mt: 1.5,
                  mb: 1,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            {isEditing ? (
              <div style={{ marginTop: "0.5rem" }}>
                <EditField
                  editField={editField}
                  field="Board Name"
                  value={boardName}
                  toggleEditForm={toggle}
                />
              </div>
            ) : (
              <Tooltip
                title="Double click to edit your board's Name"
                placement="right"
                arrow
                enterDelay={400}
                leaveDelay={200}
              >
                <Typography
                  variant="h5"
                  mb={2}
                  mt={2.5}
                  ml={2.2}
                  onDoubleClick={() => toggle()}
                >
                  {boardName}
                </Typography>
              </Tooltip>
            )}

            <DropDown
              options={["title", "task", "type"]}
              names={["Title", "Task", "Type of Task"]}
              setSearchBy={setSearchBy}
            />
            <Search setQuery={setQuery} query={query} />

            <Button
              variant="contained"
              padding={2}
              sx={{
                position: "fixed",
                top: "1.6rem",
                right: "2rem",
              }}
              size="small"
              onClick={handleSignOutClick}
            >
              Sign Out
            </Button>
          </Stack>

          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, lists, setLists)}
          >
            <Stack direction="row" sx={{ marginLeft: "1rem" }}>
              {lists.map((list, index) => {
                return (
                  <Droppable droppableId={list.id} key={list.id}>
                    {(provided, snapshot) => {
                      return (
                        <TaskList
                          cardList={
                            query === ""
                              ? list.cardList
                              : list.cardList.filter((card) =>
                                  card[searchBy]
                                    .toLowerCase()
                                    .includes(query.toLowerCase())
                                )
                          }
                          title={list.title}
                          id={list.id}
                          isDeleteable={list.isDeleteable}
                          provided={provided}
                          innerRef={provided.innerRef}
                          key={list.id}
                          index={index}
                          snapshot={snapshot}
                          deleteCard={deleteCard}
                          editCardDialog={editCardDialog}
                          deleteCardDialog={deleteCardDialog}
                          editListName={editListName}
                          deleteList={deleteList}
                        />
                      );
                    }}
                  </Droppable>
                );
              })}

              {taskClicked === true ? (
                <CreateTask
                  taskClicked={taskClicked}
                  setTaskClicked={setTaskClicked}
                  addCard={addCard}
                />
              ) : null}
              {listClicked === true ? (
                <CreateList
                  listClicked={listClicked}
                  setListClicked={setListClicked}
                  addList={addList}
                />
              ) : null}
              {showEditDialog === true ? (
                <EditCard
                  card={selectedCard}
                  setShowEditDialog={setShowEditDialog}
                  showEditDialog={showEditDialog}
                  editCardDetails={editCardDetails}
                />
              ) : null}
              {showDeleteDialog === true ? (
                <DeleteDialog
                  setShowDeleteDialog={setShowDeleteDialog}
                  showDeleteDialog={showDeleteDialog}
                  deleteCard={deleteCard}
                />
              ) : null}
            </Stack>
          </DragDropContext>
        </Stack>
      </Stack>
    </Box>
  );
}
export default UserHomePage;
