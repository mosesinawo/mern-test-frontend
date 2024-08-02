

const Button = ({isEditing}:{isEditing:boolean}) => {
  return (
    <button type='submit'>{isEditing? "Edit" : "Add"}</button>
  )
}

export default Button