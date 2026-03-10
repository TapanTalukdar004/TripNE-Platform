export interface StateData {
  id: string;
  name: string;
  tagline: string;
  heroImage: string;
  accentColor: string; // Hex color code
  aboutText: string;
  famousFor: {
    icon: string; // Name of Lucide icon to use
    title: string;
    description: string;
  }[];
  popularDestinations: {
    name: string;
    image: string;
    description: string;
    highlights: string[];
  }[];
  culture: {
    text: string;
    images: string[];
    bestTimeToVisit: string;
  };
}

export const statesData: Record<string, StateData> = {
  assam: {
    id: "assam",
    name: "Assam",
    tagline: "The Land of Red River and Blue Hills",
    heroImage: "/images/assam-hero1.jpg", // Kaziranga/Rhino placeholder
    accentColor: "#10b981", // Emerald Green
    aboutText: "Famed for its sprawling tea estates, the fierce Brahmaputra river, and the endangered One-Horned Rhinoceros, Assam is the majestic gateway to Northeast India. It is a land where ancient temples whisper secrets of the past and vibrant festivals celebrate the rhythm of nature.",
    famousFor: [
      {
        icon: "Leaf",
        title: "Assam Tea",
        description: "Produces some of the finest, most robust black tea in the world from sprawling, misty estates."
      },
      {
        icon: "Mountain",
        title: "Kaziranga National Park",
        description: "A UNESCO World Heritage site and home to two-thirds of the world's Great One-Horned Rhinoceroses."
      },
      {
        icon: "Waves",
        title: "The Brahmaputra",
        description: "One of the largest rivers in the world, giving life to the valley and creating the world's largest river island, Majuli."
      },
      {
        icon: "Flame",
        title: "Bihu Spirit",
        description: "The vibrant agricultural festivals that define the rhythmic cultural heartbeat of the Assamese people."
      }
    ],
    popularDestinations: [
      {
        name: "Kaziranga National Park",
        image: "/images/kaziranga-national-park.jpg", // Rhino
        description: "A vast expanse of tall elephant grass, marshland, and dense tropical moist broadleaf forests. Aside from the iconic rhino, it's a sanctuary for tigers, elephants, panthers, and bears.",
        highlights: ["Elephant Safari", "Jeep Safari", "Orchid Park", "Bird Watching"]
      },
      {
        name: "Majuli Island",
        image: "/images/neland.jpg", // River/Boat/Island
        description: "The world's largest river island, nestled in the Brahmaputra. It is the spiritual epicenter of Assamese neo-Vaishnavite culture and a serene escape from modern life.",
        highlights: ["Satras (Monasteries)", "Pottery Making", "Cycling Tours", "Sunset Boat Rides"]
      },
      {
        name: "Kamakhya Temple",
        image: "/images/northeast-tour-highlight-2.jpg", // Temple/Culture
        description: "Perched high on the Nilachal Hill in Guwahati, this ancient Shakti Peeth is one of the most revered and mysterious temples in India, drawing pilgrims and sadhus from far and wide.",
        highlights: ["Ambubachi Mela", "Panoramic City Views", "Ancient Architecture", "Spiritual Walks"]
      },
      {
        name: "Jorhat & Tea Estates",
        image: "/images/jorhat-tea.jpg", // Tea Gardens
        description: "Known as the Tea Capital of the World, Jorhat offers an immersive experience into the colonial heritage of tea planters and endless emerald green plantations.",
        highlights: ["Tea Leaf Plucking", "Planters' Bungalow Stays", "Tocklai Research", "Gymkhana Club"]
      }
    ],
    culture: {
      text: "Assamese culture is a beautiful tapestry woven by various indigenous tribes. The state comes alive during the Bihu festivals, celebrated with rhythmic drums, graceful dancing, and communal feasts. The traditional attire involves Muga silk, known for its extreme durability and natural yellowish-golden tint. Handloom and bamboo crafts are integral parts of rural life, reflecting a deep respect for natural resources.",
      images: [
        "/images/bihu.jpg", 
        "/images/northeast-tour-highlight-1.jpg",
        "/images/northeast-tour-highlight-4.jpg",
        "/images/northeast-tour-highlight-6.jpg"
      ],
      bestTimeToVisit: "November to April, when the weather is cool and dry, perfect for wildlife safaris and cruising the Brahmaputra."
    }
  },
  
  meghalaya: {
    id: "meghalaya",
    name: "Meghalaya",
    tagline: "The Abode of Clouds",
    heroImage: "/images/meghalaya-tourism-clouds.jpg", // Nohkalikai Falls
    accentColor: "#0ea5e9", // Sky Blue
    aboutText: "Welcome to the wettest place on Earth, where clouds touch the ground and ancient root bridges connect the deep jungles. Meghalaya is a mystical land of misty valleys, crystal-clear rivers, plunging waterfalls, and the vibrant music-loving Khasi and Jaintia tribes.",
    famousFor: [
      {
        icon: "Leaf", // Root bridge
        title: "Living Root Bridges",
        description: "Bio-engineered marvels crafted by the Khasi people by training rubber tree roots across wild rivers."
      },
      {
        icon: "Waves", // Rain/Water
        title: "Cherrapunji & Mawsynram",
        description: "The rain capitals of the world, offering spectacular dramatic weather and jaw-dropping waterfalls."
      },
      {
        icon: "MapPin", // Clean village
        title: "Mawlynnong Village",
        description: "Revered as 'God's Own Garden', it earned the title of the cleanest village in Asia."
      },
      {
        icon: "Mountain", // Caves
        title: "Limestone Caves",
        description: "Home to some of the deepest and longest cave systems in the world, perfect for spelunking."
      }
    ],
    popularDestinations: [
      {
        name: "Shillong",
        image: "/images/shillong-1.jpg", // Shillong
        description: "The capital city, famously called the 'Scotland of the East'. It boasts a vibrant rock music scene, bustling cafes, Ward's Lake, and the stunning Shillong Peak.",
        highlights: ["Umiam Lake", "Don Bosco Museum", "Police Bazar", "Elephant Falls"]
      },
      {
        name: "Cherrapunji (Sohra)",
        image: "/images/northeast-tour-highlight-2-3.jpg", // Cherrapunji/Nohkalikai
        description: "A dramatic cliff-top destination where rain plunges thousands of feet into the plains of Bangladesh. Home to the towering Nohkalikai Falls and endless green canyons.",
        highlights: ["Nohkalikai Falls", "Seven Sisters Falls", "Mawsmai Cave", "Double Decker Root Bridge"]
      },
      {
        name: "Dawki & Umngot River",
        image: "/images/meghalaya-dawki-river.jpg", // Clear river
        description: "Located right on the Bangladesh border, the Umngot River is so pristine and crystal clear that boats appear to be floating on thin air.",
        highlights: ["River Boating", "Indo-Bangladesh Border", "Cliff Jumping", "Camping"]
      },
      {
        name: "Mawlynnong",
        image: "/images/Mawlynnong.jpg", // Clean Village/Nature
        description: "A magical village maintained immaculately by its residents. Stroll through bamboo pathways, vibrant flower beds, and experience zero-waste sustainable community living.",
        highlights: ["Sky View Point", "Single Root Bridge", "Cleanest Village Tour", "Local Khasi Food"]
      }
    ],
    culture: {
      text: "Meghalaya is unique with its matrilineal society, primarily inhabited by the Khasi, Jaintia, and Garo tribes. Ancestry and property are passed down through the youngest daughter. Music is deeply woven into the culturally vibrant lifestyle, with Shillong producing some of India's best rock musicians. The Nongkrem Dance and Wangala festival are major celebrations of harvest and prosperity.",
      images: [
        "/images/northeast-tour-highlight-2-6.jpg", // Placeholder for tribal fest
        "/images/caves.jpg", // Placeholder nature/culture
        "/images/khasi.jpg", // People/Music
        "/images/Wari-chora.jpg"  // Landscape culture
      ],
      bestTimeToVisit: "October to April. Post-monsoon months offer lush green landscapes, blooming orchids, and clear skies, while avoiding heavy rain disruptions."
    }
  },

  arunachal: {
    id: "arunachal",
    name: "Arunachal Pradesh",
    tagline: "The Land of Dawn-Lit Mountains",
    heroImage: "/images/northeast-tour-highlight-3-1.jpg", // Needs mountain/monastery placeholder
    accentColor: "#f97316", // Warm Orange/Dawn
    aboutText: "The easternmost outpost of India, Arunachal Pradesh is the first soil to greet the morning sun. It is a wildly beautiful, wildly remote expanse of the Himalayas, crowned by snowy peaks, glacial lakes, and ancient Buddhist monasteries frozen in time.",
    famousFor: [
      {
        icon: "Mountain",
        title: "Tawang Monastery",
        description: "The largest monastery in India and the second largest in the world, perched at 10,000 feet."
      },
      {
        icon: "Flame", // Sunrise/Dawn
        title: "The First Sunrise",
        description: "Dong Valley, located at the eastern edge of India, receives the very first rays of sunlight in the country."
      },
      {
        icon: "Waves",
        title: "High Altitude Lakes",
        description: "Pangong-esque alpine gems like Sela Lake and Madhuri Lake frozen amidst snow-capped ranges."
      },
      {
        icon: "Leaf", // Tribes/Forest
        title: "Untouched Tribal Culture",
        description: "Home to 26 major unique tribes, each with distinct languages, distinct tattoos, and animist beliefs."
      }
    ],
    popularDestinations: [
      {
        name: "Tawang",
        image: "/images/arunachal-pradesh-landscape.jpg", // Mountain/Monastery
        description: "A high-altitude paradise bordering Tibet. Tawang is steeped in Buddhism, featuring the massive Galden Namgey Lhatse monastery, war memorials, and sweeping dramatic valleys.",
        highlights: ["Tawang Monastery", "Sela Pass", "Bumla Pass", "Madhuri Lake"]
      },
      {
        name: "Ziro Valley",
        image: "/images/ziro.jpg", // Green Valley/Paddy
        description: "A mesmerizingly peaceful valley characterized by layered pine clusters and sprawling rice fields. It's the home of the Apatani tribe, famous for their facial tattoos and nose plugs.",
        highlights: ["Apatani Tribal Tour", "Ziro Music Festival", "Tarin Fish Farm", "Meghna Cave Temple"]
      },
      {
        name: "Dirang",
        image: "/images/arunachal-pradesh-unseen-beauty.jpg", // Valley
        description: "A beautiful overnight stop en route to Tawang. Dirang features a pleasant climate, kiwi and apple orchards, hot water springs, and the ancient Dirang Dzong (fort).",
        highlights: ["Dirang Dzong", "Hot Springs", "Sangti Valley", "Apple Orchards"]
      },
      {
        name: "Namdapha National Park",
        image: "/images/Namdapha National Park.jpg", // Dense forest/Tiger
        description: "One of the most biodiverse, remote, and impenetrable rainforests in the world. It is uniquely the only park in the world to house all four big cats: tiger, leopard, snow leopard, and clouded leopard.",
        highlights: ["Wildlife Trekking", "Miao Museum", "Camping", "Bird Watching"]
      }
    ],
    culture: {
      text: "The culture of Arunachal Pradesh is deeply split between the Tibetan Buddhist tribes in the high west (Monpas, Sherdukpen) and the animist, nature-worshiping tribes of the central and eastern belts (Apatanis, Nyishis, Wanchos). Festivals like Losar (Tibetan New Year) and Ziro Festival of Music draw global crowds. Wood carving, carpet weaving, and cane works are exquisite arts passed down through generations.",
      images: [
        "/images/adi.jpg", 
        "/images/apatani.jpg", 
        "/images/mechuka.jpg", 
        "/images/1559127574-1559127559952.jpg"
      ],
      bestTimeToVisit: "October to April. The winter is harsh but breathtaking in places like Tawang, while the valleys (like Ziro) are extremely pleasant. Avoid monsoon as landslides block major highways."
    }
  },

  nagaland: {
    id: "nagaland",
    name: "Nagaland",
    tagline: "The Land of Festivals",
    heroImage: "/images/nagaland-hero.jpg", // placeholder
    accentColor: "#ef4444", // Red/Tribal
    aboutText: "Fierce, proud, and historically secluded, Nagaland is a vibrant tapestry of 16 warrior tribes. It is a land where ancient animist traditions, warrior folklore, and world-class modern music blend seamlessly among the mist-covered Naga Hills.",
    famousFor: [
      {
        icon: "Flame",
        title: "Hornbill Festival",
        description: "The 'Festival of Festivals' showcasing the rich cultural heritage, dances, and crafts of all Naga tribes."
      },
      {
        icon: "Mountain",
        title: "Dzukou Valley",
        description: "A surreal, sweeping valley locked away behind rolling hills, turning into a sea of rare flowers in summer."
      },
      {
        icon: "MapPin",
        title: "Khonoma Village",
        description: "India's first green village, blending awe-inspiring terraced farming with fierce conservation efforts."
      },
      {
        icon: "Waves",
        title: "Bhut Jolokia",
        description: "The notoriously fiery Ghost Pepper originates in these hills, a staple in spicy Naga cuisine."
      }
    ],
    popularDestinations: [
      {
        name: "Kohima",
        image: "/images/mon.png", // Kohima placeholder
        description: "The capital city, forever etched in history for the Battle of Kohima during WWII. It is an unpolished gem of bustling markets, gothic churches, and deep history.",
        highlights: ["War Cemetery", "Kisama Heritage Village", "Japfu Peak", "State Museum"]
      },
      {
        name: "Dzukou Valley",
        image: "/images/nagaland-dzuko-valley.jpg", // Valley placeholder
        description: "One of the most spectacular trekking destinations in India, known for its undulating green knolls and the extremely rare Dzukou Lily.",
        highlights: ["Trekking", "Camping", "Flora Photography", "Caves"]
      },
      {
        name: "Mokokchung",
        image: "/images/Mokokchung.jpg", // Mokokchung Placeholder
        description: "The intellectual and cultural capital of the Ao Naga tribe. Pine-clad mountains frame ancient villages governed by age-old democratic systems.",
        highlights: ["Ungma Village", "Longkhum", "Chuchuyimlang", "Town Park"]
      },
      {
        name: "Mon",
        image: "/images/mon.jpg", // Tribe placeholder
        description: "The mystical land of the Konyak Nagas—the fabled headhunters with tattooed faces, blackened teeth, and an indomitable spirit.",
        highlights: ["Longwa Village (Border)", "Aoleang Festival", "Veda Peak", "Wood Carving"]
      }
    ],
    culture: {
      text: "Nagaland's culture is intrinsically linked to agriculture, warfare (historically), and profound musicality. The Morung (youth dormitory) system shaped their society. Colorful shawls signify an individual's tribe and social standing. Naga cuisine heavily features smoked meats, bamboo shoots, and intense spices, drastically different from mainland India.",
      images: [
        "/images/angami.jpg",
        "/images/naga.jpg",
        "/images/nagaland-festival-tribes.webp",
        "/images/warrior.webp"
      ],
      bestTimeToVisit: "December is legendary due to the Hornbill Festival. Otherwise, October to May offers clear views of the undulating hills."
    }
  },

  sikkim: {
    id: "sikkim",
    name: "Sikkim",
    tagline: "The Himalayan Wonderland",
    heroImage: "/images/sign.jpg", // Needs Kanchenjunga
    accentColor: "#a855f7", // Purple/Mystic
    aboutText: "A small, landlocked sliver of paradise tucked into the Himalayas. Sikkim is India's first fully organic state, blessed with plunging valleys, alpine lakes, thick forests, and the towering, sacred peaks of Mt. Kanchenjunga.",
    famousFor: [
      {
        icon: "Mountain",
        title: "Mt. Kanchenjunga",
        description: "The third highest peak in the world, defining the skyline and spiritually revered as the guardian deity."
      },
      {
        icon: "Leaf",
        title: "Fully Organic State",
        description: "A pioneer in sustainable farming, 100% of Sikkim's agricultural land is certified organic."
      },
      {
        icon: "Waves",
        title: "Alpine Lakes",
        description: "High-altitude glacial lakes like Tsomgo and Gurudongmar that freeze solid in the winter."
      },
      {
        icon: "MapPin",
        title: "Buddhist Monasteries",
        description: "Ancient centers of Tibetan Buddhism like Rumtek and Pemayangtse dot the steep hillsides."
      }
    ],
    popularDestinations: [
      {
        name: "Gangtok",
        image: "/images/gangtok.jpg", // placeholder
        description: "The exceedingly clean and precipitous capital. Gangtok offers spectacular views, modern cafes on MG Marg, and deep Buddhist heritage.",
        highlights: ["MG Marg", "Rumtek Monastery", "Ban Jhakri Falls", "Ganesh Tok"]
      },
      {
        name: "North Sikkim (Lachung & Lachen)",
        image: "/images/sikkim-monastery-kanchenjunga.jpg", // snow placeholder
        description: "The rugged, freezing frontier. Home to the spectacularly colorful Yumthang Valley of Flowers and the breathtakingly high Gurudongmar Lake.",
        highlights: ["Gurudongmar Lake", "Yumthang Valley", "Zero Point", "Chopta Valley"]
      },
      {
        name: "Tsomgo Lake & Nathu La",
        image: "/images/sikkim-himalayan-destination.jpg", // lake placeholder
        description: "A steep, winding ascent towards the Chinese border leads to the ethereal, prayer-flag draped Tsomgo Lake and the historic Nathu La pass.",
        highlights: ["Tsomgo Lake", "Nathu La Pass", "Baba Mandir", "Yak Rides"]
      },
      {
        name: "Pelling",
        image: "/images/pel.png", // Kanchenjunga view
        description: "A peaceful town in West Sikkim offering arguably the most breathtaking, up-close views of the Kanchenjunga mastiff in the entire state.",
        highlights: ["Pemayangtse Monastery", "Rabdentse Ruins", "Khecheopalri Lake", "Glass Skywalk"]
      }
    ],
    culture: {
      text: "Sikkimese culture is a blend of the indigenous Lepchas, the Bhutias (of Tibetan descent), and the Nepalese majority. Buddhism profoundly influences the architecture, festivals (like Losoong and Saga Dawa), and art (Thangka paintings). Local cuisine is famous for Momos, Thukpa, and the traditional fermented millet beer called Tongba.",
      images: [
        "/images/sik.jpeg",
        "/images/dress.jpg",
        "/images/northeast-tour-highlight-8-6.jpg",
        "/images/mask.jpg"
      ],
      bestTimeToVisit: "March to May (blooming rhododendrons) or October to mid-December (clear mountain views)."
    }
  },

  mizoram: {
    id: "mizoram",
    name: "Mizoram",
    tagline: "The Land of the Highlanders",
    heroImage: "/images/mizoram-hero'.jpg", // Placeholder
    accentColor: "#ec4899", // Pink/Orchid
    aboutText: "A deeply peaceful, heavily forested sliver of land sandwiched between Bangladesh and Myanmar. Mizoram is a geometric maze of rolling hills, bamboo forests, vibrant orchids, and a highly literate, deeply musical society.",
    famousFor: [
      {
        icon: "Mountain",
        title: "Rolling Hills",
        description: "21 major hill ranges run endlessly from north to south, creating a mesmerizingly repetitive landscape."
      },
      {
        icon: "Leaf",
        title: "Bamboo Culture",
        description: "Bamboo essentially dictates Mizo life—from the iconic Cheraw (Bamboo Dance) to housing and cuisine."
      },
      {
        icon: "Flame",
        title: "Chapchar Kut",
        description: "The most vibrant spring festival, an explosion of color, rhythmic dances, and Mizo unity."
      },
      {
        icon: "MapPin",
        title: "Literacy & Discipline",
        description: "Boasting the second-highest literacy rate in India, known for an incredibly disciplined and honest society."
      }
    ],
    popularDestinations: [
      {
        name: "Aizawl",
        image: "/images/aizawl.jpg", // Aizawl placeholder
        description: "A spectacular citadel-like capital clinging to steep ridges. It is a highly urbanized, peaceful city with a cool climate and a deep love for choral music.",
        highlights: ["Solomon's Temple", "Durtlang Hills", "KV Paradise", "State Museum"]
      },
      {
        name: "Reiek Tlang",
        image: "/images/Reiek Tlang.jpg", // Hill placeholder
        description: "A prominent mountain offering sweeping 360-degree views of Aizawl and the surrounding valleys, culminating in a dramatic, wind-swept cliff edge.",
        highlights: ["Trekking", "Reiek Heritage Village", "Bird Watching", "Caving"]
      },
      {
        name: "Champhai",
        image: "/images/Champhai.jpg", // Champhai placeholder
        description: "The 'Rice Bowl of Mizoram' situated on the Myanmar border. A bustling commercial town opening up to sweeping valleys adorned with vineyards and rice paddies.",
        highlights: ["Rih Dil (Lake in Myanmar)", "Mura Puk", "Trekking", "Vineyards"]
      },
      {
        name: "Vantawng Falls",
        image: "/images/Vantawng Falls.jpg", // Waterfall placeholder
        description: "The highest uninterrupted waterfall in Mizoram, plunging 750 feet down a sheer cliff entirely surrounded by unimaginably thick bamboo forests.",
        highlights: ["Viewpoint", "Thenzawl Town", "Handloom Centers", "Nature Walks"]
      }
    ],
    culture: {
      text: "Mizo society is tightly knit by the ethical code of 'Tlawmngaihna', which obliges them to be hospitable, kind, and helpful to others unconditionally. Villages are intensely communal. The Cheraw (bamboo dance) is world-famous. Choral singing is deeply ingrained through the church, making Mizoram a land of exceptional vocalists.",
      images: [
        "/images/mizotribe.jpg",
        "/images/mizoram-f1.jpg",
        "/images/mizo-tribe.jpg",
        "/images/626bcd981143c-beino-caslte-1.jpg"
      ],
      bestTimeToVisit: "November to March offers pleasant weather. Avoid the monsoons (May-September) as the heavy rain is relentless."
    }
  },

  manipur: {
    id: "manipur",
    name: "Manipur",
    tagline: "The Jeweled Land",
    heroImage: "/images/manipur-hero.jpg", // Placeholder
    accentColor: "#facc15", // Yellow/Gold
    aboutText: "A breathtaking blend of misty hills, serene lakes, and deep-rooted traditions. Manipur is famous for its classical dance, unique martial arts, and being the birthplace of modern polo.",
    famousFor: [
      {
        icon: "Waves",
        title: "Loktak Lake",
        description: "The largest freshwater lake in Northeast India, famous for its circular floating phumdis (islands)."
      },
      {
        icon: "Mountain",
        title: "Sangai Deer",
        description: "The endangered brow-antlered deer, endemic only to the floating Keibul Lamjao National Park."
      },
      {
        icon: "MapPin",
        title: "Ima Keithel",
        description: "A bustling 500-year-old market in Imphal run entirely and exclusively by women."
      },
      {
        icon: "Flame",
        title: "Raas Leela",
        description: "A highly stylized and mesmerizing classical Indian dance form depicting the love of Radha and Krishna."
      }
    ],
    popularDestinations: [
      {
        name: "Imphal",
        image: "/images/imphal.jpg", // Imphal
        description: "The capital city set in a beautiful valley. Imphal is a historically rich city showcasing fierce battles from WWII and the ancient Kangla Fort.",
        highlights: ["Kangla Fort", "Ima Keithel", "WWII Cemetery", "State Museum"]
      },
      {
        name: "Loktak Lake & Sendra Island",
        image: "/images/loktak lake.png", // Lake
        description: "A mesmerizing expanse of water dotted with floating biomass islands. Sendra Island offers a panoramic viewpoint of the entire shimmering lake.",
        highlights: ["Boating", "Keibul Lamjao National Park", "Sendra Resort", "Homestays"]
      },
      {
        name: "Ukhrul",
        image: "/images/Ukhrul.jpg", // Ukhrul
        description: "The highest hill station of Manipur, known for its visual splendor, pine forests, and the extremely rare Shirui Lily that blooms on the peak.",
        highlights: ["Shirui Kashong Peak", "Khangkhui Cave", "Nillai Tea Estate", "Trekking"]
      },
      {
        name: "Moirang",
        image: "/images/Moirang.jpg", // Moirang
        description: "A town of great historical significance. It was here that the Indian National Army (INA) hoisted the tricolor flag for the first time in 1944.",
        highlights: ["INA Memorial Complex", "Loktak Lake (nearby)", "Thangjing Temple", "Cultural Dances"]
      }
    ],
    culture: {
      text: "Manipuri culture is a delicate and vibrant mix of martial arts (Thang-Ta), classical dance, and weaving. The Meiteis of the valley and the Naga/Kuki tribes of the hills share a highly refined aesthetic. Sports are an integral part of life, specifically Sagol Kangjei, the indigenous form of polo. The festivals are universally colorful and deeply spiritual.",
      images: [
        "/images/manipur-t2.jpg",
        "/images/manipur-loktak-lake.jpg",
        "/images/manipur-jewel-of-india.webp",
        "/images/manipur-t1.jpg"
      ],
      bestTimeToVisit: "October to April, when the weather is pleasant and the Shirui Kashong peak is accessible."
    }
  },

  tripura: {
    id: "tripura",
    name: "Tripura",
    tagline: "The Kingdom of Ancient Kings",
    heroImage: "/images/tripura-hero.jpg", // Neermahal placeholder
    accentColor: "#3b82f6", // Royal Blue
    aboutText: "A formerly princely state with a glorious past, Tripura is surrounded by Bangladesh on three sides. It is a hidden treasure of sprawling royal palaces, magnificent rock-cut sculptures, and dense bamboo forests.",
    famousFor: [
      {
        icon: "Mountain",
        title: "Neermahal",
        description: "A spectacular royal palace sitting right in the middle of Rudrasagar Lake, akin to the Taj Lake Palace."
      },
      {
        icon: "Leaf",
        title: "Unakoti",
        description: "A massive, ancient pilgrimage site featuring thousands of colossal rock-cut sculptures of Hindu deities embedded in the hillside."
      },
      {
        icon: "Waves",
        title: "Bamboo Craft",
        description: "Tripura produces some of the most exquisite bamboo and cane handicrafts in the world."
      },
      {
        icon: "MapPin",
        title: "Tribal Diversity",
        description: "Home to 19 indigenous tribes, yielding a spectacular mix of dialects, music, dances, and customs."
      }
    ],
    popularDestinations: [
      {
        name: "Agartala",
        image: "/images/agartala.jpg", // placeholder
        description: "The relaxed and culturally rich capital. The magnificent white Ujjayanta Palace sits at its heart, surrounded by Mughal-style gardens.",
        highlights: ["Ujjayanta Palace", "Heritage Park", "Sepahijala Wildlife Sanctuary", "Jagannath Temple"]
      },
      {
        name: "Unakoti",
        image: "/images/Unakoti.jpg", // rock carving placeholder
        description: "An awe-inspiring archaeological wonder deep in the jungle. It literally means 'one less than a crore' (9.99 million) rock carvings.",
        highlights: ["Rock-cut Sculptures", "Pilgrimage Trekking", "Ashokastami Festival", "Waterfalls"]
      },
      {
        name: "Melaghar (Neermahal)",
        image: "/images/Melaghar (Neermahal).jpg", // lake palace placeholder
        description: "Home to Neermahal (The Water Palace), mixing Hindu and Islamic architectural styles, floating dramatically in the center of Rudrasagar Lake.",
        highlights: ["Neermahal Palace", "Boat Rides", "Rudrasagar Lake", "Migratory Birds"]
      },
      {
        name: "Udaipur",
        image: "/images/Udaipur.jpg", // temple placeholder
        description: "The 'City of Lakes' and the former capital of the Maharajas of Tripura. It is famous for the revered Tripura Sundari Temple, one of 51 Shakti Peethas.",
        highlights: ["Tripura Sundari Temple", "Kalyan Sagar Lake", "Bhubaneswari Temple", "Amar Sagar"]
      }
    ],
    culture: {
      text: "Tripuri culture is strongly influenced by its long history of royalty and Bengali tradition mixed with the native Cockborok ethos. The Hojagiri dance of the Reang tribe, performed with incredible balance on an earthen pitcher, is visually stunning. Handloom is ubiquitous, with every tribal family operating their own loom to weave intricate traditional patterns.",
      images: [
        "/images/Tripura-t1.jpg",
        "/images/tripura.jpg",
        "/images/longwa.jpg",
        "/images/tripura2.jpg"
      ],
      bestTimeToVisit: "October to March. The weather is cool, and festivals like Durga Puja and Diwali are celebrated with immense grandeur."
    }
  },

  // Future state entries will be added here
};
