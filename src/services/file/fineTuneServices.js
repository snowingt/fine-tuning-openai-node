const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({apiKey: ''});
const openai = new OpenAIApi(configuration);

/**
 * Creates a new fine-tuned model using the specified training file and OpenAI's Davinci model.
 * @param {string} fileId - The ID of the training file to use for fine-tuning.
 * @returns {Promise<object>} - A Promise that resolves with the response from OpenAI's API, or rejects with an error object.
 */
async function CreateFineTune(fileId){
    
    try{
        const response = await openai.createFineTune({
            training_file: fileId,
            model: "davinci-002",
            suffix: "question-answer-01"
        });
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}


async function ListFineTune(){
    
    try{
        const response = await openai.listFineTunes();
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}

async function RetrieveFineTune(fineTuneId){
    
    try{
        const response = await openai.retrieveFineTune(fineTuneId);
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}

async function CancelFineTune(fineTuneId){
    
    try{
        const response = await openai.cancelFineTune(fineTuneId);
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}

async function DeleteModelFineTune(model){
    
    try{
        const response = await openai.deleteModel(model);
        return response;
    }catch(e){
        return {status: 400, data: e}
    }
}


module.exports = {
    CreateFineTune,
    ListFineTune,
    RetrieveFineTune,
    CancelFineTune,
    DeleteModelFineTune
}