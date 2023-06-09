import './index.css'

const TagsItem = props => {
  const {tasksListDetails} = props
  const {tags, tasks} = tasksListDetails

  return (
    <li className="tasks-list-card">
      <p className="task-paragraph">{tasks}</p>
      <p className="tag-paragraph">{tags}</p>
    </li>
  )
}

export default TagsItem
