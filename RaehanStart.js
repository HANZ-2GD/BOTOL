	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

import './HAN_EDIT.js';
import fs from 'fs';
import os from 'os';
import dns from 'dns';
import pino from 'pino';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';
import cron from 'node-cron';
import { toBuffer } from 'qrcode';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';
import NodeCache from 'node-cache';
import { createRequire } from 'module';
import moment from 'moment-timezone';
import { parsePhoneNumber } from 'awesome-phonenumber';
import WAConnection, { 
    useMultiFileAuthState, 
    Browsers, 
    DisconnectReason, 
    makeCacheableSignalKeyStore, 
    fetchLatestWaWebVersion, 
    jidNormalizedUser 
} from 'baileys';
import { app, server, PORT } from './src/server.js';
import { dataBase, cmdDel } from './src/database.js';
import { customHttpsAgent } from './DataBoss/function.js';
import { GroupParticipantsUpdate, MessagesUpsert, Solving } from './src/message.js';


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const print = (label, value) => console.log(`${chalk.green.bold('║')} ${chalk.cyan.bold(label.padEnd(16))}${chalk.yellow.bold(':')} ${value}`);
const pairingCode = process.argv.includes('--qr') ? false : process.argv.includes('--pairing-code') || global.pairing_code;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));
const tempDir = path.join(__dirname, 'DataBoss/temp');
const time_now = new Date();
const time_end = 60000 - (time_now.getSeconds() * 1000 + time_now.getMilliseconds());

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
let pairingStarted = false;
let phoneNumber;

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

process.setMaxListeners(0); 

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
const userInfoSyt = () => {
    try {
        return os.userInfo().username;
    } catch (e) {
        return process.env.USER || process.env.USERNAME || 'unknown';
    }
};

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    console.log(chalk.yellowBright('[SYSTEM] Custom DNS Google & Cloudflare.'));
} catch (e) {
    console.log(chalk.yellowBright('[SYSTEM] failed to custom DNS:'), e.message);
}


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

// --- Perubahan Nama Variabel Sesuai Permintaan ---
const RAEHANDATA = dataBase();
const database = dataBase();
const msgRetryCounterCache = new NodeCache();

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach(file => {
        fs.unlinkSync(path.join(tempDir, file));
    });
    console.log(chalk.greenBright('[SYSTEM] Temp DI BERSIHKAN ✓'));
} else {
    fs.mkdirSync(tempDir, { recursive: true });
}


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////


