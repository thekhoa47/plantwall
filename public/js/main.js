$(function(){
    var item = {
        "a": {
            videoPath: "",
            soundPath: "snd/button.mp3",
            videoLength: 5000,
            divId: "#a",
            displayData: displaySoil,
            videoTimer: null
        },
        "b":{
            videoPath: "vid/b_flower.webm",
            soundPath: "snd/flower.wav",
            videoLength: 3000,
            divId: "#b",
            displayData: null,
            videoTimer: null
        },
        "c":{
            videoPath: "vid/c_tree.webm",
            soundPath: "snd/tree.wav",
            videoLength: 10000,
            divId: "#c",
            displayData: null,
            videoTimer: null
        },
        "d":{
            videoPath: "vid/d_rainbow.webm",
            soundPath: "snd/rainbow.wav",
            videoLength: 4000,
            divId: "#d",
            displayData: null,
            videoTimer: null
        },
        "e":{
            videoPath: "",
            soundPath: "snd/button.mp3",
            videoLength:"5000",
            divId: "#e",
            displayData: displayUV,
            videoTimer: null
        },
        "f":{
            videoPath: "vid/f_filios.webm",
            soundPath: "snd/filios.wav",
            videoLength: 10000,
            divId: "#f",
            displayData: null,
            videoTimer: null
        },
        "g":{
            videoPath: "vid/g_crazy.webm",
            soundPath: "snd/g-sound.mp3",
            videoLength: 10000,
            divId: "#g",
            displayData: null,
            videoTimer: null
        },
        "h":{
            videoPath: "vid/h_lulabi.webm",
            soundPath: "snd/lulabi.wav",
            videoLength: 7000,
            divId: "#h",
            displayData: null,
            videoTimer: null
        },
        "i":{
            videoPath: "vid/i_alolo.webm",
            soundPath: "snd/alolo.wav",
            videoLength: 12000,
            divId: "#i",
            displayData: null,
            videoTimer: null
        },
        "k":{
            videoPath: "",
            soundPath: "snd/button.mp3",
            videoLength: "5000",
            divId: "#k",
            displayData: displayHumid,
            videoTimer: null
        },
        "n":{
            videoPath: "vid/n_sneakpeak.webm",
            soundPath: "snd/sneakpeak.wav",
            videoLength: 6000,
            divId: "#n",
            displayData: null,
            videoTimer: null
        },
        "o":{
            videoPath: "vid/o_rain.webm",
            soundPath: "snd/rain.wav",
            videoLength: 3000,
            divId: "#o",
            displayData: null,
            videoTimer: null
        }
    }

//DISPLAY SENSOR DATA ======================================
    function displayUV(soundPath, timeout){
        //if uv dialog is pop, then do nothing but just update timmer
        if(uvTimer){
            clearTimeout(uvTimer);
            uvTimer = setTimeout(function(){
                $("#sunlight").removeClass("show");
                uvTimer = null;
            }, timeout);
            return;
        }
        //if uv dialog is not up 
        $("#sunlight").addClass("show");
        var sound = new Howl({
            src: [soundPath]
        });
        if (sound) {
            sound.play();
        }
        uvTimer = setTimeout(function(){
            $("#sunlight").removeClass("show");
            uvTimer = null;
        }, timeout);
    }

    function displaySoil(soundPath, timeout){
            if(soilTimer){
                clearTimeout(soilTimer);
                soilTimer = setTimeout(function(){
                    $("#soil_moisture").removeClass("show");
                    soilTimer = null;
                }, timeout);

                return;
            }
            $("#soil_moisture").addClass("show");
            var sound = new Howl({
                src: [soundPath]
            });
            if (sound) {
                sound.play();
            }            
                soilTimer = setTimeout(function(){
                $("#soil_moisture").removeClass("show");
                soilTimer = null;
            }, timeout);
    }

    function displayHumid(soundPath, timeout){
            //if uv dialog is pop, then do nothing but just update timmer
            if(humidTimer){
                clearTimeout(humidTimer);
                humidTimer = setTimeout(function(){
                    $("#humid").removeClass("show");
                    humidTimer = null;
                }, timeout)

                return;
            }
                    $("#humid").addClass("show");
                    var sound = new Howl({
                        src: [soundPath]
                    });
                    if (sound) {
                        sound.play();
                    }
                    humidTimer = setTimeout(function(){
                    $("#humid").removeClass("show");
                    humidTimer = null;
                }, timeout);
    }

//LOAD ALL VIDEO AT DOCUMENT READY
    function loadVid(item){                
        if(!item.videoPath) return;
        $(item.divId).attr('src', item.videoPath);
        $(item.divId).get(0).load();
        $(item.divId).get(0).pause();
    }

    for (var elem in item){
        loadVid(item[elem]);
    }

//SETUP FUNCTION READY TO BE CALLED
    function setCallVidTimer(item){
        if(!item) return false;
        if(item.videoTimer) return false;
        item.videoTimer = setTimeout(function(){
            item.videoTimer = null;
        }, item.videoLength);
        return true;
    }

    function playVid(divId, soundPath) {
        $(divId).get(0).play();
        var sound = new Howl({
            src: [soundPath]
        });
        if (sound) {
            sound.play();
        }
    }

    function changeBG() {
        var hourOfDay = new Date().getHours();
        if (6 <= hourOfDay && hourOfDay < 19) {
            $(".map").removeClass("night_bg");
        } else if (19 <= hourOfDay && hourOfDay < 20) {
            $(".map").addClass("sunset_bg");
        } else if (20 <= hourOfDay || hourOfDay < 6 ) {
            $(".map").removeClass("sunset_bg");
            $(".map").addClass("night_bg");
        }
    }

    $(".screensaver").hide();    
    var saver_timer = setInterval(screenSaver, 20000);
    var oceanSound = new Howl({
            src: ['snd/ocean.wav'],
            loop: true,
            volume: 0.2
    });

    function screenSaver(){
        $(".screensaver").show();
        $(".screensaver").get(0).play();
        oceanSound.play();
    }

    function resetTimer(){
        $(".screensaver").hide();
        oceanSound.stop();
        clearInterval(saver_timer); // stop current saver_timer
        saver_timer = setInterval(screenSaver, 20000); // start a new timer 
    }

    var socket = io.connect('//localhost:3000');

    var uv, humid, soil;
    var uvTimer, humidTimer, soilTimer = null;

    socket.on('data', function(data) {
        var data_obj = null;
        // console.log(data);
        try{
            data_obj = JSON.parse(data);
        }
        catch(error){
            //handle the error
            console.log("Data Can't parse to JSON. Data = " + data);
            return;
        }

        if(data_obj['from'] == "small_board" && data_obj['uv']){
            uv = data_obj.uv;
            console.log(uv);

            var uv_value = uv;                  
            if (uv_value >= 0.09) {
                $("#uv_status").text("Just Right");
            } else if (uv_value < 0.09) {
                $("#uv_status").text("Too Dark");
            }
            $("#uv_value").text(uv_value);
        }
        if(data_obj['from'] == "small_board" && data_obj['soil_moisture']){
            soil = data_obj.soil_moisture;
            console.log(soil);

            var soil_value = soil;                    
            if (soil_value >= 600) {
                $("#soil_status").text("Thirsty");
            } else if (soil_value < 600) {
                $("#soil_status").text("Just Right");
            }
            $("#soil_value").text(soil_value);
        }
        if(data_obj['from'] == "small_board" && data_obj['humidity']){
            humid = data_obj.humidity;
            
            var humid_value = humid;                    
            if (humid_value >= 75) {
                $("#humid_status").text("Not Enough");
            } else if (30 < humid_value &&humid_value < 75) {
                $("#humid_status").text("Just Right");
            } else if (humid_value <= 30) {
                $("#humid_status").text("Too Much");
            }
            $("#humid_value").text(humid_value);

            console.log(uv);
        }   
        
        if(data_obj['from'] == "esp32" && data_obj['touch']) {
            var touch = data_obj["touch"];
            if(item[touch]){
                if(item[touch].displayData){
                    item[touch].displayData(item[touch].soundPath, item[touch].videoLength);
                    resetTimer();
                } else {
                    if(!setCallVidTimer(item[touch])) return;
                    playVid(item[touch].divId, item[touch].soundPath);
                    resetTimer();
                }   
            }
        }
    });
    
    socket.on('error', function() {
        console.error(arguments)
    });
});  