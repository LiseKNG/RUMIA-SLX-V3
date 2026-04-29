import axios from 'axios'
import sender from './sender.js'

// 🔥 Fonction traduction FR
async function traduireEnFrancais(texte) {
    try {
        const res = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texte)}&langpair=en|fr`)
        return res.data.responseData.translatedText
    } catch (e) {
        return texte // fallback si erreur
    }
}

export default async function anime(client, message) {
    const remoteJid = message.key.remoteJid
    const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || ''
    const query = messageBody.split(' ').slice(1).join(' ')

    if (!query) {
        const help = `╭─⌈ 🎌 COMMANDE ANIME ⌋
│
│ *Utilisation:* .anime <nom de l'anime>
│
│ *Exemples:*
│ ▸ .anime naruto
│ ▸ .anime death note
│ ▸ .anime one piece
│ ▸ .anime demon slayer
│
╰─⌊ GOLDEN-MD-V2 ⌉`
        return sender(message, client, help)
    }

    await client.sendMessage(remoteJid, {
        react: { text: "🔍", key: message.key }
    })

    try {
        const searchRes = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=5`, {
            timeout: 10000
        })

        if (!searchRes.data?.data || searchRes.data.data.length === 0) {
            return sender(message, client, `❌ Aucun anime trouvé pour "${query}"`)
        }

        let animeData = searchRes.data.data[0]
        const queryLower = query.toLowerCase()
        
        for (const anime of searchRes.data.data) {
            const titleLower = (anime.title || '').toLowerCase()
            const titleEngLower = (anime.title_english || '').toLowerCase()
            
            if (titleLower === queryLower || titleEngLower === queryLower) {
                animeData = anime
                break
            }
        }

        const statusFr = {
            'Finished Airing': '✅ Terminé',
            'Currently Airing': '🔄 En cours',
            'Not yet aired': '⏳ Non diffusé'
        }
        
        const ratingFr = {
            'G - All Ages': '👶 Tout public',
            'PG - Children': '🧒 Enfants',
            'PG-13 - Teens 13 or older': '🔞 Adolescents (+13)',
            'R - 17+ (violence & profanity)': '⚠️ Adultes (+17)',
            'R+ - Mild Nudity': '🔞 Adultes (+18)',
            'Rx - Hentai': '❌ Hentai'
        }
        
        const genresFr = {
            'Action': '⚔️ Action',
            'Adventure': '🗺️ Aventure',
            'Comedy': '😂 Comédie',
            'Drama': '🎭 Drame',
            'Fantasy': '✨ Fantaisie',
            'Sci-Fi': '🚀 Science-Fiction',
            'Romance': '💕 Romance',
            'Horror': '😱 Horreur',
            'Mystery': '🔍 Mystère',
            'Thriller': '🔪 Thriller',
            'Slice of Life': '🌸 Tranche de vie',
            'Sports': '🏆 Sports',
            'Supernatural': '👻 Surnaturel',
            'Magic': '🪄 Magie',
            'Military': '🎖️ Militaire',
            'Historical': '🏛️ Historique',
            'School': '🏫 École',
            'Psychological': '🧠 Psychologique',
            'Mecha': '🤖 Mecha',
            'Ecchi': '😳 Ecchi'
        }

        const title = animeData.title || 'Inconnu'
        const titleEnglish = animeData.title_english || 'Non disponible'
        const titleJapanese = animeData.title_japanese || 'Non disponible'
        
        let synopsis = (animeData.synopsis || 'Aucun synopsis disponible')
            .replace(/\[Written by MAL Rewrite\]/g, '')
            .replace(/\[.*?\]/g, '')
            .trim()

        // 🔥 TRADUCTION SYNOPSIS
        synopsis = await traduireEnFrancais(synopsis)

        const score = animeData.score || 'N/A'
        const rank = animeData.rank || 'N/A'
        const episodes = animeData.episodes || '?'
        
        let status = animeData.status || 'Inconnu'
        status = statusFr[status] || status
        
        const startDate = animeData.aired?.from?.split('T')[0] || '?'
        const endDate = animeData.aired?.to?.split('T')[0] || '?'
        
        let studios = animeData.studios?.map(s => s.name).join(', ') || '?'
        
        let genres = animeData.genres?.map(g => genresFr[g.name] || g.name).join(', ') || '?'
        
        let rating = animeData.rating || 'Non classé'
        rating = ratingFr[rating] || rating
        
        const source = animeData.source || '?'
        const duration = animeData.duration || '?'
        
        const imageUrl = animeData.images?.jpg?.large_image_url || animeData.images?.jpg?.image_url

        if (synopsis.length > 300) {
            synopsis = synopsis.substring(0, 300) + '...'
        }

        const starCount = score !== 'N/A' ? Math.floor(score / 2) : 0
        const stars = '⭐'.repeat(starCount)

        const result = `╭─⌈ 🎌 ${title} ⌋
│
│ 🇯🇵 *Titre japonais:* ${titleJapanese}
│ 🌍 *Titre anglais:* ${titleEnglish}
│
│ 📝 *Synopsis:*
│ ${synopsis}
│
│ ⭐ *Note:* ${score}/10 ${stars}
│ 📊 *Classement:* #${rank}
│
│ 🎬 *Épisodes:* ${episodes}
│ 📺 *Statut:* ${status}
│ 🎭 *Genres:* ${genres}
│
│ 🏢 *Studio:* ${studios}
│ 📅 *Diffusion:* ${startDate} → ${endDate}
│ ⏱️ *Durée:* ${duration}
│ 🔞 *Classification:* ${rating}
│ 📖 *Source:* ${source}
│
╰─⌊ GOLDEN-MD-V2 ⌉`

        if (imageUrl) {
            await client.sendMessage(remoteJid, {
                image: { url: imageUrl },
                caption: result
            }, { quoted: message })
        } else {
            await client.sendMessage(remoteJid, {
                text: result
            }, { quoted: message })
        }

        await client.sendMessage(remoteJid, {
            react: { text: "✅", key: message.key }
        })

    } catch (error) {
        console.error('Anime error:', error)
        
        if (error.response?.status === 429) {
            sender(message, client, '⚠️ Trop de requêtes, attends 5 secondes.')
        } else {
            sender(message, client, `❌ Erreur pour "${query}"`)
        }
    }
}