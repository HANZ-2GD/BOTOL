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
import { exec, spawn, execSync } from 'child_process';
import { parsePhoneNumber } from 'awesome-phonenumber';
import WAConnection, { useMultiFileAuthState, Browsers, DisconnectReason, jidNormalizedUser, makeCacheableSignalKeyStore, fetchLatestWaWebVersion } from 'baileys';
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
			const { state, saveCreds } = await useMultiFileAuthState(`./DataBoss/jadibot/${from}`);
			const level = pino({ level: 'silent' })
			
			const getMessage = async (key) => {
				if (RAEHANDATA) {
					const msg = await RAEHANDATA.loadMessage(key.remoteJid, key.id);
					return msg?.message || ''
				}
				return {
					conversation: 'Halo Saya Adalah Bot'
				}
			}
			
			
			
			
			client[from] = WAConnection({
				version,
				logger: level,
				getMessage,
				syncFullHistory: false,
				browser: Browsers.macOS('Firefox'),
				generateHighQualityLinkPreview: true,
				auth: {
					creds: state.creds,
					keys: makeCacheableSignalKeyStore(state.keys, level),
				},
			})
			
			
			
			await Solving(client[from], RAEHANDATA)
			client[from].pairingStarted = false;
			client[from].ev.on('creds.update', saveCreds)
			
			
			
			client[from].ev.on('connection.update', async (update) => {
				const { connection, lastDisconnect, receivedPendingNotifications } = update
				if (connection === 'connecting' && !client[from].authState.creds.registered && !client[from].pairingStarted) {
					setTimeout(async () => {
						if (!client[from]) return;
						client[from].pairingStarted = true;
						let code = await client[from].requestPairingCode(from.replace(/[^0-9]/g, ''));
						if (!client[from]) return;
					m.reply(` ${code?.match(/.{1,4}/g)?.join('-') || code}`);
					}, 3000);
				}
				if (connection === 'close') {
					if (!client[from]) return;
					const reason = new Boom(lastDisconnect?.error)?.output.statusCode
					console.log(reason)
					if ([DisconnectReason.connectionLost, DisconnectReason.connectionClosed, DisconnectReason.restartRequired, DisconnectReason.timedOut, DisconnectReason.badSession, DisconnectReason.connectionReplaced].includes(reason)) {
						JadiBot(conn, from, m, RAEHANDATA)
					} else if (reason === DisconnectReason.loggedOut) {
						m.reply('Sesi telah Log Out. Menghapus data, silakan scan/pairing ulang...');
						StopJadiBot(conn, from, m)
					} else if (reason === DisconnectReason.Multidevicemismatch) {
						m.reply('Sesi tidak valid (Mismatch). Menghapus data, silakan scan ulang...');
						StopJadiBot(conn, from, m)
					} else {
						m.reply('ANDA SUDAH TIDAK LAGI MENJADI BOT!')
						StopJadiBot(conn, from, m)
					}
				}
				if (connection == 'open') {
					let botNumber = await client[from].decodeJid(client[from].user.id);
					// FIX: Akses aman ke database global BossRAEHAN
					if (global.BossRAEHAN?.set?.[botNumber] && !global.BossRAEHAN.set[botNumber]?.join) {
						global.BossRAEHAN.set[botNumber].original = false
						// FIX: Pengecekan aman untuk global.my karena di settings.js sedang di comment
						 {
							
							global.BossRAEHAN.set[botNumber].join = true
						}
					}
				}
				if (receivedPendingNotifications == 'true') {
					client[from].ev.flush()
				}
			});
			
			
			
			
			
			
	client[from].ev.on('call', async (call) => {
	let botNumber = await client[from].decodeJid(client[from].user.id);{
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
					let msg = await client[from].sendMessage(id.from, { image: {url: 'https://ar-hosting.pages.dev/1775121854710.png'},caption: hanzzz, mentions: [id.from]});
							
							await client[from].rejectCall(id.id, id.from)
						}
					}
				}
			});
			
			
			
			
			client[from].ev.on('messages.upsert', async (message) => {
				 MessagesUpsert(client[from], message, RAEHANDATA);
			});
			
			
			
			
		
			return client[from]
		} catch (e) {
			console.log(chalk.redBright(`[ERROR] ${e}`))
		}
	}
	return startJadiBot()
}






async function StopJadiBot(conn, from, m) {
	if (!Object.keys(client).includes(from)) {
		return conn.sendMessage(m.chat, { text: 'ANDA TIDAK SEDANG MEMAKAI BOT INI' }, { quoted: m })
	}
	try {
		client[from].ev.removeAllListeners()
		if (client[from].ws) client[from].ws.close()
		// FIX: Menggunakan logout() karena Baileys tidak punya fungsi .end()
		client[from].logout().catch(e => {}) 
	} catch (e) {
		console.log(chalk.redBright(`[ERROR] ${e}`))
	}
	delete client[from]
	// FIX 2: Ubah direktori yang dihapus ke DataBoss agar sesuai dengan inisialisasi awal
	exec(`rm -rf ./DataBoss/jadibot/${from}`)
	return m.reply('ANDA TELAH KELUAR DARI SESI JADI BOT, SILAHKAN KETIK   .jadibot    JIKA INGIN MENGGUNAKAN NYA KEMBALI ( TERIMA KASIH )')
}





async function ListJadiBot(conn, m) {
	let teks = 'PEMAKAI BOT SAAT INI :\n\n'
	for (let jadibot of Object.values(client)) {
		teks += (jadibot.user?.id ? `- @${conn.decodeJid(jadibot.user.id).split('@')[0]}\n` : '')
	}
	return m.reply(teks)
}

export { JadiBot, StopJadiBot, ListJadiBot }
