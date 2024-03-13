const { savefrom, instagramdl } = require('@bochilteam/scraper')
let fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!args[0]) throw `_Masukkan link_\n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/linkurl`
  if (/stories/i.test(args[0])) throw `_Perintah ini untuk mendownload post IG, bukan story_\nGunakan fitur berikut \n\n${usedPrefix}igstory username`
  if (!args[0].match(/(https:\/\/www.)?instagram.com\/([A-Za-z0-9.\_]*\/)?(reel|p|tv)/)) throw `Link tidak valid \n\nContoh:\n${usedPrefix + command} https://www.instagram.com/p/linkurl`
  let ig = await fetch(global.API('alya', 'api/ig', { url: args[0] }, 'apikey'))
  let res = await ig.json()
  let vid = res.data.map(v => {
    v.url
  })

  await m.reply('_Sedang proses mengirim..._')

  for (let url of vid) {
    await this.sendFile(m.chat, url, 'ig' // + (link.includes('mp4') ? 'mp4' : 'jpg')//
      , '', m, null, { asDocument: global.db.data.users[m.sender].useDocument })
  }
}
handler.help = ['ig', 'instagram'].map(v => v + ' <link>')
handler.tags = ['downloadersosmed']
handler.command = /^(ig|instagram)2?$/i
handler.limit = true

module.exports = handler