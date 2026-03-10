export interface PricingOption {
  vehicleType: string;
  capacity: number;
  totalTripCost: number;
}

export interface TourPackage {
  id: string; // Used as the slug
  title: string;
  state: string;
  duration: string;
  durationVal: "short" | "medium" | "long";
  pricingOptions: PricingOption[];
  rating: number;
  description: string;
  imgUrl: string;
  overview: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  travelInformation: string;
  itinerary: { day: number; title: string; activities: string[] }[];
  accommodations: { name: string; type: string; nightCount: number }[];
  gallery: string[];
}

export const PACKAGES_DATA: TourPackage[] = [
  {
    id: "kaziranga-safari",
    title: "Kaziranga Wildlife Safari",
    state: "Assam",
    duration: "4 Days / 3 Nights",
    durationVal: "short",
    pricingOptions: [
      { vehicleType: "Sedan (4 Seater)", capacity: 4, totalTripCost: 18500 },
      { vehicleType: "SUV (6 Seater)", capacity: 6, totalTripCost: 24000 }
    ],
    rating: 4.8,
    description: "Experience the thrill of exploring the UNESCO World Heritage site, home to the one-horned rhinoceros and majestic tigers.",
    overview: "Dive deep into the wild heart of Assam. This Safari covers the central and western zones of Kaziranga, complete with Jeep routes tracking majestic tigers and dense elephant grass housing the elusive one-horned rhino.",
    highlights: [
      "Spot the rare One-Horned Rhinoceros in its natural habitat",
      "Experiencing both Jeep and Elephant back safaris",
      "Authentic Assamese cultural evneings with Bihu Dance",
      "Explore the sprawling, lush tea estates of Assam"
    ],
    includes: [
      "Airport pickup and drop-off from Guwahati",
      "All National Park entry fees and Safari permits",
      "Daily breakfast and dinner at the resort",
      "Dedicated expert wildlife guide for safaris"
    ],
    excludes: [
      "Domestic or international flights",
      "Personal camera fees inside the park",
      "Lunches and any alcoholic beverages",
      "Gratuities and tips"
    ],
    travelInformation: "Kaziranga National Park is typically open from November to April. The best wildlife viewing occurs between February and March when the elephant grass burns off. Layered clothing is recommended as early mornings on safari can be remarkably chilly, even when afternoons are warm.",
    itinerary: [
      { day: 1, title: "Arrival in Guwahati & Drive to Kaziranga", activities: ["Airport Pickup", "Scenic Drive to National Park", "Evening Bonfire & Check-in"] },
      { day: 2, title: "Central Range Jeep Safari", activities: ["Early Morning Safari in Kohora", "Lunch at Lodge", "Afternoon Elephant Route Safari"] },
      { day: 3, title: "Western Range Exploration", activities: ["Jeep Safari in Bagori", "Orchid Park Visit", "Assamese Cultural Evening Performance"] },
      { day: 4, title: "Return to Guwahati", activities: ["Breakfast at Lodge", "Transfer back to Airport"] }
    ],
    accommodations: [
      { name: "Borgos Resort", type: "Luxury 5-Star", nightCount: 3 }
    ],
    gallery: [
      "/images/rhino-kaziranga.jpg",
      "/images/assam-tea-gardens.jpg"
    ],
    imgUrl: "/images/rhino-kaziranga.jpg"
  },
  {
    id: "meghalaya-monsoon",
    title: "Meghalaya Monsoon Magic",
    state: "Meghalaya",
    duration: "6 Days / 5 Nights",
    durationVal: "medium",
    pricingOptions: [
      { vehicleType: "Hatchback (4 Seater)", capacity: 4, totalTripCost: 24000 },
      { vehicleType: "SUV (6 Seater)", capacity: 6, totalTripCost: 32000 },
      { vehicleType: "Tempo Traveller (12 Seater)", capacity: 12, totalTripCost: 55000 }
    ],
    rating: 4.9,
    description: "Trek to the double-decker living root bridges, explore crystal clear Dawki waters, and witness the magical Nohkalikai falls.",
    overview: "Traverse the wettest place on earth in unmatched style. Meghalaya offers mystic caves, plunging waterfalls, and the legendary living root bridges woven meticulously over centuries.",
    highlights: [
      "Trek to the astonishing Double Decker Living Root Bridge",
      "Boat on the crystal clear, glass-like waters of the Umngot River",
      "Explore the subterranean limestone wonders of Mawsmai Cave",
      "Witness Nohkalikai, the tallest plunge waterfall in India"
    ],
    includes: [
      "Private luxury vehicle for all transfers",
      "Premium resort accommodations",
      "Breakfast at all properties",
      "Local Khasi guide for the living root trek"
    ],
    excludes: [
      "Flights to and from Guwahati airport",
      "Adventure activities like Zip-lining or Scuba in Dawki",
      "Entry fees to museums and local parks",
      "Personal expenses and tipping"
    ],
    travelInformation: "Meghalaya experiences heavy monsoon rains from June to September. The most comfortable time to visit is October to April. Please note that the trek to the Double Decker bridge involves descending and ascending roughly 3,500 steep steps; a reasonable level of physical fitness is required.",
    itinerary: [
      { day: 1, title: "Arrival in Shillong", activities: ["Transfer from Guwahati", "Umiam Lake Viewpoint", "Check-in at Shillong"] },
      { day: 2, title: "Cherrapunjee Waterfalls", activities: ["Nohkalikai Falls", "Seven Sister Falls", "Mawsmai Cave Exploration"] },
      { day: 3, title: "Double Decker Trek", activities: ["Trek to Nongriat Village", "Living Root Bridge Exploration", "Blue Lagoon Swimming"] },
      { day: 4, title: "Mawlynnong & Dawki", activities: ["Visit the Cleanest Village in Asia", "Boating on Crystal Clear Umngot River"] },
      { day: 5, title: "Krang Suri to Shillong", activities: ["Swim at Krang Suri Falls", "Return to Shillong for Local Shopping"] },
      { day: 6, title: "Departure", activities: ["Breakfast and Airport Drop-off"] }
    ],
    accommodations: [
      { name: "Polo Orchid Resort", type: "Premium Resort", nightCount: 2 },
      { name: "Cherrapunjee Holiday Resort", type: "Eco-Lodge", nightCount: 2 },
      { name: "Shillong Center Hotel", type: "Standard 4-Star", nightCount: 1 }
    ],
    gallery: [
      "/images/meghalaya-dawki-river.jpg",
      "/images/yngksiar-waterfalls-meghalaya-india.jpg",
      "/images/shillong-1.jpg"
    ],
    imgUrl: "/images/meghalaya-dawki-river.jpg"
  },
  {
    id: "dzuko-trek",
    title: "Dzukou Valley Trek",
    state: "Nagaland",
    duration: "5 Days / 4 Nights",
    durationVal: "medium",
    pricingOptions: [
      { vehicleType: "AWD SUV (4 Seater)", capacity: 4, totalTripCost: 15500 },
      { vehicleType: "4x4 Trekker (8 Seater)", capacity: 8, totalTripCost: 28000 }
    ],
    rating: 4.7,
    description: "A breathtaking altitude trek through the emerald green rolling hills and valleys of Nagaland adorned with rare lilies.",
    overview: "Leave connectivity behind and ascend into the unparalleled beauty of Dzukou Valley. This trek rewards you with sweeping views of rolling emerald hills, frozen streams, and the endemic Dzukou Lily.",
    highlights: [
      "Summit the pristine, untouched landscapes of the Dzukou Valley",
      "Spot the rare, endemic Dzukou Lily (in bloom during monsoons)",
      "Camp under the stars in alpine tents by the glacial stream",
      "Immerse yourself in authentic Naga tribal culture in Kohima"
    ],
    includes: [
      "All Inner Line Permits (ILP) required for Nagaland",
      "Professional trekking guide and camping equipment",
      "All meals (Breakfast, Lunch, Dinner) during the trek",
      "4x4 transportation to the base of the trekking trail"
    ],
    excludes: [
      "Personal porter for carrying backpacks (can be arranged separately)",
      "Sleeping bags (can be rented on-site if not brought)",
      "Travel insurance",
      "Photography permits where applicable"
    ],
    travelInformation: "The trek is considered moderate, but weather conditions can change rapidly. Sturdy trekking shoes, thermal wear, and waterproof jackets are mandatory. The famous Dzukou Lilies bloom between late June and early July. Inner Line Permits (ILPs) are required for Indian Tourists, while Foreign Nationals must register at the local Foreigners Registration Office within 24 hours of arrival.",
    itinerary: [
      { day: 1, title: "Dimapur to Kohima", activities: ["Pick up from Dimapur", "Drive to Kohima", "Acclimatization Walk"] },
      { day: 2, title: "Trek to Dzukou Base", activities: ["Drive to Viswema Village", "Start Ascent Trek", "Reach Basecamp and Pitch Tents"] },
      { day: 3, title: "Valley Exploration", activities: ["Sunrise Walk through the Valley", "Photography", "Caving and Riverside Picnic"] },
      { day: 4, title: "Descent to Jakhama", activities: ["Trek down via Jakhama Route", "Return to Kohima", "Hornbill Check (Seasonal)"] },
      { day: 5, title: "Departure", activities: ["Return transfer to Dimapur Rail/Air"] }
    ],
    accommodations: [
      { name: "Kohima Camp / Homestay", type: "Standard", nightCount: 2 },
      { name: "Dzukou Valley Tents", type: "Alpine Camping", nightCount: 2 }
    ],
    gallery: [
      "/images/nagaland-dzuko-valley.jpg",
      "/images/nagaland-festival-tribes.webp"
    ],
    imgUrl: "/images/nagaland-dzuko-valley.jpg"
  },
  {
    id: "tawang-monastery",
    title: "Tawang Monastery Expedition",
    state: "Arunachal",
    duration: "10 Days / 9 Nights",
    durationVal: "long",
    pricingOptions: [
      { vehicleType: "Rugged SUV (6 Seater)", capacity: 6, totalTripCost: 48000 },
      { vehicleType: "Luxury Heavy SUV (4 Seater)", capacity: 4, totalTripCost: 55000 }
    ],
    rating: 4.9,
    description: "Journey through the high altitude passes of Sela to reach the spiritual heart of Arunachal Pradesh, the magnificent Tawang Monastery.",
    overview: "A long, winding, awe-inspiring journey into the 'Land of Dawn-Lit Mountains'. Cross the freezing and breathtaking Sela Pass at 13,700ft to arrive at Tawang, India's largest and most magnificent Buddhist monastery.",
    highlights: [
      "Cross the perilous, snow-covered Sela Pass at 13,700 feet",
      "Explore the 400-year-old Tawang Monastery, the largest in India",
      "Visit the hauntingly beautiful Madhuri (Sangestar) Lake near the border",
      "Experience breathtaking panoramas of the Eastern Himlayan ranges"
    ],
    includes: [
      "Arunachal Pradesh Inner Line Permits (ILP) processing",
      "Private rugged SUV with experienced mountain driver",
      "Brahmaputra River Sunset Cruise at Tezpur",
      "Breakfast and Dinner across all remote locations"
    ],
    excludes: [
      "Bumla Pass special access permit and separate local vehicle hire",
      "Entry fees to monasteries or museums",
      "Lunch during transit days",
      "Extreme altitude medical insurance"
    ],
    travelInformation: "Traveling in Arunachal Pradesh involves long drives on unpredictable mountain roads; journeys can take 6-10 hours between destinations. Acute Mountain Sickness (AMS) is a real risk at Sela Pass and Tawang. Acclimatization walks are mandatory. A valid Indian ID is required for ILP processing, taking roughly 48 hours prior to arrival.",
    itinerary: [
      { day: 1, title: "Guwahati to Nameri", activities: ["Airport Pickup", "Drive to Eco Camp", "Evening Forest Walk"] },
      { day: 2, title: "Nameri to Dirang", activities: ["Cross Bhalukpong", "Enter Arunachal", "Dirang Valley Views"] },
      { day: 3, title: "Dirang Exploration", activities: ["Sangti Valley", "Dirang Dzong", "Hot Water Springs"] },
      { day: 4, title: "Cross Sela Pass to Tawang", activities: ["Drive over 13,700ft Pass", "Sela Lake", "Jaswant Garh War Memorial"] },
      { day: 5, title: "Tawang Monastery & Town", activities: ["Tawang Monastery Tour", "Ani Gompa", "Urgelling (Birthplace of 6th Dalai Lama)"] },
      { day: 6, title: "Bumla Pass & Madhuri Lake", activities: ["China Border Visit (Permit Req.)", "Sangestar Tso Lake (Madhuri Lake)"] },
      { day: 7, title: "Tawang to Bomdila", activities: ["Return Journey begins", "Jung Falls", "Check in at Bomdila"] },
      { day: 8, title: "Bomdila to Tezpur", activities: ["Descend to Plains", "Visit Mahabhairab Temple"] },
      { day: 9, title: "Tezpur to Guwahati", activities: ["Brahmaputra Cruise", "Kamakhya Temple Visit"] },
      { day: 10, title: "Departure", activities: ["Airport Transfer"] }
    ],
    accommodations: [
      { name: "Eco Camps", type: "Nature Tents", nightCount: 1 },
      { name: "Dirang Boutique Hotel", type: "Comfort", nightCount: 2 },
      { name: "Tawang Heritage", type: "Premium", nightCount: 3 },
      { name: "Bomdila Heights", type: "Standard", nightCount: 1 },
      { name: "Tezpur Center", type: "Standard", nightCount: 1 },
      { name: "Guwahati City Hotel", type: "City 4-Star", nightCount: 1 }
    ],
    gallery: [
      "/images/arunachal-pradesh-landscape.jpg",
      "/images/arunachal-pradesh-unseen-beauty.jpg"
    ],
    imgUrl: "/images/arunachal-pradesh-landscape.jpg"
  },
  {
    id: "sikkim-delight",
    title: "Sikkim Himalayan Delight",
    state: "Sikkim",
    duration: "7 Days / 6 Nights",
    durationVal: "medium",
    pricingOptions: [
      { vehicleType: "Sedan (4 Seater)", capacity: 4, totalTripCost: 28000 },
      { vehicleType: "Innova/SUV (6 Seater)", capacity: 6, totalTripCost: 35000 }
    ],
    rating: 4.6,
    description: "Witness the majestic Mount Kanchenjunga, serene glacial lakes, and vibrant Buddhist culture in the lap of the Himalayas.",
    overview: "Sikkim is a mystic wonderland sitting in the shadow of the mighty Kanchenjunga. This package stitches together the vibrant capital of Gangtok with the surreal frozen lakes and valleys of North Sikkim.",
    highlights: [
      "Witness mesmerizing sunrises over Mount Kanchenjunga",
      "Drive to the high-alpine, often frozen Tsomgo Lake at 12,400 feet",
      "Explore the stunning Valley of Flowers in Yumthang",
      "Journey to one of the highest lakes in the world, Gurudongmar (17,800 ft)"
    ],
    includes: [
      "All restricted area permits for North Sikkim and Tsomgo Lake",
      "Private luxury transport (Innova/Crysta) for the entire duration",
      "Premium 4-star stays in Gangtok and best available homestays in North",
      "Breakfast and Dinner everyday, with all meals included during North Sikkim leg"
    ],
    excludes: [
      "Permit processing and vehicle fees for Nathu La Pass (Indo-China Border)",
      "Airfare or Train tickets to Bagdogra/NJP",
      "Cable car tickets in Gangtok",
      "Personal heaters at North Sikkim homestays"
    ],
    travelInformation: "North Sikkim requires Restricted Area Permits (RAP) which our team will process using your Passport/Voter ID and photographs. Foreign nationals are entirely prohibited from visiting Gurudongmar Lake and Nathu La pass due to border security. Expect sub-zero temperatures in Lachung and Lachen from November to March.",
    itinerary: [
      { day: 1, title: "Bagdogra to Gangtok", activities: ["Airport Pickup", "Teesta River Viewpoint", "Check-in at Gangtok"] },
      { day: 2, title: "Tsomgo Lake & Baba Mandir", activities: ["Drive to 12,400ft glacial lake", "Visit Baba Harbhajan Singh Shrine", "Optional Nathu La Pass (Subject to Permit)"] },
      { day: 3, title: "Gangtok to Lachen", activities: ["Drive to North Sikkim", "Seven Sister Waterfalls", "Check-in at High Altitude Village"] },
      { day: 4, title: "Gurudongmar Lake to Lachung", activities: ["Pre-sunrise drive to 17,800ft Lake", "Breathtaking Glacial Views", "Transfer to Lachung Base"] },
      { day: 5, title: "Yumthang Valley to Gangtok", activities: ["Valley of Flowers Tour", "Zero Point Snow Play", "Return Journey to Gangtok"] },
      { day: 6, title: "Namchi & Chardham", activities: ["South Sikkim Tour", "Samdruptse Statue", "Siddhesvara Dham"] },
      { day: 7, title: "Departure", activities: ["Breakfast and Bagdogra Drop-off"] }
    ],
    accommodations: [
      { name: "Gangtok Premium Palace", type: "Luxury 4-Star", nightCount: 4 },
      { name: "North Sikkim Homestay", type: "Basic High-Altitude", nightCount: 2 }
    ],
    gallery: [
      "/images/sikkim-monastery-kanchenjunga.jpg",
      "/images/sikkim-himalayan-destination.jpg",
      "/images/gangtok.jpg"
    ],
    imgUrl: "/images/sikkim-monastery-kanchenjunga.jpg"
  },
  {
    id: "loktak-jewel",
    title: "Loktak Lake & Imphal Tour",
    state: "Manipur",
    duration: "4 Days / 3 Nights",
    durationVal: "short",
    pricingOptions: [
      { vehicleType: "Sedan (4 Seater)", capacity: 4, totalTripCost: 14000 },
      { vehicleType: "SUV (6 Seater)", capacity: 6, totalTripCost: 18500 }
    ],
    rating: 4.5,
    description: "Discover the world's only floating national park and explore the rich historical remnants of INA in Manipur.",
    overview: "Immerse yourself in 'The Jeweled Land'. Explore the colossal circular floating islands (Phumdis) of Loktak Lake, witness the endangered Sangai Deer, and shop at Ima Keithel, the world's only market run entirely by women.",
    highlights: [
      "Boat through the unique circular floating Phumdis of Loktak Lake",
      "Search for the endangered Sangai (Brow-antlered) deer in Keibul Lamjao",
      "Shop at Ima Keithel, an enormous market run exclusively by 5,000 women",
      "Tread through the historic WWII battlegrounds and INA Memorial"
    ],
    includes: [
      "Airport transfers and private AC Sedan/SUV",
      "Premium hotel accommodations in Imphal City center",
      "Private boat ride on Loktak Lake with a local fisherman",
      "Daily breakfast at the hotel"
    ],
    excludes: [
      "Entry tickets to Kangla Fort and War Memorials",
      "Guide charges (unless specifically requested)",
      "Lunch and Dinner",
      "Any camera or drone permits"
    ],
    travelInformation: "Manipur is delightful throughout the year, but September to April offers the best weather for exploring. An Inner Line Permit (ILP) is required for domestic tourists and can typically be procured directly upon arrival at the Imphal Airport.",
    itinerary: [
      { day: 1, title: "Arrival in Imphal", activities: ["Airport Pickup", "Kangla Fort Exploration", "Ima Keithel (Mother's Market) Shopping"] },
      { day: 2, title: "Loktak Lake & Keibul Lamjao", activities: ["Drive to Moirang", "Boat Ride on Floating Islands", "Search for Sangai Deer"] },
      { day: 3, title: "INA & WWII History", activities: ["Indian National Army Memorial", "Imphal War Cemetery", "Traditional Manipuri Cultural Show"] },
      { day: 4, title: "Departure", activities: ["Morning Handicraft Shopping", "Airport Transfer"] }
    ],
    accommodations: [
      { name: "Classic Grande Imphal", type: "Premium", nightCount: 3 }
    ],
    gallery: [
      "/images/manipur-loktak-lake.jpg",
      "/images/imphal.jpg"
    ],
    imgUrl: "/images/manipur-loktak-lake.jpg"
  },
  {
    id: "northeast-grand-explorer",
    title: "Northeast Grand Explorer - All 8 States",
    state: "All 8 States",
    duration: "18 Days / 17 Nights",
    durationVal: "long",
    pricingOptions: [
      { vehicleType: "Standard State-Relay Transport (Innova/Xylo)", capacity: 4, totalTripCost: 320000 },
      { vehicleType: "Premium State-Relay Transport (Crysta/Fortuner)", capacity: 6, totalTripCost: 480000 }
    ],
    rating: 5.0,
    description: "The ultimate 18-day expedition covering all 8 states of Northeast India. Witness rhinos, living root bridges, floating lakes, and high-altitude monasteries.",
    overview: "Embark on an epic 18-day odyssey across the Eight Sisters of Northeast India. This meticulously crafted pan-Northeast expedition takes you from the world's highest tea estates in Assam and the living root bridges of Meghalaya to the frozen frontiers of Arunachal Pradesh and the mystic floating lakes of Manipur. Because of commercial border regulations, you will seamlessly transition between specialized local vehicles and expert driver-guides as you sequence through Sikkim, Assam, Arunachal Pradesh, Meghalaya, Nagaland, Manipur, Mizoram, and Tripura.",
    highlights: [
      "Wildlife Safaris tracking One-Horned Rhinos in Kaziranga (Assam) & Sangai Deer in Keibul Lamjao (Manipur)",
      "Cross the freezing, 13,700ft Sela Pass to reach the 400-year-old Tawang Monastery (Arunachal Pradesh)",
      "Hike the extraordinary Double Decker Living Root Bridge (Meghalaya) and ascend Reiek Peak (Mizoram)",
      "Witness the majestic Mt. Kanchenjunga (Sikkim) and the colossal stone carvings of Unakoti (Tripura)"
    ],
    includes: [
      "All 8 State Inner Line Permits (ILP) and Restricted Area Permits (RAP) processing",
      "Seamless vehicle relays at state borders with expert local terrain drivers",
      "17 Nights premium accommodation strategically mapped across 8 states",
      "Two connecting domestic flights (Imphal to Aizawl, Aizawl to Agartala) to optimize routing"
    ],
    excludes: [
      "Arrival flight into Bagdogra (IXB) and Departure flight out of Agartala (IXA)",
      "Personal helicopter ride options in Sikkim/Arunachal",
      "Camera fees and personal porter charges during treks",
      "Major meals (Lunches and dinners are excluded to allow local culinary exploration)"
    ],
    travelInformation: "This is a high-endurance, bucket-list expedition requiring physical resilience. Altitudes vary from sea level to 17,000ft, exposing travelers to extreme temperature shifts. Due to strict inter-state commercial vehicle laws, your transport and team will change seamlessly at specific borders. Pack heavily customizable layered clothing, valid government IDs (Passport/Aadhar), and at least 20 passport photos for rolling permit checks along the border frontiers.",
    itinerary: [
      { day: 1, title: "Sikkim Arrival", activities: ["Arrive at Bagdogra Airport", "Drive to Gangtok", "Evening MG Marg Stroll"] },
      { day: 2, title: "Glacial Lakes & Border Passes", activities: ["Drive to 12,400ft Tsomgo Lake", "Baba Mandir Visit", "Return to Gangtok"] },
      { day: 3, title: "Enter Assam's Wildlife Realm", activities: ["Descend to Plains", "Drive from Gangtok to Kaziranga National Park", "Bonfire Evening"] },
      { day: 4, title: "Kaziranga Safari & Move to Arunachal", activities: ["Early Morning Elephant/Jeep Safari", "Drive to Dirang (Arunachal Pradesh)", "Sangti Valley Sunset"] },
      { day: 5, title: "Conquering Sela Pass", activities: ["Drive across 13,700ft Sela Pass", "Sela Lake Photography", "Check-in at Tawang"] },
      { day: 6, title: "Tawang Monastery & Border Lakes", activities: ["Largest Monastery Tour in India", "Madhuri Lake Expedition", "Local Monpa Village Experience"] },
      { day: 7, title: "Descent to Assam Plains", activities: ["Descend from Tawang", "Jung Waterfalls", "Overnight stay in Tezpur"] },
      { day: 8, title: "Ascent to Meghalaya - Abode of Clouds", activities: ["Drive from Tezpur to Shillong", "Umiam Lake Viewpoint", "Police Bazar Exploration"] },
      { day: 9, title: "Living Root Bridges & Waterfalls", activities: ["Drive to Cherrapunjee", "Nohkalikai Falls", "Trek to Living Root Bridge"] },
      { day: 10, title: "The Road to Nagaland", activities: ["Drive from Shillong to Kohima", "Cross Assam Border", "Check-in at Kohima"] },
      { day: 11, title: "Naga Tribal Heritage", activities: ["Kisama Heritage Village Tour", "WWII Cemetery", "Local Naga Culinary Experience"] },
      { day: 12, title: "Enter the Jeweled Land (Manipur)", activities: ["Drive from Kohima to Imphal", "Kangla Fort Tour", "Ima Keithel (Mother's Market) Shopping"] },
      { day: 13, title: "Floating National Park", activities: ["Drive to Loktak Lake", "Boat Ride on Phumdis", "Sangai Deer tracking in Keibul Lamjao"] },
      { day: 14, title: "Flight to Mizoram's Mountains", activities: ["Fly from Imphal to Aizawl", "Solomon's Temple Visit", "Sunset at Durtlang Hills"] },
      { day: 15, title: "Mizoram Cloud Trek", activities: ["Hike up Reiek Tlang", "Mizo Traditional Village Tour", "Cultural Evening in Aizawl"] },
      { day: 16, title: "Flight to the Ancient Kingdom (Tripura)", activities: ["Fly from Aizawl to Agartala", "Ujjayanta Palace Exploration", "Akhaura Check Post Ceremony"] },
      { day: 17, title: "The Lost Stone Faces of Unakoti", activities: ["Full day trip to Unakoti", "Explore Ancient Rock Carvings", "Farewell Dinner in Agartala"] },
      { day: 18, title: "Expedition Concludes", activities: ["Final Souvenir Shopping", "Airport Transfer for Outbound Flight"] }
    ],
    accommodations: [
      { name: "Gangtok High-Rise", type: "4-Star Mountain View", nightCount: 2 },
      { name: "Borgos Safari Resort", type: "Luxury Jungle Lodge", nightCount: 1 },
      { name: "Dirang Boutique", type: "Boutique", nightCount: 1 },
      { name: "Tawang Heritage", type: "Premium", nightCount: 2 },
      { name: "Tezpur Center Hotel", type: "Business 4-Star", nightCount: 1 },
      { name: "Polo Orchid Cherrapunjee", type: "Luxury Resort", nightCount: 2 },
      { name: "Kohima Camp / Homestay", type: "Standard", nightCount: 2 },
      { name: "Classic Grande Imphal", type: "Premium 4-Star", nightCount: 2 },
      { name: "Aizawl Cliff Hotel", type: "Premium", nightCount: 2 },
      { name: "Polo Towers Agartala", type: "5-Star Luxury", nightCount: 2 }
    ],
    gallery: [
      "/images/arunachal-pradesh-landscape.jpg",
      "/images/tripura.jpg",
      "/images/mizoram-hero.jpg"
    ],
    imgUrl: "/images/assam-tea-gardens.jpg"
  }
];
