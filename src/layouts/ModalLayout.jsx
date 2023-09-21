import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./modal.module.scss";
import Form from "react-bootstrap/Form";
import useApi from "../hooks/api/useApi";
import { eyeIcon } from "../assets/icons";
import { Scrollbars } from "react-custom-scrollbars";
import DetailModalLayout from "./DetailModalLayout";
import { useNavigate } from "react-router-dom";

const ModalLayout = (props) => {
  const navigate = useNavigate();
  const { show, title, onHide, setModalType, modalType } = props;
  const [contactsList, setContactsList] = useState();
  const [onlyEven, setOnlyEven] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [contactsApi, response] = useApi(
    "https://api.dev.pastorsline.com/api/contacts.json",
    {
      method: "GET",
      params: {
        companyId: "560",
        query: searchText,
        page: pageNumber,
        countryId: modalType === 1 ? undefined : 226,
        noGroupDuplicates: 1,
      },
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (show) {
        contactsApi();
      } else {
        setPageNumber(1);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [modalType, show, pageNumber, searchText]);

  useEffect(() => {
    console.log("response ==> ", response);
    if (response?.data) {
      if (
        Object.keys({ ...response?.data?.contacts, ...contactsList }).length >=
        response?.data?.total
      ) {
        setHasMore(false);
      }
      if (isSearch) {
        setContactsList(response?.data?.contacts);
      } else {
        setContactsList({ ...response?.data?.contacts, ...contactsList });
      }
    }
  }, [response]);

  const handleScroll = (values) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    if (
      scrollHeight - scrollTop === clientHeight &&
      !response?.loading &&
      hasMore
    ) {
      setIsSearch(false);
      setInitialLoad(false);
      setPageNumber(pageNumber + 1);
    }
  };
  const handleSearchChange = (e) => {
    setInitialLoad(false);
    setIsSearch(true);
    setPageNumber(1);
    setHasMore(true);
    setSearchText(e.target.value);
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={styles.mainWrap}>
          <div className={styles.title}>{title}</div>
          <div className={styles.btnWrap}>
            <button
              className="btnA"
              onClick={() => {
                navigate("/all-contacts");
                setModalType(1);
              }}
            >
              All Contacts
            </button>
            <button
              className="btnB"
              onClick={() => {
                navigate("/us-contacts");
                setModalType(2);
              }}
            >
              US Contacts
            </button>
            <button
              className="btnC"
              onClick={() => {
                onHide();
                setContactsList();
                setIsSearch(false);
                setPageNumber(1);
                setHasMore(true);
                setInitialLoad(true);
              }}
            >
              Close
            </button>
          </div>
          <div className={styles.contentWrap}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by name or number"
              onChange={handleSearchChange}
            />
            <Scrollbars style={{ height: 300 }} onScrollFrame={handleScroll}>
              {(response.loading || !contactsList) &&
              (initialLoad || isSearch) ? (
                <div className={styles.loaderWrap}>
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : contactsList && Object.keys(contactsList).length > 0 ? (
                Object.keys(contactsList).map(function (key) {
                  return onlyEven && key % 2 !== 0 ? null : (
                    <div className={styles.contactItem} key={key}>
                      <div className={styles.leftWrap}>
                        <div className={styles.item}>
                          <span className={styles.innertitle}>Id:</span>{" "}
                          <span className={styles.value}>
                            {contactsList[key].id}
                          </span>
                        </div>
                        <div className={styles.item}>
                          <span className={styles.innertitle}>Name:</span>{" "}
                          <span
                            className={styles.value}
                          >{`${contactsList[key].first_name} ${contactsList[key].last_name}`}</span>
                        </div>
                        <div className={styles.item}>
                          <span className={styles.innertitle}>Number:</span>{" "}
                          <span className={styles.value}>
                            {contactsList[key].phone_number}
                          </span>
                        </div>
                      </div>
                      <div
                        className={styles.iconWrap}
                        onClick={() => {
                          setModalShow(true);
                          setModalData(contactsList[key]);
                        }}
                      >
                        {eyeIcon}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.loaderWrap}>
                  <span className={styles.text}>No Contacts Found!</span>
                </div>
              )}
            </Scrollbars>
          </div>
          <div className={styles.bottomWrap}>
            <Form.Check // prettier-ignore
              type="checkbox"
              label="Only even"
              onChange={(e) => setOnlyEven(e.target.checked)}
            />
          </div>
        </div>
      </Modal>
      <DetailModalLayout
        show={modalShow}
        backdrop="static"
        onHide={() => setModalShow(false)}
        modalData={modalData}
      />
    </>
  );
};

export default ModalLayout;
