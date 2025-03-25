import { useCallback, useState } from "react"

 
const useToggle = () => {
    const [isToggled, setIsToggled] = useState(false);


    const handleToggle = useCallback(()=>{
        setIsToggled((prev) => !prev)
    },[]); 



  return { isToggled, handleToggle };
}

export default useToggle
