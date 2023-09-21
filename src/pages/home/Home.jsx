import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalLayout from "../../layouts/ModalLayout";
import styles from "./home.module.scss";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState(1);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    console.log("location ==> ", location);
    if (location.pathname === "/all-contacts") {
      setModalShow(true);
      setModalType(1);
    } else if (location.pathname === "/us-contacts") {
      setModalShow(true);
      setModalType(2);
    }
  }, [location]);

  return (
    <>
      <div className={styles.main}>
        <button
          className="btnA"
          onClick={() => {
            setModalShow(true);
            setModalType(1);
            navigate("/all-contacts");
          }}
        >
          Button A
        </button>
        <button
          className="btnB"
          onClick={() => {
            setModalShow(true);
            setModalType(2);
            navigate("/us-contacts");
          }}
        >
          Button B
        </button>
      </div>
      <ModalLayout
        show={modalShow}
        title={modalType === 1 ? "All Contacts" : "US Contacts"}
        backdrop="static"
        modalType={modalType}
        setModalType={setModalType}
        onHide={() => {
          navigate("/");
          setModalShow(false);
        }}
      />
    </>
  );
};

export default Home;
