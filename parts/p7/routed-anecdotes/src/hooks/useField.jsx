import { useState } from "react";

const useField = (type='string', initialVal='') => {
    const [value, setValue] = useState(initialVal)
    const onChange = (e) => setValue(e.target.value)
    const reset = () => {setValue('')}
    const getInputProps = () => ({type, value, onChange})
    return {
        type,
        value,
        onChange,
        reset,
        getInputProps,
    }
}

export default useField