let cp = document.querySelector('#compass')
let sp = document.querySelector('#speed')

function speed(lat1, lon1, t1, lat2, lon2, t2) {
  const R = 6371000; 
  const φ1 = lat1 * Math.PI/180; 
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c;
  //console.log(d/(t2-t1))
  //sp.innerHTML=`lat1 : ${lat1} , lon1 : ${lon1}<br>`
  sp.innerHTML+=`lat2 : ${lat2} , lon2 : ${lon2}<br>`
  sp.innerHTML+=`Speed : ${d/(t2-t1)}<br>`
}

function firstGeolocationSuccess(position1) {
    let t1=Date.now();
    //console.log(position1.coords.latitude,position1.coords.longitude)
    navigator.geolocation.watchPosition(
      function (position2) {
        let t2=Date.now();
        sp.innerHTML=`time : ${new Date().toTimeString()}<br>`
        //console.log(position2.coords.latitude,position2.coords.longitude)
        speed(position1.coords.latitude, position1.coords.longitude, t1/1000, position2.coords.latitude, position2.coords.longitude, t2/1000);
        //bearing(position1.coords.latitude, position1.coords.longitude, position2.coords.latitude, position2.coords.longitude);
      })
  }
  
navigator.geolocation.getCurrentPosition(firstGeolocationSuccess);


const isIOS = (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/));
console.log(isIOS);
if (isIOS) {
    DeviceOrientationEvent.requestPermission()
       .then((response) => {
          if (response === "granted") {
             window.addEventListener("deviceorientation", handler, true);
          } else {
             alert("Permission has to be allowed!");
          }
       })
       .catch(() => alert("Compass not supported"));
 } 
 else {
    window.addEventListener("deviceorientationabsolute", handler, true);
 }


function handler(e) {
    compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    cp.innerHTML=`Bearing : ${compass.toFixed()}`
 }
