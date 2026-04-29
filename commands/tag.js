import { createWriteStream } from 'fs'
import { downloadMediaMessage } from "baileys"
import configmanager from '../utils/configmanager.js'

export async function tagall(client, message) {
    const remoteJid = message.key.remoteJid
    if (!remoteJid.includes('@g.us')) return

    try {
        const groupMetadata = await client.groupMetadata(remoteJid)
        const participants = groupMetadata.participants.map(user => user.id)
        const text = participants.map(user => `┃ ⚡ @${user.split('@')[0]}`).join('\n')

        await client.sendMessage(remoteJid, {
            text: `╭────◇════◇────╮
║  RUMIA TAGALL ║
║   ₪ AUTHOR : ${stylizedChar(userName)   ║
╰────◇════◇────╯

╭────◇════◇────╮
║   MESSAGE 💬   ║
╰────◇════◇────╯

◎╮
╰○════════════════╯
┠➟ 🌸 ${text} 🌸
╰═════════════════╯

    ♡ ҉ ☆ ҉ ☆ ˚₊  

╭◜◝ ͡ ◜◝╮   ╭◜◝ ͡ ◜◝╮
( •‿• ) ☆ ( •‿• ) ☆
╰◟◞ ͜ ◟◞╯   ╰◟◞ ͜ ◟◞╯
☆ ҉ ♡ ҉ ☆

    ╭◜◝ ͡ ◜◝╮  
    ( •‿• )  
    ╰◟◞ ͜ ◟◞╯  

  ☆ Maker by ASAZEL ☆`,
            mentions: participants
        })

    } catch (error) {
        console.error("Tagall error:", error)
    }
}

export async function tagadmin(client, message) {
    const remoteJid = message.key.remoteJid
    const botNumber = client.user.id.split(':')[0] + '@s.whatsapp.net'
    if (!remoteJid.includes('@g.us')) return

    try {
        const { participants } = await client.groupMetadata(remoteJid)
        const admins = participants.filter(p => p.admin && p.id !== botNumber).map(p => p.id)
        
        if (admins.length === 0) return

        const text = admins.map(user => `┃ 🛡️ @${user.split('@')[0]}`).join('\n')

        await client.sendMessage(remoteJid, { 
            text: `╭────◇════◇────╮
║   RUMIA TAG   ║
║   ₪ AUTHOR : ${stylizedChar(userName)   ║
╰────◇════◇────╯

╭────◇════◇────╮
║   MESSAGE 💬   ║
╰────◇════◇────╯

◎╮
╰○════════════════╯
┠➟ 🌸 ${text} 🌸
╰═════════════════╯

    ♡ ҉ ☆ ҉ ☆ ˚₊  

╭◜◝ ͡ ◜◝╮   ╭◜◝ ͡ ◜◝╮
( •‿• ) ☆ ( •‿• ) ☆
╰◟◞ ͜ ◟◞╯   ╰◟◞ ͜ ◟◞╯
☆ ҉ ♡ ҉ ☆

    ╭◜◝ ͡ ◜◝╮  
    ( •‿• )  
    ╰◟◞ ͜ ◟◞╯  

  ☆ 𝖬𝖺𝗄𝖾𝗋 𝖡𝗒 𝖠𝗌𝖺𝗓𝖾𝗅 ☆`,
            mentions: admins
        })

    } catch (error) {
        console.error("Tagadmin error:", error)
    }
}

export async function respond(client, message) {
    const number = client.user.id.split(':')[0]
    const remoteJid = message.key.remoteJid
    const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || ''
    if (!configmanager.config.users[number]) return

    const tagRespond = configmanager.config.users[number].response
    if ((!message.key.fromMe) && tagRespond) {
        const lid = client.user?.lid.split(':')[0]
        if (messageBody.includes(`@${lid}`)) {
            await client.sendMessage(remoteJid, {
                audio: { url: "database/DigiX.mp3" },
                mimetype: "audio/mp4",
                ptt: true,
                contextInfo: { 
                    stanzaId: message.key.id,
                    participant: message.key.participant || lid,
                    quotedMessage: message.message
                }
            })
        }
    }
}

export async function tag(client, message) {
    const remoteJid = message.key.remoteJid
    if (!remoteJid.includes('@g.us')) return

    try {
        const groupMetadata = await client.groupMetadata(remoteJid)
        const participants = groupMetadata.participants.map(user => user.id)
        const messageBody = message.message?.conversation || message.message?.extendedTextMessage?.text || ""
        const commandAndArgs = messageBody.slice(1).trim()
        const parts = commandAndArgs.split(/\s+/)
        const text = parts.slice(1).join(' ') || '𝐑𝐔𝐌𝐈𝐀 𝐀𝐋𝐄𝐑𝐓'

        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage
        if (quotedMessage) {
            if (quotedMessage.stickerMessage) {
                await client.sendMessage(remoteJid, { 
                    sticker: quotedMessage.stickerMessage, 
                    mentions: participants 
                })
                return
            }
            const quotedText = quotedMessage.conversation || quotedMessage.extendedTextMessage?.text || ""
            await client.sendMessage(remoteJid, { 
                text: `╭────◇════◇────╮
║   RUMIA TAG   ║
║   ₪ AUTHOR : ${stylizedChar(userName)   ║
╰────◇════◇────╯

╭────◇════◇────╮
║   MESSAGE 💬   ║
╰────◇════◇────╯

◎╮
╰○════════════════╯
┠➟ 🌸 ${quotedText} 🌸
╰═════════════════╯

    ♡ ҉ ☆ ҉ ☆ ˚₊  

╭◜◝ ͡ ◜◝╮   ╭◜◝ ͡ ◜◝╮
( •‿• ) ☆ ( •‿• ) ☆
╰◟◞ ͜ ◟◞╯   ╰◟◞ ͜ ◟◞╯
☆ ҉ ♡ ҉ ☆

    ╭◜◝ ͡ ◜◝╮  
    ( •‿• )  
    ╰◟◞ ͜ ◟◞╯  

  ☆ Maker by ASAZEL ☆`, 
                mentions: participants 
            })
            return
        }

        await client.sendMessage(remoteJid, { 
            text: `╭────◇════◇────╮
║   RUMIA TAG   ║
║   ₪ AUTHOR : ${stylizedChar(userName)   ║
╰────◇════◇────╯

╭────◇════◇────╮
║   MESSAGE 💬   ║
╰────◇════◇────╯

◎╮
╰○════════════════╯
┠➟ 🌸 ${text} 🌸
╰═════════════════╯

    ♡ ҉ ☆ ҉ ☆ ˚₊  

╭◜◝ ͡ ◜◝╮   ╭◜◝ ͡ ◜◝╮
( •‿• ) ☆ ( •‿• ) ☆
╰◟◞ ͜ ◟◞╯   ╰◟◞ ͜ ◟◞╯
☆ ҉ ♡ ҉ ☆

    ╭◜◝ ͡ ◜◝╮  
    ( •‿• )  
    ╰◟◞ ͜ ◟◞╯  

  ☆ Maker by ASAZEL ☆`, 
            mentions: participants 
        })

    } catch (error) {
        console.error("Tag error:", error)
    }
}

export default { tagall, tagadmin, respond, tag }