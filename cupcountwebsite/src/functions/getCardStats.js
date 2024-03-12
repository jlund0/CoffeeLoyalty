function getCardStats(cards, time) {
  const stats = {
    coffeesTracked: 0,
    coffeesRedeemed: 0,
    newUsers: 0,
    activeMembers: 0,
    activeCards: 0,
  };
  console.log(cards);
  cards.forEach((card) => {
    stats.coffeesTracked += card.coffeesEarnt;
    card.redeemed && stats.coffeesRedeemed++;
    card.active && stats.activeCards++;
    stats.newUsers += card.newUsers;
    stats.activeMembers += card.activeMembers;
  });
  let unique_users = [...new Set(cards.map((card) => card.userId))];
  stats.activeMembers = unique_users.length;

  return stats;
}

export default getCardStats;
