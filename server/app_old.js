const app = require("express")(),
fs = require("fs");
var Redis = require('ioredis');
var redis = new Redis();
var RandomOrg = require('random-org');
// const curl = new (require( 'curl-request' ))();

const { curly } = require('node-libcurl')

var request = require('request');

var requestify = require('requestify');
domain = 'https://liftup.wtf';

var crypto = require('crypto');

const mysql = require('mysql')
const util = require('util')
var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Piska7Piska',
    database: 'baza',
});
client.query = util.promisify(client.query);
client.query("SET SESSION wait_timeout = 604800");

const server = require("https").createServer({
    key: fs.readFileSync('/var/www/html/server/privkey.pem'),
    cert: fs.readFileSync('/var/www/html/server/fullchain.pem')
}),
io = require("socket.io")(server, {
    cors: {
        origin: "https://liftup.wtf",
        methods: ["GET", "POST"]
    }
});

io.on("connection", () => {
    updateOnline(online)
});

server.listen(2083, () => {
    //  console.log('server listen 2083');
});

function updateOnline(clients){
  //  console.log(clients, ipsConnected);
  io.sockets.emit('online', clients);
}
let online = 0,
ipsConnected = {}; //список подключенных ip

io.on('connection', async (socket) => {
    let address;

    if (socket.handshake.headers['x-forwarded-for'] !== undefined) {
      address = socket.handshake.headers['x-forwarded-for'];
  } else {
      address = socket.handshake.headers["x-real-ip"];
  }

  if (!ipsConnected.hasOwnProperty(address)) {
    ipsConnected[address] = 1;
    online++;
    updateOnline(online)
} else {
    ipsConnected[address] += 1;
}

socket.on('disconnect', () => {
    ipsConnected[address] -= 1;

    if (ipsConnected[address] <= 0) {
        delete ipsConnected[address];
        online--;
        updateOnline(online)
    }
});


});


io.sockets.on('connection', function(socket) {


    socket.on('message', function(data) {
        var newData = data.message;
        
    })    


    socket.on('WHEEL_CONNECT', (e) => {
        socket.emit('WHEEL_GET', {bonusWheelTime, TipeWheel, coefficients, wheelRotate, wheelPlus, wheelTime, bonusArr, statusBonus })
    })

    socket.on('JACKPOT_CONNECT', (e) => {
        socket.emit('JACKPOT_GET', { avatarJackpot, plusJackpot, statusJackpot, cashHantJackpot, timerJackpotAnimate, timerCashHantJackpot })
    })
}); 






redis.psubscribe('*', function(error, count) {

});

redis.on('pmessage', function(pattern, channel, message) {
    io.emit(channel, message);

});


function x100_bot() {
    console.log(domain)
    requestify.request(domain+'/x100bot', {
      method: 'GET'
  })
    .then(function(response) {
        console.log('responsebody', response.getBody());
        console.log('response headers',response.getHeaders());
        console.log('responseheader Accept', response.getHeader('Accept'));
        console.log('response code', response.getCode());
        console.log('responsebody RAW', response.body);
    })
    .fail(function (response) {
        console.log('response Error', response.getCode());
    })
    ;





    
}








function TIMES(e) {
    if (e < 10) {
        return '0' + e
    }
    return e
}

