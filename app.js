/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const uiController = (() => {
  const DOMstrings = {
    totalSalesInput: '#totalSales__input',
    ccTipsInput: '#CcTips__input',
    cashTipsInput: '#cashTips__input',
    mdrTipsInput: '#MdrTips__input',
    nameInput: '#name__input',
    numberInput: '#number__input',
    hoursInput: '#hours__input',
    minutesInput: '#minutes__input',
    addItem: '#add_item',
  };

  return {
    getDOMstrings() {
      return DOMstrings;
    },
    getInputs() {
      return {
        totalSalesValue: parseFloat(document.querySelector(DOMstrings.totalSalesInput).value),
        ccTipsValue: parseFloat(document.querySelector(DOMstrings.ccTipsInput).value),
        cashTipsValue: parseFloat(document.querySelector(DOMstrings.cashTipsInput).value),
        mdrTipsValue: parseFloat(document.querySelector(DOMstrings.mdrTipsInput).value),
        nameValue: document.querySelector(DOMstrings.nameInput).value,
        numberValue: parseFloat(document.querySelector(DOMstrings.numberInput).value),
        hoursValue: parseFloat(document.querySelector(DOMstrings.hoursInput).value),
        minutesValue: parseFloat(document.querySelector(DOMstrings.minutesInput).value),
      };
    },
  };
})();

const dataController = (() => {})();

const controller = ((uiCtrl, dataCtrl) => {
  function setUpEventListeners() {
    const DOM = uiCtrl.getDOMstrings();
    document.querySelector(DOM.addItem).addEventListener('click', () => {
      // get all inputs
      const allValues = uiCtrl.getInputs();
      console.log(allValues);
      // create data structure
      // calculate
      // display group block(s)
    });
  }

  return {
    init() {
      console.log('START');
      setUpEventListeners();
    },
  };
})(uiController, dataController);

controller.init();
