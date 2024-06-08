const personalArr = [
    `ISTJ`, `ISFJ`, `ISTP`, `ISFP`, `INTJ`, `INTP`, `INFJ`, `INFP`,
    `ESTJ`, `ESTP`, `ESFJ`, `ESFP`, `ENTJ`, `ENTP`, `ENFJ`, `ENFP`
];

const personalContentText = { 
    ISTJ  : `현실주의자`, ISFJ : `수호자`, ESTJ : `경영자`, ESFJ : `집정관`, INTJ : `전략가`,
    INTP : `논리술사`, ENTJ : `통솔자`, ENTP : `변론가`, ISTP : `장인`, ISFP : `모험가`, ESTP : `사업가`, 
    ESFP : `연예인`, INFJ : `옹호자`, INFP : `중재자`, ENFJ : `선도자`, ENFP : `활동가`
}

// 대 -> 소문자 변환


let personalArr_lowerCase = [];
personalArr.forEach(el => {
    let personalLowerCase = el.toLowerCase();
    personalArr_lowerCase.push(personalLowerCase);
})


const ContentTextKeys_lowercase = {};

Object.keys(personalContentText).forEach(key => {
    ContentTextKeys_lowercase[key.toLowerCase()] = personalContentText[key];
});





// 색상 순서대로 출력하기 위해 정리
let personalTypeArr = [];

let sjFiltered = personalArr_lowerCase.filter(el => el.includes('s') && el.includes('j')).map(el => el.toLowerCase());
personalTypeArr = personalTypeArr.concat(sjFiltered);

let ntFiltered = personalArr_lowerCase.filter(el => el.includes('n') && el.includes('t')).map(el => el.toLowerCase());
personalTypeArr = personalTypeArr.concat(ntFiltered);

let spFiltered = personalArr_lowerCase.filter(el => el.includes('s') && el.includes('p')).map(el => el.toLowerCase());
personalTypeArr = personalTypeArr.concat(spFiltered);

let nfFiltered = personalArr_lowerCase.filter(el => el.includes('n') && el.includes('f')).map(el => el.toLowerCase());
personalTypeArr = personalTypeArr.concat(nfFiltered);



// 사이드바에 내용 추가
// personalArr.forEach(el=>{
    
//     const sidebarText = document.createElement(`a`);
//     sidebarText.textContent = el;
//     const offcanvas = document.getElementsByClassName(`offcanvas-body`)[0];
//     offcanvas.append(sidebarText);
// })
const sidebar = document.getElementById('offcanvasWithBothOptions');
const sidebarClose = new bootstrap.Offcanvas(sidebar);

