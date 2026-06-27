import '../HAN_EDIT.js';
import fs from 'fs';
import path from 'path';
import https from 'https';
import axios from 'axios';
import chalk from 'chalk';
import crypto from 'crypto';
import FileType from 'file-type';
import chokidar from 'chokidar';
import { fileURLToPath } from 'url';
import PhoneNumber from 'awesome-phonenumber';
import { imageToWebp, videoToWebp, writeExif, gifToWebp } from '../DataBoss/exif.js';
import { getBuffer, getSizeMedia, fetchJson, sleep, axiosss, fixBytes } from '../DataBoss/function.js';
import { jidNormalizedUser, proto, getBinaryNodeChildren, getBinaryNodeChildString, getBinaryNodeChild, generateMessageIDV2, jidEncode, encodeSignedDeviceIdentity, generateWAMessageContent, generateForwardMessageContent, prepareWAMessageMedia, delay, areJidsSameUser, extractMessageContent, generateMessageID, downloadContentFromMessage, generateWAMessageFromContent, jidDecode, generateWAMessage, toBuffer, getContentType, getDevice } from 'baileys';


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HANZPath = fileURLToPath(new URL('../HANZ.js', import.meta.url));

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

let HANZHandler = null;

const groupMetadataTimers = {};

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

const reloadHandler = async () => {
	try {
		HANZHandler = (await import(`../HANZ.js?update=${Date.now()}`)).default;
	} catch (err) {
		console.error(chalk.redBright(`[ ERROR ] ${err}`));
	}
};

reloadHandler();

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    
async function GroupUpdate(HANZ, m, RAEHANDATA) {
	function clearParse(parse) {
		try {
			return JSON.parse(parse);
		} catch {
			return parse;
		}
	}
	if (!m.messageStubType || !m.isGroup) return
	if (BossRAEHAN?.groups?.[m.chat] && RAEHANDATA?.groupMetadata?.[m.chat]) {
		const admin = `@${m.sender.split('@')[0]}`
		const metadata = RAEHANDATA.groupMetadata[m.chat];
		const normalizedTarget = clearParse(m.messageStubParameters[0]);
		const type = m.messageStubType;
		
		
	}
}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

async function GroupParticipantsUpdate(HANZ, update, RAEHANDATA) {
	try {
		const { id, participants, author, action } = update;
		function updateAdminStatus(participants, metadataParticipants, status) {
			for (const participant of metadataParticipants) {
				if (participants.includes(jidNormalizedUser(participant.id)) || participants.includes(jidNormalizedUser(participant.phoneNumber))) {
					participant.admin = status;
				}
			}
		}
	
	} catch (e) {
		throw e;
	}
}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

async function LoadDataBase(HANZ, m) {
	try {
		const botNumber = await HANZ.decodeJid(HANZ.user.id);
	
		let user = BossRAEHAN.users[m.sender] || {};
		let setBot = BossRAEHAN.set[botNumber] || {};
	
		BossRAEHAN.users[m.sender] = user;
		BossRAEHAN.set[botNumber] = setBot;
		
		const defaultSetBot = {
			lang: 'id',
			multiprefix: false,
			privateonly: true,
			author: global.author || 'HANZ',
			authorPrefix: '',
			botname: global.botname || 'HAN Bot',
			packname: global.packname || 'BOT HNZ',
			owner: global.owner,
		};
		for (let key in defaultSetBot) {
			if (!(key in setBot)) setBot[key] = defaultSetBot[key];
		}
		
		
	} catch (e) {
		throw e
	}
}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

