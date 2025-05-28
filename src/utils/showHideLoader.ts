export default function showHideLoader(show: boolean) {
    const loader = document.querySelector('.loader-wrap');

    show ? loader?.classList.add('active') : loader?.classList.remove('active');
}