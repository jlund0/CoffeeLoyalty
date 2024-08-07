import { Image, Pressable, Text, View } from "react-native";
import { RedeemButton } from "../components/buttons";
import { Icon } from '@rneui/themed';
import { useFonts, Itim_400Regular } from '@expo-google-fonts/itim'
import { RobotoSlab_400Regular } from '@expo-google-fonts/roboto-slab'
import { useState } from "react";
export function StampPage({ route, navigation }) {
    const { card, user } = route.params;
    // navigation.setOptions({ title: card.name })
    console.log("stamp page")
    console.log(card)
    const [showdetails, setShowDetails] = useState(false)
    let [fontsLoaded] = useFonts({
        Itim_400Regular, RobotoSlab_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ justifyContent: "space-evenly", alignItems: "center", flex: 1, gap: 20, paddingTop: 40, backgroundColor: "#C9998B" }}>
            <View style={{ flex: 1, width: "80%" }}>
                <Image src={card.logo} style={{ width: "100%", aspectRatio: 1 }} />
            </View>
            <View style={{ flex: 2, padding: 20, backgroundColor: "#FFF", width: "100%", borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: "center" }}>
                <View style={{ flex: 5, justifyContent: "space-between", gap: 40, alignItems: "center" }}>
                    <View style={{ gap: 20 }}>
                        <Text style={{ fontFamily: "RobotoSlab_400Regular", fontSize: 36, textAlign: "center" }}>BUY {card.coffees_required} AND GET 1 FREE</Text>

                        <Card card={card} />
                        <RedeemButton
                            disabled={card.coffees_required == card.points ? false : true}
                            card={card}
                            uid={user.uid}
                        // fetchCards={fetchCards}
                        />
                    </View>

                    <Pressable style={{ alignItems: "center", padding: 20, borderRadius: 40, }} onPress={() => setShowDetails(!showdetails)}>
                        <Icon name={showdetails ? "chevron-down" : "chevron-up"} type="entypo"></Icon>
                        {!showdetails && <Text style={{ fontFamily: "RobotoSlab_400Regular", fontSize: 30, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10, }}>Details</Text>}
                        {showdetails && <><Text style={{ fontSize: 30, paddingTop: 20 }}>{card.name}</Text><Text numberOfLines={1} adjustsFontSizeToFit={true} style={{ fontSize: 26 }}>{card.location}</Text><Text style={{ fontSize: 18 }}>{card.terms}</Text></>}
                    </Pressable >
                </View>

            </View>


        </View >)
}


function Card({ card }) {
    const list = [...Array(card.coffees_required).keys()];
    const half_length = Math.ceil(list.length / 2);
    const list1 = list.slice(0, half_length);
    const list2 = list.slice(half_length);
    console.log(list1)
    const Row = ({ list, children }) => (
        <View id="card details" style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly" }}>
            {list.map((i) => {
                return (
                    <View key={i} style={{ height: 70, width: 70, borderWidth: 5, borderColor: "#664329", borderRadius: 50, backgroundColor: "white", justifyContent: "center", alignItems: "center", padding: 4 }}>
                        {i + 1 <= card.points && <View style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#2E1403", borderRadius: "100%" }}>
                        </View>}
                        {/* <Text style={{ fontWeight: "bold" }}>{i + 1}</Text> */}
                    </View>
                )
            })}
            {children}
        </View>
    );
    return (
        <View id="card details" style={{ backgroundColor: "#F4E9E3", borderRadius: 20, padding: 20, gap: 10, }}>
            <Row list={list1} />
            <Row list={list2} >
                <View style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: "white", borderWidth: 5, borderColor: "#664329", justifyContent: "center", alignItems: "center" }}>
                    <Icon
                        name='coffeescript'
                        type='fontisto'
                        color='black'
                    /></View>
            </Row>

        </View>
    );
}