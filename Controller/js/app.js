
        var player;
        var intv;
        var slider;
        //Init
        ////////////////////////////
        window.onload = function() {
            document.getElementById('btnPlay').addEventListener('click', playMusic, false);
            document.getElementById('btnPause').addEventListener('click', pauseMusic, false);
            document.getElementById('btnStop').addEventListener('click', stopMusic, false);
            document.getElementById('btnVolUp').addEventListener('click', volUp, false);
            document.getElementById('btnVolDown').addEventListener('click', volDown, false);
            player = document.getElementById('player');
            slider = document.getElementById('sliderTime');
            slider.addEventListener('change', reposition, false);
            getMusicList();
        }
        
        function reposition() {
            player.currentTime = slider.value;
        }
                
        //Volume Controls
        // 0.0  Silent - 1.0 Full Volume
        /////////////////////////////
        function volUp() {
            if(player.volume < 1) {
                player.volume += 0.1;
                console.log(player.volume);
            } 	else {
                	player.volume = 1;
            	}
        }
        
        function volDown() {
            if(player.volume > 0) {
            	player.volume -= 0.1;
                console.log(player.volume);
            } 	else {
                	player.volume = 0;
            }
        }
        
        //Music Play Controls
        ///////////////////////////
        function playMusic() {
            player.play();
            intv = setInterval(update, 100);
            slider.max = player.duration;
        }
        
        function update() {
            document.getElementById('songTime').innerHTML = millisToMins(player.currentTime);
            slider.value = player.currentTime;
        }
        
        function millisToMins(seconds) {
            var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
            var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
            
            if (numseconds >= 10) {
                return "Time Elapsed: " + numminutes + ":" + Math.round(numseconds);
            } 	else {
                	return "Time Elapsed: " + numminutes + ":0" + Math.round(numseconds);
            	}
        }
        
        function pauseMusic() {
            player.pause();
            clearInterval(intv);
        }
        
        function stopMusic() {
            player.pause();
            player.currentTime = 0;
            clearInterval(intv);
        }
        
        function getMusicList() {
            var parser = new DOMParser();
            xmlDocument = parser.parseFromString(xml, "text/xml");
            var elementsArray = xmlDocument.documentElement.getElementsByTagName('composition');
           var arrayLength = elementsArray.length;
           var output= "<table>";
           
           for(var i=0; i < arrayLength; i++) {
                var title = elementsArray[i].getElementsByTagName('title')[0].firstChild.nodeValue;
                var composer = elementsArray[i].getElementsByTagName('composer')[0].firstChild.nodeValue;
                var time = elementsArray[i].getElementsByTagName('time')[0].firstChild.nodeValue;
                var fileName = elementsArray[i].getElementsByTagName('filename')[0].firstChild.nodeValue;
                output += "<tr>";
                output += ("<td onclick='songSelect(\"" + fileName + "\")'>" + title + "; By: " + composer + "; </td>");
                output += "</tr>" 
           }
           
           output += "</table>";
           document.getElementById('musicList').innerHTML = output;
        }
        
        function songSelect(fn) {
            //console.log(fn);
            document.getElementById('player').src =  fn;
            playMusic();
        }
    function floatLeft() {
    document.getElementById("sliderTime").style.cssFloat = "left";
    }
