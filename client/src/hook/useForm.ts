import React from 'react';

export interface AddForm {
  name: string,
  location: string,
  priceRange: number
}

interface HookReturn {
  form: AddForm,
  setForm: React.Dispatch<React.SetStateAction<AddForm>>,
  handleChangeForm: (name: string, value: string) => void
}

export const useForm = (initialState: AddForm): HookReturn => {
  const [form, setForm] = React.useState<AddForm>(initialState);

  const handleChangeForm = (name: string, value: string): void => {
    setForm(prevState => ({
      ...prevState,
      [name]: name === 'priceRange' ? +value : value
    }));
  }

  return {
    form,
    handleChangeForm,
    setForm
  }
}