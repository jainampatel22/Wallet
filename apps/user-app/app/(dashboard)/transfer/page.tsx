import { PrismaClient } from "@repo/db";
import { AddMoney } from "../../component/AddMoneyCard";
import { BalanceCard } from "../../component/BalanceCard";
import { OnRampTransactions } from "../../component/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { ArrowUpRight, Wallet, PlusCircle, CreditCard } from 'lucide-react';

const prisma = new PrismaClient()

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTranscation.findMany({
        where: {
            userId: Number(session?.user?.id)
        },
        orderBy: {
            StartTime: 'desc'
        },
        take: 5
    });
    return txns.map(t => ({
        time: t.StartTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function DashboardPage() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className=" bg-red-500 min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-6 sm:mb-8 flex items-center">
                    <Wallet className="mr-3 h-8 w-8 sm:h-10 sm:w-10" />
                    <span>Transfer Dashboard</span>
                </h1>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    <div className="space-y-6 lg:space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                <PlusCircle className="mr-2 h-6 w-6 text-purple-600" />
                                Add Money
                            </h2>
                            <AddMoney />
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                <CreditCard className="mr-2 h-6 w-6 text-indigo-600" />
                                Balance
                            </h2>
                            <BalanceCard amount={balance.amount} locked={balance.locked} />
                        </div>
                    </div>
                    <div className="space-y-6 lg:space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                Recent Transactions
                                <ArrowUpRight className="ml-2 h-5 w-5 text-indigo-600" />
                            </h2>
                            <OnRampTransactions transactions={transactions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

