const tfjs = require('@tensorflow/tfjs-node');

async function loadModel(){
    return tfjs.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;