export default class Logger {

    private static DebbugMode = true;

    public static Log(msg: string) {

        if(!Logger.DebbugMode)
            return;

        let date = new Date();
        console.log("[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + msg);
    }

}