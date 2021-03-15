const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay(){
    if(video.paused){
        video.play()
    }else{
        video.pause();
    }
}
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);  
}
function handleUpdate(){
    video[this.name] = this.value;
}
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e){
    console.log("is her?")
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    console.log(scrubTime);
    video.currentTime = scrubTime;
}



video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
console.log(skipButton);
skipButton.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleUpdate));
let mosueDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => { mosueDown && scrub(e)});
progress.addEventListener('mousedown', () => {mouseDown = true});
progress.addEventListener('mouseup', () => mouseDown = false);