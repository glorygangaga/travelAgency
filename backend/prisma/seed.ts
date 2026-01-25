import { PrismaClient, RoleEnum } from "@prisma/client";
import { hash } from "argon2";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const IMAGE_ROOT = path.join(__dirname, "seedImages");

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
}

function readImage(filePath: string) {
  return fs.readFileSync(filePath);
}

async function seedImages<T extends Record<string, any>>(
  folder: "country" | "hotel" | "tour",
  items: T[],
  matchField: keyof T,
  relationKey: "country_id" | "hotel_id" | "tour_id"
) {
  const dir = path.join(IMAGE_ROOT, folder);
  const files = fs.readdirSync(dir);

  for (const item of items) {
    const normalizedName = normalize(String(item[matchField]));

    const matchedFiles = files.filter(file =>
      normalize(file).includes(normalizedName)
    );

    for (const file of matchedFiles) {
      await prisma.image.create({
        data: {
          mimetype: "image/jpeg",
          data: readImage(path.join(dir, file)),
          [relationKey]: item[relationKey],
        },
      });
    }
  }
}

async function main() {
  const roles: RoleEnum[] = ["user", "admin", "manager"];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { role_name: role },
      update: {},
      create: { role_name: role },
    });
  }

  const adminRole = await prisma.role.findUnique({ where: { role_name: "admin" } });
  const managerRole = await prisma.role.findUnique({ where: { role_name: "manager" } });

  if (!adminRole || !managerRole) {
    throw new Error("Roles not found");
  }

  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: await hash("123456"),
      role_id: adminRole.role_id,
    },
  });

  await prisma.user.upsert({
    where: { email: "manager@gmail.com" },
    update: {},
    create: {
      email: "manager@gmail.com",
      password: await hash("123456"),
      role_id: managerRole.role_id,
    },
  });

  console.log("Roles & users seeded");

  await prisma.country.createMany({
    data: [
      { country_name: "Italy", description: "Land of art, delicious food, and beautiful landscapes." },
      { country_name: "Japan", description: "The Land of the Rising Sun and ancient traditions." },
      { country_name: "Spain", description: "Warm country with beaches, mountains, and vibrant culture." },
      { country_name: "Egypt", description: "Home of pharaohs, pyramids, and the Red Sea." },
      { country_name: "Norway", description: "Country of fjords and the Northern Lights." },
      { country_name: "Greece", description: "Cradle of ancient civilization with scenic islands." },
      { country_name: "Turkey", description: "Bridge between Europe and Asia with rich history." },
      { country_name: "Switzerland", description: "Mountains, lakes, and picturesque villages." },
      { country_name: "Thailand", description: "Exotic beaches, temples, and tropical jungles." },
      { country_name: "Iceland", description: "Land of glaciers, volcanoes, and hot springs." },
    ],
    skipDuplicates: true,
  });

  const countries = await prisma.country.findMany();
  await seedImages("country", countries, "country_name", "country_id");
  console.log("Countries & images seeded");

  await prisma.hotel.createMany({
    data: [
      { hotel_name: "Venezia Palace", country_id: 1, category: "5★", description: "Luxury hotel in Venice." },
      { hotel_name: "Rome Imperial", country_id: 1, category: "4★", description: "Elegant hotel near Colosseum." },
      { hotel_name: "Tokyo Garden Inn", country_id: 2, category: "4★", description: "Modern Tokyo hotel." },
      { hotel_name: "Kyoto Serenity", country_id: 2, category: "5★", description: "Traditional Japanese hotel." },
      { hotel_name: "Costa del Sol Resort", country_id: 3, category: "5★", description: "Beach resort in Spain." },
      { hotel_name: "Barcelona Central", country_id: 3, category: "4★", description: "City center hotel." },
      { hotel_name: "Red Sea Paradise", country_id: 4, category: "4★", description: "Beach hotel in Hurghada." },
      { hotel_name: "Cairo Nile View", country_id: 4, category: "5★", description: "Hotel overlooking Nile." },
      { hotel_name: "Fjord Dreams", country_id: 5, category: "5★", description: "Hotel near fjords." },
      { hotel_name: "Athens Classic", country_id: 6, category: "4★", description: "Hotel near Acropolis." },
      { hotel_name: "Santorini Sunset", country_id: 6, category: "5★", description: "Romantic sea-view hotel." },
      { hotel_name: "Istanbul Bosphorus", country_id: 7, category: "5★", description: "Luxury Bosphorus hotel." },
      { hotel_name: "Cappadocia Cave Hotel", country_id: 7, category: "4★", description: "Cave-style hotel." },
      { hotel_name: "Zurich Alpine", country_id: 8, category: "5★", description: "Alpine ski hotel." },
      { hotel_name: "Bangkok Riverside", country_id: 9, category: "4★", description: "Hotel by river." },
      { hotel_name: "Phuket Beach Resort", country_id: 9, category: "5★", description: "Beachfront resort." },
      { hotel_name: "Reykjavik Aurora", country_id: 10, category: "4★", description: "Northern lights hotel." },
      { hotel_name: "Icelandic Glacier Lodge", country_id: 10, category: "5★", description: "Glacier lodge." },
    ],
    skipDuplicates: true,
  });

  await prisma.tour.createMany({
    data: [
      // Italy
      { hotel_id: 1, country_id: 1, title: 'Venice Art Week', start_date: new Date('2025-06-10'), end_date: new Date('2025-06-17'), duration_days: 7, tour_type: 'Cultural', food_type: 'HB', price_person: 1299.99, available_slots: 15, description: 'Explore Venice canals, museums, and Italian cuisine.' },
      { hotel_id: 2, country_id: 1, title: 'Rome Historical Adventure', start_date: new Date('2025-07-05'), end_date: new Date('2025-07-12'), duration_days: 7, tour_type: 'Historical', food_type: 'BB', price_person: 1399.99, available_slots: 20, description: 'Visit Colosseum, Vatican, and ancient Roman sites.' },
  
      // Japan
      { hotel_id: 3, country_id: 2, title: 'Tokyo Highlights', start_date: new Date('2025-08-01'), end_date: new Date('2025-08-08'), duration_days: 7, tour_type: 'Cultural', food_type: 'BB', price_person: 1899.50, available_slots: 20, description: 'Explore Tokyo gardens, temples, and technology museums.' },
      { hotel_id: 4, country_id: 2, title: 'Kyoto Temples Tour', start_date: new Date('2025-09-10'), end_date: new Date('2025-09-17'), duration_days: 7, tour_type: 'Cultural', food_type: 'HB', price_person: 1999.00, available_slots: 15, description: 'Discover ancient temples, traditional tea houses, and gardens.' },
  
      // Spain
      { hotel_id: 5, country_id: 3, title: 'Costa del Sol Relax', start_date: new Date('2025-06-15'), end_date: new Date('2025-06-25'), duration_days: 10, tour_type: 'Beach', food_type: 'AI', price_person: 1499.00, available_slots: 25, description: 'Sun, sand, and flamenco dancing along the southern coast.' },
      { hotel_id: 6, country_id: 3, title: 'Barcelona City Explorer', start_date: new Date('2025-07-20'), end_date: new Date('2025-07-27'), duration_days: 7, tour_type: 'City', food_type: 'BB', price_person: 1399.50, available_slots: 18, description: 'Visit Gaudi architecture, La Rambla, and Gothic Quarter.' },
  
      // Egypt
      { hotel_id: 7, country_id: 4, title: 'Red Sea Diving Adventure', start_date: new Date('2025-08-05'), end_date: new Date('2025-08-12'), duration_days: 7, tour_type: 'Adventure', food_type: 'FB', price_person: 1099.00, available_slots: 30, description: 'Scuba diving and snorkeling in the Red Sea.' },
      { hotel_id: 8, country_id: 4, title: 'Cairo Historical Tour', start_date: new Date('2025-09-01'), end_date: new Date('2025-09-08'), duration_days: 7, tour_type: 'Historical', food_type: 'HB', price_person: 1199.00, available_slots: 25, description: 'Explore pyramids, museums, and Nile cruises.' },
  
      // Norway
      { hotel_id: 9, country_id: 5, title: 'Norwegian Fjords Cruise', start_date: new Date('2025-05-20'), end_date: new Date('2025-05-27'), duration_days: 7, tour_type: 'Nature', food_type: 'HB', price_person: 1799.00, available_slots: 12, description: 'Boat tours and hiking in breathtaking fjords.' },
  
      // Greece
      { hotel_id: 10, country_id: 6, title: 'Athens & Santorini Highlights', start_date: new Date('2025-06-05'), end_date: new Date('2025-06-15'), duration_days: 10, tour_type: 'Cultural', food_type: 'HB', price_person: 1599.99, available_slots: 20, description: 'Acropolis, island views, and Greek cuisine.' },
      { hotel_id: 11, country_id: 6, title: 'Romantic Santorini Escape', start_date: new Date('2025-07-10'), end_date: new Date('2025-07-17'), duration_days: 7, tour_type: 'Romantic', food_type: 'AI', price_person: 1899.00, available_slots: 10, description: 'Sea-view villas and sunset cruises for couples.' },
  
      // Turkey
      { hotel_id: 12, country_id: 7, title: 'Istanbul & Cappadocia Discovery', start_date: new Date('2025-08-15'), end_date: new Date('2025-08-25'), duration_days: 10, tour_type: 'Cultural', food_type: 'FB', price_person: 1499.00, available_slots: 18, description: 'Historic sites, hot air balloons, and Turkish cuisine.' },
      { hotel_id: 13, country_id: 7, title: 'Cappadocia Balloon Adventure', start_date: new Date('2025-09-05'), end_date: new Date('2025-09-12'), duration_days: 7, tour_type: 'Adventure', food_type: 'BB', price_person: 1399.50, available_slots: 12, description: 'Hot air balloon rides over stunning rock formations.' },
  
      // Switzerland
      { hotel_id: 14, country_id: 8, title: 'Swiss Alps Ski Trip', start_date: new Date('2025-12-05'), end_date: new Date('2025-12-12'), duration_days: 7, tour_type: 'Adventure', food_type: 'HB', price_person: 2199.00, available_slots: 15, description: 'Skiing, snowboarding, and alpine village tours.' },
  
      // Thailand
      { hotel_id: 15, country_id: 9, title: 'Bangkok & Phuket Highlights', start_date: new Date('2025-07-01'), end_date: new Date('2025-07-12'), duration_days: 11, tour_type: 'Cultural', food_type: 'AI', price_person: 1599.00, available_slots: 20, description: 'Temples, beaches, and tropical adventures.' },
      { hotel_id: 16, country_id: 9, title: 'Phuket Beach Relax', start_date: new Date('2025-08-10'), end_date: new Date('2025-08-20'), duration_days: 10, tour_type: 'Beach', food_type: 'AI', price_person: 1699.00, available_slots: 25, description: 'Relax on pristine beaches and enjoy spa treatments.' },
  
      // Iceland
      { hotel_id: 17, country_id: 10, title: 'Iceland Glacier & Aurora', start_date: new Date('2025-02-15'), end_date: new Date('2025-02-22'), duration_days: 7, tour_type: 'Nature', food_type: 'HB', price_person: 1999.00, available_slots: 10, description: 'Glaciers, volcanoes, and Northern Lights viewing.' },
      { hotel_id: 18, country_id: 10, title: 'Reykjavik Adventure Week', start_date: new Date('2025-03-01'), end_date: new Date('2025-03-08'), duration_days: 7, tour_type: 'Adventure', food_type: 'HB', price_person: 1899.50, available_slots: 12, description: 'Hiking, hot springs, and Icelandic landscapes.' },
    ],
    skipDuplicates: true
  });
  console.log("Tours created successfully");


  const hotels = await prisma.hotel.findMany();
  await seedImages("hotel", hotels, "hotel_name", "hotel_id");
  console.log("Hotels & images seeded");

  const tours = await prisma.tour.findMany();
  await seedImages("tour", tours, "title", "tour_id");
  console.log("Tours & images seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("SEED COMPLETED SUCCESSFULLY");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