async function MessagesUpsert(HANZ, message, RAEHANDATA) {
	try {
		let botNumber = await HANZ.decodeJid(HANZ.user.id);
		const msg = message.messages[0];
		
		
		const remoteJid = msg.key.remoteJid;
		(RAEHANDATA.messages ??= {})[remoteJid] ??= {};
		RAEHANDATA.messages[remoteJid].array ??= [];
	//	RAEHANDATA.messages[remoteJid].keyId ??= new Set();
		//if (!(RAEHANDATA.messages[remoteJid].keyId instanceof Set)) {
	//		RAEHANDATA.messages[remoteJid].keyId = new Set(RAEHANDATA.messages[remoteJid].array.map(m => m.key.id));
		//}
		if (RAEHANDATA.messages[remoteJid].keyId.has(msg.key.id)) return;
		RAEHANDATA.messages[remoteJid].array.push(msg);
		RAEHANDATA.messages[remoteJid].keyId.add(msg.key.id);
		if (!RAEHANDATA.groupMetadata || Object.keys(RAEHANDATA.groupMetadata).length === 0) RAEHANDATA.groupMetadata ??= await HANZ.groupFetchAllParticipating().catch(e => ({}));
		const type = msg.message ? (getContentType(msg.message) || Object.keys(msg.message)[0]) : '';
		const m = await Serialize(HANZ, msg, RAEHANDATA);
		if (HANZHandler) {
			HANZHandler(HANZ, m, msg, RAEHANDATA);
		}
	} catch (e) {
		console.log(message);
		throw e;
	}
}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
async function Solving(HANZ, RAEHANDATA) {
	HANZ.serializeM = (m) => MessagesUpsert(HANZ, m, RAEHANDATA)
	
	HANZ.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	
	HANZ.findJidByLid = (lid, RAEHANDATA, resolve = false) => {
		const groupMeta = RAEHANDATA?.groupMetadata
		if (groupMeta) {
			for (const g of Object.values(groupMeta)) {
				if (!g?.participants) continue
				for (const contact of g.participants) {
					if (((contact?.id?.includes(lid)) || (contact?.phoneNumber?.includes(lid))) && contact?.phoneNumber) {
						return contact.phoneNumber
					}
				}
			}
		}
		
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
		const contacts = RAEHANDATA?.contacts
		if (contacts) {
			for (const contact of Object.values(contacts)) {
				if (((contact?.id?.includes(lid)) || (contact?.phoneNumber?.includes(lid))) && contact?.phoneNumber) {
					return contact.phoneNumber
				}
			}
		}
		if (resolve) return lid
		return null
	}


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    		
	HANZ.getName = (jid, withoutContact  = false) => {
		const id = HANZ.decodeJid(jid);
		if (id.endsWith('@g.us')) {
			const groupInfo = RAEHANDATA.contacts[id] || (RAEHANDATA.groupMetadata[id] ? RAEHANDATA.groupMetadata[id] : (RAEHANDATA.groupMetadata[id] = HANZ.groupMetadata(id))) || {};
			return Promise.resolve(groupInfo.name || groupInfo.subject || PhoneNumber('+' + id.replace('@g.us', '')).getNumber('international'));
		} else {
			if (id === '0@s.whatsapp.net') {
				return 'WhatsApp';
			}
		const contactInfo = RAEHANDATA.contacts[id] || {};
		return withoutContact ? '' : contactInfo.name || contactInfo.subject || contactInfo.verifiedName || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international');
		}
	}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    	
	HANZ.sendContact = async (jid, kon, quoted = '', opts = {}) => {
		let list = []
		for (let i of kon) {
			list.push({
				displayName: await HANZ.getName(i + '@s.whatsapp.net'),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await HANZ.getName(i + '@s.whatsapp.net')}\nFN:${await HANZ.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.ADR:;;Indonesia;;;;\nitem2.X-ABLabel:Region\nEND:VCARD`
			})
		}
		HANZ.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || RAEHANDATA?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 });
	}
	
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    		
	HANZ.profilePictureUrl = async (jid, type = 'image', timeoutMs) => {
		const result = await HANZ.query({
			tag: 'iq',
			attrs: {
				target: jidNormalizedUser(jid),
				to: '@s.whatsapp.net',
				type: 'get',
				xmlns: 'w:profile:picture'
			},
			content: [{
				tag: 'picture',
				attrs: {
					type, query: 'url'
				},
			}]
		}, timeoutMs);
		const child = getBinaryNodeChild(result, 'picture');
		return child?.attrs?.url;
	}
	
	HANZ.setStatus = (status) => {
		HANZ.query({
			tag: 'iq',
			attrs: {
				to: '@s.whatsapp.net',
				type: 'set',
				xmlns: 'status',
			},
			content: [{
				tag: 'status',
				attrs: {},
				content: Buffer.from(status, 'utf-8')
			}]
		})
		return status
	}


	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	
	HANZ.relayMessageV2 = async (jid, message, options) => {
		const msg = generateWAMessageFromContent(jid, message, {
			upload: HANZ.waUploadToServer,
			messageId: generateMessageID(),
			...options
		});
		const hasil = await HANZ.relayMessage(jid, msg.message, {
			messageId: msg.key.id,
			...options
		});
		return hasil;
	}
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	

	HANZ.sendPoll = (jid, name = '', values = [], quoted, selectableCount = 1) => {
		return HANZ.sendMessage(jid, { poll: { name, values, selectableCount }}, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || RAEHANDATA?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 })
	}
	
	HANZ.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		const quotedOptions = { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || RAEHANDATA?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 }
		try {
			const res = await axios.head(url);
			let mime = res.headers['content-type'];
			if (mime && mime.includes('gif')) {
				return HANZ.sendMessage(jid, { video: { url }, caption: caption, gifPlayback: true, ...options }, quotedOptions);
			} else if (mime && mime === 'application/pdf') {
				return HANZ.sendMessage(jid, { document: { url }, mimetype: 'application/pdf', caption: caption, ...options }, quotedOptions);
			} else if (mime && mime.includes('image')) {
				return HANZ.sendMessage(jid, { image: { url }, caption: caption, ...options }, quotedOptions);
			} else if (mime && mime.includes('video')) {
				return HANZ.sendMessage(jid, { video: { url }, caption: caption, mimetype: 'video/mp4', ...options }, quotedOptions);
			} else if (mime && mime.includes('audio')) {
				return HANZ.sendMessage(jid, { audio: { url }, mimetype: 'audio/mpeg', ...options }, quotedOptions);
			} else {
				return HANZ.sendMessage(jid, { document: { url }, caption: caption, mimetype: mime, ...options }, quotedOptions);
			}
		} catch (e) {
			return HANZ.sendMessage(jid, { text: url, ...options }, quotedOptions);
		}
	}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	
	HANZ.sendGroupInviteV4 = async (jid, participant, inviteCode, inviteExpiration, groupName = 'Unknown Subject', caption = 'Invitation to join my WhatsApp group', jpegThumbnail = null, options = {}) => {
		const msg = proto.Message.create({
			groupInviteMessage: {
				inviteCode,
				inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
				groupJid: jid,
				groupName,
				jpegThumbnail: Buffer.isBuffer(jpegThumbnail) ? jpegThumbnail : null,
				caption,
				contextInfo: {
					mentionedJid: options.mentions || []
				}
			}
		});
		const message = generateWAMessageFromContent(participant, msg, options);
		const invite = await HANZ.relayMessage(participant, message.message, { messageId: message.key.id })
		return invite
	}
	

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	
	HANZ.sendFromOwner = async (jids, text, quoted, options = {}) => {
		for (const a of jids) {
			const jid = a.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
			await HANZ.sendMessage(jid, { text, ...options }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || RAEHANDATA?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 })
		}
	}
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

	
	HANZ.sendText = async (jid, text, quoted, options = {}) => HANZ.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || RAEHANDATA?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 })
	
	HANZ.sendAsSticker = async (jid, pathMedia, quoted, options = {}) => {
		let buff = Buffer.isBuffer(pathMedia) ? pathMedia : /^data:.*?\/.*?;base64,/i.test(pathMedia) ? Buffer.from(pathMedia.split`,`[1], 'base64') : /^https?:\/\//.test(pathMedia) ? await (await getBuffer(pathMedia)) : fs.existsSync(pathMedia) ? pathMedia : Buffer.alloc(0);
		const result = await writeExif(buff, options);
		try {
			let anu = await HANZ.sendMessage(jid, { sticker: { url: result }, ...options }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || RAEHANDATA?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 });
			return anu;
		} finally {
			if (fs.existsSync(pathMedia)) fs.unlinkSync(pathMedia);
			if (fs.existsSync(result)) fs.unlinkSync(result);
		}
	}
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	
	HANZ.downloadMediaMessage = async (message) => {
		const msg = message.msg || message;
		msg.mediaKey = fixBytes(msg.mediaKey);
		msg.fileSha256 = fixBytes(msg.fileSha256);
		msg.fileEncSha256 = fixBytes(msg.fileEncSha256);
		const mime = msg.mimetype || '';
		const messageType = (message.type || mime.split('/')[0]).replace(/Message/gi, '');
		const stream = await downloadContentFromMessage(msg, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		return buffer
	}
	
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    	
	
	HANZ.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
	    const msg = message.msg || message;
	    msg.mediaKey = fixBytes(msg.mediaKey);
	    msg.fileSha256 = fixBytes(msg.fileSha256);
	    msg.fileEncSha256 = fixBytes(msg.fileEncSha256);
	    const mime = msg.mimetype || '';
	    const messageType = (message.type || mime.split('/')[0]).replace(/Message/gi, '');
	    const ext = mime.split('/')[1]?.split(';')[0] || 'bin';
	    
	    const dir = path.join(__dirname, '../DataBoss/temp');
	   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
	    
	    const randomName = crypto.randomBytes(6).readUIntLE(0, 6).toString(36);
	    const trueFileName = attachExtension ? path.join(dir, `${filename ? filename : randomName}.${ext}`) : path.join(dir, filename || randomName);
	    
	    const stream = await downloadContentFromMessage(msg, messageType);
	    return new Promise((resolve, reject) => {
	        const writeStream = fs.createWriteStream(trueFileName);
	        stream.pipe(writeStream);
	        writeStream.on('finish', () => resolve(trueFileName));
	        writeStream.on('error', (err) => {
	            if (fs.existsSync(trueFileName)) fs.unlinkSync(trueFileName);
	            reject(err);
	        });
	    });
	}
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    	
	HANZ.getFile = async (PATH) => {
		let filename;
		let mime = 'application/octet-stream';
		let ext = 'bin';
		let isTemp = false;
		
	const dir = path.join(__dirname, '../DataBoss/temp');
		if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
		
		const randomName = crypto.randomBytes(6).readUIntLE(0, 6).toString(36);
		
		if (Buffer.isBuffer(PATH)) {
			let type = await FileType.fromBuffer(PATH) || { mime, ext };
			mime = type.mime; ext = type.ext;
			filename = path.join(dir, `${randomName}.${ext}`);
			fs.writeFileSync(filename, PATH);
			isTemp = true;
		} else if (/^data:.*?\/.*?;base64,/i.test(PATH)) {
			let buffer = Buffer.from(PATH.split`,`[1], 'base64');
			let type = await FileType.fromBuffer(buffer) || { mime, ext };
			mime = type.mime; ext = type.ext;
			filename = path.join(dir, `${randomName}.${ext}`);
			fs.writeFileSync(filename, buffer);
			isTemp = true;
		} else if (typeof PATH === 'string' && /^https?:\/\//.test(PATH)) {
			const res = await axios.get(PATH, { responseType: 'stream' });
			mime = res.headers['content-type'] || 'application/octet-stream';
			ext = mime.split('/')[1]?.split(';')[0] || 'tmp';
			if (ext === 'jpeg') ext = 'jpg';
			filename = path.join(dir, `${randomName}.${ext}`);
			const writeStream = fs.createWriteStream(filename);
			res.data.pipe(writeStream);
			await new Promise((resolve, reject) => {
				writeStream.on('finish', resolve);
				writeStream.on('error', reject);
			});
			isTemp = true;
		} else if (typeof PATH === 'string' && fs.existsSync(PATH)) {
			let type = await FileType.fromFile(PATH) || { mime, ext };
			mime = type.mime; ext = type.ext;
			filename = PATH;
			isTemp = false;
		} else {
			throw new Error("Format media tidak didukung");
		}
		return { filename, mime, ext, isTemp };
	}
	
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	
	
	HANZ.appendResponseMessage = async (m, text) => {
		let apb = await generateWAMessage(m.chat, { text, mentions: m.mentionedJid }, { userJid: HANZ.user.id, quoted: m.quoted && m.quoted.fakeObj(), ephemeralExpiration: m.expiration || m?.metadata?.ephemeralDuration || RAEHANDATA?.messages[m.chat]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0 });
		apb.key = m.key
		apb.key.id = [...Array(32)].map(() => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('');
		apb.key.fromMe = areJidsSameUser(m.sender, HANZ.user.id);
		if (m.isGroup) apb.participant = m.sender;
		HANZ.ev.emit('messages.upsert', {
			...m,
			messages: [proto.WebMessageInfo.create(apb)],
			type: 'append'
		});
	}
	
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	
	HANZ.sendMedia = async (jid, pathMedia, fileName = '', caption = '', quoted = '', options = {}) => {
		const { mime, filename, isTemp } = await HANZ.getFile(pathMedia);
		const botNumber = HANZ.decodeJid(HANZ.user.id);
		const isWebpSticker = options.asSticker || /webp/.test(mime);
		let type = 'document', mimetype = mime, pathFile = filename;
		let filesToDelete = [];
		if (isTemp) filesToDelete.push(filename);
		try {
			if (isWebpSticker) {
				pathFile = await writeExif(filename, {
					packname: options.packname || BossRAEHAN?.set?.[botNumber]?.packname || 'Bot WhatsApp',
					author: options.author || BossRAEHAN?.set?.[botNumber]?.author || 'MasRaehan',
					categories: options.categories || [],
				});
				filesToDelete.push(pathFile);
				type = 'sticker';
				mimetype = 'image/webp';
			} else if (/image|video|audio/.test(mime)) {
				type = mime.split('/')[0];
				mimetype = type == 'video' ? 'video/mp4' : type == 'audio' ? 'audio/mpeg' : mime;
			}
			let anu = await HANZ.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ephemeralExpiration: quoted?.expiration || quoted?.metadata?.ephemeralDuration || RAEHANDATA?.messages[jid]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0, ...options });
			return anu;
		} finally {
			filesToDelete.forEach(file => {
				if (fs.existsSync(file)) fs.unlinkSync(file);
			});
		}
	}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
	    		
	HANZ.sendAlbumMessage = async (jid, content = {}, options = {}) => {
		const { album, mentions, contextInfo, ...others } = content;
		for (const media of album) {
			if (!media.image && !media.video) throw new TypeError(`album[i] must have image or video property`);
		}
		if (album.length < 2) throw new RangeError("Minimum 2 media");
		const medias = await generateWAMessageFromContent(jid, {
			albumMessage: {
				expectedImageCount: album.filter(m => m.image).length,
				expectedVideoCount: album.filter(m => m.video).length,
			}
		}, { quoted: options?.quoted || null });
		await HANZ.relayMessage(jid, medias.message, { messageId: medias.key.id });
		for (const media of album) {
			const msg = await generateWAMessage(jid, { ...others, ...media }, { upload: HANZ.waUploadToServer });
			msg.message.messageContextInfo = {
				messageAssociation: {
					associationType: 1,
					parentMessageKey: medias.key
				}
			}
			await HANZ.relayMessage(jid, msg.message, { messageId: msg.key.id });
		}
		return medias;
	}
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	
	HANZ.sendListMsg = async (jid, content = {}, options = {}) => {
		const { text, caption, footer = '', title, subtitle, ai, contextInfo = {}, buttons = [], messageParamsJson = {}, mentions = [], ...media } = content;
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2,
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({ text: text || caption || '' }),
						footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
						header: proto.Message.InteractiveMessage.Header.create({
							title,
							subtitle,
							hasMediaAttachment: Object.keys(media).length > 0,
							...(media && typeof media === 'object' && Object.keys(media).length > 0 ? await generateWAMessageContent(media, {
								upload: HANZ.waUploadToServer
							}) : {})
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							...(messageParamsJson && typeof messageParamsJson === 'object' && Object.keys(messageParamsJson).length > 0 ? messageParamsJson : {}),
							buttons: buttons.map(a => {
								return {
									name: a.name,
									buttonParamsJson: JSON.stringify(a.buttonParamsJson ? (typeof a.buttonParamsJson === 'string' ? JSON.parse(a.buttonParamsJson) : a.buttonParamsJson) : '')
								}
							})
						}),
						contextInfo: {
							...contextInfo,
							...options.contextInfo,
							mentionedJid: options.mentions || mentions,
							...(options.quoted ? {
								stanzaId: options.quoted.key.id,
								remoteJid: options.quoted.key.remoteJid,
								participant: options.quoted.key.participant || options.quoted.key.remoteJid,
								fromMe: options.quoted.key.fromMe,
								quotedMessage: options.quoted.message
							} : {})
						}
					})
				}
			}
		}, {});
		const hasil = await HANZ.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes: [{
				tag: 'biz',
				attrs: {},
				content: [{
					tag: 'interactive',
					attrs: {
						type: 'native_flow',
						v: '1'
					},
					content: [{
						tag: 'native_flow',
						attrs: {
							v: '9',
							name: 'mixed'
						}
					}]
				}]
			}, ...(ai ? [{ attrs: { biz_bot: '1' }, tag: 'bot' }] : [])]
		})
		return hasil
	}
	
	HANZ.sendButtonMsg = async (jid, content = {}, options = {}) => {
		const { text, caption, footer = '', headerType = 1, ai, contextInfo = {}, buttons = [], mentions = [], ...media } = content;
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2,
					},
					buttonsMessage: {
						...(media && typeof media === 'object' && Object.keys(media).length > 0 ? await generateWAMessageContent(media, {
							upload: HANZ.waUploadToServer
						}) : {}),
						contentText: text || caption || '',
						footerText: footer,
						buttons,
						headerType: media && Object.keys(media).length > 0 ? Math.max(...Object.keys(media).map((a) => ({ document: 3, image: 4, video: 5, location: 6 })[a] || headerType)) : headerType,
						contextInfo: {
							...contextInfo,
							...options.contextInfo,
							mentionedJid: options.mentions || mentions,
							...(options.quoted ? {
								stanzaId: options.quoted.key.id,
								remoteJid: options.quoted.key.remoteJid,
								participant: options.quoted.key.participant || options.quoted.key.remoteJid,
								fromMe: options.quoted.key.fromMe,
								quotedMessage: options.quoted.message
							} : {})
						}
					}
				}
			}
		}, {});
		const hasil = await HANZ.relayMessage(msg.key.remoteJid, msg.message, {
			messageId: msg.key.id,
			additionalNodes: [{
				tag: 'biz',
				attrs: {},
				content: [{
					tag: 'interactive',
					attrs: {
						type: 'native_flow',
						v: '1'
					},
					content: [{
						tag: 'native_flow',
						attrs: {
							v: '9',
							name: 'mixed'
						}
					}]
				}]
			}, ...(ai ? [{ attrs: { biz_bot: '1' }, tag: 'bot' }] : [])]
		})
		return hasil
	}
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
	
	HANZ.newsletterMsg = async (key, content = {}, timeout = 5000) => {
		const { type: rawType = 'INFO', name, description = '', picture = null, react, id, newsletter_id = key, ...media } = content;
		const type = rawType.toUpperCase();
		if (react) {
			if (!(newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id))) throw [{ message: 'Use Id Newsletter', extensions: { error_code: 204, severity: 'CRITICAL', is_retryable: false }}]
			if (!id) throw [{ message: 'Use Id Newsletter Message', extensions: { error_code: 204, severity: 'CRITICAL', is_retryable: false }}]
			const hasil = await HANZ.query({
				tag: 'message',
				attrs: {
					to: key,
					type: 'reaction',
					'server_id': id,
					id: generateMessageID()
				},
				content: [{
					tag: 'reaction',
					attrs: {
						code: react
					}
				}]
			});
			return hasil
		} else if (media && typeof media === 'object' && Object.keys(media).length > 0) {
			const msg = await generateWAMessageContent(media, { upload: HANZ.waUploadToServer });
			const anu = await HANZ.query({
				tag: 'message',
				attrs: { to: newsletter_id, type: 'text' in media ? 'text' : 'media' },
				content: [{
					tag: 'plaintext',
					attrs: /image|video|audio|sticker|poll/.test(Object.keys(media).join('|')) ? { mediatype: Object.keys(media).find(key => ['image', 'video', 'audio', 'sticker','poll'].includes(key)) || null } : {},
					content: proto.Message.encode(msg).finish()
				}]
			})
			return anu
		} else {
			if ((/(FOLLOW|UNFOLLOW|DELETE)/.test(type)) && !(newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id))) return [{ message: 'Use Id Newsletter', extensions: { error_code: 204, severity: 'CRITICAL', is_retryable: false }}]
			const _query = await HANZ.query({
				tag: 'iq',
				attrs: {
					to: 's.whatsapp.net',
					type: 'get',
					xmlns: 'w:mex'
				},
				content: [{
					tag: 'query',
					attrs: {
						query_id: type == 'FOLLOW' ? '9926858900719341' : type == 'UNFOLLOW' ? '7238632346214362' : type == 'CREATE' ? '6234210096708695' : type == 'DELETE' ? '8316537688363079' : '6563316087068696'
					},
					content: new TextEncoder().encode(JSON.stringify({
						variables: /(FOLLOW|UNFOLLOW|DELETE)/.test(type) ? { newsletter_id } : type == 'CREATE' ? { newsletter_input: { name, description, picture }} : { fetch_creation_time: true, fetch_full_image: true, fetch_viewer_metadata: false, input: { key, type: (newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id)) ? 'JID' : 'INVITE' }}
					}))
				}]
			}, timeout);
			const res = JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter || JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_join_v2 || JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_leave_v2 || JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_create || JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_delete_v2 || JSON.parse(_query.content[0].content)?.errors || JSON.parse(_query.content[0].content)
			res.thread_metadata ? (res.thread_metadata.host = 'https://mmg.whatsapp.net') : null
			return res
		}
	}
	
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    	
	
	HANZ.sendCarouselMsg = async (jid, body = '', footer = '', cards = [], options = {}) => {
		async function getImageMsg(url) {
			const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: HANZ.waUploadToServer });
			return imageMessage;
		}
		const cardPromises = cards.map(async (a) => {
			const imageMessage = await getImageMsg(a.url);
			return {
				header: {
					imageMessage: imageMessage,
					hasMediaAttachment: true
				},
				body: { text: a.body },
				footer: { text: a.footer },
				nativeFlowMessage: {
					buttons: a.buttons.map(b => ({
						name: b.name,
						buttonParamsJson: JSON.stringify(b.buttonParamsJson ? JSON.parse(b.buttonParamsJson) : '')
					}))
				}
			};
		});
		
		const cardResults = await Promise.all(cardPromises);
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({ text: body }),
						footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
						carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
							cards: cardResults,
							messageVersion: 1
						})
					})
				}
			}
		}, {});
		const hasil = await HANZ.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
		return hasil
	}
	
	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////	
		
	             	HANZ.public = true;
	             	
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////		
		
		
	return HANZ
}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////

async function Serialize(HANZ, msg, RAEHANDATA) {
	const botLid = HANZ.decodeJid(HANZ.user.lid);
	const botNumber = HANZ.decodeJid(HANZ.user.id);
	const m = { ...msg };
	if (!m) return m
	if (m.key) {
		m.id = m.key.id
		m.chat = m.key.remoteJidAlt || m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isBot = ['HSK', 'BAE', 'B1E', '3EB0', 'B24E', 'WA'].some(a => m.id.startsWith(a) && [12, 16, 20, 22, 40].includes(m.id.length)) || /(.)\1{5,}|[^a-zA-Z0-9]|[^0-9A-F]/.test(m.id) || false
		m.isGroup = m.chat.endsWith('@g.us')
		if (!m.isGroup && m.chat.endsWith('@lid')) m.chat = HANZ.findJidByLid(m.chat, RAEHANDATA) || m.chat;
		m.sender = HANZ.decodeJid(m.fromMe && HANZ.user.id || m.key.participantAlt || m.key.participant || m.chat || '')
		if (m.isGroup) {
			if (!RAEHANDATA.groupMetadata) RAEHANDATA.groupMetadata = await HANZ.groupFetchAllParticipating().catch(e => ({}));
			let metadata = RAEHANDATA.groupMetadata[m.chat] ? RAEHANDATA.groupMetadata[m.chat] : (RAEHANDATA.groupMetadata[m.chat] = await HANZ.groupMetadata(m.chat).catch(e => ({ ...RAEHANDATA.groupMetadata[m.chat] })));
			if (!metadata) {
				metadata = await HANZ.groupMetadata(m.chat).catch(e => ({ ...RAEHANDATA.groupMetadata[m.chat] }));
				RAEHANDATA.groupMetadata[m.chat] = metadata
			}
			m.metadata = metadata
			m.metadata.size = (metadata.participants || []).length;
			if (metadata.addressingMode === 'lid') {
				const participant = metadata.participants.find(a => a.id === m.sender || a.phoneNumber === m.sender)
				m.sender = participant?.phoneNumber || m.key.participantAlt || m.sender;
				m.metadata.owner = m.metadata?.participants?.find(p => p.id === m.metadata.owner)?.id || m.metadata.owner;
				m.metadata.subjectOwner = m.metadata?.participants?.find(p => p.id === m.metadata.subjectOwner)?.id || m.metadata.subjectOwner;
				if(!m.sender.endsWith('@g.us')) RAEHANDATA.contacts[m.sender] = { ...(RAEHANDATA.contacts[m.sender] || {}), id: jidNormalizedUser(m.fromMe && HANZ.user.lid || participant?.id || RAEHANDATA.contacts[m.sender]?.id || m.sender), phoneNumber: jidNormalizedUser(m.fromMe && HANZ.user.id || participant?.phoneNumber || RAEHANDATA.contacts[m.sender]?.phoneNumber || m.sender), name: (m.fromMe && HANZ.user.name) || m.pushName };
			}
			m.admins = m.metadata.participants ? m.metadata.participants.filter(p => p.admin).map(p => ({ id: p.id, phoneNumber: p.phoneNumber, admin: p.admin })) : [];
			m.isAdmin = m.admins.some(a => a.id === m.sender || a.phoneNumber === m.sender);
			m.isBotAdmin = m.admins.some(a => [botNumber, botLid].includes(a.id) || [botNumber, botLid].includes(a.phoneNumber));
		}
	}
	if (m.message) {
		m.type = getContentType(m.message) || Object.keys(m.message)[0]
		m.msg = (/viewOnceMessage|viewOnceMessageV2Extension|editedMessage|ephemeralMessage/i.test(m.type) ? m.message[m.type].message[getContentType(m.message[m.type].message)] : (extractMessageContent(m.message[m.type]) || m.message[m.type]))
		m.body = m.message?.conversation || m.msg?.text || m.msg?.conversation || m.msg?.caption || m.msg?.selectedButtonId || m.msg?.singleSelectReply?.selectedRowId || m.msg?.selectedId || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || m.msg?.name || ''
		m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.map(a => HANZ.findJidByLid(a, RAEHANDATA, true)) || []
		m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || '';
		m.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(m.body) ? m.body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : ''
		m.command = m.body && m.body.replace(m.prefix, '').trim().split(/ +/).shift()
		m.args = m.body?.trim().replace(new RegExp("^" + m.prefix?.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&'), 'i'), '').replace(m.command, '').split(/ +/).filter(a => a) || []
		m.device = getDevice(m.id)
		m.expiration = m.msg?.contextInfo?.expiration || m?.metadata?.ephemeralDuration || RAEHANDATA?.messages?.[m.chat]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0
		m.timestamp = (typeof m.messageTimestamp === "number" ? m.messageTimestamp : m.messageTimestamp.low ? m.messageTimestamp.low : m.messageTimestamp.high) || m.msg.timestampMs * 1000
		m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath
		if (m.isMedia) {
			m.mime = m.msg?.mimetype
			m.size = m.msg?.fileLength
			m.height = m.msg?.height || ''
			m.width = m.msg?.width || ''
			if (/webp/i.test(m.mime)) {
				m.isAnimated = m.msg?.isAnimated
			}
		}
		m.quoted = m.msg?.contextInfo?.quotedMessage || null
		if (m.quoted) {
			let qMsg = JSON.parse(JSON.stringify(m.msg?.contextInfo?.quotedMessage));
			if (m.msg?.contextInfo?.participant?.endsWith('@lid')) m.msg.contextInfo.participant =  m?.metadata?.participants?.find(a => a.id === m.msg.contextInfo.participant)?.phoneNumber || m.msg.contextInfo.participant;
			m.quoted = {
				...qMsg,
				message: extractMessageContent(qMsg) || qMsg,
				type: getContentType(qMsg) || Object.keys(qMsg)[0],
				id: m.msg.contextInfo.stanzaId,
				chat: m.msg.contextInfo.remoteJid || m.chat,
				sender: HANZ.decodeJid(m.msg.contextInfo.participant),
				fromMe: HANZ.decodeJid(m.msg.contextInfo.participant) === HANZ.decodeJid(HANZ.user.id),
				text: qMsg?.conversation || qMsg?.caption || '',
			};
			m.quoted.msg = extractMessageContent(qMsg[m.quoted.type]) || qMsg[m.quoted.type];
			m.quoted.device = getDevice(m.quoted.id)
			m.quoted.isBot = m.quoted.id ? ['HSK', 'BAE', 'B1E', '3EB0', 'B24E', 'WA'].some(a => m.quoted.id.startsWith(a) && [12, 16, 20, 22, 40].includes(m.quoted.id.length)) || /(.)\1{5,}|[^a-zA-Z0-9]|[^0-9A-F]/.test(m.quoted.id) : false
			m.quoted.fromMe = m.quoted.sender === HANZ.decodeJid(HANZ.user.id)
			m.quoted.mentionedJid = m.quoted?.msg?.contextInfo?.mentionedJid?.map(a => HANZ.findJidByLid(a, RAEHANDATA, true)) || []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.getQuotedObj = async () => {
				if (!m.quoted.id) return null
				let q = await global.loadMessage(m.chat, m.quoted.id, HANZ)
				if (q) {
					return await Serialize(HANZ, q, RAEHANDATA)
				} else {
					return null
				}
			}
			m.quoted.key = {
				remoteJid: m.msg?.contextInfo?.remoteJid || m.chat,
				participant: m.quoted.sender,
				fromMe: areJidsSameUser(HANZ.decodeJid(m.msg?.contextInfo?.participant), HANZ.decodeJid(HANZ?.user?.id)),
				id: m.msg?.contextInfo?.stanzaId
			}
			m.quoted.isGroup = m.quoted.chat.endsWith('@g.us')
			m.quoted.mentions = m.quoted.msg?.contextInfo?.mentionedJid || []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.quoted.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.quoted.body) ? m.quoted.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(m.quoted.body) ? m.quoted.body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : ''
			m.quoted.command = m.quoted.body && m.quoted.body.replace(m.quoted.prefix, '').trim().split(/ +/).shift()
			m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath
			if (m.quoted.isMedia) {
				m.quoted.fileSha256 = m.quoted[m.quoted.type]?.fileSha256 || ''
				m.quoted.mime = m.quoted.msg?.mimetype
				m.quoted.size = m.quoted.msg?.fileLength
				m.quoted.height = m.quoted.msg?.height || ''
				m.quoted.width = m.quoted.msg?.width || ''
				if (/webp/i.test(m.quoted.mime)) {
					m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false
				}
			}
			m.quoted.fakeObj = () => ({
				key: {
					remoteJid: m.quoted.chat,
					fromMe: m.quoted.fromMe,
					id: m.quoted.id
				},
				message: m.quoted,
				...(m.isGroup ? { participant: m.quoted.sender } : {})
			});
			m.quoted.download = () => HANZ.downloadMediaMessage(m.quoted)
			m.quoted.delete = () => {
				HANZ.sendMessage(m.quoted.chat, {
					delete: {
						remoteJid: m.quoted.chat,
						fromMe: m.isBotAdmin ? false : true,
						id: m.quoted.id,
						participant: m.quoted.sender
					}
				})
			}
		}
	}
	
	m.download = () => HANZ.downloadMediaMessage(m)
	
	m.copy = () => Serialize(HANZ, JSON.parse(JSON.stringify(m)), RAEHANDATA)
	
	m.react = (u) => HANZ.sendMessage(m.chat, { react: { text: u, key: m.key }})
	
	m.reply = async (content, options = {}) => {
		const { quoted = m, chat = m.chat, caption = '', mentions = [], ephemeralExpiration = m.expiration || m?.metadata?.ephemeralDuration || RAEHANDATA?.messages[m.chat]?.array?.slice(-1)[0]?.metadata?.ephemeralDuration || 0, ...validate } = options;
		const textBody = typeof content === 'string' ? content : (content.text || content.caption || '');
		const providedMentions = Array.isArray(mentions) ? mentions : [];
		const extractedMentions = [...textBody.matchAll(/@(\d{5,16})/g)].map(v => v[1] + '@s.whatsapp.net');
		const fixMentions = [...new Set([...providedMentions, ...extractedMentions])];
		if (typeof content === 'object') {
			return HANZ.sendMessage(chat, content, { ...validate, quoted, ephemeralExpiration })
		} else if (typeof content === 'string') {
			try {
				if (/^https?:\/\//.test(content)) {
					const res = await axios.head(content).catch(() => null);
					const mime = res?.headers['content-type'] || '';
					if (/gif|image|video|audio|pdf|stream/i.test(mime)) {
						let type = /image/.test(mime) ? 'image' : /video/.test(mime) ? 'video' : /audio/.test(mime) ? 'audio' : 'document';
						return HANZ.sendMessage(chat, { [type]: { url: content }, caption, mimetype: mime, ...validate }, { quoted, ephemeralExpiration })
					} else {
						return HANZ.sendMessage(chat, { text: content, mentions: fixMentions, ...validate }, { quoted, ephemeralExpiration })
					}
				} else {
					return HANZ.sendMessage(chat, { text: content, mentions: fixMentions, ...validate }, { quoted, ephemeralExpiration })
				}
			} catch (e) {
				return HANZ.sendMessage(chat, { text: content, mentions: fixMentions, ...validate }, { quoted, ephemeralExpiration })
			}
		}
	}

	return m
}

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
export {
	GroupUpdate,
	GroupParticipantsUpdate,
	LoadDataBase,
	MessagesUpsert,
	Solving
};

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
//              HANDLER 👇


const watcher = chokidar.watch(HANZPath, {
	ignored: /^\./,
	persistent: true });

	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    
watcher.on('change', async (filePath) => {
	console.log(chalk.yellowBright(`[UPDATE] ${filePath}`));
	await reloadHandler();
});
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
	    ////////////////////   SCRIPT RAEHAN   //////////////////// 
	    ////////////////////////𝙃𝘼𝙉𝙕///2𝙂𝘿////////////////////////////
