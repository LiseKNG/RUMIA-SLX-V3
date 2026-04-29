import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import configs from "../utils/configmanager.js";
import { getDevice } from "baileys";
import stylizedChar from "../utils/fancy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MENU TEMPLATE =================
const menuTemplate = ({ prefix, userName, uptime, usedRam, totalRam, platform, date, day }) => `╭━━━〔 🏖️ RUMIA-XMD 〕
┃ 👤 User : ${stylizedChar(userName)}
┃ ⚡ Prefix : ${prefix}
┃ 🕒 Uptime : ${uptime}
┃ 💾 RAM : ${usedRam}/${totalRam} MB
┃ 📱 Platform : ${platform}
┃ 📅 Date : ${date} (${day})
╰━━━━━━━━━━━━━╯

╭━━━〔 🎛️ UTILS 〕
┃ ➤ ${stylizedChar("uptime")}
┃ ➤ ${stylizedChar("compress")}
┃ ➤ ${stylizedChar("tr")}
┃ ➤ ${stylizedChar("rank")}
┃ ➤ ${stylizedChar("niveau")}
┃ ➤ ${stylizedChar("detect")}
┃ ➤ ${stylizedChar("qr")}
┃ ➤ ${stylizedChar("qrcode")}
┃ ➤ ${stylizedChar("ping")}
┃ ➤ ${stylizedChar("menu")}
┃ ➤ ${stylizedChar("fancy")}
┃ ➤ ${stylizedChar("setpp")}
┃ ➤ ${stylizedChar("getpp")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🚫 ANTI 〕
┃ ➤ ${stylizedChar("antiaudio")}
┃ ➤ ${stylizedChar("antidelete")}
┃ ➤ ${stylizedChar("antideletestatus")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🎬 MEDIA 〕
┃ ➤ ${stylizedChar("tovideo")}
┃ ➤ ${stylizedChar("groupstory")}
┃ ➤ ${stylizedChar("apk")}
┃ ➤ ${stylizedChar("lyrics")}
┃ ➤ ${stylizedChar("photo")}
┃ ➤ ${stylizedChar("toaudio")}
┃ ➤ ${stylizedChar("sticker")}
┃ ➤ ${stylizedChar("play")}
┃ ➤ ${stylizedChar("img")}
┃ ➤ ${stylizedChar("vv")}
┃ ➤ ${stylizedChar("save")}
┃ ➤ ${stylizedChar("tiktok")}
┃ ➤ ${stylizedChar("url")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🎮 FUN 〕
┃ ➤ ${stylizedChar("ttt")}
┃ ➤ ${stylizedChar("insult")}
┃ ➤ ${stylizedChar("chr")}
┃ ➤ ${stylizedChar("weather")}
┃ ➤ ${stylizedChar("fact")}
┃ ➤ ${stylizedChar("horoscope")}
┃ ➤ ${stylizedChar("hack")}
┃ ➤ ${stylizedChar("hacker")}
┃ ➤ ${stylizedChar("bonk")}
┃ ➤ ${stylizedChar("danser")}
╰━━━━━━━━━━━━━╯

╭━━━〔 ⚙ SETTING 〕
┃ ➤ ${stylizedChar("restart")}
┃ ➤ ${stylizedChar("alive")}
┃ ➤ ${stylizedChar("autoviewstatus")}
╰━━━━━━━━━━━━━╯

╭━━━〔 ⚙ SETTINGS 〕
┃ ➤ ${stylizedChar("autoreactstatus")}
┃ ➤ ${stylizedChar("welcome2")}
┃ ➤ ${stylizedChar("public")}
┃ ➤ ${stylizedChar("setprefix")}
┃ ➤ ${stylizedChar("autotype")}
┃ ➤ ${stylizedChar("autorecord")}
┃ ➤ ${stylizedChar("welcome")}
╰━━━━━━━━━━━━━╯

╭━━━〔 👑 OWNER 〕
┃ ➤ ${stylizedChar("sessions")}
┃ ➤ ${stylizedChar("sudo")}
┃ ➤ ${stylizedChar("delsudo")}
┃ ➤ ${stylizedChar("owner")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🤖 IA 〕
┃ ➤ ${stylizedChar("ai")}
┃ ➤ ${stylizedChar("iaimage")}
┃ ➤ ${stylizedChar("gpt")}
┃ ➤ ${stylizedChar("darkgpt")}
┃ ➤ ${stylizedChar("rumia")}
┃ ➤ ${stylizedChar("goldenclear")}
┃ ➤ ${stylizedChar("save2")}
┃ ➤ ${stylizedChar("gpt2")}
┃ ➤ ${stylizedChar("chat")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🐞 BUG 〕
┃ ➤ ${stylizedChar("bomb")}
┃ ➤ ${stylizedChar("spam")}
┃ ➤ ${stylizedChar("close")}
┃ ➤ ${stylizedChar("fuck")}
╰━━━━━━━━━━━━━╯

╭━━━〔 👥 GROUP 〕
┃ ➤ ${stylizedChar("mute2")}
┃ ➤ ${stylizedChar("unmute2")}
┃ ➤ ${stylizedChar("kick2")}
┃ ➤ ${stylizedChar("antilinkkick")}
┃ ➤ ${stylizedChar("actif")}
┃ ➤ ${stylizedChar("top")}
┃ ➤ ${stylizedChar("inactif")}
┃ ➤ ${stylizedChar("groupinfo")}
┃ ➤ ${stylizedChar("tag")}
┃ ➤ ${stylizedChar("tagall")}
┃ ➤ ${stylizedChar("tagadmin")}
┃ ➤ ${stylizedChar("kick")}
┃ ➤ ${stylizedChar("kickall")}
┃ ➤ ${stylizedChar("kickall2")}
┃ ➤ ${stylizedChar("promote")}
┃ ➤ ${stylizedChar("demote")}
┃ ➤ ${stylizedChar("promoteall")}
┃ ➤ ${stylizedChar("demoteall")}
┃ ➤ ${stylizedChar("mute")}
┃ ➤ ${stylizedChar("unmute")}
┃ ➤ ${stylizedChar("gclink")}
┃ ➤ ${stylizedChar("bye")}
┃ ➤ ${stylizedChar("join")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🎨 CREATOR 〕
┃ ➤ ${stylizedChar("owner")}
┃ ➤ ${stylizedChar("poll")}
┃ ➤ ${stylizedChar("quote")}
┃ ➤ ${stylizedChar("google")}
┃ ➤ ${stylizedChar("test")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🛡 MOD 〕
┃ ➤ ${stylizedChar("checkban")}
┃ ➤ ${stylizedChar("groupstatut")}
┃ ➤ ${stylizedChar("block")}
┃ ➤ ${stylizedChar("unblock")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🎌 ANIME 〕
┃ ➤ ${stylizedChar("anime")}
┃ ➤ ${stylizedChar("quiz")}
┃ ➤ ${stylizedChar("join")}
╰━━━━━━━━━━━━━╯

╭━━━〔 💎 PREMIUM 〕
┃ ➤ ${stylizedChar("addprem")}
┃ ➤ ${stylizedChar("delprem")}
╰━━━━━━━━━━━━━╯

╭━━━〔 🏖️ RUMIA XMD 〕
┃ THE POWER OF STRONGEST GIRL
╰━━━━━━━━━━━━━╯`;
// =================================================

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

