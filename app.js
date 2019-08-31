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
    output: '.output',
    checkoutContainer: '.checkout',
    tableDelete: '.table__delete',
    tableContainer: '.table__container',
  };

  return {
    getDOMstrings() {
      return DOMstrings;
    },
    getInputs() {
      return {
        totalSalesValue: parseFloat(
          document.querySelector(DOMstrings.totalSalesInput).value.replace(/,/g, ''),
        ),
        ccTipsValue: parseFloat(
          document.querySelector(DOMstrings.ccTipsInput).value.replace(/,/g, ''),
        ),
        cashTipsValue: parseFloat(
          document.querySelector(DOMstrings.cashTipsInput).value.replace(/,/g, ''),
        ),
        mdrTipsValue: parseFloat(
          document.querySelector(DOMstrings.mdrTipsInput).value.replace(/,/g, ''),
        ),
        nameValue: document.querySelector(DOMstrings.nameInput).value,
        numberValue: parseFloat(document.querySelector(DOMstrings.numberInput).value),
        hoursValue: parseFloat(document.querySelector(DOMstrings.hoursInput).value),
        minutesValue: parseFloat(document.querySelector(DOMstrings.minutesInput).value),
      };
    },
    displayGroups(groups) {
      groups.forEach((item) => {
        const html = `<div class='table__container'>
          <i class="material-icons table__delete"  id='${item.name}'>delete</i>
          <table class="table">
            <thead>
              <tr>
                <th colspan="2">${item.name} ${(Math.floor(100 * item.hoursPer) / 100).toFixed(
    2,
  )}hrs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sales:  $${(Math.floor(100 * item.salesPer) / 100).toFixed(2)}</td>
                <td>Busser Tips:  $${(Math.floor(10 * item.busTipPer) / 10).toFixed(2)}</td>
              </tr>
              <tr>
                <td>CC Tips:  $${(Math.floor(100 * item.cctipsPer) / 100).toFixed(2)}</td>
                <td>Bar Tips:  $${(Math.floor(10 * item.barTipPer) / 10).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Cash Tips:  $${(Math.floor(100 * item.cashPer) / 100).toFixed(2)}</td>
                <td>Bar Tips:  $${(Math.floor(100 * item.barTipPer) / 100).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Claimed Tips:  $${(Math.floor(100 * item.claimedPer) / 100).toFixed(2)}</td>
                <td>Total Tip Out:  $${(Math.floor(100 * item.totalTipOUtPer) / 100).toFixed(
    2,
  )}</td>
              </tr>
            </tbody>
          </table>
        </div>`;

        document.querySelector(DOMstrings.output).insertAdjacentHTML('beforeend', html);
      });
    },
    clearOutput() {
      document.querySelector(DOMstrings.output).innerHTML = '';
    },
    disableCheckoutInputs() {
      document.querySelector(DOMstrings.totalSalesInput).disabled = true;
      document.querySelector(DOMstrings.cashTipsInput).disabled = true;
      document.querySelector(DOMstrings.ccTipsInput).disabled = true;
      document.querySelector(DOMstrings.mdrTipsInput).disabled = true;
    },
    hideGroup(element) {
      const deletebutton = element;
      deletebutton.parentNode.style.display = 'none';
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
      return this.ccTips / totalHours;
    }

    busTipOutPerHour() {
      const busTipOutTotal = this.mdrTips * 0.1;
      return busTipOutTotal / totalHours;
    }

    barTipOutPerHour() {
      const barTipOutTotal = this.totalTips() * 0.05;
      return barTipOutTotal / totalHours;
    }

    expoTipOutPerHour() {
      const expoTipOutTotal = this.totalTips() * 0.05;
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

    get salesPerMember() {
      return this.decimalTimePerMember() * data.totals.salesPerHour();
    }

    get cashTipsPerMember() {
      return this.decimalTimePerMember() * data.totals.cashTipsPerHour();
    }

    get ccTipsPerMember() {
      return this.decimalTimePerMember() * data.totals.ccTipsPerHour();
    }

    get busTipOutPerMember() {
      return data.totals.busTipOutPerHour() * this.decimalTimePerMember();
    }

    get barTipOutPerMember() {
      return data.totals.barTipOutPerHour() * this.decimalTimePerMember();
    }

    get expoTipOutPerMember() {
      return data.totals.expoTipOutPerHour() * this.decimalTimePerMember();
    }

    get totalTipsPerMember() {
      return this.ccTipsPerMember + this.cashTipsPerMember;
    }

    get totalTipOutPerMember() {
      return this.busTipOutPerMember + this.barTipOutPerMember + this.expoTipOutPerMember;
    }

    get claimedPerMember() {
      return this.totalTipsPerMember - this.totalTipOutPerMember;
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
      console.log(data);
      // console.log(this.getGroups());
    },
    getGroups() {
      return data.groups.map(item => ({
        name: item.name,
        hoursPer: item.decimalTimePerMember(),
        salesPer: item.salesPerMember,
        cctipsPer: item.ccTipsPerMember,
        cashPer: item.cashTipsPerMember,
        claimedPer: item.claimedPerMember,
        busTipPer: item.busTipOutPerMember,
        barTipPer: item.barTipOutPerMember,
        expoTipPer: item.expoTipOutPerMember,
        totalTipOUtPer: item.totalTipOutPerMember,
      }));
    },
    removeGroup(elementId) {
      const updatedGroups = data.groups.filter(item => item.name !== elementId);
      console.log(updatedGroups);
      data.groups = updatedGroups;
    },
  };
})();

const controller = ((uiCtrl, dataCtrl) => {
  function setUpEventListeners() {
    const DOM = uiCtrl.getDOMstrings();

    function submit() {
      uiCtrl.clearOutput();
      // get all inputs
      const allValues = uiCtrl.getInputs();
      // create data structure
      dataCtrl.setTotals(
        allValues.totalSalesValue,
        allValues.cashTipsValue,
        allValues.ccTipsValue,
        allValues.mdrTipsValue,
      );
      dataCtrl.setGroup(
        allValues.nameValue,
        allValues.numberValue,
        allValues.hoursValue,
        allValues.minutesValue,
      );
      dataCtrl.updateTotalHours();
      // display group block(s)
      const groups = dataCtrl.getGroups();
      uiCtrl.displayGroups(groups);
      uiCtrl.disableCheckoutInputs();
    }

    document.querySelector(DOM.addItem).addEventListener('click', () => {
      submit();
    });

    document.querySelector(DOM.checkoutContainer).addEventListener('keyup', (ev) => {
      const inputObj = ev.target;

      if (
        inputObj.tagName === 'INPUT'
        && inputObj.value.includes('.') !== true
        && inputObj.value !== ''
      ) {
        const num = parseFloat(inputObj.value.replace(/,/g, ''));
        const commaNum = num.toLocaleString();
        inputObj.value = commaNum;
      }
    });

    document.querySelector(DOM.output).addEventListener('click', (ev) => {
      const elementId = ev.target.id;
      // if (element.classList.contains('table__delete') === true) {
      //   uiCtrl.hideGroup(element);
      // }
      dataCtrl.removeGroup(elementId);
      uiCtrl.clearOutput();
      dataCtrl.updateTotalHours();
      const groups = dataCtrl.getGroups();
      uiCtrl.displayGroups(groups);
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
