	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

import './HAN_EDIT.js';
import fs from 'fs';
import os from 'os';
import util from 'util';
import path from 'path';
import axios from 'axios';
import chalk from 'chalk';
import yts from 'yt-search';
import fetch from 'node-fetch';
import FileType from 'file-type';
import { Chess } from 'chess.js';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import webp from 'node-webpmux';
import { createRequire } from 'module';
import speed from 'performance-now';
import moment from 'moment-timezone';
import { performance } from 'perf_hooks';
import PhoneNum from 'awesome-phonenumber';
import { generateWAMessageContent, jidNormalizedUser, getContentType } from 'baileys';
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
import 'moment/min/locales.js';
import { UguuSe } from './DataBoss/uploader.js';
import { ytMp4, ytMp3 } from './DataBoss/scraper.js';
import { toAudio, toPTT, toVideo } from './DataBoss/converter.js';
import { GroupUpdate, LoadDataBase } from './src/message.js';
import { JadiBot, StopJadiBot, ListJadiBot } from './src/jadibot.js';
import { cmdAdd, cmdAddHit } from './src/database.js';
import { getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, formatDate, formatp, generateProfilePicture, errorCache, normalize, runUpdate, updateSettings, parseMention, fixBytes, similarity, pickRandom, encodeToLetters, tarBackup } from './DataBoss/function.js';
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const locales = moment.locales();
const timez = moment.tz.names();
const menfesTimeouts = new Map();
const settingsPath = path.join(__dirname, 'HAN_EDIT.js');
const fileContent = fs.readFileSync(__filename, 'utf-8');
const casesArray = [...fileContent.matchAll(/case\s+['"]([^'"]+)['"]/g)].map(match => match[1]);


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
	    
