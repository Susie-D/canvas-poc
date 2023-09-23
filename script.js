// utilizing canvas protoype
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const particleArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;

// ensure canvas covers the entire browser window
window.addEventListener('resize', function() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

// styling for rectangle
// ctx.fillStyle = 'white';
// ctx.fillRect(10, 20, 150, 50);



// custom mouse object
const mouse = {
    x: undefined,
    y: undefined,
}

// event listener to locate user click position
canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event. y;
    // push particles
    for(let i = 0; i < 10; i++) {
        particleArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event. y;
    // push particles
    for(let i = 0; i < 5; i++) {
        particleArray.push(new Particle());
    }
});

//stying for an outlined circle
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 5;
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.stroke();
// })


//stying for an filled circle
// function drawCircle() {
//     ctx.fillStyle = 'blue';
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2)
//     ctx.fill();
// }

// class for each particle
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        //creates random particles throughout 
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        // Random 5px
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() { 
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill();
    }
}

// created 100 particles
// function init() {
//     for (let i = 0; i < 100; i++) {
//         particleArray.push(new Particle());
//     }
// }
// init();

// to display 100 particles
function handleParticles() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        for (let j = i; j < particleArray.length; j++) {
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
           ctx.beginPath();
           ctx.strokeStyle = particleArray[i].color;
           ctx.lineWidth = 0.2;
           ctx.moveTo(particleArray[i].x, particleArray[i].y);
           ctx.lineTo(particleArray[j].x, particleArray[j].y);
           ctx.stroke();
           ctx.closePath();
        }
    }
            if (particleArray[i].size <=0.3) {
            particleArray.splice(i , 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0 , 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0.02)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=2;
    // animation loop
    requestAnimationFrame(animate);
}

animate(); 