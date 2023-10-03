import { surpriseMePrompts } from "../constants";
///filesaver for easy downloading'
import FileSaver from 'file-saver';



export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random()* surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

////card helper will get image with id image and save the file
export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`);

}