export default async function info(client, message) {
  try {
    const remoteJid = message.key.remoteJid;
    const userName = message.pushName || "Unknown";

    const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(1);
    const uptime = formatUptime(process.uptime());
    const platform = os.platform();

    const botId = client.user.id.split(":")[0];
    const prefix = configs.config.users?.[botId]?.prefix || "!";

    const now = new Date();
    const daysFR = [
      "Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"
    ];

    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const day = daysFR[now.getDay()];

    // ===== MENU FINAL =====
    let menu = menuTemplate({
      prefix,
      userName,
      uptime,
      usedRam,
      totalRam,
      platform,
      date,
      day
    });

    try {
      const device = getDevice(message.key.id);

      if (device === "android") {
        await client.sendMessage(remoteJid, {
          image: { url: "database/menu.jpg" },
          caption: stylizedChar(menu),
          contextInfo: {
            participant: "237657989797@s.whatsapp.net",
            remoteJid: "status@broadcast",
            quotedMessage: { conversation: "RUMIA-XMD" },
            isForwarded: true
          }
        });
      } else {
        await client.sendMessage(
          remoteJid,
          {
            video: { url: "database/DigiX.mp4" },
            caption: stylizedChar(menu)
          },
          { quoted: message }
        );
      }
    } catch (err) {
      await client.sendMessage(
        remoteJid,
        { text: "❌ Erreur lors de l'envoi du menu : " + err.message },
        { quoted: message }
      );
    }

    console.log(menu);

  } catch (err) {
    console.log("error while displaying menu:", err);
  }
}