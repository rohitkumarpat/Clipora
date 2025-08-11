-- CreateTable
CREATE TABLE "public"."Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desciption" TEXT NOT NULL,
    "publicid" TEXT NOT NULL,
    "originalsize" TEXT NOT NULL,
    "compressed" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
