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
let pairingStarted = false;
let phoneNumber;


process.setMaxListeners(0); 


const userInfoSyt = () => {
    try {
        return os.userInfo().username;
    } catch (e) {
        return process.env.USER || process.env.USERNAME || 'unknown';
    }
};

try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    console.log(chalk.yellowBright('[SYSTEM] Custom DNS Google & Cloudflare.'));
} catch (e) {
    console.log(chalk.yellowBright('[SYSTEM] failed to custom DNS:'), e.message);
}

// --- Perubahan Nama Variabel Sesuai Permintaan ---
const RAEHANDATA = dataBase();
const database = dataBase();
const msgRetryCounterCache = new NodeCache();

if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach(file => {
        fs.unlinkSync(path.join(tempDir, file));
    });
    console.log(chalk.greenBright('[SYSTEM] Temp folder cleared successfully!'));
} else {
    fs.mkdirSync(tempDir, { recursive: true });
}



console.log(chalk.green.bold(`\n╔═════[${chalk.cyan(userInfoSyt())}@${chalk.cyan(os.hostname())}]═════`));
print('OS', `${os.platform()} ${os.release()} ${os.arch()}`);
print('Uptime', `${Math.floor(os.uptime() / 3600)} h ${Math.floor((os.uptime() % 3600) / 60)} m`);
print('Memory', `${(os.freemem()/1024/1024).toFixed(0)} MiB / ${(os.totalmem()/0).toFixed(0)} MiB`);
print('Node.js', process.version);
print('Date & Time', new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }));
console.log(chalk.green.bold('╚' + ('═'.repeat(30))));

server.listen(PORT, () => {
    console.log(chalk.yellowBright('App listened on port'), PORT);
});

async function startHANZBot() {
    try {
        const loadData = await database.read();
        const storeLoadData = await RAEHANDATA.read();
        
        // --- Menggunakan BossRAEHAN sebagai pengganti global.db ---
        global.BossRAEHAN = {
            hit: {}, users: {}, set: {}, cmd: {}, 
            groups: {}, database: {}, 
            ...(loadData || {}),
        };
        if (!loadData) await database.write(global.BossRAEHAN);

        global.store = {
            contacts: {}, presences: {}, messages: {}, groupMetadata: {},
            ...(storeLoadData || {}),
        };
        if (!storeLoadData) await RAEHANDATA.write(global.store);

        global.loadMessage = function (remoteJid, id) {
            const messages = global.store.messages?.[remoteJid]?.array;
            if (!messages) return null;
            return messages.find(msg => msg?.key?.id === id) || null;
        };


    } catch (e) {
        console.error('Database Error:', e);
    }

    const level = pino({ level: 'silent' });
    const { version } = await fetchLatestWaWebVersion();
    const { state, saveCreds } = await useMultiFileAuthState('HANZ_932');

    const HANZ = WAConnection({
        version,
        logger: level,
        getMessage: async (key) => {
            if (global.store) {
                const msg = await global.loadMessage(key.remoteJid, key.id);
                return msg?.message || undefined;
            }
            return { conversation: 'Halo Saya RAEHAN' };
        },
        syncFullHistory: false,
        browser: Browsers.ubuntu('Chrome'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, level),
        },
        msgRetryCounterCache
    });

    if (pairingCode && !HANZ.authState.creds.registered) {
        if (!phoneNumber) {
            phoneNumber = global.number_bot ? global.number_bot : await question(chalk.bgBlack(chalk.cyanBright('Please type your WhatsApp number (ex: 62xxx): ')));
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        }

        if (!pairingStarted) {
            pairingStarted = true;
            setTimeout(async () => {
                let code = await HANZ.requestPairingCode(phoneNumber);
                console.log(chalk.black(chalk.bgGreen(' Your Pairing Code ')), chalk.black(chalk.bgWhite(` ${code} `)));
            }, 3000);
        }
    }

    await Solving(HANZ, global.store);

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
            console.log(chalk.blueBright('Connected to WhatsApp: ' + JSON.stringify(HANZ.user, null, 2)));
        }
    });

    HANZ.ev.on('messages.upsert', async (message) => {
        await MessagesUpsert(HANZ, message, global.store);
    });

    HANZ.ev.on('call', async (call) => {
		
		let botNumber = await HANZ.decodeJid(HANZ.user.id);
		 {
			for (let id of call) {
				
				if (id.status === 'offer') {
					const hanzzz =` 
╭┈──────────╮
│ ❍ ANTI PANGGILAN ❍
╰┈──────────╯

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
▬▭▬▭▬▭▬▭▬▬▭▬▭`
					let msg = await HANZ.sendMessage(id.from, { image: {url: 'https://ar-hosting.pages.dev/1775121854710.png'},caption: hanzzz, mentions: [id.from]});
					 
					await HANZ.rejectCall(id.id, id.from)
                }
            }
        }
    });

    


}

startHANZBot();