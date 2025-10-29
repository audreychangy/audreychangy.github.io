let hands = [];
let leftThumb;
let leftIndex;
let rightThumb;
let rightIndex;
let cameraClicked = false;
let shutter;

//background
let background_image

// scene button
let currentSceneIndex = 0;
let scenes = [];
let button;

let tempImages = [];
let viewfinder = { x: 0, y: 0, w: 320, h: 240 };
let handPose;

let video;

let intro;

// ocean
let ocean;
let whale;
let seal;
let shark;
let whipray;
let turtle;

//  grasslands
let grasslands;
let elephant;
let ferret;
let grouse;
let wolf;

//forest
let forest;
let trees;
let leaves;
let jaguar;
let macaw;
let monkey;
let sloth;
let otter;

// animal movement speed
var wh;
var s;
var sh;
var whip;
var tu;

// grasslands movement speed
var el;
var fer;
var gr;
var ho;
var wo;


var xspeed;
var yspeed;


function preload() {
    //background_image
    background_image = loadImage("images/background_image.png")

    intro = loadImage("images/intro.png")

    // ocean
    ocean = loadImage("images/ocean_background.jpg")
    corals = loadImage("images/corals.png")
    corals2 = loadImage('images/corals 2.png')
    whale = loadImage("images/whale.png")
    seal = loadImage("images/seal.png")
    shark = loadImage("images/shark.png")
    whipray = loadImage("images/whipray.png")
    turtle = loadImage("images/turtle.png")

    // grasslands
    grasslands = loadImage("images/grasslands.jpeg")
    elephant = loadImage("images/elephant.png")
    ferret = loadImage("images/ferret.png")
    grouse = loadImage("images/grouse.png")
    grass = loadImage("images/grass.png")
    horse = loadImage("images/horse.png")
    grass2 = loadImage("images/grass2.png")
    wolf = loadImage("images/wolf.png")
    bushy = loadImage("images/bushytrees.png")

    //forest
    forest = loadImage("images/rainforest.webp")
    trees = loadImage("images/trees.png")
    leaves = loadImage("images/leaves.png")
    jaguar = loadImage("images/jaguar.png")
    monkey = loadImage("images/monkey.png")
    macaw = loadImage("images/macaw.png")
    sloth = loadImage("images/sloth.png")
    otter = loadImage("images/otter.png")



    // camera
    handPose = ml5.handPose({ flipped: true })
    shutter = loadSound('images/camera.mp3')

    aspeed = 1.3;
    xspeed = 1;
    yspeed = 0.7;
    bspeed = 0.3;
}

function setup() {
    let canvas = createCanvas(1000, 790);
    canvas.parent('divP5');
    // rectMode(CENTER);
    // textAlign(CENTER, CENTER);

    let capture = createCapture(VIDEO);
    capture.size(1000, 700);
    capture.hide();

    // scene button
    scenes = [oceanMove, grasslandsMove, forestMove];

    //button
    // button = createButton("next scene");
    // button.mousePressed(nextScene);
    // button.position(windowWidth / 2, 915);



    // container.child(button);

    handPose.detectStart(capture, gotHands);

    wh = 450;
    s = 150;
    sh = 1000;
    whip = 150;
    tu = 600;

    el = 450;
    fer = 100;
    gr = 1000;
    ho = 1000;
    wo = 700;

    mo = 400;
    sl = 150;
    ja = 1000;
    ot = 150;
    ma = 600;



}

function draw() {
    background(229, 223, 209);
    imageMode(CENTER);
    showHands();

    // call current scene
    scenes[currentSceneIndex]();

    // show the viewfinder
    showViewfinder();

    // click the camera
    clickCamera();

    imageMode(CORNER);
    for (let i = 0; i < tempImages.length; i++) {
        image(tempImages[i], 1000, i * 50, 100, 70);
    }

    // temp images placement
    displayImages();

}


