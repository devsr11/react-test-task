import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import styles from "./detailModal.module.scss";

const DetailModalLayout = (props) => {
  const { modalData, onHide } = props;

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={styles.mainWrap}>
        <div className={styles.title}>Contact Detail</div>
        <div className={styles.contentWrap}>
          <div className={styles.contactItem}>
            <div className={styles.item}>
              <span className={styles.innertitle}>Id:</span>{" "}
              <span className={styles.value}>{modalData?.id}</span>
            </div>

            <div className={styles.item}>
              <span className={styles.innertitle}>Name:</span>{" "}
              <span
                className={styles.value}
              >{`${modalData?.first_name} ${modalData?.last_name}`}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.innertitle}>Number:</span>{" "}
              <span className={styles.value}>{modalData?.phone_number}</span>
            </div>
          </div>
        </div>
        <div className={styles.btnWrap}>
          <button
            className="btnC"
            onClick={() => {
              onHide();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModalLayout;
