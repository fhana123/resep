-- CreateTable
CREATE TABLE "Resep" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Resep_pkey" PRIMARY KEY ("id")
);
