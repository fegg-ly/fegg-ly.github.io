const BAUD_RATE = 9600; // This should match the baud rate in your Arduino sketch
let port, connectBtn;

function setup() {
  setupSerial(); 

  createCanvas(512, 512);

}

function draw() {
  const portIsOpen = checkPort(); 
  if (!portIsOpen) return;

  let str = port.readUntil("\n"); 
  if (str.length == 0) return; 

  let sensors = str.trim().split(","); 

  const  x = round(map(Number(sensors[0]), 0, 1023, 0, 512));
  const y = round(map(Number(sensors[1]), 0, 1023, 0, 512));


  background('lightblue');
  
  if(x <= 255 && y <= 255) {
      fill('red');
      rect(0, 0, 255, 255);
      port.write(0);
  } else if(x >= 255 && x <= 512 
            && y > 00 && y <= 255) {
      fill('blue');
      rect(255, 0, 255, 255);
      port.write(1);
  } else if(x <= 255 && y >= 255 
           && y <= 512) {
    fill('green');
    rect(0, 255, 255, 255);
    port.write(2);
  } else{
    fill('orange');
    rect(255, 255, 255, 255);
    port.write(3);
  }
  fill('white');
  circle(x, y, 30);
}

// Three helper functions for managing the serial connection.

function setupSerial() {
  port = createSerial();

  // Check to see if there are any ports we have used previously
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    // If there are ports we've used, open the first one
    port.open(usedPorts[0], BAUD_RATE);
  }

  // create a connect button
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(5, 5); // Position the button in the top left of the screen.
  connectBtn.mouseClicked(onConnectButtonClicked); // When the button is clicked, run the onConnectButtonClicked function
}

function checkPort() {
  if (!port.opened()) {
    // If the port is not open, change button text
    connectBtn.html("Connect to Arduino");
    // Set background to gray
    background("gray");
    return false;
  } else {
    // Otherwise we are connected
    connectBtn.html("Disconnect");
    return true;
  }
}

function onConnectButtonClicked() {
  // When the connect button is clicked
  if (!port.opened()) {
    // If the port is not opened, we open it
    port.open(BAUD_RATE);
  } else {
    // Otherwise, we close it!
    port.close();
  }
}