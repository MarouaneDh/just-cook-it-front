import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser, getUsers } from "../JS/actions/userActions";
import Modal from "react-modal";

const Users = () => {
  const users = useSelector((state) => state.userReducer.userList);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  var subtitle;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "800px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
    },
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const afterOpenModal = () => {
    subtitle.style.color = "#fff";
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className="pagebody">
      <h1>USERS :</h1>
      <div className="users">
        {users.map((el) => (
          <div key={el._id}>
            <div>
              <p className="oneUser">
                {el.role} : {el.firstName} {el.lastName} from {el.country},{" "}
                {el.state}
                <button className="deleteUserAdmin" onClick={openModal}>
                  DELETE PROFILE
                </button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Are you sure you want to delete this profile
                  </h2>
                  <div>
                    <button
                    // onClick={() => {
                    //   dispatch(deleteUser(el._id));
                    // }}
                    >
                      DELETE PROFILE
                    </button>
                    <button onClick={closeModal}>No</button>
                  </div>
                </Modal>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
