var xlsx = require("xlsx");
const fs = require("fs");
const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({apiKey: ''});
const openai = new OpenAIApi(configuration);

async function TransformData(){
    var workbook = xlsx.readFile("src/shared/data-set.xlsx");
    var shet_name_list = workbook.SheetNames;
    var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[shet_name_list[0]]);

    for (const item of xlData){
        var object = `{"prompt": "${item.Question} ->", "completion": "${item.Answer} END"}`;

        await fs.appendFileSync("src/shared/data-set.jsonl", object, "utf8", function(){})
        await fs.appendFileSync("src/shared/data-set.jsonl", "\r\n", "utf8", function(){})

    }
}

async function UploadFile(){    
    const response = await openai.createFile(fs.createReadStream("src/shared/data-set.jsonl"), "fine-tune");
    return response;
}

async function ListFiles(){
    const response = await openai.listFiles();
    return response;
}

async function RetrieveFile(fileId){
    
    try{
        const response = await openai.retrieveFile(fileId);
        return response;
    }catch(e){
        return "fileId not found";
    }
}

async function DeleteFile(fileId){
    
    try{
        const response = await openai.deleteFile(fileId);
        return response;
    }catch(e){
        return "fileId not found";
    }
}


module.exports = {
    TransformData,
    UploadFile,
    ListFiles,
    RetrieveFile,
    DeleteFile
}