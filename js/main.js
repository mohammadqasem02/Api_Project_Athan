/* Using axios  */

let cities = ["الزرقاء", "عمان", "اربد"];

for (let city of cities) {
  const content = `<option> ${city} </option>`;
  document.getElementById("cities").innerHTML += content;
}
document.getElementById("cities").addEventListener("change", function () {
  if (this.value == "الزرقاء") {
    getPrayers("Zarqa");
  } else if (this.value == "عمان") {
    getPrayers("Amman");
  } else if (this.value == "اربد") {
    getPrayers("Irbid");
  }
});

function getPrayers(cityName) {
  let params = {
    country: "JO",
    city: cityName,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data.timings;
      fillTime("fajr-time", timings.Fajr);
      fillTime("durth-time", timings.Dhuhr);
      fillTime("asr-time", timings.Asr);
      fillTime("sunset-time", timings.Sunset);
      fillTime("esha-time", timings.Isha);
      /*  */
      const readableDate = response.data.data.date.readable;
      const weekDay = response.data.data.date.hijri.weekday.ar;
      const data = weekDay + " " + readableDate;
      document.getElementById("date").innerHTML = data;
    })
    .catch(function (error) {})
    .then(function () {});
}
/* To get time of athan */
function fillTime(id, time) {
  document.getElementById(id).innerHTML = time;
}
