function loadImages(){
    enemyImg = new Image;
    playerImage = new Image;
    
    enemyImg.src = "assets/enemy.png";
    playerImage.src = "assets/player.png"
}

function init(){
    canvas = document.getElementById("gameCanvas");
    pen = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    SCORE = 0;
    keys = [];
    player = {
        x : W/2-20,
        y : H-60,
        w : 40,
        h : 40,
        speedX : 0,
        bullets: [],
        state : "still",
        shoot : function(){
            if(this.bullets.length < 1){
                var b = new bullet(this.x + 15, this.y);
                this.bullets.push(b);   
            }else if(this.bullets[this.bullets.length-1].y < H-150){
                var b = new bullet(this.x + 15, this.y);
                this.bullets.push(b);   
            }
        },
        playerUpdate: function(){
            if(keys[37]){
                if(this.x > 0){
                    this.speedX = -10;
                    this.state = "moving";    
                }else{
                    this.speedX = 0;
                    this.state = "still";
                }
            }
            
            if(keys[39]){
                if(this.x < W-40){
                    this.speedX = 10;
                    this.state = "moving";  
                }else{
                    this.speedX = 0;
                    this.state = "still";
                }
            }
            if(keys[32]){
                this.shoot();
                console.log(this.bullets.length);
            }
            if(this.state = "moving"){
               this.x += this.speedX;
            }
        }
    };
    
    document.body.addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
        console.log(keys[e.keyCode]);
        console.log(e.keyCode);
    });
    document.body.addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
        player.speedX = 0;
        player.state = "still";
    });
    
    enemies = [];
    e = new enemy(100,200);
    
    function createEnemy(){
        var x = Math.round(Math.random()*(W-50));
        var y = Math.round(Math.random()*20);
        var speed = Math.round(Math.random()*3)+2;
        
        var myEnemy = new enemy(x, y, speed);
        enemies.push(myEnemy);
    }
    
    setInterval(createEnemy, 1000);
    
}

function bullet(x, y){
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 15;
    this.speed = 10;
    this.color = "green";
    
    this.draw = function(){
        pen.fillStyle = this.color;
        pen.fillRect(this.x, this.y, this.w, this.h)
    }
    this.update = function(){
        this.y -= this.speed;
    }
    
    
}

function enemy(x, y){
    this.x = x;
    this.y = y;
    this.speedY = 5;
    this.speedX = 5;
    if(Math.round(Math.random()*100) % 2 == 0){
        this.speedX = -5;
    }
    this.draw = function(){
        pen.drawImage(enemyImg, this.x, this.y, 50, 50);
    }
    this.update = function(){
        this.y += this.speedY;
        this.x += this.speedX;
        if(this.x >= W-50 || this.x <= 0){
            this.speedX *= -1;
        }
    }
}

function draw(){
    pen.clearRect(0, 0, W, H);
    pen.drawImage(playerImage, player.x, player.y, player.w, player.h);
    
    for(var i = 0; i < player.bullets.length; i++){
        if(player.bullets[i].y > 0){
            player.bullets[i].draw();
        }
    }
    for(var i = 0; i < enemies.length; i++){
        enemies[i].draw();
    }
}

function update(){
    player.playerUpdate();
    for(var i = 0; i < player.bullets.length; i++){
        if(player.bullets[i].y > 0){
            player.bullets[i].update();
        }
    }
    for(var i = 0; i < enemies.length; i++){
        enemies[i].update();
    }
}

function gameLoop(){
    draw();
    update();
    window.requestAnimationFrame(gameLoop);
}

loadImages();
function playAgain(){
    init();
    gameLoop();
}
playAgain();