const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
        console.log("its here");
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => console.log('somethig is not right', err));
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    let pixels = ctx.getImageData(0, 0, width, height);
    
    pixels = rgbSplit(pixels);

    ctx.globalAlpha = 0.1;

    ctx.putImageData(pixels, 0, 0);

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

function takePhoto(){
    snap.currentTime =0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src=${data} alt="a good pic"/>`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
    console.log(pixels)
    for(let i=0; i < pixels.data.length; i+=4){ 
        pixels.data[i + 0] = pixels.data[i + 0] + 100;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    console.log(pixels)
    return pixels;
}

function rgbSplit(pixels){
    console.log(pixels)
    for(let i=0; i < pixels.data.length; i+=4){ 
        pixels.data[i - 150] = pixels.data[i + 0];
        pixels.data[i + 100] = pixels.data[i + 1];
        pixels.data[i - 550] = pixels.data[i + 2];
    }
    console.log(pixels)
    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);