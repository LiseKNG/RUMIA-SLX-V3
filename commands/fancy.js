// commands/fancy.js
import sender from './sender.js'

// ==================== FONT MAPS ====================
const cursiveMap = {
    a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀',
    l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊',
    v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏',
    A: '𝒜', B: '𝐵', C: '𝒞', D: '𝒟', E: '𝐸', F: '𝐹', G: '𝒢', H: '𝐻', I: '𝐼', J: '𝒥',
    K: '𝒦', L: '𝐿', M: '𝑀', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: '𝑅', S: '𝒮', T: '𝒯',
    U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵'
};

const boldMap = {
    a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣',
    k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭',
    u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳',
    A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉',
    K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓',
    U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙'
};

const italicMap = {
    a: '𝘢', b: '𝘣', c: '𝘤', d: '𝘥', e: '𝘦', f: '𝘧', g: '𝘨', h: '𝘩', i: '𝘪', j: '𝘫',
    k: '𝘬', l: '𝘭', m: '𝘮', n: '𝘯', o: '𝘰', p: '𝘱', q: '𝘲', r: '𝘳', s: '𝘴', t: '𝘵',
    u: '𝘶', v: '𝘷', w: '𝘸', x: '𝘹', y: '𝘺', z: '𝘻',
    A: '𝘈', B: '𝘉', C: '𝘊', D: '𝘋', E: '𝘌', F: '𝘍', G: '𝘎', H: '𝘏', I: '𝘐', J: '𝘑',
    K: '𝘒', L: '𝘓', M: '𝘔', N: '𝘕', O: '𝘖', P: '𝘗', Q: '𝘘', R: '𝘙', S: '𝘚', T: '𝘛',
    U: '𝘜', V: '𝘝', W: '𝘞', X: '𝘟', Y: '𝘠', Z: '𝘡'
};

const boldItalicMap = {
    a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟',
    k: '𝙠', l: '𝙡', m: '𝙢', n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩',
    u: '𝙪', v: '𝙫', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯',
    A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅',
    K: '𝙆', L: '𝙇', M: '𝙈', N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏',
    U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕'
};

const squaredMap = {
    A: '🄰', B: '🄱', C: '🄲', D: '🄳', E: '🄴', F: '🄵', G: '🄶', H: '🄷', I: '🄸', J: '🄹',
    K: '🄺', L: '🄻', M: '🄼', N: '🄽', O: '🄾', P: '🄿', Q: '🅀', R: '🅁', S: '🅂', T: '🅃',
    U: '🅄', V: '🅅', W: '🅆', X: '🅇', Y: '🅈', Z: '🅉'
};

const circledMap = {
    a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ',
    l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ',
    v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ',
    A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ',
    K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ',
    U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ'
};

const flippedMap = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ',
    l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n',
    v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
    A: '∀', B: 'ᗺ', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: 'פ', H: 'H', I: 'I', J: 'ſ',
    K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Q', R: 'ᴚ', S: 'S', T: '┴',
    U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z'
};

