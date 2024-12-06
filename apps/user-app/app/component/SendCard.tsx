"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import {Center} from "../../../../packages/ui/src/Center"
import { Select } from "../../../../packages/ui/src/Select";
import { useState } from "react";
import { TextInput } from "../../../../packages/ui/src/TextInput";

import { P2PTrans } from "../lib/actions/P2p";
export function SendCard(){
    const [number, setnumber] = useState("")
    const [amount, setamount] = useState("")
    return <div className="h-[90vh]">
        <Center>

      
        <Card title="Send Now">
            <div className="min-w-72 pt-4">
<TextInput placeholder={"Number"} label="Number" onChange={(e)=>setnumber((e))}/>
<TextInput placeholder={"Amount"} label="Amount" onChange={(e)=>setamount((e))}/>
    <div className="pt-4 flex justify-center">
        <Button onClick={()=>P2PTrans(number,Number(amount)*100)}>Send </Button>
    </div>
            </div>
        </Card>
        </Center>
    </div>
    
}