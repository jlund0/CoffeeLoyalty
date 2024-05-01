import * as geofire from "geofire-common";

function latlngconverter(latlng) {
  let lat = latlng[0].split("° ");
  let lng = latlng[1].split("° ");
  let newlatlng = [];
  if (lat[1] == "S") {
    let convertedLat = -1 * lat[0];
    newlatlng.push(convertedLat);
  } else {
    let convertedLat = 1 * lat[0];
    newlatlng.push(convertedLat);
  }
  if (lng[1] == "W") {
    let convertedLng = -1 * lng[0];
    newlatlng.push(convertedLng);
  } else {
    let convertedLng = 1 * lng[0];
    newlatlng.push(convertedLng);
  }
  return newlatlng;
}

export const sortListbyDistance = (cardlist, currentlocation) => {
  console.log("useful function");
  console.log(currentlocation);
  let center = [currentlocation.latitude, currentlocation.longitude];

  let sortedlist = [];
  cardlist.forEach((card) => {
    console.log(card);
    let coords = latlngconverter(card.coords);

    card.distanceAway = geofire.distanceBetween(coords, center);
    sortedlist.push(card);
  });
  return sortedlist.sort((p1, p2) => {
    p1.distanceAway > p2.distanceAway
      ? 1
      : p1.distanceAway < p2.distanceAway
      ? -1
      : 0;
  });
};
