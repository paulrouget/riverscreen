const HIDDEN_ROLES = ['system', 'input', 'homescreen'];

function populate() {
  let icons = document.querySelector("#icons");
  let appMgr = navigator.mozApps.mgmt;
  appMgr.getAll().onsuccess = function(event) {
    let apps = event.target.result;
    let fragment = document.createDocumentFragment();
    for (let app of apps) {
      if (HIDDEN_ROLES.indexOf(app.manifest.role) > -1)
        continue
      if (app.manifest.entry_points) {
        for (let k in app.manifest.entry_points) {
          fragment.appendChild(createIcon(app, k));
        }
      } else {
        fragment.appendChild(createIcon(app));
      }
    }
    icons.innerHTML = "";
    icons.appendChild(fragment);
  }
}

function createIcon(app, entryKey) {
  let div = document.createElement("div");
  div.className = "icon";

  let name;

  if (entryKey) {
    name = app.manifest.entry_points[entryKey].name;
    div.setAttribute("entry-point", entryKey);
  } else {
    name = app.manifest.name;
  }

  div.setAttribute("manifest-url", app.manifestURL);

  let character = document.createElement("span");
  character.className = "character";

  let span = document.createElement("span");
  span.textContent = name;

  let label = document.createElement("label");
  label.appendChild(span);

  div.appendChild(character);
  div.appendChild(label);

  div.onclick = function() {
    if (entryKey)
      app.launch(entryKey);
    else
      app.launch();
  }

  return div;
}

function updateWallpaper() {
  let req = navigator.mozSettings.createLock().get();
  req.onsuccess = function onsuccess() {
    let blob = req.result['wallpaper.image'];
    let url = URL.createObjectURL(blob);
    console.log("wallpaper", url);
    document.body.style.backgroundImage = "url(" + url + ")";
  };
}

window.addEventListener("DOMContentLoaded", () => {
  let appMgr = navigator.mozApps.mgmt;
  appMgr.oninstall = populate;
  appMgr.onuninstall = populate;
  populate();
  navigator.mozSettings.addObserver('wallpaper.image', updateWallpaper);
  updateWallpaper();
}, true);
