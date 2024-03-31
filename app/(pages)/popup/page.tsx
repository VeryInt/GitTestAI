'use client'
import APISelect from "@/app/modules/APISelect"



const Popup = () => {
    return (
    <div className=" min-w-[25rem] m-4 min-h-[25rem] h-[25rem] overflow-scroll">
        <APISelect name={`GeminiPro`} />
    </div>
    )
}

export default Popup
