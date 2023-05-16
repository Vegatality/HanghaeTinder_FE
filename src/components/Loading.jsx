import React, { useEffect, useState } from "react";

function Loading() {
    const [loadingText, setLoadingText] = useState("◼")
    let intervalTime = null;
    useEffect(()=>{
        intervalTime = setInterval(() => {
            setLoadingText((prev)=>prev === "◼◼◼◼◼"? "◼" : prev + "◼")
        }, 250);

        return ()=> {
            clearInterval(intervalTime)
        }
    })
  return (
    <div>{loadingText}</div>
  )
}

export default Loading