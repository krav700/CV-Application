import { act } from 'react';
import '../styles/Activity.css'

function removeActivity(activity, person) {
    let removedActivity;
    if ("mainResponsibilities" in activity) {
        removedActivity = person.practicalExp.filter(praEx => praEx != activity);
        person.setPracticalExp(removedActivity);
    } else {
        removedActivity = person.schools.filter(school => school != activity);
        person.setSchools(removedActivity);
    }

}

function Activity({ activity, person }) {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div onClick={() => {removeActivity(activity, person)}}>
            <h3 className='work-title'>
                <span>✥ {activity.organizationName} - {activity.title} </span>
                <span className='dotted-line'></span>
                <span className='activity-date'>{months[new Date(activity.dateFrom[0],activity.dateFrom[1]).getMonth()]} {new Date(activity.dateFrom[0],activity.dateFrom[1]).getFullYear()} - {months[new Date(activity.dateTo[0],activity.dateTo[1]).getMonth()]} {new Date(activity.dateTo[0],activity.dateTo[1]).getFullYear()}</span>
            </h3>
            {activity.mainResponsibilities ? <p className='work-description'>{activity.mainResponsibilities}</p> : ""}
        </div>
    );

}

export default Activity;