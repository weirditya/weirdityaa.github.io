const webcamElement = document.getElementById('webcam');
let net;

async function app() {

    console.log('Loading model...');
    document.getElementById("info").innerHTML= "Loading Model...";
    net = await mobilenet.load()
    console.log('Mobilenet Model Loaded Succesfully!');
    document.getElementById("info").innerHTML= "Model Successfully Loaded";
    
    //start webcam
    const webcam = await tf.data.webcam(webcamElement);

    while(true)
    {
        const img = await webcam.capture();
        const result = await net.classify(img);

        document.getElementById('console').innerHTML = `Prediction: ${result[0].className}<br />Probability: ${result[0].probability}`;

        img.dispose();
        await tf.nextFrame();
    }
}
app();