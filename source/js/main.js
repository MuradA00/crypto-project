import './_vendor';
// import './_functions';
// import './_components';


const accs = document.querySelectorAll('.accordions__item');
const mobNav = document.querySelector('.header-nav');
const panelMenu = document.querySelector('.menu-burger');
const winModal = document.querySelector('#win-modal')
const winButton = document.querySelector('#win-button');
const paymentModal = document.querySelector('#payment-modal');
const paymentButton = document.querySelector('.profile-replenish');
const closePaymentModalButton = document.querySelector('#payment-modal .modal-close')
const roulettePanelButtons = document.querySelectorAll('.roulette-toggle');
const soundToggler = document.querySelector('.heading-sound')
const paymentMethods =  document.querySelectorAll('.modal-payments__item');
const body = document.body;
const upgradeTabsButtons = document.querySelectorAll('.upgrade-tabs__item');
const topSelect = document.querySelector('.tops-select');

const closeModalByOuterClick = (modal) => {
  const modalContainer = modal.querySelector('.modal-inner');

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      hideModal();
      modal.classList.remove('modal--active');
    }
  })
}

const hideModal = () => {
  body.classList.remove('locked')
  document.documentElement.classList.remove('locked')
}

const showModal = () => {
  body.classList.add('locked');
  document.documentElement.classList.add('locked');
}

if (paymentButton) {
  paymentButton.addEventListener('click', () => {
    paymentModal.classList.add('modal--active')
    showModal();
  })
  closeModalByOuterClick(paymentModal);
  closePaymentModalButton.addEventListener('click', () => {
    paymentModal.classList.remove('modal--active');
    hideModal();
  })
}

if (soundToggler) {
  soundToggler.addEventListener('click', () => soundToggler.classList.toggle('heading-sound--disabled'))
}

if (winButton) {
  winButton.addEventListener('click', () => {
    winModal.classList.add('modal--active');

    closeModalByOuterClick(winModal);
    showModal();
  })
}

const handleToggleItems = (array, activeClass) => {
  if (array.length > 0) {
    array.forEach(item => {
      item.addEventListener('click', () => {
        array.forEach(item => item.classList.remove(activeClass));
        item.classList.add(activeClass);
      })
    })
  }
}

handleToggleItems(upgradeTabsButtons, 'upgrade-tabs__item--active');
handleToggleItems(roulettePanelButtons, 'roulette-toggle--active');
handleToggleItems(paymentMethods, 'modal-payments__item--selected');

const menuHandler = () => {
  panelMenu.classList.toggle('menu-burger--active');

  if (panelMenu.classList.contains('menu-burger--active')) {
    mobNav.classList.add('header-nav--active')
    document.documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden'
  } else {
    mobNav.classList.remove('header-nav--active')
    document.documentElement.style.overflow = '';
    body.style.overflow = ''
  }
}

if (mobNav) {
  panelMenu.addEventListener('click', menuHandler);
}

if (accs.length > 0) {
  accs.forEach(acc => {
    acc.addEventListener('click', function() {
      const hiddenContentHeight = acc.querySelector('.accordions-content').scrollHeight + 'px';
      const hiddenContainer = acc.querySelector('.accordions__item-hidden');

      this.classList.toggle('accordions--collapse');

      if (acc.classList.contains('accordions--collapse')) {
        hiddenContainer.style.maxHeight = `${hiddenContentHeight}`;
      }
      else {
        hiddenContainer.style.maxHeight = 0;
      }
    })
  })
}

function initSelect(elem){
  const selectHolder = elem.querySelector('.holder');
  const selectOptions = elem.querySelectorAll('.dropdownOption li');
  const dropHolder = elem.querySelector('.dropdown');
  let selectedOption = selectOptions[0];

  selectedOption.classList.add('current');

  dropHolder.addEventListener('click', function () {
    dropHolder.classList.add('dropdown-active');
   });

  selectOptions.forEach(function(currentElement) {
    currentElement.addEventListener('click', function(){
      dropHolder.classList.remove('dropdown-active');
      selectedOption.classList.remove('current');
      selectedOption = currentElement;
      currentElement.classList.add('current');
      selectHolder.innerText = currentElement.textContent;
    });
  });
};

if (topSelect) {
  initSelect(topSelect);
}

if (Swiper) {
  const swiper = new Swiper('.slider-main', {
    speed: 300,
    slidesPerView: 1,
    autoplay: true,
    pagination: {
      clickable: true,
      el: '.slider-pagination'
    }
  });
}

