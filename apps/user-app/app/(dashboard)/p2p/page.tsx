import React from "react";

import { AddMoney } from "../../component/AddMoneyCard";
import { BalanceCard } from "../../component/BalanceCard";
import { OnRampTransactions } from "../../component/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { SendCard } from "~/app/component/SendCard";
import { PrismaClient } from "@repo/db";

const prisma = new PrismaClient();

async function getDetails() {
  const session = await getServerSession(authOptions);

  // Fetch multiple transactions
  const transactions = await prisma.p2PTranscation.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
    include: {
      toUser: true, // Include toUser relation
      fromUser: true, // Include fromUser relation
    },
  });

  // Return transactions if found, else return an empty array
  return transactions.map((transaction) => ({
    toUserId: transaction.toUserId,
    toUserName: transaction.toUser?.name, // Adjust based on User model
    fromUserId: transaction.fromUserId,
    fromUserName: transaction.fromUser?.name, // Adjust based on User model
    time: transaction.StartTime,
    amount: transaction.amount,
  }));
}

const Page = async () => {
  // Fetch transaction details
  const details = await getDetails();

  return (
    <div className="w-full">
      <div>
        <SendCard />
      </div>
      <div>
        {/* Render the transaction details */}
        {details.length > 0 ? (
          details.map((transaction, index) => (
            <div key={index} className="p-4 border-b">
              <p>From User: {transaction.fromUserName}</p>
              <p>To User: {transaction.toUserName}</p>
              <p>Amount: ₹{transaction.amount / 100}</p>
              <p>Time: {new Date(transaction.time).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default Page;
