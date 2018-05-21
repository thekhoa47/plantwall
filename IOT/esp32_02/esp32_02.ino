#include <WiFi.h>
#include <PubSubClient.h>
const char* ssid = "GL-AR150-75b";
const char* password =  "goodlife";
const char* mqttServer = "10.1.100.128";
const int mqttPort = 1883;
const char* mqttUser = "";
const char* mqttPassword = "";
WiFiClient espClient;
PubSubClient client(espClient);
int threshold = 20;
int thresholdi = 25;
bool touch3detected = false;
bool touch5detected = false;
bool touch6detected = false;
bool touch7detected = false;
bool touch8detected = false;
bool touch9detected = false;
void gotTouch3() {
  touch3detected = true;
}
void gotTouch5() {
  touch5detected = true;
}
void gotTouch6() {
  touch6detected = true;
}
void gotTouch7() {
  touch7detected = true;
}
void gotTouch8() {
  touch8detected = true;
}
void gotTouch9() {
  touch9detected = true;
}
void setup() {
  Serial.begin(115200);
  delay(1000); // give me time to bring up serial monitor
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  
  Serial.println("Connected to the WiFi network");
  client.setServer(mqttServer, mqttPort);
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("ESP32Client", mqttUser, mqttPassword )) {
      Serial.println("connected");
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }
  client.publish("hello", "Hello from ESP32");
  
  Serial.println("ESP32 Touch Interrupt Test");
  touchAttachInterrupt(T3, gotTouch3, thresholdi);
  touchAttachInterrupt(T5, gotTouch5, threshold);
  touchAttachInterrupt(T6, gotTouch6, threshold);
  touchAttachInterrupt(T7, gotTouch7, threshold);
  touchAttachInterrupt(T8, gotTouch8, threshold);
  touchAttachInterrupt(T9, gotTouch9, threshold);
  yield();
}
void loop() {
  if(client.connected () != 1){
      if (client.connect("ESP32Client", mqttUser, mqttPassword )) {
//      Serial.println("connected");
    } else {
//      Serial.print("failed with state ");
//      Serial.print(client.state());
      delay(2000);
    }
  }

  if (touch3detected) {
    touch3detected = false;
    Serial.println("Touch 3 detected");
    const char* data = "{\"from\": \"esp32\", \"touch\":\"i\"}";
    client.publish("hello", data);
    //delay(500);
  }
  if (touch5detected) {
    touch5detected = false;
    Serial.println("Touch 5 detected");
    const char* data = "{\"from\": \"esp32\", \"touch\":\"g\"}";
    client.publish("hello", data);
    //delay(500);
  }
  if (touch6detected) {
    touch6detected = false;
    Serial.println("Touch 6 detected");
    const char* data = "{\"from\": \"esp32\", \"touch\":\"h\"}";
    client.publish("hello", data);
    //delay(500);
  }
  if (touch7detected) {
    touch7detected = false;
    Serial.println("Touch 7 detected");
    const char* data = "{\"from\": \"esp32\", \"touch\":\"k\"}";
    client.publish("hello", data);
    //delay(500);
  }
  if (touch8detected) {
    touch8detected = false;
    Serial.println("Touch 8 detected");
    const char* data = "{\"from\": \"esp32\", \"touch\":\"n\"}";
    client.publish("hello", data);
    //delay(500);
  }
  if (touch9detected) {
    touch9detected = false;
    Serial.println("Touch 9 detected");
    const char* data = "{\"from\": \"esp32\", \"touch\":\"o\"}";
    client.publish("hello", data);
    //delay(500);
  }
}

