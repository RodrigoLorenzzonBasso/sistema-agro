-- CreateEnum
CREATE TYPE "SeasonType" AS ENUM ('SUMMER', 'WINTER');

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "type" "SeasonType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Season_year_type_key" ON "Season"("year", "type");
