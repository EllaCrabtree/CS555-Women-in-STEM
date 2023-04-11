import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Image } from "next/image";

import { useAuth } from "@contexts/authUserContext";
import styles from "./Header.module.css";

export default function Auth({ type }) {
    return (
        <div className={styles.headerBar}>
            <div className={styles.idContainer}>
                <img
                    src="/defProfilePic.png"
                    className={styles.profilePic}
                    alt="profilepic"
                />
                <div className={styles.idInfo}>
                    <h2 id={styles.idInfoName}>Default Name</h2>
                    <h4 id={styles.idInfoRole}>Default Role</h4>
                </div>
            </div>
            <a href="../notificationsPage/notifications.html">
                <img
                    src="/notification.png"
                    className={styles.notificationPic}
                    alt="notifpic"
                />
            </a>
        </div>
    );
}
