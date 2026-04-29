// utils/messageCounter.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const messageCountPath = path.join(process.cwd(), 'data', 'messageCount.json')

// Charger les données
export function loadMessageCount() {
    try {
        if (!fs.existsSync(messageCountPath)) return {}
        return JSON.parse(fs.readFileSync(messageCountPath, 'utf8'))
    } catch {
        return {}
    }
}

// Sauvegarder les données
export function saveMessageCount(data) {
    const dir = path.dirname(messageCountPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(messageCountPath, JSON.stringify(data, null, 2))
}

// Incrémenter le compteur d'un utilisateur
export function incrementMessageCount(chatId, userId) {
    const data = loadMessageCount()
    
    if (!data[chatId]) data[chatId] = {}
    if (!data[chatId][userId]) data[chatId][userId] = 0
    
    data[chatId][userId]++
    saveMessageCount(data)
    
    return data[chatId][userId]
}

// Réinitialiser les compteurs d'un groupe
export function resetGroupCount(chatId) {
    const data = loadMessageCount()
    delete data[chatId]
    saveMessageCount(data)
}

// Obtenir le top des actifs
export function getTopActifs(chatId, participants, limit = 15) {
    const data = loadMessageCount()
    const groupData = data[chatId] || {}
    
    const botJid = global.botJid || ''
    
    const actifs = participants
        .filter(p => p.id !== botJid && groupData[p.id] > 0)
        .map(p => ({
            jid: p.id,
            count: groupData[p.id] || 0,
            isAdmin: !!p.admin
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
    
    return actifs
}