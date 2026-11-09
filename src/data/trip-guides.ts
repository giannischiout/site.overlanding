/**
 * Day-by-day plans for each road trip, keyed by post id.
 * `stops` names the map stops of ROUTES[id].stops in the same order (a round trip may repeat one),
 * so a day's stops can be highlighted on the map by name.
 */

export type TripDay = {
  title: string;
  /** Driving that day */
  km: number;
  hours: number;
  stops: string[];
  text: string;
};

export type TripGuide = {
  stops: string[];
  days: TripDay[];
  goodToKnow: string[];
};

export const TRIP_GUIDES: Record<string, TripGuide> = {
  "south-coast": {
    stops: ["Hveragerði", "Hella", "Seljalandsfoss", "Skógafoss", "Vík"],
    days: [
      {
        title: "Over the heath to the waterfalls",
        km: 150,
        hours: 2,
        stops: ["Hveragerði", "Hella", "Seljalandsfoss"],
        text: "Collect the van, cross Hellisheiði and stop in Hveragerði for the hot river walk. Walk behind Seljalandsfoss in the late light, when the coach tours have gone.",
      },
      {
        title: "Skógafoss and the black sand",
        km: 60,
        hours: 1,
        stops: ["Skógafoss", "Vík"],
        text: "Climb the 527 steps beside Skógafoss early, then drive on to Reynisfjara. Keep well back from the water: the sneaker waves are real. Sleep at the Vík campsite under the cliffs.",
      },
      {
        title: "Back west, slowly",
        km: 190,
        hours: 2.5,
        stops: ["Vík", "Hella"],
        text: "Dyrhólaey for puffins (May to August), a soup stop in Hella, and back to Keflavík with time for the Blue Lagoon on the way.",
      },
    ],
    goodToKnow: [
      "Paved all the way. Any of our vehicles can do it, all year.",
      "In winter, check wind on vedur.is before Vík: gusts under the Eyjafjöll can top 30 m/s.",
    ],
  },
  "golden-circle": {
    stops: ["Þingvellir", "Geysir", "Gullfoss", "Friðheimar", "Selfoss", "Hveragerði"],
    days: [
      {
        title: "The whole loop in a day",
        km: 230,
        hours: 3.5,
        stops: ["Þingvellir", "Geysir", "Gullfoss", "Friðheimar", "Selfoss", "Hveragerði"],
        text: "Walk the rift between two plates at Þingvellir, wait for Strokkur to erupt at Geysir, then feel the spray at Gullfoss. Tomato soup in the Friðheimar greenhouse, and home via Selfoss.",
      },
    ],
    goodToKnow: [
      "Go clockwise and leave by 8: you reach Geysir before the buses.",
      "The perfect first day off a late flight. Short drives, plenty of stops.",
    ],
  },
  "glacier-country": {
    stops: [
      "Hveragerði",
      "Hella",
      "Seljalandsfoss",
      "Skógafoss",
      "Vík",
      "Kirkjubæjarklaustur",
      "Skaftafell",
      "Svínafellsjökull",
      "Jökulsárlón",
      "Diamond Beach",
    ],
    days: [
      {
        title: "Waterfalls on the way east",
        km: 190,
        hours: 2.5,
        stops: ["Hveragerði", "Hella", "Seljalandsfoss", "Skógafoss", "Vík"],
        text: "The South Coast's greatest hits in one day, ending in Vík. Fill up here: the next real town is 70 km away.",
      },
      {
        title: "Across the lava fields",
        km: 140,
        hours: 2,
        stops: ["Kirkjubæjarklaustur", "Skaftafell"],
        text: "Moss-covered Eldhraun, the canyon at Fjaðrárgljúfur, and a night in Skaftafell. Walk to Svartifoss and its basalt columns before dinner.",
      },
      {
        title: "On the ice",
        km: 60,
        hours: 1,
        stops: ["Svínafellsjökull", "Jökulsárlón", "Diamond Beach"],
        text: "Join a guided glacier walk on Svínafellsjökull (book ahead), then watch icebergs drift out of Jökulsárlón and wash up on Diamond Beach.",
      },
      {
        title: "The long drive home",
        km: 370,
        hours: 5,
        stops: ["Vík", "Hella"],
        text: "Back along Route 1 with a stop wherever the light is good. Leave early: winter daylight is short.",
      },
    ],
    goodToKnow: [
      "Best October to March for ice caves and northern lights, with studded tyres fitted.",
      "Zero excess cover is worth it here: the sands east of Vík are where windscreens crack.",
    ],
  },
  snaefellsnes: {
    stops: ["Borgarnes", "Gerðuberg", "Arnarstapi", "Hellissandur", "Kirkjufell", "Stykkishólmur"],
    days: [
      {
        title: "Basalt and the glacier coast",
        km: 230,
        hours: 3,
        stops: ["Borgarnes", "Gerðuberg", "Arnarstapi", "Hellissandur"],
        text: "Lunch at the Settlement Centre in Borgarnes, the basalt wall of Gerðuberg, then the sea arches between Arnarstapi and Hellnar. Snæfellsjökull watches from above all afternoon.",
      },
      {
        title: "Kirkjufell and the north shore",
        km: 190,
        hours: 2.5,
        stops: ["Kirkjufell", "Stykkishólmur"],
        text: "Sunrise at Kirkjufell, the most photographed mountain in Iceland. Fresh scallops in Stykkishólmur before the drive back south.",
      },
    ],
    goodToKnow: [
      "Called 'Iceland in miniature': lava, beaches, a glacier and fjords in two days.",
      "The coast road can close in winter storms. Check umferdin.is the night before.",
    ],
  },
  highlands: {
    stops: ["Hveragerði", "Hella", "Hekla", "Landmannalaugar"],
    days: [
      {
        title: "To the edge of the interior",
        km: 120,
        hours: 1.5,
        stops: ["Hveragerði", "Hella"],
        text: "An easy first day: stock up in Hella. There are no shops, fuel or phone signal past this point.",
      },
      {
        title: "Past Hekla on the F-roads",
        km: 80,
        hours: 3,
        stops: ["Hekla", "Landmannalaugar"],
        text: "Follow F26 and F225 under the volcano Hekla to Landmannalaugar. Ford the last river only if the water is below the wheel hubs, then soak in the natural hot spring.",
      },
      {
        title: "Rhyolite hills and home",
        km: 250,
        hours: 4,
        stops: ["Landmannalaugar", "Hella"],
        text: "Hike Brennisteinsalda's orange, green and red slopes in the morning, then drive out the way you came.",
      },
    ],
    goodToKnow: [
      "F-roads open late June to early September only, and need a 4x4. Our 4x4 campers are allowed.",
      "River crossings are only covered on approved routes. This is one of them.",
    ],
  },
  westfjords: {
    stops: ["Borgarnes", "Búðardalur", "Reykhólar", "Látrabjarg", "Dynjandi", "Ísafjörður", "Ögur", "Borgarnes"],
    days: [
      {
        title: "North to the fjords",
        km: 260,
        hours: 3.5,
        stops: ["Borgarnes", "Búðardalur", "Reykhólar"],
        text: "Through the Dalir valleys where the sagas happened, to the seaweed baths at Reykhólar.",
      },
      {
        title: "The bird cliffs",
        km: 180,
        hours: 3,
        stops: ["Látrabjarg"],
        text: "Látrabjarg is Europe's westernmost point and its biggest bird cliff. Lie on your stomach at the edge and puffins land a metre away.",
      },
      {
        title: "Dynjandi",
        km: 130,
        hours: 2.5,
        stops: ["Dynjandi"],
        text: "The 'bridal veil' falls in seven tiers down the mountain. Camp below and have the place to yourself by evening.",
      },
      {
        title: "Ísafjörður",
        km: 100,
        hours: 2,
        stops: ["Ísafjörður"],
        text: "The fjords' capital: a kayak on the fjord, fish stew at Tjöruhúsið, and a boat to Hornstrandir if you have a spare day.",
      },
      {
        title: "Around Ísafjarðardjúp and south",
        km: 450,
        hours: 6,
        stops: ["Ögur", "Borgarnes"],
        text: "A long day around the great fjord, past seals hauled out on the rocks, and back to the Ring Road at Borgarnes.",
      },
    ],
    goodToKnow: [
      "Gravel for long stretches. Drive slowly and keep to the right on blind crests.",
      "Best June to September. In winter many of these roads close.",
    ],
  },
};
