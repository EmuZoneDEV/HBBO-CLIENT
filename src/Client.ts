import swfobject from './swfobject';
import Http from './util/Http';

export default class Client {

    constructor(SSOTicket: string, RoomId: number) {

        Http.get('getclientconfig').then(function(response:any) {

        let client = response.data;

        var time = Math.round(new Date().getTime() / 1000);
        let cache = client.cache;

        var flashvars: any = {
            "client.allow.cross.domain" : "0", 
				"client.notify.cross.domain" : "1", 
				"connection.info.host" : client.ip, 
				"connection.info.port" : client.port, 
				"site.url" : client.UrlWibbo, 
				"url.prefix" : client.UrlWibbo, 
				"client.reload.url" : client.UrlWibbo + "/client", 
				"client.fatal.error.url" : client.UrlWibbo + "/client", 
				"client.connection.failed.url" : client.UrlWibbo + "/client", 
				"logout.url" : client.UrlWibbo + "/logout.php", 
				"logout.disconnect.url" : client.UrlWibbo + "/client", 
				"external.variables.txt" : client.Vars + "?cache=" + cache, 
				"external.texts.txt" : client.Texts + "?cache=" + time, 
				"productdata.load.url" : client.Producdata + "?cache=" + cache, 
				"furnidata.load.url" : client.Furnidata + "?cache=" + cache, 
				"sso.ticket" : SSOTicket, 
				"processlog.enabled" : "0", 
				"client.starting" : client.Message,
				"client.starting.revolving" : client.MessageFun,
				"flash.client.url" : client.R_64, 
				"user.hash" : "", 
				"has.identity" : "0", 
                "flash.client.origin" : "popup",
        };

        if(RoomId > 0)
        {
            flashvars["forward.type"] = "2";
            flashvars["forward.id"] = RoomId; 
        }

        var params = {
            "base": client.R_64,
            "allowScriptAccess": "always",
            "menu": "false",
            "wmode": "opaque"
        };

        swfobject.embedSWF(client.R_64 + client.swf, "flash-container", "100%", "100%", "11.1.0", client.UrlWibbo + "/flash/expressInstall.swf", flashvars, params, null, null);

        //Copyright Flo on holo.ws
        var isNewEdge = parseInt((navigator.userAgent.match(/Edge\/(\d+)/) || [])[1]) > 14;
        var isNewSafari = parseInt((navigator.userAgent.match(/OS X (\d+)/) || [])[1]) > 9;
        var isNewChrome = parseInt((navigator.userAgent.match(/Chrom(e|ium)\/(\d+)/) || [])[2]) > 56 && !/Mobile/i.test(navigator.userAgent);

        var canRequestPermission = isNewEdge || isNewSafari || isNewChrome;

        if (!swfobject.hasFlashPlayerVersion('10') && canRequestPermission){
            //var refreshFlashPlayer = document.createElement('div');
            //refreshFlashPlayer.innerHTML = '<meta http-equiv="refresh" content="0;URL=http://www.macromedia.com/go/getflashplayer">';
            //document.body.appendChild(refreshFlashPlayer);

            let getAdobe = document.getElementById("getadobe");
            if(getAdobe == null)
                return;

            if(getAdobe.click)
                getAdobe.click();
            else if(document.createEvent)
            {
                var eventObj = document.createEvent('MouseEvents');
                eventObj.initEvent('click', true, true);
                getAdobe.dispatchEvent(eventObj);
            }
        }

    }).catch(function (error: string) {
        console.log("[getclientconfig] Error: " + error);
      });
    }
}