for (let i = 0; i < personalArr.length; i++) {

    const sidebarText = document.createElement(`a`);
    sidebarText.textContent = personalArr[i];
    sidebarText.href = `#${personalArr_lowerCase[i]}`;

    const offcanvas = document.getElementsByClassName(`offcanvas-body`)[0];
    offcanvas.append(sidebarText);

    



    if ((i + 1) % 4 === 0 && i !== personalArr.length - 1) {
        const line = document.createElement('span');
        line.textContent = '------------';
        offcanvas.append(line);
    }

    // 클릭 이벤트 추가
    sidebarText.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 링크 동작 방지, 없으면 targetPosition 작동하지 않음

        // 사이드바 닫기
        sidebarClose.hide();

        // 이동 위치 계산   
        const targetId = personalArr_lowerCase[i]; // 해당 MBTI 유형에 대한 ID
        const targetElement = document.getElementById(targetId); // 해당 MBTI 유형의 컨테이너 요소 가져오기
        const offsetTop = targetElement.offsetTop; // 스크롤될 요소의 상단 위치
        const windowHeight = window.innerHeight; // 창의 높이
        const targetPosition = offsetTop - (windowHeight / 3); // 스크롤될 위치 계산
        window.scrollTo({
            top: targetPosition            
        });
    });

    // 사이드바 배경색 랜덤
    const offcanvas_text_bgs = document.querySelectorAll(`.offcanvas-body a`);

    const randomColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
    }

    offcanvas_text_bgs.forEach(offcanvas_text_bg => {

    offcanvas_text_bg.addEventListener(`mouseover`, () => {
        offcanvas_text_bg.style.backgroundColor = randomColor();
    })

    offcanvas_text_bg.addEventListener('mouseleave', () => {
        offcanvas_text_bg.style.backgroundColor = ''; // 초기값으로 되돌림
    });
    })
}


    // img, text 생성
    const body = document.querySelector(`body`);
    const section = document.querySelector(`section`);
    body.appendChild(section);



    personalTypeArr.forEach((el, index) => {

    const article = document.createElement(`article`);
    article.classList.add(`personalities`);
    section.append(article);


    const container = document.createElement(`div`);
    container.classList.add(`container`);
    container.setAttribute(`id`, el);
    
    article.appendChild(container); 

    const imgCol = document.createElement(`div`);
    const textCol = document.createElement(`div`);
    const btnCol = document.createElement(`div`);
    const row = document.createElement(`div`);

    imgCol.classList.add(`col`);
    imgCol.classList.add(`col-12`, `col-sm-12`, `col-md-12`, `col-lg-12`, `col-xl-8`);
    // btnCol.classList.add(`col-2`, `col-sm-2`, `col-md-1`, `col-lg-1`, `col-xl-1`);

    textCol.classList.add(`col`);
    textCol.classList.add(`text-col`);
    // textCol.classList.add(`col-2`, `col-sm-1`, `col-md-1`, `col-lg-1`, `col-xl-4`);

    row.classList.add(`row`);

    row.append(imgCol);
    row.append(textCol);
    row.append(btnCol);

    container.append(row);
    
    const img = document.createElement(`img`);
    
    img.src = `./img/png/${el}.png`
    img.classList.add(`img-fluid`);
    img.classList.add(`rounded`);
    img.classList.add(`mx-auto`);
    // img.classList.add(`d-block`);
    img.style.width = `800px`;
    img.style.opacity = '0'
    imgCol.append(img);


    const textWrapper = document.createElement(`div`);
    textWrapper.classList.add(`textWrapper`);
    textWrapper.style.opacity = '0'

    textCol.append(textWrapper);

    const titleText = document.createElement(`h1`);
    titleText.classList.add(`titleText`);
 
    titleText.textContent = el.toUpperCase();
    
    textWrapper.append(titleText); 

    const contentText = document.createElement(`h2`);
    contentText.classList.add(`contentText`);
    contentText.textContent = ContentTextKeys_lowercase[el];

    textWrapper.append(contentText);

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', () => {
        const value = window.scrollY;

        // 마지막 사진은 스크롤이 끝에 위치하면 나타나도록 함
        if (index === personalTypeArr.length - 1 && value > img.offsetTop - window.innerHeight) {
            setTimeout(() => {
                img.style.animation = 'slide-left 2s ease-out';
                img.style.opacity = '1';

                textWrapper.style.animation = 'fade-in 3s ease-out';
                textWrapper.style.opacity = '1';
            }, 1000);
        }
        // 그 외의 사진들은 중간 지점에서 나타나도록 함
        else if (value > img.offsetTop - window.innerHeight / 2) {
            img.style.animation = 'slide-left 2s ease-out';
            img.style.opacity = '1';

            textWrapper.style.animation = 'fade-in 3s ease-out';
            textWrapper.style.opacity = '1';
        }
    });
    
    }
)




    // 버튼 생성    
    for (let j = 0; j < personalArr.length; j++) {
    const btn = document.createElement(`button`);
    btn.setAttribute(`type`,`button`);
    btn.classList.add(`inform-btn`);
    btn.classList.add(`btn`, `btn-outline-secondary`);
    btn.setAttribute(`data-bs-toggle`, `modal${j + 1}`);
    btn.setAttribute(`data-bs-target`, `#modal${j + 1}`);
    btn.textContent= `살펴보기`;
    btn.style.opacity = '0';



    window.addEventListener('scroll', () => {
        const value = window.scrollY;

        // 마지막은 스크롤이 끝에 위치하면 나타나도록 함
        if (j === personalTypeArr.length - 1 && value > btn.offsetTop - window.innerHeight) {
            setTimeout(() => {
                
                btn.style.animation = 'fade-in 3s ease-out';
                btn.style.opacity = '1';

            }, 1000);
        }
        // 그 외는 중간 지점에서 나타나도록 함
        else if (value+400 > btn.offsetTop - window.innerHeight / 2) {
            btn.style.animation = 'fade-in 3s ease-out';
            btn.style.opacity = '1';

        }
    });

    

    const textWrapper = document.getElementsByClassName(`textWrapper`)[j];
    textWrapper.parentNode.append(btn);
    }


    // Modal 생성
    for (let k = 0; k < personalArr.length; k++) {

    const modal = document.createElement('div');
    modal.classList.add(`modal`);
    modal.setAttribute(`id`, `modal${k + 1}`);
    modal.setAttribute(`tabindex`, `-1`);
    body.appendChild(modal);

    // console.log(modal);

    const modal_dialog = document.createElement('div');
    modal_dialog.classList.add(`modal-dialog`, `modal-dialog-scrollable`, `modal-lg`, `modal-dialog-centered`);
    modal.append(modal_dialog);

    const modal_content = document.createElement('div');
    modal_content.classList.add(`modal-content`);
    modal_dialog.append(modal_content);

    const modal_body = document.createElement('div');
    modal_body.classList.add(`modal-body`);
    modal_content.append(modal_body);

    const modal_footer = document.createElement('div');
    modal_footer.classList.add(`modal-footer`);
    modal_content.append(modal_footer);


    const modal_btn = document.createElement(`button`);
    modal_btn.setAttribute(`type`,`button`);
    modal_btn.classList.add(`btn`, `btn-secondary`);
    modal_btn.setAttribute(`data-bs-dismiss`,`modal`);
    modal_btn.textContent= `닫기`;
    modal_footer.append(modal_btn);

    const p = document.createElement('p');
    
    modal_body.append(p);


}

