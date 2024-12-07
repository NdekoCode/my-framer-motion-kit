import { useState } from 'react';

export const useToggle = ():[boolean, ()=>void] => {
    const [ isActive, setIsActive ] = useState(false);
    const toggleActive = () => setIsActive(!isActive)
    return [ isActive, toggleActive ];
}