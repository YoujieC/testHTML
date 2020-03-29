var canLeft, ctxLeft,
    stepLeft = 1550,
    stepsLeft = 0,
    resetStepLeft = 1550,
    offsetLeft = 3100,
    delay = 2;

var canRight, ctxRight,
    stepRight = 1550,
    stepsRight = 0,
    resetStepRight = 1550,
    offsetRight = 3100;

var canFront, ctxFront,
    stepFront = 1200,
    stepsFront = 0,
    resetStepFront = 1200,
    offsetFront = 2100;

var canRear, ctxRear,
    stepRear = 1200,
    stepsRear = 0,
    resetStepRear = 1200,
    offsetRear = 2100;


var ws = new WebSocket("ws://127.0.0.1:5678/");
var message = "Default";
var newMsg = false;


function init() {
    canLeft = document.getElementById("LeftCanvas");
    ctxLeft = canLeft.getContext("2d");
    ctxLeft.fillStyle = "white";
    ctxLeft.font = "200pt Georgia";
    ctxLeft.textAlign = "left";
    ctxLeft.textBaseline = "middle";

    canRight = document.getElementById("RightCanvas");
    ctxRight = canRight.getContext("2d");
    ctxRight.fillStyle = "white";
    ctxRight.font = "200pt Georgia";
    ctxRight.textAlign = "left";
    ctxRight.textBaseline = "middle";

    canFront = document.getElementById("FrontCanvas");
    ctxFront = canFront.getContext("2d");
    ctxFront.fillStyle = "white";
    ctxFront.font = "120pt Georgia";
    ctxFront.textAlign = "left";
    ctxFront.textBaseline = "middle";

    canRear = document.getElementById("RearCanvas");
    ctxRear = canRear.getContext("2d");
    ctxRear.fillStyle = "white";
    ctxRear.font = "120pt Georgia";
    ctxRear.textAlign = "left";
    ctxRear.textBaseline = "middle";

    ws.onmessage = function (event) {
        message = event.data;
        //alert("New message from Python");
        newMsg = true;

    };

    RunTextRightToLeft(canLeft, ctxLeft, stepLeft, stepsLeft, resetStepLeft, offsetLeft, message);
}

function RunTextRightToLeft(can, ctx, step, steps, resetStep, offset, displayText) {
    if (newMsg){
        alert("start new display");
        displayText = message;
        step = resetStep;
        newMsg = false;
    }
    step--;
    ctx.clearRect(0, 0, can.width, can.height);
    ctx.save();
    ctx.translate(step, can.height / 2);
    ctx.fillText(displayText, 0, 0);
    ctx.restore();
    if (step == steps-offset)
        step = resetStep;
    if (step > steps-offset)
        setTimeout(RunTextRightToLeft, delay, can, ctx, step, steps, resetStep, offset, displayText);
}
