-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "area" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);