function shuffle(e) {
    return e.sort(() => Math.random() - 0.5);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


// WHEEL


const doubleData = {
    0: "2",
    1: "3",
    2: "2",
    3: "3",
    4: "30",
    5: "2",
    6: "3",
    7: "2",
    8: "3",
    9: "2",
    10: "5",
    11: "3",
    12: "2",
    13: "5",
    14: "2",
    15: "3",
    16: "2",
    17: "3",
    18: "2",
    19: "bonus",
    20: "2",
    21: "5",
    22: "2",
    23: "5",
    24: "3",
    25: "2",
    26: "5",
    27: "2",
    28: "3",
    29: "5"
    
}


function wheelColorCoff(e) {
    var coffNumber = null
    switch (e) {
        case '2':
        coffNumber = 2
        break;
        case '3':
        coffNumber = 3
        break;
        case '5':
        coffNumber = 5
        break;
        case '30':
        coffNumber = 30
        break;
        case 'bonus':
        coffNumber = 'bonus'
        break;      
    }
    return coffNumber
}

const bonusCoff = {
    x2: 15,
    x3: 15,
    x5: 15,
    x30: 15,
}
async function bonusColorCoff(){
    var colorse = []
    for(let i=0;i<Object.keys(bonusCoff).length;i++){
        for(let j=0;j<bonusCoff[Object.keys(bonusCoff)[i]];j++){
            colorse.push(Object.keys(bonusCoff)[i])
        }
    }
    return await shuffle(colorse)
}
async function bonusCoffs(){
    var arr = []
    return await shuffle(arr)
}


var wheelPlus = 0
var wheelTime = 30
var wheelRotate = 0

var bonusArr = []
var bonusBonus = {}
var statusBonus = 0

var wheelYmn = 1;

async function goWheel() {
    var preFinishWheel = false;
    WHEEL_START = 0
    await client.query('UPDATE settings SET status_wheel = ?', [0])
    var intervalwheel = setTimeout(async function wait_wheel() {
        const sw = await client.query('SELECT count(*) FROM wheels')
        io.sockets.emit('WHEEL_TIME', {
            time: 30,
            text: 'Ожидание игроков',
            bet: 'on'
        })
        if (sw[0]['count(*)'] > 0) {
            if(!preFinishWheel) {
                preFinishWheel = true
                startWheel(30)

                clearTimeout(intervalwheel)
                return
            }
        }else{
            console.log('wait')
            var intervalwheel = setTimeout(wait_wheel, 1000);
        }
    }, 1000);

    
}
goWheel()

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}



function shuffle_sl(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
} while (currentDate - date < milliseconds);
}

async function randOrgJackpot(){
    await requestify.request(domain+'/generate_jackpotnumber', {
      method: 'GET'
  })
    .then(async function(response) {
        response = response.getBody();
        console.log(response)
        return 'True'
    })
    .fail(async function (response) {
        console.log('responsebody', response.getBody());
        console.log('response Error', response.getCode());
        return 'False'

    });
}
async function randOrg() {

    console.log('Запрос')

    let start = Date.now();


    await requestify.request(domain+'/generate_number', {
      method: 'GET'
  })
    .then(async function(response) {
        response = response.getBody();
        console.log(response)

        let end = Date.now();
        razn = end - start;

        console.log('Конец '+razn)
        return 'True'
        // await client.query('UPDATE settings SET rand_key = ?, rand_random = ?, rand_signature = ?', [response.number, response.random, response.signature])
    })
    .fail(async function (response) {
        console.log('responsebody', response.getBody());
        console.log('response Error', response.getCode());
        return 'False'

    });

    
}

async function winUserWheel(){
    await requestify.request(domain+'/winwheel', {
      method: 'GET'
  })
    .then(async function(response) {
        response = response.getBody();
        console.log(response)
        return 'True'
    })
    .fail(async function (response) {
        console.log('response Error', response.getCode());
        return 'False';

    });
}

rot_0 = 0

var WHEEL_START = 0;
var MAX_RANDOM_KEY_ID = 10;
var MIN_RANDOM_KEY_ID = 1;
var global_rand_key = -1;
var global_rand_random = -1;
var global_rand_signature = -1;
var TipeWheel = 'cubic-bezier(0, 0.49, 0, 1)';
var coefficients = [2, 3, 5, 30]
var bonusWheelTime = 0
function sleepWait(){
    TIMER_WHEEL_WAIT = 5

    setTimeout(function run_wait() {
      TIMER_WHEEL_WAIT -= 1

      io.sockets.emit('WHEEL_TIME', {
        time: TIMER_WHEEL_WAIT,
        text: 'Генерируем число...',
        bet: 'off'
    })

      console.log('wait_wheel')


      if (TIMER_WHEEL_WAIT <= 0) {
        return
    }

    setTimeout(run_wait, 1000);

}, 1000);
}

