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

  const transactions = await prisma.p2PTranscation.findMany({
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
    <div className="container mx-auto p-6 space-y-6 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Wallet Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl text-indigo-600">
              <ArrowUpDown className="mr-2 h-6 w-6" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {details.length > 0 ? (
                details.map((transaction, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">₹{(transaction.amount / 100).toFixed(2)}</span>
                      <span className="text-sm text-gray-500">{new Date(transaction.time).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">From: {transaction.fromUserName}</p>
                    <p className="text-sm text-gray-600">To: {transaction.toUserName}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No transactions found</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
     
      </div>
    </div>
  );
};

export default Page;
