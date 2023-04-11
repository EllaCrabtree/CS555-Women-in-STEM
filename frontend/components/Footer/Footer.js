import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import { useRouter } from "next/router";
// import { Image } from "next/image";

import { useAuth } from "@contexts/authUserContext";
import styles from "./Footer.module.css";

export default function Auth({ type }) {
    return (
        <div className={styles.footerNav}>
            <Link href="/dashboard/" className="project-btn">
                <img src="/home.png" id="homeimg" alt="proj-icon" />
            </Link>
            <Link href="/tasks/" className="tasks-btn">
                <img src="/calendar.png" id="taskimg" alt="tasks-icon" />
            </Link>
            <Link href="/messages/" className="messages-btn">
                <img src="/chat.png" id="mesimg" alt="messages-icon" />
            </Link>
            <Link href="/profile/" className="profile-btn">
                <img src="/profile.png" id="profimg" alt="setting-icon" />
            </Link>
        </div>
    );
}
