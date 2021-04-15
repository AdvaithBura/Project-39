class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                player.player1Score();
                player.player2Score();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 var rx = 0;
                 
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);
                         /*
                         
                         */
                         

                         
                     }
                    
                     
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    if(player.distance <= -500){
                        player.distance = -500
                    }
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    if(player.distance >=500){
                        player.distance = 500;
                    }
                    player.update();
                }
                 if (frameCount % 20 === 0 && gameState !== 2) {
                    var rand1 = random(100,1000)
                     fruits = createSprite(rand1, 0, 100, 100);
                     fruits.velocityY = 8;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
 
                     fruitGroup.add(fruits);
                 }
            
                    if(fruitGroup.isTouching(player1) && player.index === 1){
                            fruitGroup.destroyEach();
                            play1Score += 1
                            player.score = play1Score;
                            player.update()
                   
                    }

                    if(fruitGroup.isTouching(player2) && player.index === 2){
                            fruitGroup.destroyEach();
                            play2Score += 1
                            player.score = play2Score;
                            player.update();
                    }
                
                    fill("white");
                    text("player 1 Score: " + play1Score,50,50);
                          text("Player 2 Score: " + play2Score,700,50);
         
         if(play1Score >= 4){
             game.update(2);
         }

         if(play2Score >= 4){
             game.update(3);
         }
        
         console.log(player.index); 

    }

    end(){
       console.log("Game Ended");
    }
}