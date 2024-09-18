-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decks" (
    "decksId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Decks_pkey" PRIMARY KEY ("decksId")
);

-- CreateTable
CREATE TABLE "Cards" (
    "cardsId" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "defination" TEXT,
    "img" TEXT,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("cardsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Decks" ADD CONSTRAINT "Decks_decksId_fkey" FOREIGN KEY ("decksId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_cardsId_fkey" FOREIGN KEY ("cardsId") REFERENCES "Decks"("decksId") ON DELETE RESTRICT ON UPDATE CASCADE;
