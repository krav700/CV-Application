import { useState } from 'react';
import '../styles/InputData.css'

function dateOrganizer(orgDate) {
    let date = orgDate.toISOString().slice(0,7);
    let year = parseInt(date.slice(0, 4)) + 1;
    let month = parseInt(date.slice(5,7)) + 1;
    if (month == 13) {
        date = year + "-0" + 1;
    } else {
        if (month < 10) {
            date = date.slice(0, -2) + "0" + month;
        } else {
            date = date.slice(0, -2) + month;
        }
    }
    return date
}

function changeSchoolAttribute(e, id, attribute, person) {
    const schoolChange = person.schools.map((school) => {
        if (school.id !== id) {
            return school;
        } else {
            if (attribute !== "dateFrom" && attribute !== "dateTo") {
                return {
                    ...school,
                    [attribute]: e.target.value
                }
            } else {
                let month = parseInt(e.target.value.slice(5, 7)) - 1;
                return {
                    ...school,
                    [attribute]: [e.target.value.slice(0, 4), month]
                }
            }
        }
    })
    person.setSchools(schoolChange);
}

function changeWorkAttribute(e, id, attribute, person) {
    const workChange = person.practicalExp.map((work) => {
        if (work.id !== id) {
            return work;
        } else {
            if (attribute !== "dateFrom" && attribute !== "dateTo") {
                return {
                    ...work,
                    [attribute]: e.target.value
                }
            } else {
                let month = parseInt(e.target.value.slice(5, 7)) - 1;
                return {
                    ...work,
                    [attribute]: [e.target.value.slice(0, 4), month]
                }
            }
        }
    })
    person.setPracticalExp(workChange);
}

function School({person, school}) {
    const dateFrom = dateOrganizer(new Date(school.dateFrom[0], school.dateFrom[1]));
    const dateTo = dateOrganizer(new Date(school.dateTo[0], school.dateTo[1]));

    return (
        <form>
            <div className='school-block'>
                <label htmlFor="school-name">School Name</label>
                <input type="text" id='school-name' value={school.organizationName} onChange={(e) => changeSchoolAttribute(e, school.id, "organizationName", person)}/>
                <label htmlFor="title-of-study">Title of study</label>
                <input type="text" id='title-of-study' value={school.title} onChange={(e) => changeSchoolAttribute(e, school.id, "title", person)}/>
                <label htmlFor="date-from-study">Date From</label>
                <input type="month" id='date-from-study' min={"1999-01"} max={"2030-01"} value={dateFrom} onChange={(e) => changeSchoolAttribute(e, school.id, "dateFrom", person)}/>
                <label htmlFor="date-to-study">Date To</label>
                <input type="month" id='date-to-study' min={"1999-01"} max={"2030-01"} value={dateTo} onChange={(e) => changeSchoolAttribute(e, school.id, "dateTo", person)}/>
            </div>
        </form>
    )
}

function Work({person, work}) {
    const dateFrom = dateOrganizer(new Date(work.dateFrom[0], work.dateFrom[1]));
    const dateTo = dateOrganizer(new Date(work.dateTo[0], work.dateTo[1]));

    return (
        <form>
            <div className='work-block'>
                <label htmlFor="work-name">Work Place Name</label>
                <input type="text" id='work-name' value={work.organizationName} onChange={(e) => changeWorkAttribute(e, work.id, "organizationName", person)}/>
                <label htmlFor="title-of-work">Title of work</label>
                <input type="text" id='title-of-work' value={work.title} onChange={(e) => changeWorkAttribute(e, work.id, "title", person)}/>

                <label htmlFor="main-responsibilities">Main Responsibilities</label>
                <textarea name="main-responsibilities" id="main-responsibilities" value={work.mainResponsibilities} onChange={(e) => changeWorkAttribute(e, work.id, "mainResponsibilities", person)}></textarea>

                <label htmlFor="date-from-work">Date From</label>
                <input type="month" id='date-from-work' min={"1999-01"} max={"2030-01"} value={dateFrom} onChange={(e) => changeWorkAttribute(e, work.id, "dateFrom", person)}/>
                <label htmlFor="date-to-work">Date To</label>
                <input type="month" id='date-to-work' min={"1999-01"} max={"2030-01"} value={dateTo} onChange={(e) => changeWorkAttribute(e, work.id, "dateTo", person)}/>
            </div>
        </form>
    )
}

