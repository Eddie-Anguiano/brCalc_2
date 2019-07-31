/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const uiController = (() => {
  const DOMstrings = {
    totalSalesInput: '.totalSales__input',
    ccTipsInput: '.CcTips__input',
    cashTipsInput: '.cashTips__input',
    mdrTipsInput: '.MdrTips__input',
    nameInput: '.name__input',
    numberInput: '.number__input',
    hoursInput: '.hours_input',
    groupInput: '.group_input',
    addItem: '.add_item',
  };
})();

const dataController = (() => {})();

const controller = ((uiCtrl, dataCtrl) => {})(uiController, dataController);
