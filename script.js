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
                th.innerText="Place: "+parsed.results[input][i].city
                th.className = "bg-dark text-light"
                tr.append(th)
                table.append(tr)
                
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                td.innerText="Pincode: "+parsed.results[input][i].postal_code
                tr.append(td)
                table.append(tr)
    
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                td.innerText="District: "+parsed.results[input][i].province
                tr.append(td)
                table.append(tr)
    
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                td.innerText="State: "+parsed.results[input][i].state
                tr.append(td)
                table.append(tr)
                
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                td.innerText="Country: "+parsed.results[input][i].country_code
                tr.append(td)
                table.append(tr)
    
                var tr = document.createElement("tr")
                var td = document.createElement("td")
                var latitude = parsed.results[input][i].latitude
                var longitude = parsed.results[input][i].longitude
                var a = document.createElement("a")
                a.href = "https://www.latlong.net/c/?lat="+latitude+"&long="+longitude
                a.target = '_blank'
                a.innerText = "Locate on Map "
                // a.style.color="black"
                a.style.textDecoration="none"

                var icon = document.createElement("i")
                icon.className = "fa-solid fa-map-location-dot fa-bounce"
                
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