function startWheel(TIMER_WHEEL){
    console.log('go')
    var TIMER_WHEEL = TIMER_WHEEL;
    var preFinishWheel = false;


    const cw = setInterval(async () => {
        TIMER_WHEEL -= 1
        io.sockets.emit('WHEEL_TIME', {
            time: TIMER_WHEEL,
            text: 'Прокрутка через',
            bet: 'on'
        })
        if (TIMER_WHEEL <= 3) {
            await client.query('UPDATE settings SET status_wheel = ?', [1])
            
        }
        // if (TIMER_WHEEL == 1) {
        //     if(WHEEL_START == 0){

        //     }

        //     if(WHEEL_START == 0){
        //         TIMER_WHEEL = 6
        //         WHEEL_START = 1
        //     }
        // }
        if (TIMER_WHEEL <= 0 && !preFinishWheel) {
            preFinishWheel = true
            await clearInterval(cw)

            var arr = []

            var totalCoff = false
            var coffs = 1

            var bonus = false
            var dict = [];

            var colorCoffResult = null

            //// RAN

            io.sockets.emit('WHEEL_TIME', {
                time: 0,
                text: 'Генерируем число...',
                bet: 'off'
            })

            type = 'False'
            while (type == 'False'){
                type = await randOrg()
            }

            await sleep(1000)
            
            

            
            //////////////////////

            const setting = await client.query('SELECT * FROM settings')

            // var rand_key = setting[0].rand_key
            // var rand_random = setting[0].rand_random
            // var rand_signature = setting[0].rand_signature

            var mult_bonus = setting[0].mult_bonus;
            var coeff_bonus = setting[0].coeff_bonus;

            var wheel_win =setting[0].wheel_win;
            var youtube = setting[0].youtube;
            var auto_wheel = setting[0].auto_wheel;
            if(auto_wheel == 0){
                youtube = 1
            }
            
            const results_random = await client.query('SELECT * FROM results_random ORDER BY id DESC')

            var rand_key = results_random[0].rand
            var rand_random = results_random[0].random
            var rand_signature = results_random[0].signature


            //////////////////////////////////////

            

            number_double = rand_key
            console.log('NUMB '+number_double)

            colorCoffResult = doubleData[number_double]
            
            wheelPlus = rand(0, 2)
            if(rot_0 == 0){
                rot_0 = 1
                umn = 360
            }else{
                umn = 360 * 11
                rot_0 = 0
            }
            wheelRotate = 360 / 30 * (number_double) + umn;
            TipeWheel = 'cubic-bezier(0, 0.49, 0, 1)'
            io.sockets.emit('WHEEL_START', { colorCoffResult, wheelPlus: wheelPlus, wheelTime: 30,TipeWheel, wheelRotate })

            var finish = 30
            var finisherwheel = false
            var FINISH_WHEEL = setTimeout(async function fin_w_1() {

                finish -= 1
                wheelTime = finish
                

                io.sockets.emit('WHEEL_TIME', {
                    time: finish,
                    text: 'Новый раунд через',
                    bet: 'off'
                })

                // io.sockets.emit('WHEEL_START', { colorCoffResult, wheelPlus, wheelTime,TipeWheel, wheelRotate })


                if (finish == 0 && !finisherwheel) {
                    finisherwheel = true
                    
                    await clearTimeout(FINISH_WHEEL)                                    

                    var coffNumber = await wheelColorCoff(colorCoffResult)                                      

                    var coeff = coffNumber


                    if (coeff == "bonus"){
                        var arr = []
                        const color = await bonusColorCoff()
                        const coff = ['2x', '2x', '2x', '2x','3x','4x', '2x', '3x', '2x','6x','7x','3x','3x', '4x','4x', '5x', '6x', '7x']// ''
                        shuffle(coff)
                        const coffWin = coff[await rand(0, coff.length - 1)]
                        var isBonus = false

                        for (let i = 0; i < 100; i++) {
                            arr.push({
                                multiplayer: [coff[rand(0, coff.length - 1)]]

                            })
                        }
                        var totalCoff = false
                        var coffs = 1
                        var cx = await bonusColorCoff()
                        cx = cx[0]
                        var bonus = false

                        isBonus = Number(coffWin.replace('x', ''))

                        coffs = await wheelColorCoff(cx)

                        arr[43] = { multiplayer: [isBonus + 'x'] }
                        if(mult_bonus != 'false'){
                            isBonus = mult_bonus
                            arr[43] = { multiplayer: [mult_bonus + 'x'] }
                        }
                        

                        wheelYmn *= isBonus;
                        coefficients = coefficients.map(function(x) { return x * isBonus; });

                        plus = rand(3, 45)

                        bonusArr = arr
                        bonusBonus = bonus
                        statusBonus = 1
                        bonusWheelTime = 10


                        io.sockets.emit('WHEEL_BONUS', {
                            bonusArr,
                            bonusWheelTime
                        })



                        var finish_bonus = 10
                        var BONUS_WHEEL = setTimeout(async function bonus_run() {
                            finish_bonus -= 1
                            bonusWheelTime = finish_bonus
                            io.sockets.emit('WHEEL_TIME', {
                                time: finish_bonus,
                                text: 'Бонусная игра',
                                bet: 'off'
                            })
                            if(finish_bonus == 6){
                               await client.query('UPDATE settings SET wheel_win="false"')
                               await client.query('TRUNCATE results_random')
                                // randOrg()
                            }
                            if (finish_bonus <= 0){

                                await client.query('INSERT INTO wheel_history (number,coff, random, signature) VALUES (?,?, ?, ?)', [number_double,colorCoffResult, rand_random, rand_signature])

                                
                                io.sockets.emit('WHEEL_NEW_COEFF', {
                                    coefficients: coefficients,
                                })
                                statusBonus = 2


                                setTimeout(() => startWheel(1), 2000);
                                return;
                            }else{
                                var BONUS_WHEEL = setTimeout(bonus_run, 1000);
                            }
                            
                        }, 1000);


                        

                    }

                    else{

                        // const winner = await client.query('SELECT * FROM wheels WHERE coff = ?', [coffNumber])
                        // winner.forEach(async (e) => {
                        //     bet = e.bet
                        //     user_id = e.user_id
                        //     win = bet * (coeff * wheelYmn)
                        //     await client.query('UPDATE settings SET wheel_bank = wheel_bank - ?', [win])

                        //     // const user = await client.query('SELECT * FROM users WHERE id = ?', [user_id])
                        //     // balance = user[0].balance

                        //     // newbalance = balance + win
                        //     if(win <= 0){
                        //         console.log('Ошибка зачисления средств у айди '+user_id)
                        //     }
                        //     await client.query('UPDATE users SET balance = balance + ? WHERE id = ?', [win, user_id])



                        //     let s = await client.query('SELECT * FROM settings')
                        //     io.sockets.emit('WHEEL_NOTIFY', { user_id, win })
                        // })


                        
                        await client.query('INSERT INTO wheel_history (number,coff, random, signature) VALUES (?,?, ?, ?)', [number_double,colorCoffResult, rand_random, rand_signature])
                        await client.query('UPDATE settings SET wheel_win="false",mult_bonus="false",coeff_bonus="false",wheelYmn = ?, wheelWinNumber = ?', [wheelYmn, coffNumber])

                        console.log('Win wait...')

                        type = 'False'
                        while (type == 'False'){
                            type = await winUserWheel()
                        }


                        console.log('Win done...')
                        wheelYmn = 1
                        statusBonus = 0
                        coefficients = [2, 3, 5, 30]


                        await client.query('TRUNCATE wheels')
                        await client.query('UPDATE wheel_anti SET win = 0')
                        await client.query('TRUNCATE results_random')


                        const history = await client.query('SELECT number,id,coff,random,signature FROM wheel_history ORDER BY id DESC LIMIT 0,6')




                        io.sockets.emit('WHEEL_FINISH', { history, colorCoffResult })

                        setTimeout(() => io.sockets.emit('WHEEL_CLEAR'), 4000);

                        setTimeout(goWheel, 4000)

                    }

                    return
                }


                var FINISH_WHEEL = setTimeout(fin_w_1, 1000);
            }, 1000);



}


}, 1000)


}


