import { validateEmail } from './util.js';
import { getBreachesForEmail } from './api.js';
import { renderTableBody } from './render.js';

window.onload = function () {
    const checkAnotherEle = document.querySelector("#checkForAnotherEmail");
    const emailFormEle = document.querySelector("#emailInputForm");

    emailFormEle.addEventListener("submit", e => {
        e.preventDefault();
        hideResults();
        emailSubmitHandler();
    });

    checkAnotherEle.addEventListener("click", () => {
        hideResults();
        focusEmailInputHandler();
        checkAnotherEle.style.display = "none";
    });
};

const emailSubmitHandler = async () => {
    const emailInputEle = document.querySelector("#emailInput");
    const checkAnotherEle = document.querySelector("#checkForAnotherEmail");
    const emailErrorEle = document.querySelector("#emailError");

    const emailData = emailInputEle.value;
    if (validateEmail(emailData)) {
        startLoading();
        await getBreachesForEmail(emailData)
            .then(res => showResults(res))
            .catch(err => {
                hideResults();
                const frequentTryErrEle = document.querySelector("#frequentRequestError");
                frequentTryErrEle.style.display = "block";

                setTimeout(() => {
                    frequentTryErrEle.style.display = "none";
                }, 5000);
            });
        stopLoading();
        checkAnotherEle.style.display = "block";
        emailErrorEle.style.display = "none";
    } else {
        checkAnotherEle.style.display = "none";
        emailErrorEle.style.display = "block";
        focusEmailInputHandler();
    }
}

const showResults = (results) => {
    if (results.length > 0) {
        renderTableBody(results);
        const resultTableEle = document.querySelector("#results");
        resultTableEle.style.display = "block";
        resultTableEle.scrollIntoView({block: "start"});
        const detailsTogglerEle = document.querySelectorAll(".details-toggler");
        detailsTogglerEle.forEach(ele => {
            ele.addEventListener("click", () => {
                const isOpen = ele.classList.contains("opened");
                const detailsBlockEle = ele.nextElementSibling;
                console.log("next", detailsBlockEle)
                if (isOpen) {
                    detailsBlockEle.style.display = "none";
                    ele.innerText = "See details";
                    ele.classList.remove("opened");
                    ele.classList.add("closed");
                } else {
                    detailsBlockEle.style.display = "block";
                    ele.innerText = "Hide details";
                    ele.classList.remove("closed");
                    ele.classList.add("opened");
                }
            })
        });
    } else {
        const noResultsEle = document.querySelector("#noResults");
        noResultsEle.style.display = "block";
    }
};

const hideResults = () => {
    const resultTableEle = document.querySelector("#results");
    const tableBody = document.querySelector("#result-table-body");
    const noResultsEle = document.querySelector("#noResults");
    noResultsEle.style.display = "none";
    resultTableEle.style.display = "none";
    tableBody.innerHTML = "";
};

const focusEmailInputHandler = () => {
    const emailInputEle = document.querySelector("#emailInput");
    emailInputEle.scrollIntoView({block: "center"});
    emailInputEle.focus();
};

const startLoading = () => {
    const loadingEle = document.querySelector('.loading-container');
    loadingEle.classList.remove("hide");
};

const stopLoading = () => {
    const loadingEle = document.querySelector('.loading-container');
    loadingEle.classList.add("hide");
};
