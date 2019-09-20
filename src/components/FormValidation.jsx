import { useState, useEffect } from 'react';

function FromValidation(initState, isValid) {
  const [state, setValues] = useState(initState);
  const [errors, setErrors] = useState(isValid(initState));
  const [isSubmitted, setSubmitted] = useState(false);
  const [isTouched, setTouched] = useState(false);

  useEffect(() => {
    setErrors(isValid(state));
  }, [state]);

  const handleChange = (e) => {
    if (!isTouched) setTouched(true);
    const { target } = e;
    const { name, type, checked } = target;
    let { value } = target;

    if (type === 'checkbox') {
      if (checked) {
        value = [...state[name], Number(value)].sort();
      } else {
        const index = state[name].indexOf(Number(value));
        if (index > -1) value = [...state[name].slice(0, index), ...state[name].slice(index + 1)].sort();
      }
    }
    setValues({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e, onSuccess) => {
    e.preventDefault();
    setSubmitted(true);
    if (!Object.keys(errors).length) {
      onSuccess();
    }
  };

  const reset = () => {
    setValues(initState);
    setTouched(false);
  };

  return {
    state,
    handleChange,
    reset,
    errors,
    handleSubmit,
    isSubmitted,
    isTouched,
  };
}


export default FromValidation;
