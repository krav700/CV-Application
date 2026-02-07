import "../styles/CV.css";
import html2pdf from "html2pdf.js";
import Activity from "./Activity.jsx";

function CV({ person }) {
    async function downloadPDF() {
        const pdf = document.querySelector(".cv");
        const links = document.querySelector(".links");
        const activityDates = document.querySelectorAll(".activity-date");
        links.style.display = "none";
        activityDates.forEach((activityDate) => {
            activityDate.style.marginRight = "2rem";
        });

        await html2pdf().from(pdf).save(`${person.fullName} CV`);
        links.style.display = "flex";
        activityDates.forEach((activityDate) => {
            activityDate.style.marginRight = "0";
        });
    }

    async function printCV() {
        const links = document.querySelector(".links");
        links.style.display = "none";
        print();
        links.style.display = "flex";
    }

    return (
        <div className="cv">
            <div className="links">
                <button
                    className="pdf-button link"
                    onClick={() => {
                        downloadPDF();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        width="35px"
                    >
                        <path d="M19.95,5.54l-3.49-3.49c-1.32-1.32-3.08-2.05-4.95-2.05H7C4.24,0,2,2.24,2,5v14c0,2.76,2.24,5,5,5h10c2.76,0,5-2.24,5-5V10.49c0-1.87-.73-3.63-2.05-4.95Zm-1.41,1.41c.32,.32,.59,.67,.81,1.05h-4.34c-.55,0-1-.45-1-1V2.66c.38,.22,.73,.49,1.05,.81l3.49,3.49Zm1.46,12.05c0,1.65-1.35,3-3,3H7c-1.65,0-3-1.35-3-3V5c0-1.65,1.35-3,3-3h4.51c.16,0,.33,0,.49,.02V7c0,1.65,1.35,3,3,3h4.98c.02,.16,.02,.32,.02,.49v8.51ZM7.09,13h-1.09c-.55,0-1,.45-1,1v4.44c0,.35,.28,.62,.62,.62s.62-.28,.62-.62v-1.22h.84c1.18,0,2.14-.95,2.14-2.11s-.96-2.11-2.14-2.11Zm0,2.97h-.83s0-1.72,0-1.72h.84c.48,0,.89,.39,.89,.86s-.41,.86-.89,.86Zm11.93-2.34c0,.35-.28,.62-.62,.62h-1.69v1.14h1.24c.35,0,.62,.28,.62,.62s-.28,.62-.62,.62h-1.24v1.8c0,.35-.28,.62-.62,.62s-.62-.28-.62-.62v-4.81c0-.35,.28-.62,.62-.62h2.31c.35,0,.62,.28,.62,.62Zm-6.93-.62h-1.09c-.55,0-1,.45-1,1v4.44c0,.35,.28,.56,.62,.56s1.46,0,1.46,0c1.18,0,2.14-.95,2.14-2.11v-1.78c0-1.16-.96-2.11-2.14-2.11Zm.89,3.89c0,.47-.41,.86-.89,.86h-.83s0-3.5,0-3.5h.84c.48,0,.89,.39,.89,.86v1.78Z" />
                    </svg>
                </button>
                <button
                    className="print-button link"
                    onClick={() => {
                        printCV();
                    }}
                >
                    <svg
                        data-slot="icon"
                        fill="none"
                        width="35px"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                        ></path>
                    </svg>
                </button>
            </div>
            <h1>{person.fullName}</h1>
            <div className="phoneAndEmail">
                <h3>{person.phoneNumber}</h3>
                <h3>{person.email}</h3>
            </div>
            <div className="sectionDevider"></div>

            {person.professtionalProfile ? (
                <>
                    <h2 className="section-name">PROFESSIONAL PROFILE</h2>
                    <p>{person.professtionalProfile}</p>
                    <div className="sectionDevider"></div>
                </>
            ) : (
                ""
            )}

            {person.practicalExp.length != 0 ? (
                <>
                    <h2 className="section-name">EMPLOYMENT HISTORY</h2>
                    {person.practicalExp.map((work) => (
                        <Activity
                            activity={work}
                            person={person}
                            key={work.id}
                        />
                    ))}
                </>
            ) : (
                ""
            )}

            {person.schools.length != 0 ? (
                <>
                    <h2 className="section-name">EDUCATION</h2>
                    {person.schools.map((school) => (
                        <Activity
                            activity={school}
                            person={person}
                            key={school.id}
                        />
                    ))}
                </>
            ) : (
                ""
            )}
        </div>
    );
}

export default CV;
