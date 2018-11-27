import React from 'react';
import Reminder from './Reminder';

const CompletedReminders = (props) => {
  let text = "Show";
  let remindersHTML;
  if(props.showCompleted){
    let sortedReminders = props.completedReminders.sort(props.sortBySequence);
    remindersHTML = sortedReminders.map(reminder => {
      return(
        <Reminder
          key={reminder.id}
          reminder={reminder}
          datePickerDisabled={true}
          toggleReminderCompleted={props.toggleReminderCompleted}
        />
      )
    })

    text = "Hide"
  }

  return(
    <div className="completed-reminders">
     <span className="show-completed link" onClick={props.toggleShowComplete}>
       {text} Completed Reminders
     </span>
      {remindersHTML}
    </div>
  );
};

export default CompletedReminders
