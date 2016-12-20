/**
 * Created by Mincey on 12/1/16.
 */


var question = [];
var answer = [];

var Q_A_count = 15;

// var div = document.getElementById('count');
// div.innerHTML = "Limit: " + Q_A_count;


function inputs() {


        var Q1 = document.getElementById('quest').value;
        var A1 = document.getElementById('ans').value;
        Q_A_count = 14 - question.length;
        var div = document.getElementById('count');
        div.innerHTML = "Limit: " + Q_A_count;
    if (Q_A_count <= 0) {
        var div = document.getElementById('count');
        div.innerHTML = "Limit: MAX";
        var hide_me = document.getElementById('hide');
        hide_me.className += " hidden";
    }else{
        question.push(Q1);
        answer.push(A1);

        question.toString();
        answer.toString();
        document.getElementById('quest').value = "";
        document.getElementById('ans').value = "";

        // alert(question + answer)

    }
}




function showFlashCards(){
    var allQuestions = question.join(" " + "<br>");
    var allAnswers = answer.join(" " + "<br>");

    document.getElementById("Q").innerHTML = allQuestions;
    document.getElementById("A").innerHTML = allAnswers;



}
// console.log(question + ", " + answer);




function start() {




var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5;
    var brickColumnCount = 4;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var score = 0;
    var lives = 3;

    var bricks = [];
    for (c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1
            };
        }
    }

    document.addEventListener("mousemove", mouseMoveHandler, false);

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }



    function collisionDetection() {
        var random1 = Math.floor((Math.random() * question.length));
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];

                if (b.status == 1) {

                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (question[0] != null) {
                            var answer_input = prompt(question[random1]);
                            if (answer_input != null) {
                                if (answer_input === answer[random1]) {
                                    var correct = document.getElementById('score');
                                    correct.innerHTML = "Correct!";
                                    document.getElementById("score").className = "green";
                                } else {
                                    var wrong = document.getElementById('score');
                                    wrong.innerHTML = "Incorrect!";
                                    document.getElementById("score").className = "red";
                                }
                            }
                        }

                        if (score == brickRowCount * brickColumnCount) {
                            alert("You WON!!!!")
                            window.location.reload();

                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0A61B2";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#FF1002";
        ctx.fill();
        ctx.closePath();
    }

    function drawBrick() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.font
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#EDD605";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#FF1002";
        ctx.fillText("Score: " + score, 8, 20);
    }

    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#FF1002";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBrick();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                lives--;
                if (!lives) {
                    alert('You Lost :(')
                    window.location.reload();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }

    draw();
}