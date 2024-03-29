const { format } = require('util');
const { spawn } = require('child_process');

let fontPath = './src/font/Zahraaa.ttf';
let handler = async (m, { conn, args }) => {
    if (!global.support.convert && !global.support.magick && !global.support.gm) {
        return handler.disabled = true; // Disable if doesn't support
    }

    let d = new Date();
    let inputPath = './src/kertas';
    let tgl = d.toLocaleDateString('id-ID');
    let hari = d.toLocaleDateString('id-ID', { weekday: 'long' });
    let teks = args.join(' ');

    let bufs = [];
    const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
        'convert',
        inputPath,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+78',
        hari,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '18',
        '-interline-spacing',
        '1',
        '-annotate',
        '+806+102',
        tgl,
        '-font',
        fontPath,
        '-size',
        '1024x784',
        '-pointsize',
        '20',
        '-interline-spacing',
        '-7.5',
        '-annotate',
        '+344+142',
        teks,
        'jpg:-'
    ];

    spawn(_spawnprocess, _spawnargs)
        .on('error', e => m.reply(format(e)))
        .on('close', () => {
            conn.sendFile(m.chat, Buffer.concat(bufs), 'nulis.jpg', 'Hati-hati ketahuan:v', m);
        })
        .stdout.on('data', chunk => bufs.push(chunk));
};

handler.help = ['nulis <teks>'];
handler.tags = ['tools'];
handler.command = /^nulis$/i;

module.exports = handler;