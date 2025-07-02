import { useState } from "react"

const useForm = ({ onSubmit, initial_form_state }) => {
  const [form_state, setFormState] = useState(initial_form_state)

  const handleSubmit = async (e) => {
    e.preventDefault()
    onSubmit()
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const resetForm = () => setFormState(initial_form_state);
  
  return {
    form_state,
    handleSubmit,
    handleChange,
    resetForm
  }
}

export default useForm