export default class InterfaceStore {
    connected: boolean = false;
    in_room: boolean = false;

    youtube_open: boolean = false;
    youtube_edit_mode: boolean = false;
    youtube_itemid: number = 1;
    youtube_videoid: string = "";

    wibbotool_open: boolean = false;
    wibbotool_hotelalert: boolean = false;
    wibbotool_chatlogpub: boolean = false;

    chatlog_pub: { userid: number, time: string, pseudo: string, message: string }[] = [];

    settings_box: boolean = false;

    notif_alert_open: boolean = false;
    notif_alert_image: string = "gameauto";
    notif_alert_title: string = "";
    notif_alert_message: string = "";
    notif_alert_textbutton: string = "";
    notif_alert_roomid: number = 0;
    notif_alert_url: string = "";

    notif_top_open: boolean = false;
    notif_top_message: string = "";
    notif_top_list_message: Array<string> = [];

    rp_id: number = 0;
    rp_mode: boolean = false;
    rp_health: number = 100;
    rp_maxhealh: number = 100;
    rp_energy: number = 100;
    rp_money: number = 0;
    rp_munition: number = 0;
    rp_level: number = 1;
    rp_experiences: number = 0;

    rp_buyitems: { id: number, name: string, desc: string, price: number, count: number }[] = [];
    rpbox_buyitems_open: boolean = false;

    rpbox_inventory_open: boolean = false;
    rp_inventory: { id: number, name: string, desc: string, count: number, category: number, usetype: number }[] = [];

    rpbox_inventory_choice_open: boolean = false;
    rp_item_choice: { id: number, name: string, desc: string, count: number, usetype: number } = { id: 0, name: "", desc: "", count: 0, usetype: 0 };

    rp_inventory_troc_open: boolean = false;
    rp_troc_target_settings: { userid: number, username: string, accepte: boolean, confirme: boolean } = { userid: 0, username: "", accepte: false, confirme: false };
    rp_troc_settings: { accepte: boolean, confirme: boolean } = { accepte: false, confirme: false };
    rp_troc_my_items: { id: number, name: string, desc: string, count: number}[] = [];
    rp_troc_target_items: { id: number, name: string, desc: string, count: number}[] = [];

    rp_botchoose: { username: string, look: string, message: string, code: string }[] = [];
}