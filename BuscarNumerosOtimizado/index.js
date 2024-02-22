import fs from 'fs'
import open from 'open'
import robot from 'robotjs'


function sleep(ms) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    }
const newConversation = {
    x:320,
    y:176
}
const pesquisa = {
    x:116,
    y:279 
}
const colorContact = {
    x:369,
    y:340
}
async function main (){
    await open('https://web.whatsapp.com/', { app: { name: "firefox" } });
    sleep(11000)
    robot.moveMouse(newConversation.x, newConversation.y)
    robot.mouseClick();
    sleep(1000)
    robot.moveMouse(pesquisa.x, pesquisa.y)
    robot.mouseClick();




    const numeros = fs.readFileSync('input.txt').toString().split("\n");
    for (const numero of numeros){
        robot.typeString(`${numero}`);
        sleep(1000)
        robot.moveMouse(colorContact.x, colorContact.y);
        var hex = robot.getPixelColor(colorContact.x, colorContact.y);
        //console.log("#" + hex);
        const cor =  "ffffff"
        if (hex === cor ){
            console.log(`${numero} Tem whats\n`)
            fs.appendFile('output.txt', `${numero}` + '\n', (err) => {
                if (err) {
                    console.error('Erro ao escrever no arquivo:', err);
                }
            })
            
        }else{
            console.log(`${numero} Não tem whats\n`)
        }

        robot.keyTap("a", "control");
        robot.keyTap("delete");
    }
}
main()
 

