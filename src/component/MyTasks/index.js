import {Component} from 'react'
import {v4} from 'uuid'

import TagsItem from '../TagsItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    tagsSelectValue: tagsList[0].optionId,
    tasksList: [],
    userInputValue: '',
    isFilterActive: false,
    activeTag: tagsList[0].optionId,
    isDisplayActive: false,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {tagsSelectValue, userInputValue} = this.state

    const newList = {
      id: v4(),
      tasks: userInputValue,
      tags: tagsSelectValue,
      isActiveTag: true,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newList],
      userInputValue: '',
      tagsSelectValue: '',
      isDisplayActive: true,
    }))
  }

  onChangeSelectValue = event => {
    this.setState({tagsSelectValue: event.target.value})
  }

  onChangeInputValue = event => {
    this.setState({userInputValue: event.target.value})
  }

  getFilterTaskList = () => {
    const {tasksList, isFilterActive, activeTag} = this.state

    if (isFilterActive) {
      return tasksList.filter(eachTask => eachTask.tags === activeTag)
    }
    return tasksList
  }

  onClickBtnValue = event => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isActiveTag,
      activeTag: event.target.value,
    }))
  }

  renderTagsBtnList = () =>
    tagsList.map(tag => (
      <li className="tags-btn-list" key={tag.optionId}>
        <button
          type="button"
          className="btn-tags"
          onClick={this.onClickBtnValue}
          value={tag.optionId}
        >
          {tag.displayText}
        </button>
      </li>
    ))

  renderNoTasksYetAdded = () => {
    const {tasksList} = this.state

    if (tasksList.length === 0) {
      console.log(true)
    }
  }

  render() {
    const {tagsSelectValue, userInputValue, isDisplayActive} = this.state
    const filterTasks = this.getFilterTaskList()
    console.log(isDisplayActive)

    return (
      <div className="task-container">
        <form onSubmit={this.onSubmitForm}>
          <h1 className="task-heading">Create a task!</h1>
          <div className="input-label">
            <label htmlFor="name" className="label">
              Task
            </label>
            <input
              type="text"
              id="name"
              className="input"
              onChange={this.onChangeInputValue}
              value={userInputValue}
              placeholder="Enter the task here"
            />
          </div>
          <label htmlFor="Tags" className="label">
            Tags
          </label>
          <select
            className="option"
            onChange={this.onChangeSelectValue}
            value={tagsSelectValue}
          >
            {tagsList.map(object => (
              <option key={object.optionId} value={object.optionId}>
                {object.displayText}
              </option>
            ))}
          </select>
          <div className="btn-card">
            <button type="submit" className="btn">
              Add Task
            </button>
          </div>
        </form>
        <div className="tags-tasks-list-container">
          <h1 className="heading">Tags</h1>
          <ul className="button-unorder-list">{this.renderTagsBtnList()}</ul>

          <ul className="tasks-unorder-list-card">
            <h1 className="heading">Tasks</h1>
            {filterTasks.map(tasks => (
              <TagsItem key={tasks.id} tasksListDetails={tasks} />
            ))}
          </ul>
          {isDisplayActive ? null : (
            <div>
              <p className="heading">No Tasks Added Yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
