class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score =0;
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score: this.score
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    player1Score(){
        var scoreRef = database.ref('players/player1/score')
        scoreRef.on("value", (data) => {
            play1Score = data.val();
        })
    }
    
    player2Score(){
        var scoreRef1 = database.ref('players/player2/score')
        scoreRef1.on("value", (data) => {
            play2Score = data.val();
        })
    }
}
