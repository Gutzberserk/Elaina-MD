let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
        //global.db.data.users[m.sender].koin = 99999999999999999
        global.db.data.users[m.sender].limit = 99999999999999999
        global.db.data.users[m.sender].exp = 99999999999999999
        global.db.data.users[m.sender].level = 99999999999999999
        m.reply(`*Selamat Kamu Mendapatkan*:\n*Limit:* 999999999999\n*Exp:* 999999999999`)
}
handler.command = /^(cheat)$/i
handler.owner = true
handler.premium = false
module.exports = handler