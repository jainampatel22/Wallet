"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import {Center} from "../../../../packages/ui/src/Center"
import { Select } from "../../../../packages/ui/src/Select";
import { useState } from "react";
import { TextInput } from "../../../../packages/ui/src/TextInput";
import { signOut } from "next-auth/react";
export function SendCard(){
    const [number, setnumber] = useState(0)
    const [amount, setamount] = useState(0)
    return <div className="h-[90vh]">
        <Center>

      
        <Card title="Send Now">
            <div className="min-w-72 pt-4">
<TextInput placeholder={"Number"} label="Number" onChange={(e)=>setnumber(Number(e))}/>
<TextInput placeholder={"Amount"} label="Amount" onChange={(e)=>setnumber(Number(e))}/>
    <div className="pt-4 flex justify-center">
        <Button onClick={()=>signOut()}>Send </Button>
    </div>
            </div>
        </Card>
        </Center>
    </div>
    
}