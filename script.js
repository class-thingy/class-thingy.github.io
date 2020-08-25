const jsonUrl = "http://port.vincentxie.net/classes";
var mainContainer = document.getElementById("cardsContainer");

// var loaded = 0;

// Basically this just saves the json object to classData
fetch(jsonUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendJsonData(data);
  })
  .catch(function (err) {
    //lol hope this doesnt happen
    console.log(err)
  });


function appendJsonData(jsonData) {

  for (lesson of jsonData) {
    load(lesson);
  }

}

function load(lesson) {

  var calIcon = createIcon("https://img.icons8.com/windows/32/000000/calendar.png")
  var priceIcon = createIcon("https://img.icons8.com/windows/32/000000/money.png")
  var teacherIcon = createIcon("https://img.icons8.com/windows/32/000000/user.png")
  var clockIcon = createIcon("https://img.icons8.com/windows/32/000000/clock.png")

  console.log(lesson);

  var cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "cardDiv");

  var imgDiv = document.createElement("div")
  imgDiv.setAttribute("class", "imgWrapper")
  var iconImg = document.createElement("img")
  try {
    iconImg.setAttribute("src", "http://port.vincentxie.net" + lesson.icon.formats.thumbnail.url)
  } catch (TypeError) {
    iconImg.setAttribute("src", "https://icanc.space/img/banner/home-left-1-cool-not-found.png");
  }
  iconImg.setAttribute("class", "iconImg")
  imgDiv.appendChild(iconImg)
  cardDiv.appendChild(imgDiv);

  // add content divz
  var contentDiv = document.createElement("div");
  contentDiv.setAttribute("class", "contentDiv");

  // Title of class
  var classTitle = document.createElement("h1")
  classTitle.innerHTML = lesson.className
  classTitle.setAttribute("class", "cardTitle")

  // Description of class
  var classDescription = document.createElement("p")
  classDescription.innerHTML = lesson.description

  // little informations
  var littleDiv = document.createElement("div")
  littleDiv.setAttribute("class", "smallInfo")
  
  var info1 = document.createElement("p")
  info1.innerHTML = convertDate(lesson.classDateTime)
  info1.setAttribute("class", "smallItems")

  var info2 = document.createElement("p")
  info2.innerHTML = lesson.price
  info2.setAttribute("class", "smallItems")


  var info3 = document.createElement("p")
  info3.innerHTML = lesson.TeacherName
  info3.setAttribute("class", "smallItems")


  var info4 = document.createElement("p");
  info4.innerHTML = lesson.ClassTimeInMinutes
  info4.setAttribute("class", "smallItems")


  littleDiv.appendChild(calIcon);
  littleDiv.appendChild(info1);
  littleDiv.appendChild(priceIcon);
  littleDiv.appendChild(info2);
  littleDiv.appendChild(teacherIcon);
  littleDiv.appendChild(info3);
  littleDiv.appendChild(clockIcon);
  littleDiv.appendChild(info4);

  // add the elements to child
  contentDiv.appendChild(classTitle)
  contentDiv.appendChild(classDescription)
  contentDiv.appendChild(littleDiv)
  cardDiv.appendChild(contentDiv)
  mainContainer.appendChild(cardDiv)

}

function createIcon(url) {
  var out = document.createElement("img")
  out.setAttribute("src", url)
  out.setAttribute("class", "smallIcon")
  return out
}

function convertDate(isoString) {
  var date = moment(isoString);
  var time = date.utc().format('YYYY/MM/DD, hh:mm A');
  console.log(time);

  return time
  
}
