"use client"
import { useCallback, useEffect, useState } from "react"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import Switcher from "../components/Switcher"

interface IAPISelect {
    name: string
}
export default function APISelect({name}: IAPISelect) {
    const [isOn, setIsOn] = useState(false)
    const [inputDisabled, setInputDisabled] = useState(false)
    useEffect(() => {
            setInputDisabled(isOn)
    }, [isOn])
    const switcherCallback = useCallback((isOn: boolean)=>{
        setIsOn(isOn)
    }, [])
    return (
        <div className="flex w-full flex-row justify-between items-end gap-4">
            <div className="grid max-w-sm items-center gap-1.5">
                <Label htmlFor="api-key" className="ml-[0.25rem]">{name}</Label>
                <Input type="text" id="api-key" disabled={inputDisabled} placeholder={`YOUR API KEY`} className={`min-w-[15rem] rounded-xl`} />
            </div>
            <Switcher callback={switcherCallback}/>
        </div>
    )
}
