"use client"
import React, {useEffect, useState} from 'react'
import {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/app/components/ui/drawer"
import { PointerDownOutsideEvent, FocusOutsideEvent } from '@radix-ui/react-dismissable-layer'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw'

interface ICaseShowProps {
    open?: boolean
    content?: string
}
export default function CaseShow ({open, content}: ICaseShowProps){
    const [openDrawer, setOpenDrawer] = useState(false)
    useEffect(()=>{
        setOpenDrawer(!!open)
    }, [open])

    const handleInteractOutside = (event: PointerDownOutsideEvent | FocusOutsideEvent) => {
        console.log(`event`, event)
        setOpenDrawer(true)
    }
    if(!content){
        return null
    }

    return (
        <div>
            <Drawer direction="right" open={openDrawer} onOpenChange={setOpenDrawer} >
                <DrawerPortal>
                    <DrawerContent direction="right" className="bg-white flex flex-col rounded-t-[10px] h-full w-[30rem] mt-24 fixed bottom-0 right-0 !left-auto z-[9999] " onInteractOutside={handleInteractOutside}>
                    <div className="p-4 bg-white flex-1 overflow-y-scroll overflow-x-hidden">
                        <div className="max-w-md mx-auto my-5">
                        <DrawerTitle className="font-medium mb-4">
                            Unstyled drawer for React.
                        </DrawerTitle>
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    code(props) {
                                        const { children, className, node, ...rest } = props
                                        const match = /language-(\w+)/.exec(className || '')
                                        return match ? (
                                            <div className="text-sm mb-2 ">
                                                {/* @ts-ignore */}
                                                <SyntaxHighlighter
                                                    {...rest}
                                                    wrapLines={true}
                                                    wrapLongLines={true}
                                                    PreTag="div"
                                                    language={match[1]}
                                                    style={docco}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            </div>
                                        ) : (
                                            <code {...rest} className={className}>
                                                {children}
                                            </code>
                                        )
                                    },
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </div>
                    <DrawerClose asChild>
                    <button className="IconButton absolute top-2 left-2" aria-label="Close">
                        Close
                    </button>
                    </DrawerClose>
                    </DrawerContent>
                </DrawerPortal>
            </Drawer>

        </div>
    )
}