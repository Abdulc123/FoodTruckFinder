const fs = require("fs");

function jitter(center, maxMeters = 1200) {
  // More accurate conversion: 1 degree latitude ≈ 111,000 meters
  // 1 degree longitude ≈ 111,000 * cos(latitude) meters
  const latToDeg = 1 / 111000; // meters to degrees for latitude
  const lngToDeg = 1 / (111000 * Math.cos(center.lat * Math.PI / 180)); // meters to degrees for longitude
  
  const dx = (Math.random() * 2 - 1) * maxMeters * lngToDeg;
  const dy = (Math.random() * 2 - 1) * maxMeters * latToDeg;
  return { lat: center.lat + dy, lng: center.lng + dx };
}

const cuisines = [
  ["Egyptian","Mediterranean"],
  ["Pakistani"],
  ["Bangladeshi","Pakistani"],
  ["Afghan"],
  ["Turkish","Mediterranean"]
];

// Philadelphia addresses near Temple University
const phillyAddresses = [
  "1300 W Norris St, Philadelphia, PA 19122",
  "1500 N Broad St, Philadelphia, PA 19121",
  "1200 W Diamond St, Philadelphia, PA 19121",
  "1400 N 13th St, Philadelphia, PA 19122",
  "1100 W Girard Ave, Philadelphia, PA 19123",
  "1600 N 15th St, Philadelphia, PA 19121",
  "1350 W Oxford St, Philadelphia, PA 19121",
  "1250 N 12th St, Philadelphia, PA 19122",
  "1450 W Susquehanna Ave, Philadelphia, PA 19121",
  "1150 N 11th St, Philadelphia, PA 19122",
  "1550 W Dauphin St, Philadelphia, PA 19133",
  "1050 W Berks St, Philadelphia, PA 19122",
  "1650 N 16th St, Philadelphia, PA 19121",
  "1300 W Lehigh Ave, Philadelphia, PA 19132",
  "1200 N 10th St, Philadelphia, PA 19122",
  "1400 W York St, Philadelphia, PA 19132",
  "1600 W Cumberland St, Philadelphia, PA 19133",
  "1100 N 9th St, Philadelphia, PA 19122",
  "1500 W Allegheny Ave, Philadelphia, PA 19132",
  "1350 N 14th St, Philadelphia, PA 19121",
  "1250 W Somerset St, Philadelphia, PA 19133",
  "1450 N 17th St, Philadelphia, PA 19121",
  "1150 W Clearfield St, Philadelphia, PA 19133",
  "1550 N 18th St, Philadelphia, PA 19121",
  "1050 W Indiana Ave, Philadelphia, PA 19133",
  "1650 W Master St, Philadelphia, PA 19121",
  "1300 N 19th St, Philadelphia, PA 19121",
  "1200 W Cambria St, Philadelphia, PA 19133",
  "1400 W Venango St, Philadelphia, PA 19140",
  "1600 N 20th St, Philadelphia, PA 19121",
  "1100 W Tioga St, Philadelphia, PA 19140",
  "1500 W Huntingdon St, Philadelphia, PA 19140",
  "1350 N 21st St, Philadelphia, PA 19121",
  "1250 W Diamond St, Philadelphia, PA 19121",
  "1450 W Poplar St, Philadelphia, PA 19123",
  "1150 N 22nd St, Philadelphia, PA 19121",
  "1550 W Thompson St, Philadelphia, PA 19121",
  "1050 N 23rd St, Philadelphia, PA 19121",
  "1650 W Cecil B Moore Ave, Philadelphia, PA 19121",
  "1300 N 24th St, Philadelphia, PA 19132",
  "1200 W Montgomery Ave, Philadelphia, PA 19122",
  "1400 N 25th St, Philadelphia, PA 19132",
  "1600 W Norris St, Philadelphia, PA 19122",
  "1100 N 26th St, Philadelphia, PA 19132",
  "1500 W Diamond St, Philadelphia, PA 19121",
  "1350 N 27th St, Philadelphia, PA 19132",
  "1250 W Oxford St, Philadelphia, PA 19121",
  "1450 N 28th St, Philadelphia, PA 19132",
  "1150 W Susquehanna Ave, Philadelphia, PA 19121",
  "1550 N 29th St, Philadelphia, PA 19129",
  "1050 W Dauphin St, Philadelphia, PA 19133",
  "1650 N 30th St, Philadelphia, PA 19129"
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
    const address = phillyAddresses[Math.floor(Math.random() * phillyAddresses.length)];
    
    arr.push({
      id: `philly-${i.toString().padStart(3,"0")}`,
      name: `Philadelphia Halal Cart #${i+1}`,
      coords: c,
      city: "Philadelphia",
      address: address,
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

// Generate all trucks in Philadelphia near Temple University
const templeCenter = { lat: 39.9818, lng: -75.1554 }; // Temple University coordinates
const phillyTrucks = make(50, "Philadelphia", templeCenter);

fs.writeFileSync("mobile/assets/mock/carts.json", JSON.stringify(phillyTrucks, null, 2));
console.log("Generated mobile/assets/mock/carts.json with Philadelphia trucks near Temple University");