function setup(){
  canvas = createCanvas(400,400);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;


}


function preload(){
  classifier = ml5.imageClassifier("DoodleNet");
  }


function draw(){
strokeWeight(13);
stroke("#A9A9A9");

if (mouseIsPressed){
line(pmouseX , pmouseY , mouseX , mouseY);
}
}


function erase(){
    background("white");
}


function classifyCanvas(){
  classifier.classify(canvas,gotResult);
}


function gotResult(error, results){
  if (error){
    console.error(error);
  }
  else{
  console.log(results)
  document.getElementById("sketchIdentify").innerHTML = 'Label -- ' + results[0].label;
  document.getElementById("confidence").innerHTML = 'Confidence -- ' +  Math.round(results[0].confidence * 100) + "%";
  document.getElementById("top5").innerHTML = 'Top 5 -- ' + results[0].label + " , " + results[1].label + " , " + results[2].label + " , " + results[3].label + " , " + results[4].label;
  utterThis = new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterThis);
}

}

