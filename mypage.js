const saveButton = document.querySelector('button[type="submit"]');
const resetButton = document.getElementById('reset');

saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    const inputs = document.querySelectorAll('input');
    let isValid = true;
    inputs.forEach(input => {
        if (input.value === '') {
            isValid = false;
            return;
        }
    });
    if (!isValid) {
        alert('올바르지 않은 입력입니다.');
    } else {
        alert('성공적으로 저장되었습니다.');
    }
});

resetButton.addEventListener("click", (event) => {
    event.preventDefault();
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    alert('초기화 성공.');
});
