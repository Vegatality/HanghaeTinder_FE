import { useState } from "react";

const useInput = (initialValue) => {
    const [target, setTarget] = useState(initialValue);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setTarget((pre) => ({ ...pre, [name]: value }));
    };

    const onClearHandler = () => {
        setTarget(initialValue);
    };

    return [target, onChangeHandler, onClearHandler];
};

export { useInput };
