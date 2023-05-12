let start = document.querySelector('.start');
let rules = document.querySelector('.rules');
let quetions = document.querySelector('section.quetions');
let header = document.querySelector('.quetions .quetion h1');
let lis = document.querySelectorAll('.quetions .quetion ul li');
let resultSection = document.querySelector('section.result');
let exit = document.querySelector('.exit');
let contin = document.querySelector('.continue');
let next = document.querySelector('button.next');
let timer = document.querySelector('.timer span');
let counter = 15;
let t;
let tasks = [
    {
        title: '1.What does HTML Stand for ?',
        answers: ["Hyper Text Preprocessor","Hyper Text Markup Language",
        "Hyper Text Multiple Language","Hyper Tool Multi Language"],
        right_answer:'Hyper Text Markup Language'
    },
    {
        title: '2.what does CSS stand for ?',
        answers: ["common style sheet","colorful style sheet",
        "computer style sheet","cascade style sheet"],
        right_answer:'cascade style sheet'
    },
    {
        title: '3.What does PHP Stand for ?',
        answers: ["common style sheet","colorful style sheet",
        "computer style sheet","cascade style sheet"],
        right_answer:'computer style sheet'
    },
    {
        title: '4.what does SQL stand for ?',
        answers: ["styling Question Language","style sheet query Language",
        "statement Question Language","structured query Language"],
        right_answer:'structured query Language'
    },
    {
        title: '5.what does XML stand for ?',
        answers: ["extensible Markup Language","Executable Multiple Language",
        "Extra multi-program Language","Examine multiple Language"],
        right_answer:'extensible Markup Language'
    }    
];
let count = 0;
let degree = 0;

start.onclick = function(){
    this.style.display = 'none';
    rules.style.display = 'block';
}
exit.onclick =function(){
    this.parentElement.parentElement.style.display = 'none';
    start.style.display = 'block';
}
contin.onclick =function(){
    rules.style.display = 'none';
    quetions.style.display = 'flex';
    changeQuestions(count);
}
document.querySelector('.quit').onclick = function(){
    resultSection.style.display = 'none';
    start.style.display = 'block';
    degree = 0;
}
document.querySelector('.restart').onclick = function(){
    resultSection.style.display = 'none';
    quetions.style.display = 'flex';
    degree = 0;
}

function changeQuestions(count){
    header.innerHTML = tasks[count].title;
    for(let i=0 ; i<lis.length ; i++){
        lis[i].innerHTML = tasks[count].answers[i];
    }
    document.querySelector('.line').style.width = '0%';
    document.querySelector('.line').style.animation = 'width 15s infinite linear forwards';
    next.style.display = 'none';
    time();
    choose();
}

next.onclick=function(){
    lis.forEach(function(ele){
        ele.classList.remove('right' , 'wrong' , 'disable');
    });
    count++;
    if(count ==5){
        count =0;
        quetions.style.display = 'none';
        resultSection.style.display = 'flex';
        document.querySelector('.result p .degree').innerHTML = degree;
    }
    changeQuestions(count);
    document.querySelector('.number').innerHTML =count+1;
}

function time(){
    counter =15;
    timer.innerHTML= counter;
        t = setInterval(function(){
        counter--;
        if(counter <10){
            counter = '0' + counter;
        }
        if(counter==00){
            stop();
        }
        timer.innerHTML= counter;
    } , 1000);
}

function choose(){
    lis.forEach(function(ele){
        ele.onclick = function(){
            let tru = document.createElement('i');
            tru.classList.add('fa-solid','fa-circle-check');

            if(ele.innerHTML == tasks[count].right_answer){
                ele.classList.add('right');
                ele.append(tru);
                degree++;
            }
            else{ // add class
                ele.classList.add('wrong');
                // add icon
                let fals = document.createElement('i');
                fals.classList.add('fa-solid','fa-circle-xmark');
                ele.append(fals);
                // get right answer
                lis.forEach(function(ele){
                    if(ele.innerHTML == tasks[count].right_answer){
                        ele.classList.add('right');
                        ele.append(tru);
                    }
                })
            }
            stop();
        }
    });
}
function stop(){
    clearInterval(t);
    next.style.display='block';
    lis.forEach(function(el){
        el.classList.add('disable');
    });
    document.querySelector('.line').style.animationPlayState='paused';
}