function InputData ({ person }) {

    const [showGeneral, setShowGeneral] = useState(false);
    const [showProfessionaProfile, setShowProfesstionalProfile] = useState(false);
    const [showEmploymentHistory, setShowEmploymentHistory] = useState(false);
    const [showEducation, setShowEducation] = useState(false);

    function changeFullName(e) {
        person.setFullName(e.target.value);
    }

    function changeTelNum(e) {
        person.setPhoneNumber(e.target.value);
    }

    function changeEmail(e) {
        person.setEmail(e.target.value);
    }

    function changeProPro(e) {
        person.setProfesstionalProfile(e.target.value);
    }

    return ( 
        <div className='input-data'>
            <div className='general-section section'  onClick={() => setShowGeneral(!showGeneral)}>
                <h1>General</h1>
                <button className='general-drow-button drow-button'>{showGeneral ? '⌃' : '⌄'}</button>
            </div>
            <div className={showGeneral ? 'general-dropdown' : 'hide-general-dropdown'}>
                <label htmlFor="full-name">Full Name</label>
                <input type="text" id='full-name' maxLength={56} value={person.fullName} onChange={changeFullName}/>

                <label htmlFor="tel-num">Telephone Number</label>
                <input type="text" id='tel-num' maxLength={15} value={person.phoneNumber} onChange={changeTelNum}/>

                <label htmlFor="email">Email</label>
                <input type="text" id='email' maxLength={50} value={person.email} onChange={changeEmail}/>
            </div>


            <div className='professional-profile-section section' onClick={() => setShowProfesstionalProfile(!showProfessionaProfile)}>
                <h1>Proffessional Profile</h1>
                <button className='pro-drow-button drow-button'>{showProfessionaProfile ? '⌃' : '⌄'}</button>
            </div>
            <div className={showProfessionaProfile ? 'professional-profile-dropdown' : 'hide-professional-profile-dropdown'}>
                <textarea id='pro-pro' className='pro-pro-textarea' value={person.professtionalProfile} onChange={changeProPro}/>
            </div>

            <div className='employment-history-section section' onClick={() => setShowEmploymentHistory(!showEmploymentHistory)}>
                <h1>Employment History</h1>
                <button className='employment-drow-button drow-button'>{showEmploymentHistory ? '⌃' : '⌄'}</button>
            </div>
            <div className={showEmploymentHistory ? 'employment-history-dropdown' : 'hide-employment-history-dropdown'}>
                {person.practicalExp.map((work) => {

                return (
                        <Work person={person} work={work} key={work.id}/>
                )})}
                <button className='add-organasation' onClick={() => addNewWork(person)}>+</button>
            </div>

            <div className='education-section section' onClick={() => setShowEducation(!showEducation)}>
                <h1>Education</h1>
                <button className='education-drow-button drow-button'>{showEducation ? '⌃' : '⌄'}</button>
            </div>
            <div className={showEducation ? 'education-dropdown' : 'hide-education-dropdown'}>
                {person.schools.map((school) => {

                return (
                        <School person={person} school={school} key={school.id}/>
                )})}
                <button className='add-organasation' onClick={() => addNewSchool(person)}>+</button>
            </div>

            <button onClick={() => {saveCV()}} className='save-cv-button'>Save</button>

        </div>
    )

    function saveCV() {
        localStorage.setItem("fullName", person.fullName);
        localStorage.setItem("phoneNumber", person.phoneNumber);
        localStorage.setItem("email", person.email);
        localStorage.setItem("proffessionalProfile", person.professtionalProfile);
        localStorage.setItem("schools", JSON.stringify(person.schools));
        localStorage.setItem("practicalExperience", JSON.stringify(person.practicalExp));
    }
}

function addNewSchool(person) {
    let schoolsTillNow = [...person.schools];
    schoolsTillNow.push({
        id: schoolsTillNow.length,
        organizationName: "",
        title:"",
        dateFrom: ["", ""],
        dateTo: ["", ""]
    });
    person.setSchools(schoolsTillNow);
}

function addNewWork(person) {
    let workTillNow = [...person.practicalExp];
    workTillNow.push({
        id: workTillNow.length,
        organizationName: "",
        title:"",
        mainResponsibilities: "",
        dateFrom: ["", ""],
        dateTo: ["", ""]
    });
    person.setPracticalExp(workTillNow);
}

export default InputData;