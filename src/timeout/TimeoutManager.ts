import Wibbo from "../Wibbo";

export default class TimeoutManger {
    private closeNATimeout: number;
    private closeNTopTimeout: number;
    private sendNotifTopInterval: number;

    private nTopCycleId: number;

    constructor()
    {
        this.closeNATimeout = 0;
        this.closeNTopTimeout = 0;
        this.sendNotifTopInterval = 0;

        this.nTopCycleId = 0;
    }

    public CloseNotifAlert(Now: boolean = false): void {
        clearTimeout(this.closeNATimeout);

        if(Now)
            Wibbo.GetStore().notif_alert_open = false;
        else
        this.closeNATimeout = setTimeout(function() { Wibbo.GetStore().notif_alert_open = false; }, 120 * 1000);
    }

    public CloseNotifTop(Now: boolean = false): void {
        clearTimeout(this.closeNTopTimeout);

        if(Now)
            Wibbo.GetStore().notif_top_open = false;
        else
        this.closeNATimeout = setTimeout(function() { Wibbo.GetStore().notif_top_open = false; }, 60 * 1000);
    }

    public InitSendNotifTop()
    {
        if(this.sendNotifTopInterval > 0)
            clearInterval(this.sendNotifTopInterval);

        this.sendNotifTopInterval = setInterval(this.SendNotifTop.bind(this), 15 * 60 * 1000);
    }

    public SendNotifTop()
    {
        this.nTopCycleId += 1;
        if(this.nTopCycleId > Wibbo.GetStore().notif_top_list_message.length - 1)
            this.nTopCycleId = 0;

        Wibbo.GetStore().notif_top_open = true;
        Wibbo.GetStore().notif_top_message = Wibbo.GetStore().notif_top_list_message[this.nTopCycleId];
        
        Wibbo.GetTimeoutManager().CloseNotifTop();
    }
}