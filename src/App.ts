import Wibbo from "./Wibbo";

import { polyfill } from "es6-promise";
polyfill();

Wibbo.Auth();

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

(<any>window).FlashExternalInterface = {
    legacyTrack: function(arg1: string, arg2: string, arg3: string) {},
    listPlugins: function() {
      return "";
    }
  };

  (<any>window).FlashExternalInterface.listPlugins = function() {
    let txt: string = "";
    for (let i = 0; i < navigator.plugins.length; i++) {
      txt += navigator.plugins[i].name + "|";
    }

    return txt;
  };

  (<any>window).FlashExternalInterface.legacyTrack = function(arg1: string, arg2: string, arg3: string) {
    console.log("legacyTrack: " + arg1);

    if (arg1 == "authentication") {
      Wibbo.Init();
    }
  };