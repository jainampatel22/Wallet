import React from "react";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@repo/db";
import { authOptions } from "../../lib/authOptions";
import { SendCard } from "~/app/component/SendCard";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { ArrowUpDown, Send } from 'lucide-react';

const prisma = new PrismaClient();

async function getDetails() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.P2PTranscation.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
    include: {
      toUser: true,
      fromUser: true,
    },
    orderBy: {
      StartTime: 'desc'
    },
  });

  return transactions.map((transaction) => ({
    toUserId: transaction.toUserId,
    toUserName: transaction.toUser?.name,
    fromUserId: transaction.fromUserId,
    fromUserName: transaction.fromUser?.name,
    time: transaction.StartTime,
    amount: transaction.amount,
  }));
}

const Page = async () => {
  const details = await getDetails();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Wallet Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-indigo-600">
              <Send className="mr-2 h-6 w-6" />
              Send Money
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SendCard />
          </CardContent>
        </Card>

      
      </div>
    </div>
  );
};

export default Page;
