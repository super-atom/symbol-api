import * as os from 'os';
import * as config from '../configs/config';

export function myIpInformation(): any {
    const ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        let alias = 0;

        ifaces[ifname]?.forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                console.log(ifname, iface.address);
            }
            ++alias;
        });
    });
}

export function myServerStateInfomation(): any {
    console.log(`App server running...\nMode : ${process.env.NODE_ENV}\nServer Port : ${config.db.port}\nDB HOST : ${config.db.host}\nDB SCHEMA : ${config.db.schema}`);
}