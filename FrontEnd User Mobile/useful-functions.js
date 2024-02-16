import * as geofire from "geofire-common"

export const sortListbyDistance = (center,cardlist) =>{
    center = [center.latitude, center.longitude]
    let sortedlist = []
    for(card of cardlist){
        const distanceInKm = geofire.distanceBetween([card.coords.latitude, card.coords.longitude], center);
       card.distanceAway = distanceInKm
        sortedlist.push(card)

}
    
    return sortedlist.sort((p1,p2)=>{(p1.distanceAway > p2.distanceAway) ? 1 : (p1.distanceAway < p2.distanceAway) ? -1 : 0})
}