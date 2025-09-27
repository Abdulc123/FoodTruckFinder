const fs = require("fs");

function jitter(center, maxMeters = 1200) {
  // ~1e5 meters per degree (rough), good enough for mocks
  const mToDeg = 1 / 1000 / 0.009; // quick-and-dirty
  const dx = (Math.random() * 2 - 1) * maxMeters * mToDeg;
  const dy = (Math.random() * 2 - 1) * maxMeters * mToDeg;
  return { lat: center.lat + dy, lng: center.lng + dx };
}

const cuisines = [
  ["Egyptian","Mediterranean"],
  ["Pakistani"],
  ["Bangladeshi","Pakistani"],
  ["Afghan"],
  ["Turkish","Mediterranean"]
];

function hoursTemplate(late = false) {
  return late
    ? { mon:["11:00","03:00"], tue:["11:00","03:00"], wed:["11:00","03:00"], thu:["11:00","03:00"], fri:["11:00","04:00"], sat:["12:00","04:00"], sun:["12:00","02:00"] }
    : { mon:["11:00","20:00"], tue:["11:00","20:00"], wed:["11:00","20:00"], thu:["11:00","20:00"], fri:["11:00","21:00"], sat:["12:00","21:00"] };
}

function make(n, city, center) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    const c = jitter(center);
    const cu = cuisines[Math.floor(Math.random()*cuisines.length)];
    const late = Math.random() < 0.3;
    arr.push({
      id: `${city.toLowerCase()}-${i.toString().padStart(3,"0")}`,
      name: `${city} Halal Cart #${i+1}`,
      coords: c,
      city,
      cuisine: cu,
      hours: hoursTemplate(late),
      priceLevel: Math.floor(Math.random()*3)+1,
      rating: Math.round((3.8 + Math.random()*1.2)*10)/10,
      paymentMethods: ["cash","card"].slice(0, Math.random()<0.2 ? 1 : 2),
      tags: late ? ["late-night"] : ["quick-bite"],
      lastUpdated: new Date().toISOString()
    });
  }
  return arr;
}

const nyc = make(30, "NYC", { lat: 40.758, lng: -73.985 });      // Times Sq
const phl = make(20, "Philadelphia", { lat: 39.9526, lng: -75.1652 }); // City Hall

fs.writeFileSync("mobile/assets/mock/carts.json", JSON.stringify([...nyc, ...phl], null, 2));
console.log("Generated mobile/assets/mock/carts.json");