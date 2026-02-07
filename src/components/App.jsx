import { useState } from "react";

import "../styles/App.css";
import CV from "./CV.jsx";
import InputData from "./InputData.jsx";

window.addEventListener("beforeunload", () => {});

function toggleCVInput() {
    const inputDate = document.querySelector(".input-data");
    const cv = document.querySelector(".cv");
    const mainWindow = document.querySelector(".main-window");
    if (cv.style.display == "block") {
        cv.style.display = "none";
        inputDate.style.display = "flex";
        mainWindow.style.justifyContent = "center";
    } else {
        cv.style.display = "block";
        inputDate.style.display = "none";
        mainWindow.style.justifyContent = "space-around";
    }
}

function App() {
    let lSname = "Jhon Does";
    let lSphoneNumber = "555-555-555";
    let lSEmail = "BoomBam@gmail.com";
    let lSProffesionalProfile =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi inventore, quia consequuntur eos error eum nisi voluptate id tempore voluptatibus consectetur, laboriosam culpa quis dicta quasi officia officiis reprehenderit possimus?";
    let lSSchools = [
        {
            id: 0,
            organizationName: "School of Goop",
            title: "Builder",
            dateFrom: [2021, 11],
            dateTo: [2024, 5],
        },
    ];
    let lSPracticalExp = [
        {
            id: 0,
            organizationName: "Company Name",
            title: "Head of something",
            mainResponsibilities: "Doing the stuff on the side",
            dateFrom: [2024, 1],
            dateTo: [2024, 6],
        },
    ];

    if (localStorage.getItem("fullName")) {
        lSname = localStorage.getItem("fullName");
    }
    if (localStorage.getItem("phoneNumber")) {
        lSphoneNumber = localStorage.getItem("phoneNumber");
    }
    if (localStorage.getItem("email")) {
        lSEmail = localStorage.getItem("email");
    }
    if (localStorage.getItem("proffessionalProfile")) {
        lSProffesionalProfile = localStorage.getItem("proffessionalProfile");
    }
    if (localStorage.getItem("schools")) {
        lSSchools = JSON.parse(localStorage.getItem("schools"));
    }
    if (localStorage.getItem("practicalExperience")) {
        lSPracticalExp = JSON.parse(
            localStorage.getItem("practicalExperience")
        );
    }

    const [fullName, setFullName] = useState(lSname);
    const [phoneNumber, setPhoneNumber] = useState(lSphoneNumber);
    const [email, setEmail] = useState(lSEmail);
    const [professtionalProfile, setProfesstionalProfile] = useState(
        lSProffesionalProfile
    );
    const [schools, setSchools] = useState(lSSchools);
    const [practicalExp, setPracticalExp] = useState(lSPracticalExp);

    let person = {
        fullName,
        phoneNumber,
        email,
        professtionalProfile,
        schools,
        practicalExp,

        setFullName,
        setPhoneNumber,
        setEmail,
        setProfesstionalProfile,
        setSchools,
        setPracticalExp,
    };

    return (
        <div className="main-window">
            <button className="input-data-show-menu" onClick={toggleCVInput}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>
            <InputData person={person} />
            <CV person={person} />
        </div>
    );
}
export default App;
