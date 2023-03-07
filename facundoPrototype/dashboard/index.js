let proj = document.querySelector(".project-btn");
let notif = document.querySelector(".notif-btn");
let user = document.querySelector(".profile-btn");
let settings = document.querySelector(".settings-btn");
let projCon = document.querySelector(".project-container");
let notifCon = document.querySelector(".notif-container");
let userCon = document.querySelector(".profile-container");
let settingsCon = document.querySelector(".settings-container");
let projSel = document.querySelector(".projselicn");
let notifSel = document.querySelector(".notifselicn");
let userSel = document.querySelector(".profselicn");
let settingsSel = document.querySelector(".setselicn");

let projSelected = true;
let notifSelected = false;
let userSelected = false;
let settingSelected = false;
notifCon.classList.toggle("notif-container");
userCon.classList.toggle("profile-container");
settingsCon.classList.toggle("settings-container");
notifSel.classList.toggle("notifselicn");
userSel.classList.toggle("profselicn");
settingsSel.classList.toggle("setselicn");

proj.addEventListener("click",()=>
{
    if(projSelected === false)
    {
        projCon.classList.toggle("project-container");
        projSelected = true;
        projSel.classList.toggle("projselicn");
    }
    if(notifSelected)
    {
        notifCon.classList.toggle("notif-container");
        notifSelected = false;
        notifSel.classList.toggle("notifselicn");
    }
    if(userSelected)
    {
        userCon.classList.toggle("profile-container");
        userSelected = false;
        userSel.classList.toggle("profselicn");
    }
    if(settingSelected)
    {
        settingsCon.classList.toggle("settings-container");
        settingSelected = false;
        settingsSel.classList.toggle("setselicn");
    }
})

notif.addEventListener("click",()=>
{
    if(projSelected)
    {
        projCon.classList.toggle("project-container");
        projSelected = false;
        projSel.classList.toggle("projselicn");
    }
    if(notifSelected === false)
    {
        notifCon.classList.toggle("notif-container");
        notifSelected = true;
        notifSel.classList.toggle("notifselicn");
    }
    if(userSelected)
    {
        userCon.classList.toggle("profile-container");
        userSelected = false;
        userSel.classList.toggle("profselicn");
    }
    if(settingSelected)
    {
        settingsCon.classList.toggle("settings-container");
        settingSelected = false;
        settingsSel.classList.toggle("setselicn");
    }
})

user.addEventListener("click",()=>
{
    if(projSelected)
    {
        projCon.classList.toggle("project-container");
        projSelected = false;
        projSel.classList.toggle("projselicn");
    }
    if(notifSelected)
    {
        notifCon.classList.toggle("notif-container");
        notifSelected = false;
        notifSel.classList.toggle("notifselicn");
    }
    if(userSelected === false)
    {
        userCon.classList.toggle("profile-container");
        userSelected = true;
        userSel.classList.toggle("profselicn");
    }
    if(settingSelected)
    {
        settingsCon.classList.toggle("settings-container");
        settingSelected = false;
        settingsSel.classList.toggle("setselicn");
    }
})

settings.addEventListener("click",()=>
{
    if(projSelected)
    {
        projCon.classList.toggle("project-container");
        projSelected = false;
        projSel.classList.toggle("projselicn");
    }
    if(notifSelected)
    {
        notifCon.classList.toggle("notif-container");
        notifSelected = false;
        notifSel.classList.toggle("notifselicn");
    }
    if(userSelected)
    {
        userCon.classList.toggle("profile-container");
        userSelected = false;
        userSel.classList.toggle("profselicn");
    }
    if(settingSelected === false)
    {
        settingsCon.classList.toggle("settings-container");
        settingSelected = true;
        settingsSel.classList.toggle("setselicn");
    }
})