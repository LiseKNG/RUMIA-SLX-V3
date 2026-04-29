import stylizedChar from "../utils/fancy.js"

export async function pingTest(client, message) {
    const remoteJid = message.key.remoteJid
    const start = Date.now()

    await client.sendMessage(remoteJid, { text: "📡 Pinging..." }, { quoted: message })

    const latency = Date.now() - start

    await client.sendMessage(remoteJid, {
        text: stylizedChar(
            `🚀 𝐑𝐔𝐌𝐈𝐀-𝐗𝐌𝐃-𝐕3 Network\n\n` +
            `Latency: ${latency} ms\n\n` +
            `🌹𝐀𝐒𝐀𝐙𝐄𝐋🌹`
        )
    }, { quoted: message })
}