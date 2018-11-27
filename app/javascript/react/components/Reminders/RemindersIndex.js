import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Reminder from './Reminder';
import CompletedReminders from './CompletedReminders';

class RemindersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategory: "",
      categories: [],
      reminders: {},
      selectedCategory: null,
      newReminder: "",
      selectedDate: null,
      showCompleted: false,
      completedReminders: {}
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchReminders = this.fetchReminders.bind(this);
    this.fetchCompletedReminders = this.fetchCompletedReminders.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.clickReminders = this.clickReminders.bind(this);
    this.addReminder = this.addReminder.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onClickCategory = this.onClickCategory.bind(this);
    this.reminderOnChange = this.reminderOnChange.bind(this);
    this.reminderSubmitForm = this.reminderSubmitForm.bind(this);
    this.updateReminders = this.updateReminders.bind(this);
    this.clickDate = this.clickDate.bind(this);
    this.toggleShowComplete = this.toggleShowComplete.bind(this);
    this.toggleReminderCompleted = this.toggleReminderCompleted.bind(this);
  }

  fetchCategories() {
    fetch(`/api/v1/reminder_categories`)
    .then(response => {
      if (response.ok) {
        return response;
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.reminder_categories.length){
        let sortedCategories = data.reminder_categories.sort(this.props.sortBySequence);

        this.setState({
          selectedCategory: sortedCategories[0],
          categories: sortedCategories
          }, this.fetchReminders
        );
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchReminders(){
    fetch(`/api/v1/reminder_categories/${this.state.selectedCategory.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      }
    })
    .then(response => response.json())
    .then(data => {
      let newReminders = Object.assign({}, this.state.reminders);
      newReminders[this.state.selectedCategory.id] = data.reminders;
      this.setState({
        reminders: newReminders
      });
      this.fetchCompletedReminders();
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  fetchCompletedReminders(){
    fetch(`/api/v1/reminder_categories/${this.state.selectedCategory.id}/completed`)
    .then(response => {
      if (response.ok) {
        return response;
      }
    })
    .then(response => response.json())
    .then(data => {
      let completedReminders = Object.assign({}, this.state.completedReminders);
      completedReminders[this.state.selectedCategory.id] = data.reminders;
      this.setState({
        completedReminders: completedReminders
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  updateReminders(reminders){
    let newReminders = Object.assign({}, this.state.reminders)
    newReminders[this.state.selectedCategory.id] = reminders.reminders
    this.setState({reminders: newReminders});
  }

  addReminder(categoryId, reminder){
    fetch(`/api/v1/reminders`, {
      method: 'POST',
      body: JSON.stringify({category_id: categoryId, reminder: reminder}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        credentials: 'same-origin'
    })
    .then(data => data.json())
    .then(data => {
      let newReminders = Object.assign({}, this.state.reminders);
      newReminders[this.state.selectedCategory.id].push(data.reminder)
      this.setState({reminders: newReminders})
    })
  }

  clickReminders(event){
    browserHistory.push(`/reminders/${event.target.id}`)
  }

  addCategory(event){
    event.preventDefault();
    let newCategory = this.state.newCategory
    if(newCategory.replace(/\s+/g,'')){
      this.saveCategory(newCategory)
    }
  }

  saveCategory(newCategory) {
    fetch(`/api/v1/reminder_categories`, {
      method: 'POST',
      body: JSON.stringify({category: newCategory}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        credentials: 'same-origin'
    })
    .then(data => data.json())
    .then(data => {
      let categories = this.state.categories;
      categories.push(data.reminder_category);
      let newReminders = Object.assign({}, this.state.reminders);
      newReminders[data.reminder_category.id] = []
      this.setState({
        selectedCategory: data.reminder_category,
        categories: categories,
        reminders: newReminders
      })
    })
  }

  onChangeCategory(event){
    this.setState({newCategory: event.target.value})
  }

  onClickCategory(event){
    const category = this.state.categories.filter(category => category.id === Number(event.target.id))
    this.setState({selectedCategory: category[0]},
      this.fetchReminders
    )
  }

  reminderOnChange(event){
    this.setState({newReminder: event.target.value});
  }


  reminderSubmitForm(event){
    event.preventDefault()
    if(this.state.newReminder.replace(/\s+/g,'')){
      this.addReminder(this.state.selectedCategory.id, this.state.newReminder)
    }
    this.setState({newReminder: ""})
  }

  clickDate(id, date){
    if(this.state.selectedDate === id){
      this.setState({selectedDate: null});
    }else{
      this.setState({selectedDate: id});
    }

    const catId = this.state.selectedCategory.id
    let allReminders = this.state.reminders;
    let catReminders = allReminders[catId];

    let reminder;
    for(let i=0; i< catReminders.length; i++){
      if(catReminders[i].id === id){
        reminder = catReminders.splice(i,1);
      }
    }

    reminder = reminder[0];
    reminder.time_due = date;

    catReminders.push(reminder);
    allReminders[catId] = catReminders.sort(this.props.sortBySequence);

    this.setState({reminders: allReminders})
  }

  toggleShowComplete(){
    this.setState({showCompleted: !this.state.showCompleted});
  }

  toggleReminderCompleted(reminderId, newCompletedStatus, reminder, time_due){
    const catId = this.state.selectedCategory.id
    let currentList;
    let destinationList;
    if(newCompletedStatus){
      currentList = Object.assign({}, this.state.reminders);
      destinationList =  Object.assign({}, this.state.completedReminders);
    }else{
      currentList = Object.assign({}, this.state.completedReminders);
      destinationList = Object.assign({}, this.state.reminders);
    }
    updatedReminder

    let updatedReminder;
    for(let i=0; i< currentList[catId].length; i++){
      if(currentList[catId][i].id === reminderId){
        updatedReminder = currentList[catId].splice(i,1);
      }
    }

    updatedReminder = updatedReminder[0];
    updatedReminder.completed = newCompletedStatus;
    updatedReminder.reminder = reminder;
    updatedReminder.time_due = time_due;
    destinationList[catId].push(updatedReminder)

    if(newCompletedStatus){
      this.setState({
        reminders: currentList,
        completedReminders: destinationList
      })
    }else{
      this.setState({
        reminders: destinationList,
        completedReminders: currentList
      })
    }
  }

  componentDidMount(){
    this.fetchCategories();
  }

  render(){
    let remindersHTML;
    if(this.state.selectedCategory && this.state.reminders[this.state.selectedCategory.id]){
      let remindersArr = this.state.reminders[this.state.selectedCategory.id];
      let sortedReminders = remindersArr.sort(this.props.sortBySequence);

      remindersHTML = sortedReminders.map(reminder => {
        return(
          <Reminder
            key={reminder.id}
            reminder={reminder}
            updateReminders={this.updateReminders}
            selectedDate={this.state.selectedDate}
            clickDate={this.clickDate}
            toggleReminderCompleted={this.toggleReminderCompleted}
          />
        )
      })
    }

    let categoryList = this.state.categories.map(category => {
      return(
        <h4
          className="link"
          key={category.id}
          id={category.id}
          onClick={this.onClickCategory}
          >
          {category.category}
        </h4>
      )
    })

    let title = (
      <form onSubmit={this.addCategory}>
        <input
          type="text"
          placeholder="New Category"
          onChange={this.onChangeCategory}
          className="first-reminder-category"
          />
      </form>
    )
    let reminderDisabled = true;

    if(this.state.selectedCategory){
      title = this.state.selectedCategory.category;
      reminderDisabled = false;
    }

    let showCompletedButton;
    if(this.state.selectedCategory){
      let selectedId = this.state.selectedCategory.id
      showCompletedButton = (
        <CompletedReminders
          showCompleted={this.state.showCompleted}
          completedReminders={this.state.completedReminders[selectedId]}
          toggleShowComplete={this.toggleShowComplete}
          toggleReminderCompleted={this.toggleReminderCompleted}
          sortBySequence={this.props.sortBySequence}
        />)
    }

    return(
      <div className="reminders">
        <h1>{title}</h1>
        <div>
         {remindersHTML}
         <form onSubmit={this.reminderSubmitForm}>
           <input type="text"
             className="add-reminder-input"
             value={this.state.newReminder}
             onChange={this.reminderOnChange}
             placeholder="New Reminder"
             disabled={reminderDisabled}
             />
         </form>
       </div>

        {showCompletedButton}
        <div id="slideout">
          <i className="fas fa-angle-double-right fa-2x"></i>
          <div id="slideout_inner">
            <h3>Categories</h3>
            {categoryList}
            <form onSubmit={this.addCategory} className="add-category">
              <input
                className="add-category-input"
                type="text"
                value={this.state.newCategory}
                onChange={this.onChangeCategory}
              />
            <input id="new" type="submit" id="add-category-button" className="cell small-24 large-5 standard-green-button" value="Add Category" />
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default RemindersIndex
