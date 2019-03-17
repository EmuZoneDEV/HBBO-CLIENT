export default function(name: string): string {
    var regsplit: RegExpExecArray | null;
    if(regsplit=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(regsplit[1]);
    else
        return "";
}