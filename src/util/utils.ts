import { writeFile } from 'node:fs/promises'

//function to convert QRcode and to file
export async function saveQRcodetofile(qrCodeUrl:string, outputPath:string){
    try{
        const cleanQRcodeUrl = qrCodeUrl.replace('data:image/png;base64,', "");
        writeFile(outputPath, cleanQRcodeUrl, 'base64');
        console.log(`file written to ${outputPath}`)
    }catch(err){
        console.log(`error writing file ${err}`)

    }

}