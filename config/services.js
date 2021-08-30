const venueServices = [
  "electricity",
  "security",
  "cleaning service",
  "outdoor venue",
  "indoor venue",
];

const organizerServices = ["planner", "organizer"];

const locations = [
  "bandung",
  "jakarta",
  "singapore",
  "johor",
  "batam",
  "malang",
  "depok",
  "pyongyang",
];

const samplePrices = [
  10000000, 15000000, 25000000, 30000000, 35000000, 40000000, 50000000,
  75000000, 80000000, 90000000, 100000000, 120000000, 130000000, 150000000,
];

const samplePriceRanges = [
  { min: 25000000, max: 50000000 },
  { min: 35000000, max: 75000000 },
  { min: 50000000, max: 100000000 },
  { min: 75000000, max: 125000000 },
  { min: 10000000, max: 80000000 },
  { min: 50000000, max: 1500000000 },
  { min: 15000000, max: 300000000 },
  { min: 20000000, max: 50000000 },
];

const sampleCapacity = [
  { min: 50, max: 250 },
  { min: 500, max: 1500 },
  { min: 250, max: 500 },
  { min: 500, max: 750 },
  { min: 500, max: 2500 },
  { min: 1500, max: 3000 },
  { min: 0, max: 500 },
  { min: 1000, max: 2500 },
];

const vendorAvatars = [
  "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
  "https://images.unsplash.com/photo-1542036813441-fc9a620d539d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3Nzc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
  "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3ODA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3ODQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
  "https://images.unsplash.com/photo-1571131639829-a022890def49?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3ODc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
  "https://images.unsplash.com/photo-1541251205067-185caea66bf7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3ODk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
  "https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3OTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
  "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3OTQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
  "https://images.unsplash.com/photo-1534429005880-27f51d95d8ff?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3OTk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
];

const vendorHeaders = [
  "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1532713031318-db2d14e4b3e1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4OTA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1425421543490-6a133856ff32?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4OTI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1607861884586-c7cfaed16290?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4OTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1481066717861-4775e000c88a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4OTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1591604442449-ecc9943efabf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg5MDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1622122746526-66cb56134cb4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg5MDM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1487530903081-59e0e3331512?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg5MDY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg5MDg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg5MTE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
  "https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg5MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
];

const packageAlbums = [
  "https://images.unsplash.com/photo-1519175182139-86e3bc09d7fd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzgzMjY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1597861405049-0b011428568f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzgzNDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzgzNDI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1530019163123-f33edadb3833?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzgzNDQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzgzNDU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1501901609772-df0848060b33?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzgzNDc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1530098403657-0d93d64d087d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzgzNDk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1549417229-7686ac5595fd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzgzNTA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0Mjk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1542036813441-fc9a620d539d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0MzE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1607861884586-c7cfaed16290?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0MzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1425421543490-6a133856ff32?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0MzU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0Mzc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1537907690979-ee8e01276184?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0Mzk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0NDE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1551468307-8c1e3c78013c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0NDM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1565038930214-09566ed2149b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0NDg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1534429005880-27f51d95d8ff?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg0NTA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1595407753234-0882f1e77954?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MTU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1505744288177-8a097ba01de0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MTk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MjE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MjM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1526894198609-10b3cdf45c52?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MjY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1Mjg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1515626553181-0f218cb03f14?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MzA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MzE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1517722014278-c256a91a6fba?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MzM&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1523975804200-ad0324aaf9ed?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg1MzQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg2MTg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1512060847456-85a2a1bf8b25?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg2MjE&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1507217633297-c9815ce2f885?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg2MjQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg2Mjc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/flagged/photo-1578317767641-c2a23b16b814?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg2MzA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg2MzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1495609000883-209fc68187ef?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg2MzQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
  "https://images.unsplash.com/photo-1505944357431-27579db47558?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg2MzU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640",
];

module.exports = {
  venueServices,
  organizerServices,
  locations,
  samplePrices,
  sampleCapacity,
  samplePriceRanges,
  vendorHeaders,
  vendorAvatars,
  packageAlbums,
};