// ==================== 100+ STYLES ====================
const fonts = [
    // 1-10: Classiques
    { name: "Normal", fn: (t) => t },
    { name: "MAJUSCULES", fn: (t) => t.toUpperCase() },
    { name: "minuscules", fn: (t) => t.toLowerCase() },
    { name: "Cursive", fn: (t) => [...t].map(c => cursiveMap[c] || c).join('') },
    { name: "Bold", fn: (t) => [...t].map(c => boldMap[c] || c).join('') },
    { name: "Italic", fn: (t) => [...t].map(c => italicMap[c] || c).join('') },
    { name: "Bold Italic", fn: (t) => [...t].map(c => boldItalicMap[c] || c).join('') },
    { name: "Monospace", fn: (t) => `\`\`\`${t}\`\`\`` },
    { name: "Circled", fn: (t) => [...t].map(c => circledMap[c] || c).join('') },
    { name: "Squared", fn: (t) => [...t].map(c => squaredMap[c.toUpperCase()] || c).join('') },
    
    // 11-20: Encadrés
    { name: "Bracketed", fn: (t) => [...t].map(c => `(${c})`).join('') },
    { name: "Double Brackets", fn: (t) => `༎${t}༎` },
    { name: "Japanese Quote", fn: (t) => `「${t}」` },
    { name: "Star Bracket", fn: (t) => `『★${t}★』` },
    { name: "Math Brackets", fn: (t) => `⟦${t}⟧` },
    { name: "Classic Bold", fn: (t) => `*${t}*` },
    { name: "Spaced", fn: (t) => t.split('').join(' ') },
    { name: "Flipped", fn: (t) => [...t].reverse().map(c => flippedMap[c] || c).join('') },
    { name: "Hacker", fn: (t) => t.split('').map(c => c + '̷').join('') },
    { name: "Ghost", fn: (t) => [...t].map(c => c + 'ͤ').join('') },
    
    // 21-30: Décoratifs
    { name: "Sparkle", fn: (t) => `✨ ${t} ✨` },
    { name: "Fire", fn: (t) => `🔥 ${t.toUpperCase()} 🔥` },
    { name: "Skull", fn: (t) => `💀 ${t} 💀` },
    { name: "Dark Lord", fn: (t) => `༒ ${t} ༒` },
    { name: "Demon", fn: (t) => `༼ ${t} ༽` },
    { name: "Star", fn: (t) => `★彡 ${t} 彡★` },
    { name: "Burmese", fn: (t) => `၌${t.toUpperCase()}၌` },
    { name: "Ribbon", fn: (t) => `🎀 ${t} 🎀` },
    { name: "Crown", fn: (t) => `👑${t}👑` },
    { name: "Kawaii", fn: (t) => `✧･ﾟ: *✧･ﾟ:* ${t} *:･ﾟ✧*:･ﾟ✧` },
    
    // 31-40: Premium
    { name: "Glitch", fn: (t) => t.split('').map(c => c + '͜͡').join('') },
    { name: "Void", fn: (t) => `🖤「${t}」🖤` },
    { name: "Abyss", fn: (t) => `꩜ ${t.toUpperCase()} ꩜` },
    { name: "Eclipse", fn: (t) => `🌑 ${t.toUpperCase()} 🌑` },
    { name: "Phantom", fn: (t) => `⚰️ ${t} ⚰️` },
    { name: "Venom", fn: (t) => `🕷️ ${t.toUpperCase()} 🕷️` },
    { name: "Premium", fn: (t) => `🔱 ${[...t].map(c => boldItalicMap[c] || c).join('')} 🔱` },
    { name: "Diamond", fn: (t) => `💠 ${t} 💠` },
    { name: "Champion", fn: (t) => `🏆 ${t.toUpperCase()} 🏆` },
    { name: "Royal", fn: (t) => `⚜️ ${t} ⚜️` },
    
    // 41-50: Légendaires
    { name: "Legendary", fn: (t) => `🎖️ ${[...t].map(c => boldItalicMap[c] || c).join('')} 🎖️` },
    { name: "Illuminati", fn: (t) => `👁️ ${[...t].map(c => boldMap[c] || c).join('')} 👁️` },
    { name: "Blade", fn: (t) => `🗡️ ${t.toUpperCase()} 🗡️` },
    { name: "Bloodline", fn: (t) => `🩸 ${t.toUpperCase()} 🩸` },
    { name: "Storm", fn: (t) => `🌪️ ${t.toUpperCase()} 🌪️` },
    { name: "Dragon", fn: (t) => `🐉 ${t.toUpperCase()} 🐉` },
    { name: "Scorpion", fn: (t) => `🦂 ${t} 🦂` },
    { name: "Legend", fn: (t) => `꧁𓆩 ${t} 𓆪꧂` },
    { name: "Warrior", fn: (t) => `𓆩☬ ${t.toUpperCase()} ☬𓆪` },
    { name: "Matrix", fn: (t) => `⟨⟨ ${t} ⟩⟩` }
];

// ==================== COMMANDE PRINCIPALE ====================
export default async function fancyCommand(client, message) {
    const remoteJid = message.key.remoteJid
    const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || ''
    const args = messageBody.split(' ').slice(1)
    
    // Afficher l'aide si pas d'arguments
    if (args.length === 0) {
        const preview = fonts.slice(0, 20).map((f, i) => `${i+1}. ${f.fn("Golden")}`).join('\n')
        const help = `🎨 FANCY TEXT

━━━━━━━━━━━━━━━━━━━━━━━━

📌 Utilisation : .fancy <numéro> <texte>

💡 Exemple :
.fancy 4 GoldenBoy

📋 Styles disponibles (1-${fonts.length}) :

${preview}

⋯ et ${fonts.length - 20} styles supplémentaires !

━━━━━━━━━━━━━━━━━━━━━━━━
🔥 GOLDEN-MD-V2 | The GoldenBoy`
        return sender(message, client, help)
    }
    
    const styleNum = parseInt(args[0])
    const content = args.slice(1).join(' ')
    
    if (isNaN(styleNum) || styleNum < 1 || styleNum > fonts.length) {
        return sender(message, client, `❌ Style invalide ! Choisis entre 1 et ${fonts.length}\n\n📌 Utilise .fancy pour voir la liste`)
    }
    
    if (!content) {
        return sender(message, client, `❌ Ajoute un texte à styliser !\n\n📌 Exemple : .fancy ${styleNum} GoldenBoy`)
    }
    
    const styled = fonts[styleNum - 1].fn(content)
    
    await client.sendMessage(remoteJid, {
        text: styled
    }, { quoted: message })
    
    await client.sendMessage(remoteJid, {
        react: { text: "🎨", key: message.key }
    })
}