let introI = function () {
    image(intro, 500, 350, 1000, 700);
}
// ocean
function whaleMove() {
    image(whale, wh, 250, 300, 200);
    wh = wh + xspeed;
    if (wh > 500) {
        xspeed = xspeed;
    }
    if (wh < -100) {
        xspeed = xspeed * -1;
    }
}
function sealMove() {
    image(seal, 700, s, 100, 150);
    s = s + yspeed;
    if (s > 150) {
        yspeed = -yspeed;
    }
    if (s < 400) {
        yspeed = yspeed * -1;
    }
}
function sharkMove() {
    image(shark, sh, 450, 350, 175);
    sh = sh + xspeed;
    if (sh > 1000) {
        xspeed = -xspeed;
    }
    if (sh < 700) {
        xspeed = xspeed * -1;
    }
}
function whiprayMove() {
    image(whipray, whip, 580, 150, 150);
    whip = whip + yspeed;
    if (whip > 500) {
        yspeed = yspeed;
    }
    if (whip < -300) {
        yspeed = yspeed * -1;
    }
}
function turtleMove() {
    image(turtle, tu, 80, 100, 70);
    tu = tu + aspeed;
    if (tu < 550) {
        aspeed = -aspeed;
    }
    if (tu > 900) {
        aspeed = aspeed * -1;
    }
}
let oceanMove = function () {
    image(ocean, 500, 350, 1000, 700);
    whaleMove();
    sealMove();
    turtleMove();
    image(corals2, 500, 350, 1000, 700);
    sharkMove();
    image(corals, 500, 350, 1000, 700);
    whiprayMove();
}

// grasslands
function elephantMove() {
    image(elephant, el, 350, 150, 150);
    el = el + xspeed;
    if (el > 500) {
        xspeed = xspeed;
    }
    if (el < -100) {
        xspeed = xspeed * -1;
    }
}
function ferretMove() {
    image(ferret, fer, 550, 120, 80);
    fer = fer + yspeed;
    if (fer > 100) {
        yspeed = -yspeed;
    }
    if (fer < 700) {
        yspeed = yspeed * -1;
    }
}
function grouseMove() {
    image(grouse, gr, 600, 120, 120);
    gr = gr + aspeed;
    if (gr > 1000) {
        aspeed = -aspeed;
    }
    if (gr < 700) {
        aspeed = aspeed * -1;
    }
}
function horseMove() {
    image(horse, ho, 400, 180, 130);
    ho = ho + xspeed;
    if (ho > 1000) {
        xspeed = -xspeed;
    }
    if (ho < 700) {
        xspeed = xspeed * -1;
    }
}
function wolfMove() {
    image(wolf, wo, 380, 70, 50);
    wo = wo + aspeed;
    if (wo > 900) {
        aspeed = -aspeed;
    }
    if (wo < 500) {
        aspeed = aspeed * -1;
    }
}
let grasslandsMove = function () {
    image(grasslands, 500, 350, 1000, 700);
    wolfMove();
    image(bushy, 500, 350, 1000, 700);
    elephantMove();
    ferretMove();
    image(grass, 500, 350, 1000, 700);
    horseMove();
    image(grass2, 500, 350, 1000, 700);
    grouseMove();
}

//forest
function monkeyMove() {
    image(monkey, mo, 220, 300, 200);
    mo = mo + xspeed;
    if (mo > 500) {
        xspeed = xspeed;
    }
    if (mo < -100) {
        xspeed = xspeed * -1;
    }
}
function slothMove() {
    image(sloth, 580, sl, 100, 120);
    sl = sl + bspeed;
    if (sl > 150) {
        bspeed = -bspeed;
    }
    if (sl < 300) {
        bspeed = bspeed * -1;
    }
}
function jaguarMove() {
    image(jaguar, ja, 550, 400, 200);
    ja = ja + xspeed;
    if (ja > 1000) {
        xspeed = -xspeed;
    }
    if (ja < 700) {
        xspeed = xspeed * -1;
    }
}
function otterMove() {
    image(otter, ot, 580, 180, 100);
    ot = ot + yspeed;
    if (ot > 400) {
        yspeed = -yspeed;
    }
    if (ot < -10) {
        yspeed = yspeed * -1;
    }
}
function macawMove() {
    image(macaw, ma, 80, 150, 150);
    ma = ma + aspeed;
    if (ma < 550) {
        aspeed = -aspeed;
    }
    if (ma > 1000) {
        aspeed = aspeed * -1;
    }
}
let forestMove = function () {
    image(forest, 500, 350, 1000, 700);
    macawMove();
    monkeyMove();
    image(trees, 500, 350, 1000, 700);
    otterMove();
    image(leaves, 500, 350, 1000, 700);
    jaguarMove();
    slothMove();


}

