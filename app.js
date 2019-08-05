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

const dataController = (() => {
  let totalHours;
  const data = {
    totals: {},
    groups: [],
  };

  class Total {
    constructor(sales, cashTips, ccTips, mdrTips) {
      this.sales = parseFloat(sales);
      this.cashTips = parseFloat(cashTips);
      this.ccTips = parseFloat(ccTips);
      this.mdrTips = parseFloat(mdrTips);
    }

    totalTips() {
      return this.cashTips + this.ccTips;
    }

    salesPerHour() {
      return this.sales / totalHours;
    }

    cashTipsPerHour() {
      return this.cashTips / totalHours;
    }

    ccTipsPerHour() {
      return this.cashTips / totalHours;
    }

    busTipOutPerHour() {
      const busTipOutTotal = this.mdrTips * 0.1;
      return busTipOutTotal / totalHours;
    }

    barTipOutPerHour() {
      const barTipOutTotal = this.totalTips() * 0.5;
      return barTipOutTotal / totalHours;
    }

    expoTipOutPerHour() {
      const expoTipOutTotal = this.totalTips() * 0.5;
      return expoTipOutTotal / totalHours;
    }
  }

  class Group {
    constructor(name, members, hoursPer, minutes) {
      this.name = name;
      this.members = parseInt(members, 10);
      this.hoursPer = parseInt(hoursPer, 10);
      this.minutes = parseInt(minutes, 10);
    }

    decimalTimePerMember() {
      const decimalMinutes = this.minutes / 60;
      return this.hoursPer + decimalMinutes;
    }

    groupHours() {
      return this.decimalTimePerMember() * this.members;
    }

    salesPerMember() {
      return this.decimalTimePerMember() * Total.salesPerHour();
    }

    cashTipsPerMember() {
      return this.decimalTimePerMember() * Total.cashTipsPerHour();
    }

    ccTipsPerMember() {
      return this.decimalTimePerMember() * Total.ccTipsPerHour();
    }

    busTipOutPerMember() {
      return data.totals.busTipOutPerHour() * this.decimalTimePerMember();
    }

    barTipOutPerMember() {
      return data.totals.barTipOutPerHour() * this.decimalTimePerMember();
    }

    expoTipOutPerMember() {
      return data.totals.expoTipOutPerHour() * this.decimalTimePerMember();
    }

    totalTipOutPerMember() {
      return this.busTipOutPerMember() + this.barTipOutPerMember() + this.expoTipOutPerMember();
    }
  }

  return {
    updateTotalHours() {
      totalHours = data.groups.reduce((accumulator, item) => accumulator + item.groupHours(), 0);
    },
    setGroup(name, members, hours, minutes) {
      const group = new Group(name, members, hours, minutes);
      data.groups.push(group);
    },
    setTotals(sales, cashTips, ccTips, mdrTips) {
      const totalsObj = new Total(sales, cashTips, ccTips, mdrTips);
      data.totals = totalsObj;
    },
    testControl() {
      // console.log(data.totals.busTipOutPerMember());
      console.log(data.groups[0].barTipOutPerMember());
    },
  };
})();

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
dataController.setTotals(1000, 100, 100, 0);
dataController.setGroup("4o'clockers", 2, 2, 0);
// dataController.setGroup("5o'clockers", 2, 5, 0);

dataController.updateTotalHours();
dataController.testControl();
