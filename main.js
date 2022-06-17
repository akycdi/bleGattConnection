var bleno = require("bleno");
bleno.on("stateChange", function (state) {
  console.log("on -> stateChange: " + state);
  if (state === "poweredOn") {
    bleno.startAdvertising("BBC micro:bit [pi]");
  } else {
    bleno.stopAdvertising();
  }
});
bleno.on("accept", function (clientAddress) {
  console.log("on -> accept, client: " + clientAddress);
  bleno.updateRssi();
});
bleno.on("disconnect", function (clientAddress) {
  console.log("Disconnected from address: " + clientAddress);
});
bleno.on("rssiUpdate", function (rssi) {
  console.log("on -> rssiUpdate: " + rssi);
});
bleno.on("advertisingStart", function (error) {
  console.log(
    "on -> advertisingStart: " + (error ? "error " + error : "success")
  );
  if (!error) {
    bleno.setServices([
      // device information service - do not include if executing on a Mac
      new bleno.PrimaryService({
        uuid: "180a",
        characteristics: [
          // Model Number String
          new bleno.Characteristic({
            value: null,
            uuid: "2a24",
            properties: ["read"],
            onReadRequest: function (offset, callback) {
              console.log("Read request received");
              callback(this.RESULT_SUCCESS, new Buffer("BBC micro:bit"));
            },
          }),
        ],
      }),
    ]);
  }
});
bleno.on("servicesSet", function (error) {
  console.log("on -> servicesSet: " + (error ? "error " + error : "success"));
});
// function printDec2Bin(value) {
//   binary = "";
//   i = 0;
//   for (i = 5; i >= 0; i--) {
//     if ((value & (1 << i)) != 0) {
//       binary = binary + "1";
//     } else {
//       binary = binary + "0";
//     }
//   }
//   console.log(binary);
// }