const HANZ = async (HANZ, m, msg, RAEHANDATA) => {
	if (!BossRAEHAN) BossRAEHAN = {};
	BossRAEHAN.cases = BossRAEHAN.cases || casesArray;
	const cases = BossRAEHAN.cases;
	await LoadDataBase(HANZ, m);
	const botNumber = HANZ.decodeJid(HANZ.user.id);
	const set = BossRAEHAN.set[botNumber]
	const ownerNumber = set.owner = [...new Set([...global.owner, botNumber.split('@')[0], ...set?.owner || []])];
	try {
		await GroupUpdate(HANZ, m, RAEHANDATA);
		const body = ((m.type === 'conversation') ? m.message.conversation :
		(m.type == 'imageMessage') ? m.message.imageMessage.caption :
		(m.type == 'videoMessage') ? m.message.videoMessage.caption :
		(m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
		(m.type == 'reactionMessage') ? m.message.reactionMessage.text :
		(m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
		(m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
		(m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
		(m.type == 'interactiveResponseMessage'  && m.quoted) ? (m.message.interactiveResponseMessage?.nativeFlowResponseMessage ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : '') :
		(m.type == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || '') :
		(m.type == 'editedMessage') ? (m.message.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || '') :
		(m.type == 'protocolMessage') ? (m.message.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.protocolMessage?.editedMessage?.conversation || m.message.protocolMessage?.editedMessage?.imageMessage?.caption || m.message.protocolMessage?.editedMessage?.videoMessage?.caption || '') : '') || '';
		
		
		
		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	    
	    
	    
		const budy = (typeof m.text == 'string' ? m.text : '')
		const isCreator = global.isOwner = ownerNumber.some(owner => {
			const ownerJid = owner.includes('@') ? owner : owner + '@s.whatsapp.net';
			const findJid = HANZ.findJidByLid(jidNormalizedUser(ownerJid), RAEHANDATA, true);
			if (!findJid) return false
			return findJid === m.sender
		});
		const symbolMatch = body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi);
		const emojiMatch = body.match(/^[\uD800-\uDBFF][\uDC00-\uDFFF]/gi); 
		const listMatch = global.listprefix.find(a => body?.startsWith(a));
		const detectedPrefix = symbolMatch ? symbolMatch[0] : (emojiMatch ? emojiMatch[0] : listMatch);
		const prefix = isCreator ? (detectedPrefix || set.authorPrefix) : set.multiprefix ? (detectedPrefix || '¿') : (listMatch || '¿');
		const isCmd = body.startsWith(prefix)
		const args = body.trim().split(/ +/).slice(1)
		const quoted = m.quoted ? m.quoted : m
		const command = isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : '';
		const text = global.q = args.join(' ')
		const mime = (quoted.msg || quoted).mimetype || ''
		const qmsg = (quoted.msg || quoted)
		const author = set.author = global.author || 'HANZdev';
		const packname = set.packname = global.packname || 'Bot WhatsApp';
		const botname = set.botname = global.botname || 'HANZ BOT';
		const Hari = moment.tz('Asia/Makassar').locale('id').format('dddd');
		const date = moment.tz('Asia/Makassar').locale('id').format('DD/MM/YYYY');
		const date_time = moment.tz('Asia/Makassar').locale('id').format('HH:mm:ss');
		const ucapanWaktu = date_time < '05:00:00' ? 'Selamat Pagi 🌉' : date_time < '11:00:00' ? 'Selamat Pagi 🌄' : date_time < '15:00:00' ? 'Selamat Siang 🏙' : date_time < '18:00:00' ? 'Selamat Sore 🌅' : date_time < '19:00:00' ? 'Selamat Sore 🌃' : date_time < '23:59:00' ? 'Selamat Malam 🌌' : 'Selamat Malam 🌌';
		const almost = 0.66
		const time = Date.now()
		const time_now = new Date()
		const time_end = 60000 - (time_now.getSeconds() * 1000 + time_now.getMilliseconds());
		const readmore = String.fromCharCode(8206).repeat(999)
		const setv = pickRandom(global.listv)
		const isBan = isCreator || (BossRAEHAN.users[m.sender] ? BossRAEHAN.users[m.sender].ban : false)
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
		const fkontak = {
			key: {
				remoteJid: '0@s.whatsapp.net',
				participant: '0@s.whatsapp.net',
				fromMe: false,
				id: 'HANZ'
			},
			message: {
				contactMessage: {
					displayName: (m.pushName || author),
					vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName || author},;;;\nFN:${m.pushName || author}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
					sendEphemeral: true
				}
			}
		}
		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
		if (m.message && m.key.remoteJid !== 'status@broadcast') {
				if (set.log) console.log(chalk.black(chalk.whiteBright('[CHAT]:'), chalk.greenBright(`${Hari} ${date} (${date_time})`), chalk.hex('#AF26EB')(m.key.id) + '\n' + chalk.hex('#00EAD3')(budy || m.type) + '\n' + chalk.cyanBright('[FROM]:'), chalk.yellowBright(m.pushName || (isCreator ? 'Bot' : 'Anonim')), chalk.hex('#FF449F')(m.sender.split('@')[0]), chalk.hex('#FF5700')(m.isGroup ? m.metadata.subject : m.chat.endsWith('@newsletter') ? 'Newsletter' : 'Private Chat'), chalk.blueBright('(' + m.chat + ')')));
				else console.log(chalk.black(chalk.bgWhite('[CHAT]:'), chalk.bgGreen(`${Hari} ${date} (${date_time})`), chalk.bgHex('#AF26EB')(m.key.id) + '\n' + chalk.bgHex('#00EAD3')(budy || m.type) + '\n' + chalk.bgCyanBright('[FROM]:'), chalk.bgYellow(m.pushName || (isCreator ? 'Bot' : 'Anonim')), chalk.bgHex('#FF449F')(m.sender), chalk.bgHex('#FF5700')(m.isGroup ? m.metadata.subject : m.chat.endsWith('@newsletter') ? 'Newsletter' : 'Private Chat'), chalk.bgBlue('(' + m.chat + ')')));
		}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
		if (m.isBot) return
		if (BossRAEHAN.users[m.sender]?.ban && !isCreator) return
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////			
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
// JANGAN DI HAPUS

if (!global.recentChats) global.recentChats = [];
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
  {  const isGroup = m.isGroup; 
    const isPrivate = !m.isGroup;
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
    global.recentChats = global.recentChats.filter(jid => jid !== m.chat);
    global.recentChats.unshift(m.chat);
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
              ////// BATAS CHAT ///////
//▬▭▬▭▬▭▬▭▬▬▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭
    if (global.recentChats.length > 10) {   global.recentChats.pop(); }
    for (let jid of global.recentChats) { await HANZ.sendPresenceUpdate('recording', jid);}}    
    
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	      
	          
		let fileSha256;
		if (m.isMedia && m.msg.fileSha256 && BossRAEHAN.cmd && (m.msg.fileSha256.toString('base64') in BossRAEHAN.cmd)) {
			let hash = BossRAEHAN.cmd[m.msg.fileSha256.toString('base64')]
			fileSha256 = hash.text }
		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
		switch(fileSha256 || command) {
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	 
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		 
			case 'setpphanz': {
	if (!isCreator) return 
				if (!/image/.test(quoted.type)) return m.reply(`Reply Image With Caption ${prefix + command}`)
let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
			
				let media = await quoted.download();
				let { generateProfilePicture } = require("./DataBoss/myfunc")
				let { img } = await generateProfilePicture(media, text.length > 0 ? null : 512)
				await HANZ.query({
					tag: 'iq',
					attrs: {
						to: '@s.whatsapp.net',
						type: 'set',
						xmlns: 'w:profile:picture'
					},
					content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
				});
				m.reply('suksess')
			}
			break



case 'setppgchanz': {
	if (!isCreator) return 
				if (!m.isGroup) return 
			
				if (!m.quoted) return m.reply('Reply Gambar yang mau dipasang di Profile Bot')
				if (!/image/.test(quoted.type)) return m.reply(`Reply Image Dengan Caption ${prefix + command}`)
let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
			
				let media = await quoted.download();
				let { generateProfilePicture } = require("./DataBoss/myfunc")
				let { img } = await generateProfilePicture(media, text.length > 0 ? null : 512)
				await HANZ.query({
					tag: 'iq',
					attrs: {
						target: m.chat,
						to: '@s.whatsapp.net',
						type: 'set',
						xmlns: 'w:profile:picture'
					},
					content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]
				});
				m.reply('suksess')
			}
			break


			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
			case 'listgc': {
	if (!isCreator) return 

				let anu = Object.keys(RAEHANDATA.messages).filter(a => a.endsWith('@g.us'));
				let teks = `● *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
				if (anu.length === 0) return m.reply(teks)
				for (let i of anu) {
					let metadata;
					try {
						metadata = RAEHANDATA.groupMetadata[i]
					} catch (e) {
						metadata = (RAEHANDATA.groupMetadata[i] = await HANZ.groupMetadata(i).catch(e => ({})))
					}
					teks += metadata?.subject ? `${setv} *Nama :* ${metadata.subject}\n${setv} *Admin :* ${metadata.ownerPn ? `@${metadata.ownerPn.split('@')[0]}` : '-' }\n${setv} *ID :* ${metadata.id}\n${setv} *Dibuat :* ${moment(metadata.creation * 1000).tz(global.timezone).format('DD/MM/YYYY HH:mm:ss')}\n${setv} *Member :* ${metadata.participants.length}\n\n=====================\n\n` : ''
				}
				await m.reply(teks)
			}
			break
			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	    
	    	
	    		
	    			
	    				
case 'jadibot': {

let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul				
				const nmrnya = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender
				const onWa = await HANZ.onWhatsApp(nmrnya)
				if (!onWa.length > 0) return m.reply('pakai .jadibot  bukan  . jadibot\nKalau . jadibot harus masukkan nomor\ncontoh :+62 000-000-000\nAsal Ada 62 nya ndak pakai garis - juga bisa.\n👍')
				await JadiBot(HANZ, nmrnya, m, RAEHANDATA)
				m.reply(`Gunakan ${prefix}stopjadibot\nUntuk Berhenti\n\n\nTunggu Sebentar\nmenyiapkan kode\nKode pairing WhatsApp
👇👇👇`)
				
			}
			break
			case 'stopjadibot' : {
			let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
				const nmrnya = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender
				const onWa = await HANZ.onWhatsApp(nmrnya)
				if (!onWa.length > 0) return m.reply('pakai .stopjadibot  bukan  . stopjadibot\nKalau . stopjadibot harus masukkan nomor\ncontoh :+62 000-000-000\nAsal Ada 62 nya ndak pakai garis - juga bisa.\n👍'
				const onWa = await HANZ.onWhatsApp(nmrnya)
				await StopJadiBot(HANZ, nmrnya, m)
			}
			break
			
			
			
			
			
			case 'listjadibot': {

				ListJadiBot(HANZ, m)
			}
			break
			
			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
			case 'versi': {
				const pkg = require('./package.json');
				m.reply(`Version : ${pkg.version}`); }
			
			break

	    		
			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    				
			case 'creategc': case 'buatgc': 
				if (!isCreator) return 
				if (!text) return m.reply(`Example:\n${prefix + command} *Nama Gc*`)
let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya 
			
				let group = await HANZ.groupCreate(q, [m.sender])
				let res = await HANZ.groupInviteCode(group.id)
				await m.reply(`*Link Group :* *https://chat.whatsapp.com/${res}*\n\n*Nama Group :* *${group.subject}*\nSegera Masuk dalam 30 detik\nAgar menjadi Admin`, { detectLink: true })
				await sleep(30000)
				await HANZ.groupParticipantsUpdate(group.id, [m.sender], 'promote').catch(e => {});
				await HANZ.sendMessage(group.id, { text: 'sukses' })
			}
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    		
			case 'upsw': {
if (!isCreator) return 

			
				const statusJidList = Object.keys(BossRAEHAN.users)
				const backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
				try {
					if (quoted.isMedia) {
						let media = await HANZ.downloadAndSaveMediaMessage(qmsg);
						try {
							if (/image|video/.test(quoted.mime)) {
								await HANZ.sendMessage('status@broadcast', {
									[`${quoted.mime.split('/')[0]}`]: { url: media },
									caption: text || m.quoted?.body || ''
								}, { statusJidList, broadcast: true })
								m.react('✅')
							} else if (/audio/.test(quoted.mime)) {
								await HANZ.sendMessage('status@broadcast', {
									audio: { url: media },
									mimetype: 'audio/mp4',
									ptt: true
								}, { backgroundColor, statusJidList, broadcast: true })
								m.react('✅')
							} else m.reply('Only Support video/audio/image/text')
						} finally {
							if (fs.existsSync(media)) fs.unlinkSync(media);
						}
					} else if (quoted.text) {
						await HANZ.sendMessage('status@broadcast', { text: text || m.quoted?.body || '' }, {
							textArgb: 0xffffffff,
							font: Math.floor(Math.random() * 9),
							backgroundColor, statusJidList,
							broadcast: true
						})
						m.react('✅')
					} else m.reply('Only Support video/audio/image/text')
				} catch (e) {
					m.reply('gagal')
				}
			}
			break
			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////				
			
			case 'add': {
if (!isCreator) return 
let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
				
				
			
				if (text || m.quoted) {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					const findJid = HANZ.findJidByLid(numbersOnly.replace(/[^0-9]/g, '') + '@lid', RAEHANDATA);
					const klss = numbersOnly.replace(/[^0-9]/g, '') + (findJid ? '@lid' :  '@s.whatsapp.net')
					const nmrnya = HANZ.findJidByLid(klss, RAEHANDATA, true)
					try {
						await HANZ.groupParticipantsUpdate(m.chat, [nmrnya], 'add').then(async (res) => {
							for (let i of res) {
								let invv = await HANZ.groupInviteCode(m.chat)
								const statusMessages = {
									200: `Berhasil menambahkan @${nmrnya.split('@')[0]} ke grup!`,
									401: 'Dia Memblokir Bot!',
									409: 'Dia Sudah Join!',
									500: 'Grup Penuh!'
								};
								if (statusMessages[i.status]) {
									return m.reply(statusMessages[i.status]);
								} else if (i.status == 408) {
									await m.reply(`@${nmrnya.split('@')[0]} Baru-Baru Saja Keluar Dari Grub Ini!\n\nKarena Target Private\n\nUndangan Akan Dikirimkan Ke\n-> wa.me/${nmrnya.replace(/\D/g, '')}\nMelalui Jalur Pribadi`)
									await m.reply(`${'https://chat.whatsapp.com/' + invv}\n------------------------------------------------------\n\nAdmin: @${m.sender.split('@')[0]}\nMengundang anda ke group ini\nSilahkan masuk jika berkehendak🙇`, { detectLink: true, chat: nmrnya, quoted: fkontak }).catch((err) => m.reply('Gagal Mengirim Undangan!'))
								} else if (i.status == 403) {
									let a = i.content.content[0].attrs
									await HANZ.sendGroupInviteV4(m.chat, nmrnya, a.code, a.expiration, m.metadata.subject, `Admin: @${m.sender.split('@')[0]}\nMengundang anda ke group ini\nSilahkan masuk jika berkehendak🙇`, null, { mentions: [m.sender] })
									await m.reply(`@${nmrnya.split('@')[0]} Tidak Dapat Ditambahkan\n\nKarena Target Private\n\nUndangan Akan Dikirimkan Ke\n-> wa.me/${nmrnya.replace(/\D/g, '')}\nMelalui Jalur Pribadi`)
								} else m.reply('Gagal Add User\nStatus : ' + i.status)
							}
						})
					} catch (e) {
						m.reply('gagal')
					}
				} else m.reply(`Example: ${prefix + command} 62xxx`)
			}
			break
			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
			
			case 'kick': {
if (!m.isGroup) return 
				if (!m.isAdmin) return 
				if (!m.isBotAdmin) return 
let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
				if (!m.isGroup) return 
				if (!m.isAdmin) return 
				if (!m.isBotAdmin) return 
				if (text || m.quoted) {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					const findJid = HANZ.findJidByLid(numbersOnly.replace(/[^0-9]/g, '') + '@lid', RAEHANDATA);
					const klss = numbersOnly.replace(/[^0-9]/g, '') + (findJid ? '@lid' :  '@s.whatsapp.net')
					const nmrnya = HANZ.findJidByLid(klss, RAEHANDATA, true)
					await HANZ.groupParticipantsUpdate(m.chat, [nmrnya], 'remove').catch((err) => m.reply('gagal'))
				} else m.reply(`Example: ${prefix + command} 62xxx`)
			}
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    			

			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
			case 'linkgc': {
	if (!m.isGroup) return 
				if (!m.isAdmin) return 
				if (!m.isBotAdmin) return 
let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
			
				let response = await HANZ.groupInviteCode(m.chat)
				await m.reply(`https://chat.whatsapp.com/${response}\n\nLink Group : ${(RAEHANDATA.groupMetadata[m.chat] ? RAEHANDATA.groupMetadata[m.chat] : (RAEHANDATA.groupMetadata[m.chat] = await HANZ.groupMetadata(m.chat))).subject}`, { detectLink: true })
			}
			break
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
			case 'liston': {
			if (!isCreator) return 
	if (!m.isGroup) return 
				
let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
			
				let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
				if (!RAEHANDATA.presences || !RAEHANDATA.presences[id]) return m.reply('Sedang Tidak ada yang online!')
				const groupPresences = RAEHANDATA.presences[id];
				const metadata = RAEHANDATA.groupMetadata[id];
				let list_online = [];
				if (metadata && metadata.participants) {
					for (const p of metadata.participants) {
						if (groupPresences[p.id]) {
							list_online.push(p.phoneNumber);
						}
					}
				}
				if (!list_online.includes(botNumber)) {
					list_online.push(botNumber);
				}
				if (list_online.length === 0) return m.reply('Sedang tidak ada yang online!'); 
				let textReply = '*List Online:*\n\n' + list_online.map(v => setv + ' @' + v.split('@')[0]).join('\n');
				await m.reply(textReply, { mentions: list_online }).catch(() => m.reply('Gagal menampilkan list online..'));
			}
			break
		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
			// Bot Menu
			case 'owner': {


				await HANZ.sendContact(m.chat, ownerNumber, m);
			}
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	    	
			case 'totalfitur': {

let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
				const total = ((fs.readFileSync(__filename).toString()).match(/case '/g) || []).length
				m.reply(`Total Fitur : ${total}`);
			}
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
			case 'tagme': {


				m.reply(`@${m.sender.split('@')[0]}`, { mentions: [m.sender] })
			}
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
					
			case 'ping': {

let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
				const used = process.memoryUsage()
				const cpus = os.cpus().map(cpu => {
					cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
					return cpu
				})
				const cpu = cpus.reduce((last, cpu, _, { length }) => {
					last.total += cpu.total
					last.speed += cpu.speed / length
					last.times.user += cpu.times.user
					last.times.nice += cpu.times.nice
					last.times.sys += cpu.times.sys
					last.times.idle += cpu.times.idle
					last.times.irq += cpu.times.irq
					return last
				}, {
					speed: 0,
					total: 0,
					times: {
						user: 0,
						nice: 0,
						sys: 0,
						idle: 0,
						irq: 0
					}
				})
				let timestamp = speed()
				let latensi = speed() - timestamp
				let neww = performance.now()
				let oldd = performance.now()
				let respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}\n\n💻 Info Server\nRAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}\n\n_NodeJS Memory Usaage_\n${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}\n\n${cpus[0] ? `_Total CPU Usage_\n${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}\n_CPU Core(s) Usage (${cpus.length} Core CPU)_\n${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}`.trim()
				m.reply(respon)
			}
			break
			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    		
			case 'speed': {

let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
				
				let cp = require('child_process')
				let { promisify } = require('util')
				let exec = promisify(cp.exec).bind(cp)
				let o
				try {
					o = await exec('python3 speed.py --share')
				} catch (e) {
					o = e
				} finally {
					let { stdout, stderr } = o
					if (stdout.trim()) m.reply(stdout)
					if (stderr.trim()) m.reply(stderr)
				}
			}
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    		
			 case 'rvo': {
	if (!isCreator) return
				if (!m.quoted) return m.reply('reply fotonya')
			
				try {
					if (m.quoted.msg.viewOnce) {
						delete m.quoted.chat
						m.quoted.msg.viewOnce = false
						await m.reply({ forward: m.quoted })
					} else m.reply(`Reply view once message\nExample: ${prefix + command}`)
				} catch (e) {
					m.reply('Media Tidak Valid!')
				}
			}
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
			case 'inspect': {
	if (!text) return m.reply('Masukkan Link Grup atau Saluran!')
let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\nTUNGGU SEBENTAR"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
			
				let _grup = /chat.whatsapp.com\/([\w\d]*)/;
				let _saluran = /whatsapp\.com\/channel\/([\w\d]*)/;
				if (_grup.test(text)) {
					await HANZ.groupGetInviteInfo(text.match(_grup)[1]).then((_g) => {
						let teks = `*[ INFORMATION GROUP ]*\n\nName Group: ${_g.subject}\nGroup ID: ${_g.id}\nCreate At: ${new Date(_g.creation * 1000).toLocaleString()}${_g.owner ? ('\nCreate By: ' + _g.owner) : '' }\nLinked Parent: ${_g.linkedParent}\nRestrict: ${_g.restrict}\nAnnounce: ${_g.announce}\nIs Community: ${_g.isCommunity}\nCommunity Announce:${_g.isCommunityAnnounce}\nJoin Approval: ${_g.joinApprovalMode}\nMember Add Mode: ${_g.memberAddMode}\nDescription ID: ${'`' + _g.descId + '`'}\nDescription: ${_g.desc}\nParticipants:\n`
						_g.participants.forEach((a) => {
							teks += a.admin ? `- Admin: @${a.id.split('@')[0]} [${a.admin}]\n` : ''
						})
						m.reply(teks)
					}).catch((e) => {
						if ([400, 406].includes(e.data)) return m.reply('Grup Tidak Di Temukan❗');
						if (e.data == 401) return m.reply('Bot Di Kick Dari Grup Tersebut❗');
						if (e.data == 410) return m.reply('Url Grup Telah Di Setel Ulang❗');
					});
				} else if (_saluran.test(text) || text.endsWith('@newsletter') || !isNaN(text)) {
					await HANZ.newsletterMsg(text.match(_saluran)[1]).then((n) => {
						m.reply(`*[ INFORMATION CHANNEL ]*\n\nID: ${n.id}\nState: ${n.state.type}\nName: ${n.thread_metadata.name.text}\nCreate At: ${new Date(n.thread_metadata.creation_time * 1000).toLocaleString()}\nSubscriber: ${n.thread_metadata.subscribers_count}\nVerification: ${n.thread_metadata.verification}\nDescription: ${n.thread_metadata.description.text}\n`)
					}).catch((e) => m.reply('Saluran Tidak Di Temukan❗'))
				} else m.reply('Hanya Support Url Grup atau Saluran!')
			}
			break
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
			
			
			
			 
			case 'tourl': {

				if (/webp|video|sticker|audio|jpg|jpeg|png/.test(mime)) {
					
					let media = await HANZ.downloadAndSaveMediaMessage(qmsg);
					try {
						let anu = await UguuSe(media);
						m.reply('Url : ' + anu.url)
					} finally {
						if (fs.existsSync(media)) fs.unlinkSync(media)
					}
				} else m.reply('sukses')
			}
			break
			
			
			
			case 'wastalk': {
	if (!text) return m.reply(`Example: ${prefix + command} @tag / 628xxx`)
				
			
				try {
					let num = m.quoted?.sender || m.mentionedJid?.[0] || text
					if (!num) return m.reply(`Example : ${prefix + command} @tag / 628xxx`)
					num = num.replace(/\D/g, '') + '@s.whatsapp.net'
					if (!(await HANZ.onWhatsApp(num))[0]?.exists) return m.reply('Nomer tidak terdaftar di WhatsApp!')
					let img = await HANZ.profilePictureUrl(num, 'image').catch(_ => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60')
					let bio = await HANZ.fetchStatus(num).catch(_ => { })
					let name = await HANZ.getName(num)
					let business = await HANZ.getBusinessProfile(num)
					let format = PhoneNum(`+${num.split('@')[0]}`)
					let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
					let country = regionNames.of(format.getRegionCode('international'));
					let wea = `WhatsApp Stalk\n\n*° Country :* ${country.toUpperCase()}\n*° Name :* ${name ? name : '-'}\n*° Format Number :* ${format.getNumber('international')}\n*° Url Api :* wa.me/${num.split('@')[0]}\n*° Mentions :* @${num.split('@')[0]}\n*° Status :* ${bio?.status || '-'}\n*° Date Status :* ${bio?.setAt ? moment(bio.setAt.toDateString()).locale(global.locale).format('LL') : '-'}\n\n${business ? `*WhatsApp Business Stalk*\n\n*° BusinessId :* ${business.wid}\n*° Website :* ${business.website ? business.website : '-'}\n*° Email :* ${business.email ? business.email : '-'}\n*° Category :* ${business.category}\n*° Address :* ${business.address ? business.address : '-'}\n*° Timeone :* ${business.business_hours.timezone ? business.business_hours.timezone : '-'}\n*° Description* : ${business.description ? business.description : '-'}` : '*Standard WhatsApp Account*'}`
					img ? await HANZ.sendMessage(m.chat, { image: { url: img }, caption: wea, mentions: [num] }, { quoted: m }) : m.reply(wea)
				} catch (e) {
					m.reply('Nomer Tidak ditemukan!')
				}
			}
			break
			case 'ghstalk': {
	
				if (!text) return m.reply(`Example: ${prefix + command} usernamenya`)

			
				try {
					const res = await fetchJson('https://api.github.com/users/' + text)
					m.reply({ image: { url: res.avatar_url }, caption: `*Username :* ${res.login}\n*Nickname :* ${res.name || 'Tidak ada'}\n*Bio :* ${res.bio || 'Tidak ada'}\n*ID :* ${res.id}\n*Node ID :* ${res.node_id}\n*Type :* ${res.type}\n*Admin :* ${res.admin ? 'Ya' : 'Tidak'}\n*Company :* ${res.company || 'Tidak ada'}\n*Blog :* ${res.blog || 'Tidak ada'}\n*Location :* ${res.location || 'Tidak ada'}\n*Email :* ${res.email || 'Tidak ada'}\n*Public Repo :* ${res.public_repos}\n*Public Gists :* ${res.public_gists}\n*Followers :* ${res.followers}\n*Following :* ${res.following}\n*Created At :* ${res.created_at} *Updated At :* ${res.updated_at}` })
				} catch (e) {
					m.reply('Username Tidak ditemukan!')
				}
			}
			break
			
			
			
case 'toptv': {
				if (!/video/.test(mime)) return m.reply(`Kirim/Reply Video Yang Ingin Dijadikan PTV Message Dengan Caption ${prefix + command}`)
				if ((m.quoted ? m.quoted.type : m.type) === 'videoMessage') {
					
					let media = await HANZ.downloadAndSaveMediaMessage(qmsg);
					try {
						const message = await generateWAMessageContent({ video: { url: media } }, { upload: HANZ.waUploadToServer })
						await HANZ.relayMessage(m.chat, { ptvMessage: message.videoMessage }, {})
					} finally {
						if (fs.existsSync(media)) fs.unlinkSync(media)
					}
				} else m.reply('Reply Video Yang Mau Di Ubah Ke PTV Message!')
			}
			break			
			
			
			
			
			case 'hanz' :  { //m.reply (
			
			let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\n𝘔𝘌𝘕𝘈𝘔𝘗𝘐𝘓𝘒𝘈𝘕 𝘗𝘙𝘖𝘑𝘌𝘊𝘛"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
			const hanzzz =
			`
▬▭▬▭▬▭▬▭▬▬▭▬▭

◎ ${ucapanWaktu}
◎ ${m.sender.split('@')[0]}
◎ Hari ${Hari}
◎ Jam ${date_time} WITA

▬▭▬▭▬▭▬▭▬▬▭▬▭

╭━━━━━━━━━━━╾•
├→  ${setv} ${prefix}setpphanz
├→  ${setv} ${prefix}setppgchanz
├→  ${setv} ${prefix}upsw
├→  ${setv} ${prefix}rvo
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}listgc
├→  ${setv} ${prefix}buatgc
├→  ${setv} ${prefix}add
├→  ${setv} ${prefix}kick
├→  ${setv} ${prefix}linkgc
├→  ${setv} ${prefix}liston
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}owner
├→  ${setv} ${prefix}versi
├→  ${setv} ${prefix}totalfitur
├→  ${setv} ${prefix}tagme
├→  ${setv} ${prefix}ping
├→  ${setv} ${prefix}speed
├→  ${setv} ${prefix}inspect
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}jadibot
├→  ${setv} ${prefix}stopjadibot
├→  ${setv} ${prefix}listjadibot
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}toptv
├→  ${setv} ${prefix}tourl
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}wastalk
├→  ${setv} ${prefix}ghstalk
╰━━━━━━━━━━━━╯
▬▭▬▭▬▭▬▭▬▬▭▬▭

Aktif ;  ${runtime(process.uptime())}

CPU :  ${os.cpus()[0]?.model.trim()}

MEMORY :  ${(os.freemem()/1024/1024).toFixed(0)} MiB / ${(os.totalmem()/0).toFixed(0)} MiB

▬▭▬▭▬▭▬▭▬▬▭▬▭` // ) }
HANZ.sendMessage(m.chat, { image: {url: 'https://telegra.ph/file/7b8b904ecabdbe0744635.jpg'}, 
"contextInfo": {
"externalAdReply": {
"title": `⏤͟͟͞ℍ𝔸ℕℤ`,
"previewType": "PHOTO",
"showAdAttribution": true,
"sourceUrl": `https://on.soundcloud.com/3tNTEb7qIj9LYZvLxc`,
"thumbnailUrl": `https://telegra.ph/file/e6a4267a437b6129a5f1c.jpg`
}}, caption: hanzzz })
}


break


case 'menu' :  { //m.reply (
			
			let { key } = await HANZ.sendMessage(m.chat, { text: 'LOADING SCRIPT RAEHAN' }, { quoted: m });
			const loadingAnimation = [
				"「 ▒▒▒▒▒▒▒▒▒▒ 」 0%",
				"「 █▒▒▒▒▒▒▒▒▒ 」 10%",
				"「 ██▒▒▒▒▒▒▒▒ 」 20%",
				"「 ███▒▒▒▒▒▒▒ 」 30%",
				"「 ████▒▒▒▒▒▒ 」 40%",
				"「 █████▒▒▒▒▒ 」 50%",
				"「 ██████▒▒▒▒ 」 60%",
				"「 ████████▒▒ 」 80%",
				"「 █████████▒ 」 99%",
				"「 ███████████ 」 100%\n\n𝘔𝘌𝘕𝘈𝘔𝘗𝘐𝘓𝘒𝘈𝘕 𝘗𝘙𝘖𝘑𝘌𝘊𝘛"
			];

			// 3. Looping untuk mengedit pesan secara berkala
			for (let i = 0; i < loadingAnimation.length; i++) {
				await sleep(0); // Jeda 0.4 detik per perubahan frame
				await HANZ.sendMessage(m.chat, { text: loadingAnimation[i], edit: key });
			}

			await sleep(100); // Jeda sebentar sebelum menu aslinya muncul
			const hanzzz =
			`
▬▭▬▭▬▭▬▭▬▬▭▬▭

◎ ${ucapanWaktu}
◎ ${m.sender.split('@')[0]}
◎ Hari ${Hari}
◎ Jam ${date_time} WITA

▬▭▬▭▬▭▬▭▬▬▭▬▭

╭━━━━━━━━━━━╾•
├→  ${setv} ${prefix}setpphanz
├→  ${setv} ${prefix}setppgchanz
├→  ${setv} ${prefix}upsw
├→  ${setv} ${prefix}rvo
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}listgc
├→  ${setv} ${prefix}buatgc
├→  ${setv} ${prefix}add
├→  ${setv} ${prefix}kick
├→  ${setv} ${prefix}linkgc
├→  ${setv} ${prefix}liston
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}owner
├→  ${setv} ${prefix}versi
├→  ${setv} ${prefix}totalfitur
├→  ${setv} ${prefix}tagme
├→  ${setv} ${prefix}ping
├→  ${setv} ${prefix}speed
├→  ${setv} ${prefix}inspect
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}jadibot
├→  ${setv} ${prefix}stopjadibot
├→  ${setv} ${prefix}listjadibot
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}toptv
├→  ${setv} ${prefix}tourl
├━━━━━━━━━━━╾
├→  ${setv} ${prefix}wastalk
├→  ${setv} ${prefix}ghstalk
╰━━━━━━━━━━━━╯
▬▭▬▭▬▭▬▭▬▬▭▬▭

Aktif ;  ${runtime(process.uptime())}

CPU :  ${os.cpus()[0]?.model.trim()}

MEMORY :  ${(os.freemem()/1024/1024).toFixed(0)} MiB / ${(os.totalmem()/0).toFixed(0)} MiB

▬▭▬▭▬▭▬▭▬▬▭▬▭` // ) }
HANZ.sendMessage(m.chat, { image: {url: 'https://telegra.ph/file/7b8b904ecabdbe0744635.jpg'}, caption: hanzzz })
}


break
			
			
			
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
			default:
			if (budy.startsWith('>')) {
				if (!isCreator) return
				try {
					let evaled = await eval(budy.slice(2))
					if (typeof evaled !== 'string') evaled = util.inspect(evaled)
					await m.reply(evaled)
				} catch (err) {
					await m.reply(String(err))
				}
			}
			if (budy.startsWith('<')) {
				if (!isCreator) return
				try {
					let evaled = await eval(`(async () => { ${budy.slice(2)} })()`)
					if (typeof evaled !== 'string') evaled = util.inspect(evaled)
					await m.reply(evaled)
				} catch (err) {
					await m.reply(String(err))
				}
			}
			if (budy.startsWith('$')) {
				if (!isCreator) return
				if (!text) return
				exec(budy.slice(2), (err, stdout) => {
					if (err) return m.reply(`${err}`)
					if (stdout) return m.reply(stdout)
				})
			}
			if ((!isCmd || isCreator) && budy.toLowerCase() != undefined) {
				if (m.chat.endsWith('broadcast')) return
				if (!(budy.toLowerCase() in BossRAEHAN.database)) return
				await HANZ.relayMessage(m.chat, BossRAEHAN.database[budy.toLowerCase()], {})
			}
		}
	} catch (e) {
		console.log(e);
	
		const errorKey = e?.code || e?.name || e?.message?.slice(0, 100) || 'unknown_error';
		const now = Date.now();
		if (!errorCache[errorKey]) errorCache[errorKey] = [];
	
		if (errorCache[errorKey].length >= 3) return;
		errorCache[errorKey].push(now);
		const isAxiosError = e?.isAxiosError || !!e?.response; 
		const statusCode = e?.response?.status || e?.statusCode || e?.data;
		const errorUrl = e?.config?.url || e?.request?.host || '';
		if (statusCode === 500) {
			m.reply('Server API Error: Terjadi gangguan pada server tujuan.');
		}  else m.reply('Error: ' + (e?.name || e?.code || e?.message || 'Terjadi kesalahan tidak diketahui') + '\nLog Error Telah dikirim ke Owner\n\n');
		return HANZ.sendFromOwner(ownerNumber, `Halo sayang, sepertinya ada yang error nih, jangan lupa diperbaiki ya\n\nVersion : *${require('./package.json').version}*\nType : *${m.type || errorKey}*\n\n*Log error:*\n\n` + util.format(e), m, { contextInfo: { isForwarded: true }})
	}
}

export default HANZ;
