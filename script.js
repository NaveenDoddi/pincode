function run(){

    document.getElementById("div2").innerHTML = ""

    var input = document.getElementById("input").value
    
    var xhr = new XMLHttpRequest()
    var api = "https://app.zipcodebase.com/api/v1/search?apikey=fb6dbf50-6aef-11ed-8277-1b1a362cf12b&codes="+input
    xhr.open('GET',api)
    xhr.send()
    xhr.onload = function(){
        var parsed = JSON.parse(xhr.response)
        // console.log(parsed.results[input].length)

        for(let i=0; i<parsed.results[input].length; i++){
            if(parsed.results[input][i].country_code == "IN"){
                
                var table = document.createElement("table")

                var tr = document.createElement("tr")
                var th = document.createElement("th")
                var place = parsed.results[input][i].city
                th.innerText="Place: "+place
                th.className = "bg-dark text-light"
                tr.append(th)
                table.append(tr)
                
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                var Pincode = parsed.results[input][i].postal_code

                td.innerText="Pincode: "+Pincode
                tr.append(td)
                table.append(tr)
    
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                var district = parsed.results[input][i].province
                td.innerText="District: "+district
                tr.append(td)
                table.append(tr)
    
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                var state = parsed.results[input][i].state
                td.innerText="State: "+state
                tr.append(td)
                table.append(tr)
                
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                var country = parsed.results[input][i].country_code
                td.innerText="Country: "+ country
                tr.append(td)
                table.append(tr)
    
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                var a = document.createElement("button")

                var latitude = parsed.results[input][i].latitude
                var longitude = parsed.results[input][i].longitude

                // console.log(latitude, longitude, place)

                a.areaName = place

                a.long = longitude
                a.lat = latitude

                a.style.border="none"
                
                a.innerText = "Locate on Map "

                a.addEventListener('click',function(event){
                    event.preventDefault()
                    handleclick(this)
                })

                // a.style.color="black"

                var icon = document.createElement("i")
                icon.className = "fa-solid fa-location-dot fa-bounce"
                icon.style.color = "red"
                
                a.append(icon)
                td.append(a,icon)
                tr.append(td)
                table.append(tr)

                table.className = "col-xs-11 col-sm-5 col-md-3 col-lg-3"
                document.getElementById("div2").append(table)

            }

        }
        document.getElementById("para").style.visibility="visible"
    }
    
}

function handleclick(place){
    var lati = place.lat
    var longi = place.long

    document.getElementById("mapDiv").style.display = "block";

    var mapContainer = document.getElementById('map');
    var mapContainer = document.getElementById('map');
    if (mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
    }
    var mymap = L.map('map').setView([lati, longi], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);
  
}

function closebtn(){
    document.getElementById("mapDiv").style.display = "none";
}
