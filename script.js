// Words to cycle through in the highlighted typed area
const words = [
	'English', 'Spanish', 'Math', 'Science', 'Music', 'History', 'Coding', 'Design', 'Art', 'Physics'
];

const typedEl = document.getElementById('typed');

// Simple typing + deleting loop
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let typeSpeed = 120;

function tick(){
	const current = words[wordIndex];
	if(!deleting){
		typedEl.textContent = current.slice(0, ++charIndex);
		if(charIndex === current.length){
			deleting = true;
			setTimeout(tick, 900);
			return;
		}
	} else {
		typedEl.textContent = current.slice(0, --charIndex);
		if(charIndex === 0){
			deleting = false;
			wordIndex = (wordIndex + 1) % words.length;
		}
	}
	setTimeout(tick, deleting ? typeSpeed / 2 : typeSpeed);
}

// Start with the first word visible instantly
typedEl.textContent = '';
setTimeout(tick, 400);

// Floating words generator
const floatingContainer = document.getElementById('floating-words');
const floatingPool = [
	'English','Hello','Learn','Read','Write','Speak','Listen','Word','Idea','Study','Dream','Create','Explore','Think','Know'
];

function rand(min,max){return Math.random()*(max-min)+min}

function createFloatingWord(){
	const el = document.createElement('div');
	el.className = 'float-word';
	el.textContent = floatingPool[Math.floor(Math.random()*floatingPool.length)];
	// random size and position
	const size = rand(0.9,2.2);
	el.style.fontSize = `${size}rem`;
	el.style.left = `${rand(-10,90)}%`;
	el.style.top = `${rand(20,110)}%`;
	el.style.opacity = rand(0.04,0.18);
	const dur = rand(10,28);
	el.style.animation = `driftUp ${dur}s linear forwards`;
	el.style.transform = `translateY(0) rotate(${rand(-30,30)}deg)`;
	floatingContainer.appendChild(el);

	// remove after animation ends
	setTimeout(()=>{
		el.remove();
	}, (dur+1)*1000);
}

// spawn words continuously but modest rate so it's subtle
setInterval(createFloatingWord, 700);

// create a few immediately to fill background
for(let i=0;i<12;i++) createFloatingWord();
