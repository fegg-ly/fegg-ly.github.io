int red = 10;
int green = 9;
int blue = 8;
int yellow = 7;
int inByte;

void setup() {
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
  pinMode(yellow, OUTPUT);
  Serial.begin(9600);
}

void loop() {

  Serial.print(analogRead(A0));
  Serial.print(",");
  Serial.println(analogRead(A1));
  delay(50);

  if (Serial.available() > 0) {
    inByte = Serial.read();
    if (inByte == 0) {
      digitalWrite(red, HIGH);
      digitalWrite(blue, LOW);
      digitalWrite(green, LOW);
      digitalWrite(yellow, LOW);
    }
    if (inByte == 1) {
      digitalWrite(blue, HIGH);
      digitalWrite(red, LOW);
      digitalWrite(green, LOW);
      digitalWrite(yellow, LOW);
    }
    if (inByte == 2) {
      digitalWrite(green, HIGH);
      digitalWrite(red, LOW);
      digitalWrite(blue, LOW);
      digitalWrite(yellow, LOW);
    }
    if (inByte == 3) {
      digitalWrite(yellow, HIGH);
      digitalWrite(red, LOW);
      digitalWrite(blue, LOW);
      digitalWrite(green, LOW);
    }

  }

}