img = "";
status= "";
objects=[];

function preload(){
    img = loadImage('Phone3.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function draw(){
    image(img, 0, 0, 480, 420);

    if(status != ""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status- Objects Detected";

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
            noFill();
            stroke("#000000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}