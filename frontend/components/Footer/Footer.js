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
        <div className="footerNav">
            <div className="project-btn">
                <a Link="/dashboard/">
                    <img src="/home.png" id="homeimg" alt="proj-icon" />
                </a>
            </div>
            <div className="tasks-btn">
                <a Link="/tasks/">
                    <img src="/calendar.png" id="taskimg" alt="tasks-icon" />
                </a>
            </div>
            <div className="messages-btn">
                <a Link="/messages/">
                    <img src="/chat.png" id="mesimg" alt="messages-icon" />
                </a>
            </div>
            <div className="profile-btn">
                <a Link="/profile/">
                    <img src="/profile.png" id="profimg" alt="setting-icon" />
                </a>
            </div>
        </div>
    );
}
