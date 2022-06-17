var connected = false;
var services_discovered = false;
var connected_server;

function discoverDevicesOrDisconnect() {
  console.log("discoverDevicesOrDisconnect: connected=" + connected);
  if (!connected) {
    discoverDevices();
  } else {
    selected_device.gatt.disconnect();
  }
}
function discoverDevices() {
  console.log("discoverDevices");
  var options = {
    filters: [{ namePrefix: "BBC" }],
  };
  navigator.bluetooth
    .requestDevice(options)
    .then((device) => {
      console.log("> Name: " + device.name);
      console.log("> Id: " + device.id);
      console.log("> Connected: " + device.gatt.connected);
      selected_device = device;
      console.log(selected_device);
      connect();
    })
    .catch((error) => {
      alert("ERROR: " + error);
      console.log("ERROR: " + error);
    });
}
function setConnectedStatus(status) {
  connected = status;
  document.getElementById("status_connected").innerHTML = status;
  if (status == true) {
    document.getElementById("btn_scan").innerHTML = "Disconnect";
  } else {
    document.getElementById("btn_scan").innerHTML = "Discover Devices";
  }
}
function setDiscoveryStatus(status) {
  services_discovered = status;
  document.getElementById("status_discovered").innerHTML = status;
}
function setNotificationsStatus(status) {
  notifications_enabled = status;
  document.getElementById("status_notifications").innerHTML = status;
}

function connect() {
  if (connected == false) {
    console.log("connecting");
    selected_device.gatt.connect().then(
      function (server) {
        console.log("Connected to " + server.device.id);
        console.log("connected=" + server.connected);
        setConnectedStatus(true);
        connected_server = server;
        selected_device.addEventListener(
          "gattserverdisconnected",
          onDisconnected
        );
        discoverSvcsAndChars();
      },
      function (error) {
        console.log("ERROR: could not connect - " + error);
        alert("ERROR: could not connect - " + error);
        setConnectedStatus(false);
      }
    );
  }
}
function onDisconnected() {
  console.log("onDisconnected");
}
function discoverSvcsAndChars() {
  console.log("discoverSvcsAndChars server=" + connected_server);
}