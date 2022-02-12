
const TelegramBot = require('node-telegram-bot-api');
const request = require('request')
const Promise = require('bluebird');
Promise.config({
  cancellation: false
});
const token = '5211880934:AAFug4aHyBGqDyVE2UuZmw-yNVdQns47H5k'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
// const start = ()=>{
//     bot.setMyCommands([
//         {command: '/start', description : 'bot to start'},
//         {command : '/info', description : "take info about the bot"},
//         {command : '/game', description : "play the game"}

//     ])}
bot.on("message", async (msg, match) => {
   const chatId = msg.chat.id;
   const  text = msg.text;

  if(text == "/curse"){
 bot.sendMessage(chatId, 'Выберите какая валюта вас интересует', {
      reply_markup: {
          inline_keyboard: [
              [
              {
                  text: '$ USD🇺🇸',
                  callback_data: 'USD'
              },
              {
                text: '€ EUR🇪🇺',
                callback_data: 'EUR'
            },
            {
                text: '₽ RUB🇷🇺',
                callback_data: 'RUB'
            }
           ],
           [
              
               {  text: '₽ KYG🇰🇬',
            callback_data: 'KYG'},

               {  text: '₽ KZT🇰🇿',
               callback_data: 'тңг'}, 
               
               {  text: '₽ TJS🇹🇯',
               callback_data: 'TJS'},

           ],
           [
            {  text: '₽ CNY🇨🇳',
            callback_data: 'CNY'},

            {  text: '₩ KOR🇰🇷',
            callback_data: 'KRW'},

            
            {  text: '￥ JPY🇯🇵',
            callback_data: 'JPY'},
           ],
           [
               { text : "GOLD🪙",
               callback_data: 'GOLD'}
           ]

          ]
      }
  });
}}) 

bot.on('callback_query', query=>{
    const id = query.message.chat.id;
    request('https://cbu.uz/ru/services/open_data/rates/json/', function (error, response, body){
        const data = JSON.parse(body);
        const result = data.filter(item => item.G1 === query.data)[0];
        const flag = {
            'EUR' : '🇪🇺',
            'USD' : '🇺🇸',
            'RUB' : '🇮🇳',
            'KOR' : '🇰🇷'
        }
        let md = `
        *${flag[result.G1]} ${result.G3} ${result.G1} 💱 ${result.G4} UZS🇺🇿*${result.G6}_${result.G5}_`;

        bot.sendMessage(id, md, {parse_mode: 'Markdown'})
    } )
})

//  start()