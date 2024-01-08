import { updateUserCard, createNewCard } from "../firebaseFunctions";
export default async function AddStamps(
  id,
  stampsToAdd,
  coffeesEarnt,
  stampsRequired
) {
  console.log("addstamp running");
  let totalStamps = stampsToAdd + coffeesEarnt;
  let AddtoNewCard = totalStamps % stampsRequired;
  let completedCards = Math.floor(totalStamps / stampsRequired);
  console.log(id);
  if (completedCards == 0) {
    console.log(`no cards complete: adding ${stampsToAdd} to users card`);
    await updateUserCard(id.cardid, stampsToAdd);
  } else if (completedCards >= 1) {
    console.log(
      ` completeing users card and adding ${AddtoNewCard} to new card `
    );
    await updateUserCard(id.cardid, stampsRequired - coffeesEarnt, true);
    await createNewCard(id.userid, id.storeid, AddtoNewCard);
    if (completedCards > 1) {
      console.log(`adding ${completedCards - 1} completed cards`);
      for (let i = 0; i < completedCards - 1; i++) {
        await createNewCard(id.userid, id.storeid, stampsRequired);
      }
    }
  }

  console.log("stamps added");
}
