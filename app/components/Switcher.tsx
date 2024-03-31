import { useState, useEffect } from "react"

interface ISwitcherProps {
    initSwitch?: boolean
    callback?: (isOn: boolean) => void
}

const Switcher = ({ initSwitch = false, callback }: ISwitcherProps) => {
    const [isSwitch, setIsSwitch] = useState(initSwitch)
    const handleSwitch = () => {
        setIsSwitch(!isSwitch)
        if (callback) callback(!isSwitch)
    }
    useEffect(() => {
        setIsSwitch(initSwitch)
    }, [initSwitch])

    const switchOffClass = `shadow-slate-500/50 shadow-lg bg-slate-400 bg-opacity-50 `
    const switchOnClass = `shadow-lime-300/100 shadow-md bg-lime-600 bg-opacity-90`
    return (
        <div
            className={`w-16 min-w-[4rem] h-9 items-center  rounded-full flex relative cursor-pointer ease-linear duration-500 ${
                isSwitch ?switchOnClass : switchOffClass
            }`}
            onClick={handleSwitch}
        >
            {isSwitch ? (
                <div className="w-8 h-8 bg-gray-100 rounded-full p-1 ease-linear duration-300 ml-7"> 
                </div>
            ) : (
                <div className="w-8 h-8 bg-gray-100 rounded-full p-1 ease-linear duration-300 ml-1">
                </div>
            )}
        </div>
    )
}

export default Switcher