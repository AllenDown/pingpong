
var KEY = {
    UP:38,
    DOWN:40,
    W:87,
    S:83                
}                                               
var pingpong = {
    scoreA : 0,
    scoreB : 0
};
pingpong.pressedKeys = [];
pingpong.ball = {
    speed : 5,
    x : 150,
    y : 100,
    directionX : 1,
    directionY : 1
}

$(function(){
    pingpong.timer = setInterval(gameloop,30);
    $(document).keydown(function(e){
        pingpong.pressedKeys[e.which] = true;
            });
        $(document).keyup(function(e){
            pingpong.pressedKeys[e.which] = false;
        });
    })

function gameloop(){
    movePaddles();
    moveBall();
}

function movePaddles(){
    var playgroundHeight = parseInt($("#playground").height());
    var paddleHeight = parseInt($(".paddle").height());
    if(pingpong.pressedKeys[KEY.UP]){
        var top = parseInt($("#paddleB").css("top"));
        if (top > 0) {
            $("#paddleB").css("top",top-5); 
        }
    }
    if(pingpong.pressedKeys[KEY.DOWN]){
        var top = parseInt($("#paddleB").css("top"));
        if (top < playgroundHeight - paddleHeight) {
           $("#paddleB").css("top",top+5); 
        }
    }
    if(pingpong.pressedKeys[KEY.W]){
        var top = parseInt($("#paddleA").css("top"));
        if (top > 0) {
           $("#paddleA").css("top",top-5); 
        }
    }
    if(pingpong.pressedKeys[KEY.S]){
        var top = parseInt($("#paddleA").css("top"));
        if (top < playgroundHeight - paddleHeight) {
            $("#paddleA").css("top",top+5);
        }
    }
}

function moveBall(){
    var playgroudHeight = parseInt($("#playground").height());
    var playgroudWidth = parseInt($("#playground").width());
    var ballHeight = parseInt($("#ball").height());
    var ballWidth = parseInt($("#ball").width());
    var ball = pingpong.ball;
    var paddleAX = parseInt($("#paddleA").css("left"))+parseInt($("#paddleA").width());
    var paddleBX = parseInt($("#paddleB").css("left"));
    var paddleABottom = parseInt($("#paddleA").css("top"))+parseInt($("#paddleA").height());
    var paddleATop = parseInt($("#paddleA").css("top"));
    var paddleBBottom = parseInt($("#paddleB").css("top"))+parseInt($("#paddleB").height());
    var paddleBTop = parseInt($("#paddleB").css("top"));

    //检查下边
    if((ball.y+ballHeight+ball.speed*ball.directionY) > playgroudHeight){
        ball.directionY = -1;
    }
    //检查上边
    if((ball.y+ball.speed*ball.directionY) < 0){
        ball.directionY = 1;
    }
    //检查右边
    if((ball.x+ballWidth+ball.speed*ball.directionX) > playgroudWidth){
        //玩家B丢分
        //重置球位置
        ball.x = 150;
        ball.y = 100;
        $("#ball").css(
        {
            "left":ball.x,
            "top":ball.y
        })
        ball.directionX = -1;
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);
    }
    //检查左边
    if((ball.x+ball.speed*ball.directionX) < 0){
        //玩家A丢分
        //重置球位置
        ball.x = 150;
        ball.y = 100;
        $("#ball").css(
        {
            "left":ball.x,
            "top":ball.y
        })
        ball.directionX = 1;
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);
    }
    //检查左边球拍
    if(ball.x+ball.speed*ball.directionX < paddleAX){
       if(ball.y + ball.speed*ball.directionY <= paddleABottom &&
        ball.y + ball.speed*ball.directionY >= paddleATop){
            ball.directionX = 1;
       }
    }
    //检查右边球拍
    if(ball.x+ball.speed*ball.directionX+ballWidth > paddleBX){
       if(ball.y + ball.speed*ball.directionY <= paddleBBottom &&
        ball.y + ball.speed*ball.directionY >= paddleBTop){
            ball.directionX = -1;
       }
    }

    ball.x += ball.speed*ball.directionX;
    ball.y += ball.speed*ball.directionY;

    $("#ball").css({
        "left" : ball.x,
        "top" : ball.y
    });
}
