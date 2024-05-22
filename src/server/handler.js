const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const Crypto = require('crypto');

async function postPredictHandler (request, h){
    const { image } = request.payload;
    const { model } = request.server.app;

    const { result, suggestion } = await predictClassification(model, image);
    const id = Crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        id: id,
        result: result,
        suggestion: suggestion,
        createdAt: createdAt,
    };

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    })

    response.code(201);
    return response;
}

module.exports = postPredictHandler;