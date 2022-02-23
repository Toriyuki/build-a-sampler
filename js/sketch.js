const sounds = new Tone.Players({
  bethere: "media/bethere.wav",
  dugg: "media/dugg_type_loop_keep_it_100.wav",
  findme: "media/findme.wav",
  gatedway: "media/gatedway.wav",
  heights: "media/heights.wav",
  rewind: "media/rewind.wav",
})

const pitch = new Tone.PitchShift(0)

let nameOfSamples = ['bethere', 'dugg', 'findme', 'gatedway', 'heights', 'rewind'];
let playerArray = [];
let slider;
let stopButton;

function setup() {
  createCanvas(400, 400);
  sounds.connect(pitch);
  pitch.toDestination();

  nameOfSamples.forEach((name, index) => {
    playerArray[index] = createButton(name);
    playerArray[index].size(100, 25);
    playerArray[index].position(25, 50 + 30 * index);
    playerArray[index].mousePressed( () => playSound(name) );
  })

  slider = createSlider(-12, 12, 0, 1);
  slider.mouseReleased( () => {
    pitch.pitch = slider.value();
  })

  stopButton = createButton("Stop");
  stopButton.size(100, 25);
  stopButton.position(200, 50);
  stopButton.mousePressed( () => stopSound());
}

function draw() {
  background(220);
  textSize(25);
  text("Samples but they're actually loops", 10, 25);
  text("Pitch Changer", 5, 390);
}

function playSound(sound) {
  sounds.player(sound).start();
}

function stopSound() {
  nameOfSamples.forEach((name) => {
    sounds.player(name).stop();
  })
}