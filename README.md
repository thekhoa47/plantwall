==============================================================================
You'll need:
  1. Node JS. Get Node JS here: https://nodejs.org/en/
  2. MQTT available on your computer. Get MQTT here: https://mosquitto.org/download/
  3. Arduino IDE. Get it here: https://www.arduino.cc/en/Main/Software

==============================================================================
How to use:
  Step 1:
    Upload arduino file in IOT folder to your ESP32 microcontrollers. Remember to change SSID and Password & MQTT server in the arduino file to your wifi credential and IP address.
  
  Step 2:
    On terminal (or command line for Windows), cd into the directory of this folder. Then, run "node index.js". If you're on Windows, make sure to run mosquitto.exe in the background.
    
  Step 3:
    Open Chrome or Firefox, and go to "localhost:3000". You should see the content of index.html here.
    
==============================================================================    
How to test animation without ESP32 and touch points:
  Step 1:
    Open a second terminal (or a second command line window for Windows) and type: 

      mosquitto_pub -t hello -h localhost -m "{\"from\": \"esp32\", \"touch\":\"f\"}"
      
    Or if you're on Window, you can do this:
      
      mqtt pub -t hello -h localhost -m "{\"from\": \"esp32\", \"touch\":\"f\"}"
      
  Step 2:
    Check in the web browser for an animation of Filios, an orange floating creature in the middle of the screen.
    
  Step 3:
    You can change the "f" in the message to "a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "n" or "o" to experience different animations.
