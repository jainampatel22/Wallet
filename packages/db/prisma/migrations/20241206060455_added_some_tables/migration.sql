-- CreateTable
CREATE TABLE "P2PTranscation" (
    "id" SERIAL NOT NULL,
    "StartTime" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,

    CONSTRAINT "P2PTranscation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "P2PTranscation" ADD CONSTRAINT "P2PTranscation_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTranscation" ADD CONSTRAINT "P2PTranscation_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
