import Wibbo from "./Wibbo";
import Client from "./Client";
import Http from "./util/Http";
import GetRequest from "./util/GetRequest";

import { polyfill } from "es6-promise";

polyfill();

document.addEventListener("visibilitychange", function() {
  if (!document.hidden) {
    if (document == null) return;

    let html = document.querySelector("html");

    if (html == null) return;

    html.style.width = "99.9%";

    setTimeout(function() {
      let html = document.querySelector("html");
      if (html == null) return;
      html.style.width = "100%";
    }, 1000);
  }
});

var Id: string = GetRequest("id");
var WSUrl: string = "";

declare var roomId: number;

var CustumeId: string = Id == "" ? "" : "?id=" + Id;

Http.get("getclientdata" + CustumeId)
  .then(function(response: any) {
    if (response.data.error) {
      console.log(response.data.error);
      return;
    }

    let SSOTicket: string = response.data.SSOTicket;
    WSUrl = response.data.WSUrl;

    new Client(SSOTicket, roomId);
  })
  .catch(function(error: string) {
    console.log("[GetClientData] Error: " + error);
  });

declare global {
  interface Window {
    FlashExternalInterface: {
      legacyTrack: (arg1: string, arg2: string, arg3: string) => void;
      listPlugins: () => string;
    };
    open(): void;
  }
}
window.FlashExternalInterface = {
  legacyTrack: function(arg1: string, arg2: string, arg3: string) {},
  listPlugins: function() {
    return "";
  }
};

window.FlashExternalInterface.listPlugins = function() {
  let txt: string = "";
  for (var i = 0; i < navigator.plugins.length; i++) {
    txt += navigator.plugins[i].name + "|";
  }

  return txt;
};

window.FlashExternalInterface.legacyTrack = function(
  arg1: string,
  arg2: string,
  arg3: string
) {
  console.log("legacyTrack: " + arg1);

  if (arg1 == "authentication") {
    Wibbo.Init(WSUrl);
  }
};