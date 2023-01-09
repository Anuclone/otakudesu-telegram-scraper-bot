/* otakudesu-telegram-scraper-bot */

let axios = require("axios")
let cheerio = require("cheerio")

let chatId = 000000000; //input your telegram chatID here
let token = "#########:###################################"; //input your token here

(async() => {
    const respons = await axios.get("https://otakudesu.bid/ongoing-anime/")
    let res = []
    let $ = cheerio.load(respons.data);
    $(".jdlflm").each((i,v) => res.push({ title : $(v).text() }))
    $(".newnime").each((i,v) => 
        res[i].date = Number($(v).text().split(" ")[0])
    )

    let now = new Date().getDate()
    res = res.filter(v => v.date == now)
    console.log("Success")

    let title = res.map(v => v.title)
    let str = "List update hari ini tanggal " + now + ":\n"
    str += title.join('\n')
    let txt = encodeURI(str)
    axios.get("https://api.telegram.org/bot"+token+"/sendMessage?chat_id="+chatId+"&text="+txt);


})()