// 모달 이미지 넣기
for (n = 0; n < personalTypeArr.length; n++) {
    
    const modal_img = document.createElement(`img`);
    modal_img.src = `./img/pray/${personalTypeArr[n]}.png`;
    modal_img.classList.add('img-fluid', 'mx-auto', 'd-block');

    const modal_body = document.getElementsByClassName(`modal-body`)[n];
    modal_body.style.textAlign = 'center';
    modal_body.append(modal_img);
}


// 모달 호출
for (let m = 0; m < personalTypeArr.length; m++) {
    const btn = document.getElementsByClassName(`inform-btn`)[m];
    const modalId = `modal${m + 1}`;
    btn.addEventListener('click', function() {
        const modal = document.getElementById(modalId);
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    });
}


// 검색 기능
let submit = document.querySelector(`button[type = "submit"]`);

submit.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 동작 방지

    const finder = document.querySelector('.form-control.me-2');
    const userInput = finder.value.toLowerCase(); // 대 -> 소, 소 -> 소

    // console.log(userInput);

    if (!personalTypeArr.includes(userInput)) {
        alert(`올바르지 않은 입력입니다.`);
        return;
    }

    const targetId = userInput; // 사용자 입력과 동일한 ID
    const targetElement = document.getElementById(targetId); // 해당 MBTI 유형의 컨테이너 요소 가져오기

    // console.log(targetElement);
   
    const offsetTop = targetElement.offsetTop; // 스크롤될 요소의 상단 위치
    const windowHeight = window.innerHeight; // 창의 높이
    const targetPosition = offsetTop - (windowHeight / 3); // 스크롤될 위치 계산

    window.scrollTo({
        top: targetPosition        
    });

});

// footer accordion
const footer = document.querySelector(`.accordion-body`);
const title = [`16personalities`,`상단 이미지`,`MBTI 기도문 이미지`,`궁합테이블 이미지`,`GitHub`,`blog`,`Contact me`];
const link = [
    `https://www.16personalities.com/ko`,
    `https://namu.wiki/w/%EC%9A%B0%EB%A6%AC%EB%93%A4%EC%9D%98%20MBTI/%EB%93%B1%EC%9E%A5%EC%9D%B8%EB%AC%BC?rev=96`,
    `https://www.instagram.com/qrrating_mbti/`,
    `https://www.dreamsaroundtheworld.com/wp-content/uploads/2017/01/Myers_Briggs_Type_Compatibility_Chart.pdf`,
    `https://github.com/ymind14563`,
    `https://ymind14563.github.io/`,
    `mailto:ymind14563@gmail.com`
];
for (let i = 0; i < 7; i++) {
const footer_text = document.createElement(`a`);
footer_text.setAttribute(`href`,link[i]);
footer_text.setAttribute(`target`,`_blank`);
console.log(footer_text.href);
footer_text.innerHTML = title[i];
footer_text.append(document.createElement(`br`));
footer.append(footer_text);

if (i  === 3) {
    const line = document.createElement('span');
    line.textContent = '---------';
    footer.append(line);
}
}