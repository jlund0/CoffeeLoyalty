import { Image, Text, View } from "react-native";
import { RedeemButton } from "../components/buttons";
import { Icon } from '@rneui/themed';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim'

export function StampPage({ route, navigation }){
    const { card ,user } = route.params;
    navigation.setOptions({ title: card.name })
    console.log("stamp page")
    console.log(card)
    let [fontsLoaded] = useFonts({
        Itim_400Regular,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    
    return(
    <View style={{ justifyContent:"space-evenly", alignItems:"center", flex:1 , gap:20,paddingTop:20, backgroundColor:"#D1B38C" }}>
        <Image src={card.logo} style={{flex:1, width:"80%" ,aspectRatio:1}}/>
        {/* <Text>{card.name}</Text> */}
        <View style={{flex:3,padding:40, backgroundColor:"#EFF7F7" ,width:"100%" ,borderTopLeftRadius: 30 ,borderTopRightRadius: 30 , alignItems:"center"}}>
            <View style={{flex:5, justifyContent: "flex-start", gap:40 , alignItems:"center"}}>
            <Text style={{fontFamily:"Itim_400Regular", fontSize:36}}>Your stamps</Text>
            <View id="card details" style={{flexDirection:"row" ,width:"100%", padding:20,gap:10,backgroundColor:"#FFFFFF", flexWrap: "wrap" , justifyContent:"space-around" ,borderRadius:20}}>
            {[...Array(card.coffees_required).keys()].map((i)=>{
                return(
                    <View style={{width:50,height:50, borderWidth:5, borderColor:"#664329",  borderRadius:50, backgroundColor:"white"  ,justifyContent:"center" , alignItems:"center", padding:4}}>
                        {i + 1 <= card.points && <View style={{width:"100%", height:"100%", backgroundColor:"#2E1403" ,borderRadius:"100%"}}>
                            </View>}
                            <Text>{i+1}</Text>
                    </View>
                )
            })}
            <View style={{width:50,height:50, borderRadius:50, backgroundColor:"white",borderWidth:5, borderColor:"#664329", justifyContent:"center" , alignItems:"center"}}>
                <Icon
        name='coffeescript'
        type='fontisto'
        color='black'
      /></View>
            </View>
            <RedeemButton
            disabled={card.coffees_required == card.points ? false : true}
            card={card}
            uid={user.uid}
            // fetchCards={fetchCards}
          /></View>
          <View style={{flex:1,  alignItems:"center", justifyContent:"space-between" , padding:10 ,borderRadius: 40}}>
            <Icon name="chevron-up" type="entypo"></Icon>
        <Text style={{fontFamily:"Itim_400Regular", fontSize:22,}}>Details</Text>
        {/* <Text>Buy {card.coffees_required} and get one free</Text>
        <Text>Terms:</Text> */}
    </View>
        </View>
        
    
    </View>)
}