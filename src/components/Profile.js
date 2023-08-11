import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../JS/actions/authActions";
import Modal from "react-modal";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
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
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };
  return (
    <div>
      <div className="pagebody">
        <h1 className="nav">Profile Page</h1>
        {isAuth ? (
          <div className="aboutus">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <h2>User name : {user.userName}</h2>
            <h2>Birthday : {user.birthday}</h2>
            <h3>Age : {user.age}</h3>
            <p>
              Address : {user.country}, {user.state},{user.street},{" "}
              {user.zipCode}
            </p>
            <p>Email : {user.email}</p>
            {user.role == "user" ? (
              <div>
                <button onClick={openModal}>DELETE PROFILE</button>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                    Are you sure you want to delete your profile
                  </h2>
                  <div>
                    <button
                      onClick={() => {
                        dispatch(deleteUser(user._id));
                      }}
                    >
                      DELETE PROFILE
                    </button>
                    <button onClick={closeModal}>No</button>
                  </div>
                </Modal>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
