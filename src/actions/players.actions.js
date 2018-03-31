export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';

const requestPlayers = () => ({
  type: REQUEST_PLAYERS
});
const receivePlayers =  (players) => ({
  type: RECEIVE_PLAYERS,
  players,
});

export const fetchPlayers = (format) => {
  return async (dispatch) => {
    dispatch(requestPlayers());
    const playerResponse = await fetch('http://localhost:4000/api/player?active=true');
    const players = await playerResponse.json();
    const adpResponse = await fetch(`http://localhost:4000/api/rank/adp/latest?format=${format}`);
    const adp = await adpResponse.json();
    let latest = null;
    adp.forEach((x) => {
      if (!latest || new Date(x.ranks[0].date) > latest) latest = new Date(x.ranks[0].date);
    });
    const beginningTime = new Date(latest);
    beginningTime.setDate(beginningTime.getDate() - 3);
    const playersWithAdp = players.map((player) => {
      const newPlayer = player;
      const adpMatch = adp.find(x => x._id === newPlayer._id);
      newPlayer.ranks = adpMatch ? adpMatch.ranks : [];
      if (newPlayer.ranks[0] && new Date(newPlayer.ranks[0].date) > beginningTime) {
        newPlayer.adp = adpMatch ? adpMatch.ranks[0].rank : 500;
        newPlayer.value = adpMatch ? adpMatch.ranks[0].value : 0;
      } else {
        newPlayer.adp = 500;
        newPlayer.value = 0;
      }
      return newPlayer;
    });
    dispatch(receivePlayers(playersWithAdp.sort((a, b) => a.adp - b.adp)));
  }
}