// END WHEEL

// JACKPOT

var statusJackpot = 0;
var avatarJackpot = [];
var cashHantJackpot = [];
var timerJackpot = 0;
var timerCashHantJackpot = 0;
var plusJackpot = 0;
var timerJackpotAnimate = 0;
function unikumBet(res) {
    var arr = []
    for (let i = 0; i < res.length; i++) {
        if (!arr.find(el => el.user_id == res[i].user_id)) {
            arr.push(res[i])
        }
    }
    return arr
}

function animationFinish() {
    timerJackpotAnimate = 30
    const tt = setInterval(() => {
        timerJackpotAnimate -= 1
        console.log(timerJackpotAnimate)
        if (!timerJackpotAnimate) clearInterval(tt);
        return timerJackpotAnimate
    }, 1000)
}


async function waitJackpot() {
    timerJackpot = 30;
    statusJackpot = 0
    var preFinishJackpot = false;
    WHEEL_START = 0
    await client.query('UPDATE settings SET status_jackpot = ?', [0])
    var intervalJackpot = setTimeout(async function wait_jackpot() {
        const result = await client.query('SELECT * FROM jackpot')
        io.sockets.emit('JACKPOT_TIME', {
            time: 30,
            text: 'Ожидание ставок...',
            bet: 'on',
            wait: 1
        })
        if (await unikumBet(result).length > 1) {
            if(!preFinishJackpot) {
                preFinishJackpot = true
                startJackpot()
                clearTimeout(intervalJackpot)
                return
            }
        }else{
            console.log('waitJackpot')
            var intervalJackpot = setTimeout(wait_jackpot, 1000);
        }
    }, 1000);

    
}

