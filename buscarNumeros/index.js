const fs = require("fs");
const open = (...args) => import('open').then(({default: open}) => open(...args));
const clipboardy = require("clipboardy");
const robot = require("robotjs")
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');

function sleep2(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
const iniciarConversa = {
    x: 678,
    y: 402
}
const usarWhatsWeb = {
    x:676,
    y:471
}
fileString = ""

async function main (){
    const numeros = fs.readFileSync('input.txt').toString().split("\n");
    for (const numero of numeros){
        await open(`https://api.whatsapp.com/send/?phone=${numero}&text&type=phone_number&app_absent=0`, { app: { name: "firefox" } });
        sleep2(1000);
        robot.moveMouse(iniciarConversa.x, iniciarConversa.y)
        robot.mouseClick(); 
        sleep2(2000)
        robot.moveMouse(usarWhatsWeb.x , usarWhatsWeb.y)
        robot.mouseClick();
        sleep2(15000)
        
        clipboardy.writeSync('hello');
        const text = clipboardy.readSync();
        let text2 = 'hello'

        robot.typeString("aho!")
        robot.keyTap("a", "control");
        robot.keyTap("x", "control");
        
        text2 = clipboardy.readSync();
        
        if (text === text2){
            fs.appendFile('output.txt', `${numero} não tem whats` + '\n', (err) => {
                if (err) {
                  console.error('Erro ao escrever no arquivo:', err);
                } else {
                    console.log(`${numero} não tem whats`)
                }
            })
            
        }else{
            fs.appendFile('output.txt', `${numero} tem whats` + '\n', (err) => {
                if (err) {
                  console.error('Erro ao escrever no arquivo:', err);
                } else {
                    console.log(`${numero} tem whats`)
                }
            })
            
        }
        sleep2(1000)
        robot.keyTap("W", "control");
    }    
}
main()