function gotHands(results) {
    hands = results;
}
function showHands() {
    // Draw all the tracked hand points
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
            let point = hand.keypoints[4];
            noStroke();
            fill(255, 100)
            ellipse(point.x, point.y, 10, 10);

        }
        for (let j = 0; j < hand.keypoints.length; j++) {
            let point = hand.keypoints[8];
            noStroke();
            fill(255, 100)
            ellipse(point.x, point.y, 10, 10);

        }
        // left hand
        if (hand.handedness == "Left") {
            leftThumb = hand.keypoints[4];
            leftIndex = hand.keypoints[8];
            stroke(255, 0, 0);
            // line(leftThumb.x, leftThumb.y, leftIndex.x, leftIndex.y);

        } else {
            // right hand
            rightThumb = hand.keypoints[4];
            rightIndex = hand.keypoints[8];
            // show the tips
            stroke(0, 255, 0);
            // line(rightThumb.x, rightThumb.y, rightIndex.x, rightIndex.y);
        }

    }
}

//camera 
function showViewfinder() {
    if (hands.length > 1 && leftIndex != undefined && rightIndex != undefined) {
        // position the viewfinder
        viewfinder.x = leftIndex.x;
        viewfinder.y = leftIndex.y;
        // calculate the distance between thumb and index
        let distanceBetweenFingers = dist(rightIndex.x, rightIndex.y, leftIndex.x, leftIndex.y);
        // set viewfinder size
        viewfinder.h = distanceBetweenFingers * 0.7;
        viewfinder.w = distanceBetweenFingers;
        // calculate the angle between fingers
        let angleBetweenFingers = atan2(rightIndex.y - leftIndex.y, rightIndex.x - leftIndex.x);
        // set the viewfinder rotation
        viewfinder.rotation = angleBetweenFingers;
        // show the viewfinder
        push();
        translate(viewfinder.x, viewfinder.y);
        rotate(viewfinder.rotation);
        noFill();
        stroke(255);
        rect(0, 0, viewfinder.w, viewfinder.h);
        pop();
    }
}
function clickCamera() {

    // if there are more than one hand
    if (hands.length > 1) {

        // calculate the distance between index and thumb
        let distanceIndexToThumb = dist(rightIndex.x, rightIndex.y, rightThumb.x, rightThumb.y);

        // if the distance is more than 50, then the camera is not clicked. This is to
        // avoid multiple clicks
        if (distanceIndexToThumb > 50) {
            cameraClicked = false;
        }

        // if the distance is less than 50, then the camera is clicked
        if (distanceIndexToThumb < 50 && cameraClicked == false) {
            cameraClicked = true;
            tempImages.push(captureShot());
        }

        // if the number of images is more than 10, then remove the first image
        if (tempImages.length > 10) {
            tempImages.shift();
        }
    }
}
function captureShot() {
    let vfWidth = viewfinder.w;
    let vfHeight = viewfinder.h;
    let shot = get(viewfinder.x, viewfinder.y, vfWidth, vfHeight);
    shutter.play();
    return shot;

}

//images at bottom
function displayImages() {
    let imgWidth = 100; // Adjust size of thumbnails
    let imgHeight = 70;
    let padding = 15;
    let startX = (width - (tempImages.length * (imgWidth + padding))) / 2; // Centering images
    let startY = height - imgHeight - 10; // Position at bottom

    for (let i = 0; i < tempImages.length; i++) {
        image(tempImages[i], startX + i * (imgWidth + padding), startY, imgWidth, imgHeight);
    }
}

//scene changer
function nextScene() {
    currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
    redraw();
    clear();

}


// Function to cycle through scenes
function cycleScenes() {
    // Check if going to the first scene (from the last scene)
    let isLastScene = currentSceneIndex === scenes.length - 1;


    // Cycle to the next scene
    currentSceneIndex = (currentSceneIndex + 1) % scenes.length;

    // If going to the first scene, change the background
    if (isLastScene) {
        document.body.style.backgroundImage = "url('images/background_image.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    } else {
        document.body.style.backgroundImage = "url('images/background1.png')";  // Clear the background
    }

    // Redraw and clear (for your existing functionality)
    redraw();
    clear();
}
let button1 = document.getElementById('myButton');
button1.addEventListener('click', cycleScenes);

button1.classList.add("myButton");
document.body.appendChild(button1);