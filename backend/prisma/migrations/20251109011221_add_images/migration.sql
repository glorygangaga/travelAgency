/*
  Warnings:

  - You are about to drop the `Counry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Hotel" DROP CONSTRAINT "Hotel_country_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tour" DROP CONSTRAINT "Tour_country_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "public"."Counry";

-- CreateTable
CREATE TABLE "Image" (
    "image_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tour_id" INTEGER,
    "hotel_id" INTEGER,
    "country_id" INTEGER,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "Country" (
    "country_id" SERIAL NOT NULL,
    "country_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("country_id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "Tour"("tour_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "Hotel"("hotel_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;
