const HIDDEN_ROLES = ['system', 'input', 'homescreen'];

function populate() {
  let main = document.querySelector("main");
  let appMgr = navigator.mozApps.mgmt;
  appMgr.getAll().onsuccess = function(event) {
    let apps = event.target.result;
    let fragment = document.createDocumentFragment();
    let i = 0;
    for (let app of apps) {
      i++;
      console.log("role", app.manifest.role);
      if (HIDDEN_ROLES.indexOf(app.manifest.role) > -1)
        continue
      if (i > 100) break;
      fragment.appendChild(createIcon(app));
    }
    main.appendChild(fragment);
  }
}

function createIcon(app) {
  let div = document.createElement("div");
  div.className = "icon";
  div.setAttribute("manifest-url", app.manifestURL);

  let character = document.createElement("span");
  character.className = "character";

  let span = document.createElement("span");
  span.textContent = app.manifest.name;

  let label = document.createElement("label");
  label.appendChild(span);

  div.appendChild(character);
  div.appendChild(label);

  div.onclick = function() {
    app.launch();
  }

  return div;
}

window.addEventListener("DOMContentLoaded", () => {
  let appMgr = navigator.mozApps.mgmt;
  appMgr.oninstall = populate;
  appMgr.onuninstall = populate;
  populate();
}, true);
