/*

SC RAEHAN
IG : hanz_932

*/

import '../HAN_EDIT.js';
import fs from 'fs';
import pino from 'pino';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { Boom } from '@hapi/boom';
import NodeCache from 'node-cache';
import { exec } from 'child_process';
import WAConnection, { useMultiFileAuthState, Browsers, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestWaWebVersion } from 'baileys';
import { GroupUpdate, GroupParticipantsUpdate, MessagesUpsert, Solving } from './message.js';

const __filename = fileURLToPath(import.meta.url);
global.client = {};
const msgRetryCounterCache = new NodeCache();

async function JadiBot(conn, from, m, RAEHANDATA) {
	async function startJadiBot() {
		try {
			const { version } = await fetchLatestWaWebVersion();
			
			const authPath = `./DataBoss/jadibot/${from}`;
			if (!fs.existsSync(authPath)) {
				fs.mkdirSync(authPath, { recursive: true });
			}
			// Folder auth state diset ke DataBoss
			const { state, saveCreds } = await useMultiFileAuthState(authPath);
			const level = pino({ level: 'silent' });
			
		/*	const getMessage = async (key) => {
				if (RAEHANDATA) {
					const msg = await RAEHANDATA.loadMessage(key.remoteJid, key.id);
					//return msg?.message || '';
				}
				
			}*/
			
			client[from] = WAConnection({
				version,
				logger: level,
				getMessage,
				syncFullHistory: false,
				browser: Browsers.ubuntu('Chrome'),
				generateHighQualityLinkPreview: true,
				auth: {
					creds: state.creds,
					keys: makeCacheableSignalKeyStore(state.keys, level),
				},
			});
			
			await Solving(client[from], RAEHANDATA);
			client[from].pairingStarted = false;
			client[from].ev.on('creds.update', saveCreds);
			
			client[from].ev.on('connection.update', async (update) => {
				const { connection, lastDisconnect, receivedPendingNotifications } = update;
				if (connection === 'connecting' && !client[from].authState.creds.registered && !client[from].pairingStarted) {
					setTimeout(async () => {
						if (!client[from]) return;
						client[from].pairingStarted = true;
						let code = await client[from].requestPairingCode(from.replace(/[^0-9]/g, ''));
						if (!client[from]) return;
                        // Pastikan m ada sebelum mengirim balasan
					    if (m) m.reply(` ${code?.match(/.{1,4}/g)?.join('-') || code}`);
					}, 3000);
				}
				if (connection === 'close') {
					if (!client[from]) return;
					const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
					console.log(chalk.redBright(`[JADIBOT] Koneksi terputus untuk ${from} - Alasan: ${reason}`));
                    
					if ([DisconnectReason.connectionLost, DisconnectReason.connectionClosed, DisconnectReason.restartRequired, DisconnectReason.timedOut, DisconnectReason.badSession, DisconnectReason.connectionReplaced].includes(reason)) {
                        // Reconnect otomatis
						JadiBot(conn, from, m, RAEHANDATA);
					} else if (reason === DisconnectReason.loggedOut) {
						if (m) m.reply('Sesi telah Log Out. Menghapus data, silakan scan/pairing ulang...');
						StopJadiBot(conn, from, m);
					} else if (reason === DisconnectReason.Multidevicemismatch) {
						if (m) m.reply('Sesi tidak valid (Mismatch). Menghapus data, silakan scan ulang...');
						StopJadiBot(conn, from, m);
					} else {
						if (m) m.reply('ANDA SUDAH TIDAK LAGI MENJADI BOT!');
						StopJadiBot(conn, from, m);
					}
				}
				if (connection == 'open') {
					let botNumber = await client[from].decodeJid(client[from].user.id);
					console.log(chalk.greenBright(`[JADIBOT] Berhasil terhubung: ${botNumber}`));
					// Akses aman ke database global BossRAEHAN
					if (global.BossRAEHAN?.set?.[botNumber] && !global.BossRAEHAN.set[botNumber]?.join) {
						global.BossRAEHAN.set[botNumber].original = false;
						global.BossRAEHAN.set[botNumber].join = true;
					}
				}
				if (receivedPendingNotifications == 'true') {
					client[from].ev.flush();
				}
			});
			/*
			client[from].ev.on('call', async (call) => {
	            let botNumber = await client[from].decodeJid(client[from].user.id);
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

FOLLOW INSTAGRAM 
CREATOR 👇👇👇

https://www.instagram.com/hanz_932?igsh=Ymp6dTNjYzhtODFq

▬▭▬▭▬▭▬▭▬▬▭▬▭`
					let msg = await client[from].sendMessage(id.from, { image: {url: 'https://ar-hosting.pages.dev/1779953065505.jpg'},caption: hanzzz, mentions: [id.from]});
							
							await client[from].rejectCall(id.id, id.from);
						}
					}
			});
			*/
			client[from].ev.on('messages.upsert', async (message) => {
				 MessagesUpsert(client[from], message, RAEHANDATA);
			});
		
			return client[from];
		} catch (e) {
			console.log(chalk.redBright(`[ERROR JADIBOT] ${e}`));
		}
	}
	return startJadiBot();
}

async function StopJadiBot(conn, from, m) {
	if (!Object.keys(client).includes(from)) {
		if (m) return conn.sendMessage(m.chat, { text: 'ANDA TIDAK SEDANG MEMAKAI BOT INI' }, { quoted: m });
        return;
	}
	try {
		client[from].ev.removeAllListeners();
		if (client[from].ws) client[from].ws.close();
		// Menggunakan logout() karena Baileys tidak punya fungsi .end()
		client[from].logout().catch(e => {}); 
	} catch (e) {
		console.log(chalk.redBright(`[ERROR STOP] ${e}`));
	}
	delete client[from];
	// Ubah direktori yang dihapus ke DataBoss agar sesuai dengan inisialisasi awal
	exec(`rm -rf ./DataBoss/jadibot/${from}`);
	if (m) return m.reply('ANDA TELAH KELUAR DARI SESI JADI BOT, SILAHKAN KETIK .jadibot JIKA INGIN MENGGUNAKAN NYA KEMBALI (TERIMA KASIH)');
}

async function ListJadiBot(conn, m) {
	let teks = 'PEMAKAI BOT SAAT INI :\n\n';
	for (let jadibot of Object.values(client)) {
		teks += (jadibot.user?.id ? `- @${conn.decodeJid(jadibot.user.id).split('@')[0]}\n` : '');
	}
	if (m) return m.reply(teks);
}

// Fungsi baru untuk merestart Jadibot secara otomatis tanpa perlu parameter 'm'
async function AutoStartJadiBot(conn, RAEHANDATA) {
    const dir = './DataBoss/jadibot';
    if (!fs.existsSync(dir)) return;

    fs.readdir(dir, async (err, files) => {
        if (err) return console.log(chalk.redBright(`[ERROR] Gagal membaca direktori jadibot: ${err}`));
        
        for (let file of files) {
            const authPath = path.join(dir, file);
            if (fs.statSync(authPath).isDirectory()) {
                console.log(chalk.blueBright(`[JADIBOT] Memulai ulang sesi otomatis untuk: ${file}`));
                // Memanggil JadiBot dengan parameter m = null agar tidak error saat memanggil m.reply
           //     await JadiBot(conn, file, null, RAEHANDATA);
                // Jeda 3 detik setiap menyalakan sesi agar tidak terjadi rate limit/spam request
               
            }
        }
    });
}

export { JadiBot, StopJadiBot, ListJadiBot, AutoStartJadiBot }