console.log(chalk.green.bold(`\n╔═════[${chalk.cyan(userInfoSyt())}@${chalk.cyan(os.hostname())}]═════`));
print('OS', `${os.platform()} ${os.release()} ${os.arch()}`);
print('Uptime', `${Math.floor(os.uptime() / 3600)} h ${Math.floor((os.uptime() % 3600) / 60)} m`);
print('Memory', `${(os.freemem()/1024/1024).toFixed(0)} MiB / ${(os.totalmem()/0).toFixed(0)} MiB`);
print('Node.js', process.version);
print('Date & Time', new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' }));
console.log(chalk.green.bold('╚' + ('═'.repeat(30))));

server.listen(PORT, () => {
    console.log(chalk.yellowBright('App listened on port'), PORT);
});


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
async function startHANZBot() {
    try {
        const loadData = await database.read();
        const HANZ_932LoadData = await RAEHANDATA.read();
        
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
        global.BossRAEHAN = {
            hit: {}, users: {}, set: {}, cmd: {}, 
            groups: {}, database: {}, 
            ...(loadData || {}),
        };
        
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
        if (!loadData) await database.write(global.BossRAEHAN);
        
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
        global.MasRAEHAN = {
            contacts: {}, presences: {}, messages: {}, groupMetadata: {},
            ...(HANZ_932LoadData || {}),
        };
        
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
        if (!HANZ_932LoadData) await RAEHANDATA.write(global.MasRAEHAN);
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
        global.loadMessage = function (remoteJid, id) {
            const messages = global.MasRAEHAN.messages?.[remoteJid]?.array;
            
            if (!messages) return null;
            return messages.find(msg => msg?.key?.id === id) || null;
        };

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
    } catch (e) {
        console.error('Database Error:', e);
    }


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
    const level = pino({ level: 'silent' });
    const { version } = await fetchLatestWaWebVersion();
    const { state, saveCreds } = await useMultiFileAuthState('HANZ_932');

  	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
  	    
      const HANZ = WAConnection({
        version,
        logger: level,
        getMessage: async (key) => {
            if (global.MasRAEHAN) {
                const msg = await global.loadMessage(key.remoteJid, key.id);
                return msg?.message || undefined;
           }
            return { conversation: 'RAEHAN' };
       },
       
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
        syncFullHistory: false,
        browser: Browsers.ubuntu('Chrome'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, level),
        },
        msgRetryCounterCache
    });
    
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
    if (pairingCode && !HANZ.authState.creds.registered) {
        if (!phoneNumber) {
            phoneNumber = global.number_bot ? global.number_bot : await question(chalk.bgBlack(chalk.cyanBright('MASUKKAN NOMOR WHATSAPP (CONTOH : 62xxx): ')));
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        }
        
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////      
        
        if (!pairingStarted) {
            pairingStarted = true;
            setTimeout(async () => {
                let code = await HANZ.requestPairingCode(phoneNumber);
                console.log(chalk.black(chalk.bgGreen('PAIRING CODE MU')), chalk.black(chalk.bgWhite(` ${code} `)));
            }, 3000);
        }
    }
    

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
    await Solving(HANZ, global.MasRAEHAN);
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
    HANZ.ev.on('creds.update', saveCreds);
    HANZ.ev.on('connection.update', async (update) => {
        const { qr, connection, lastDisconnect, isNewLogin } = update;
        
        if (qr && !pairingCode) {
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                startHANZBot();
            }
        }
        if (connection === 'open') {
            console.log(chalk.blueBright('HANZ TERHUBUNG KE WHATSAPP : ' + JSON.stringify(HANZ.user, null, 2)));
        }
    });


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
    HANZ.ev.on('messages.upsert', async (message) => {
         MessagesUpsert(HANZ, message, global.MasRAEHAN);
    });
    
    
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
    HANZ.ev.on('call', async (call) => {
		let botNumber = await HANZ.decodeJid(HANZ.user.id); {
			for (let id of call) {
				if (id.status === 'offer') {
					const hanzzz =` 
||||||||||||||||||||||||||||||||||||||||||||||||||||||
╭┈──────────╮
│ ❍ ANTI PANGGILAN ❍
╰┈──────────╯
||||||||||||||||||||||||||||||||||||||||||||||||||||||
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃HALLO MAS / MBAK
┃@${id.from.split('@')[0]}
┃
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃Panggilan : ${id.isVideo ? 'Video' : 'Suara'}
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃maaf mas / mbak
┃pemilik sedang 
┃tidak membawa 
┃hp / handphone
┃Tolong 
┃Tinggalkan Pesan
┃
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃ɪɴɪ ᴀᴅᴀʟᴀʜ ᴋᴇᴄᴇʀᴅᴀsᴀɴ ʙᴜᴀᴛᴀɴ
┃ᴅɪ ʙᴜᴀᴛ ᴏʟᴇʜ ʀᴀᴇʜᴀɴ
┃ 
▬▭▬▭▬▭▬▭▬▬▭▬▭
┃
┃JIKA PENTING
┃SILAHKAN HUBUNGI
┃NOMOR DIBAWAH 👇🏻
┃
▬▭▬▭▬▭▬▭▬▬▭▬▭

WHATSAPP 2👇🏻

https://wa.me/6285820054587

▬▭▬▭▬▭▬▭▬▬▭▬▭

INSTAGRAM 👇🏻

https://www.instagram.com/hanz_932?igsh=Ymp6dTNjYzhtODFq

▬▭▬▭▬▭▬▭▬▬▭▬▭`
					let msg = await HANZ.sendMessage(id.from, { image: {url: 'https://ar-hosting.pages.dev/1775121854710.png'},caption: hanzzz, mentions: [id.from]});
					 
					await HANZ.rejectCall(id.id, id.from)
                }
            }
        }
    });
    
    

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////   







	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
}
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
startHANZBot();
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
