const tfjs = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tfjs.node
            .decodeImage(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);

        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;
        
        let result, suggestion;

        if (confidenceScore > 50) {
            result = 'Cancer';
            suggestion = "Segera periksa ke dokter!";
        } 
        else {
            result = 'Non-cancer';
            suggestion = "Anda tidak terkena penyakit Kanker";
        }

        return { result, suggestion };
    } catch (error) {
        throw new InputError(`Telah terjadi kesalahan input: ${error.message}`);
    }
}

module.exports = predictClassification;