waitJackpot()

async function cashHant(){
    statusJackpot = 1
    io.sockets.emit('CASHHUNT_START')
    timerCashHantJackpot = 10
    var intervalStartJackpotHant = await setTimeout(async function start_hunt() {
        console.log('HUNT')
        timerCashHantJackpot -= 1
        io.sockets.emit('CASHHUNT_TIME', {
            time: await TIMES(timerCashHantJackpot),
        })

        if (timerCashHantJackpot == 0){
            clearTimeout(intervalStartJackpotHant)
            io.sockets.emit('CASHHUNT_FINISH')
            return
        }else{
            var intervalStartJackpotHant = await setTimeout(start_hunt, 1000);
        }        
    }, 1000);
}

async function cashHuntFinish(){
    await requestify.request(domain+'/cashhuntfinish', {
      method: 'GET'
  })
    .then(async function(response) {
        response = response.getBody();
        console.log(response)
        return 'True'
    })
    .fail(async function (response) {
        console.log('response Error', response.getCode());
        return 'False';

    });
}

async function startJackpot(){
    var intervalStartJackpot = setTimeout(async function start_jackpot() {
        timerJackpot -= 1
        io.sockets.emit('JACKPOT_TIME', {
            time: await TIMES(timerJackpot),
            bet: 'on',
            wait: 0
        })
        if (timerJackpot <= 3) {
            await client.query('UPDATE settings SET status_jackpot = ?', [1])
            
        }

        if (timerJackpot == 0) {
            clearTimeout(intervalStartJackpot)
            // cashHantJackpot = []
            // statusJackpot = 3
            // for (var i = 0; i <= 64; i++) {
            //     cashHantJackpot.push(rand(1, 7))
            // }

            // await client.query('UPDATE settings SET status_jackpot = ?', [2])
            // io.sockets.emit('CASHHUNT_START', {cashHantJackpot})
            // timerCashHantJackpot = 13

            // coefsHunt = []
            // for (var i = 0; i <= 32; i++) {
            //     r = rand(1, 3)
            //     if (r == 1){
            //         x = 0.5
            //     }else{
            //         x = 1
            //     }
            //     coefsHunt.push(x)
            // }
            // // coefsHunt[0] = 1

            // for (var i = 0; i <= 32; i++) {
            //     coefsHunt.push(rand(2, 11))
            // }

            // shuffle(coefsHunt)
            // coefsHuntS = JSON.stringify(coefsHunt)
            // await client.query('UPDATE settings SET coefsHunt = ?', [coefsHuntS])


            // var intervalStartJackpotHant = await setTimeout(async function start_hunt() {
            //     console.log('HUNT')
            //     timerCashHantJackpot -= 1

                // if (timerCashHantJackpot - 3 < 0){
                //     io.sockets.emit('CASHHUNT_TIME', {
                //         time: 0,
                //     })
                // }else{
                //     io.sockets.emit('CASHHUNT_TIME', {
                //         time: (timerCashHantJackpot - 3),
                //     })
                // }
                

                // if(timerCashHantJackpot == 3){

                //     await client.query('UPDATE settings SET status_jackpot = ?', [1])
                //     const ch = await client.query('SELECT * FROM settings')
                //     coefsHunt = JSON.parse(ch[0].coefsHunt)
                //     io.sockets.emit('CASHHUNT_FINISH', {coefsHunt})

                //     coefsHuntS = JSON.stringify(coefsHunt)
                //     await client.query('UPDATE settings SET coefsHunt = ?', [coefsHuntS])


                //     type = 'False'
                //     while (type == 'False'){
                //         type = await cashHuntFinish()
                //     }
                    
                    
                    


                //     const res = await client.query('SELECT SUM(`bet`) FROM jackpot')
                //     bank = res[0]['SUM(`bet`)']

                    

                //     io.sockets.emit('JACKPOT_BANK', {bank})    

                // }

                if (0 == 0){
                    // clearTimeout(intervalStartJackpotHant)              
                    await client.query('UPDATE settings SET status_jackpot = ?', [3])
                    
                    io.sockets.emit('CASHHUNT_END')        


                    statusJackpot = 2;

                    animationFinish()
                    
                    
                    
                    const avatarki = []
                    const res = await client.query('SELECT * FROM jackpot')
                    var bank = 0
                    const players = []
                    const RESULT_JACKPOT = await unikumBet(res)
                    for (let i = 0; i < RESULT_JACKPOT.length; i++) {
                        const w = await client.query('SELECT SUM(`bet`) FROM jackpot WHERE user_id = ?', [RESULT_JACKPOT[i].user_id])
                        bank += w[0]['SUM(`bet`)']
                        RESULT_JACKPOT[i].bet = w[0]['SUM(`bet`)']
                        players.push(RESULT_JACKPOT[i])
                    }


                    for (let i = 0; i < players.length; i++) {
                        console.log(players.length)
                        for (let s = 0; s < Math.floor(Number(players[i].chance)); s++) {
                            avatarki.push(players[i].img)
                        }
                    }

                    type = 'False'
                    while (type == 'False'){
                        type = await randOrgJackpot()
                    }

                    const setting = await client.query('SELECT * FROM settings')
                    var random = setting[0].jackpot_rand
                    var jackpot_random = setting[0].jackpot_random
                    var jackpot_signature = setting[0].jackpot_signature
                    console.log(jackpot_random)
                    const win = await client.query('SELECT * FROM jackpot WHERE tick_one <= ? AND tick_two >= ?', [random, random])
                    var BANK_KOM = 0
                    var BET_USER = 0
                    var BANK = 0
                    for (let i = 0; i < RESULT_JACKPOT.length; i++) {
                        BANK += RESULT_JACKPOT[i].bet
                        if (RESULT_JACKPOT[i].user_id != win[0].user_id) {
                            BANK_KOM += RESULT_JACKPOT[i].bet
                        } else {
                            BET_USER += RESULT_JACKPOT[i].bet
                        }
                    }
                    const comm = await client.query('SELECT * FROM settings')
                    BANK_KOM *= 1 - (comm[0].comisia_jackpot / 100)
                    BANK_KOM += players.find(el => el.user_id === win[0].user_id).bet
                    avatarmk = await shuffle(avatarki);
                    avatarki[59] = win[0].img

                    avatarJackpot = avatarki
                    jackpot_status = true
                    plusJackpot = rand(5, 30)

                    io.sockets.emit('JACKPOT_ANIMATION_START', { players, avatarJackpot, plusJackpot, timerJackpotAnimate: 30 })

                    PROFIT_J = BANK - BANK_KOM
            // await client.query('UPDATE settings SET profit_jackpot = profit_jackpot + ? ', [PROFIT_J])
            

            setTimeout(async () => {
                await client.query('UPDATE users SET balance = balance + ? WHERE id = ?', [BANK_KOM, win[0].user_id])
                await client.query('INSERT INTO jackpot_history (user_id, login, avatar, bet, win, random, signature) VALUES (?, ?, ?, ?, ?, ?, ?)', [win[0].user_id, win[0].login, win[0].img, BET_USER, BANK, jackpot_random, jackpot_signature])

                await client.query('TRUNCATE jackpot')
                io.sockets.emit('JACKPOT_FINISH', {
                    login: win[0].login,
                    img: win[0].img,
                    bank: BANK_KOM,
                    random: random,
                    bet: BET_USER,
                    percent: win[0].chance
                })
                setTimeout(async(e) => {
                    io.sockets.emit('JACKPOT_NOTIFICATION', {
                        user_id: win[0].user_id,
                        win: BANK_KOM,
                    })
                    await client.query('UPDATE settings SET jackpot_wait = -1')
                    io.sockets.emit('JACKPOT_CLEAR')
                    setTimeout(waitJackpot, 100)
                }, 2000)
            }, 30000)
        }
    //     }else{
    //         var intervalStartJackpotHant = await setTimeout(start_hunt, 1000);
    //     }        
    // }, 1000);







return
}else{
    var intervalStartJackpot = setTimeout(start_jackpot, 1000);
}

}, 1000);
}
// END JACKPOT