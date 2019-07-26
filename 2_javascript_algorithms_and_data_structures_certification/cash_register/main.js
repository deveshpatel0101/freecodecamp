const STATUS = { insufficientFunds: 'INSUFFICIENT_FUNDS', closed: 'CLOSED', open: 'OPEN' };

function checkCashRegister(price, cash, cid) {
  let cashRegister = { status: '', change: cid };
  const changeRequired = Number(parseFloat(cash - price).toFixed(2));
  const totalChangeInDrawer = Number(getTotalChangeInDrawer(cid));

  cashRegister.status = getStatus(changeRequired, totalChangeInDrawer);

  if (cashRegister.status === STATUS.insufficientFunds) {
    cashRegister.change = [];
    return cashRegister;
  }

  cashRegister.change = getFinalChange(changeRequired, cid);

  if (changeRequired > Number(getTotalChangeInDrawer(cashRegister.change))) {
    cashRegister.status = STATUS.insufficientFunds;
    cashRegister.change = [];
  }

  if (cashRegister.status === STATUS.closed) {
    cashRegister.change = [...cid];
  }

  return cashRegister;
}

function getFinalChange(changeRequired, changeInDrawer) {
  const change = [];
  const currencyValues = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1.0,
    FIVE: 5.0,
    TEN: 10.0,
    TWENTY: 20.0,
    'ONE HUNDRED': 100.0,
  };

  for (let i = changeInDrawer.length - 1; i >= 0; i--) {
    const coinName = changeInDrawer[i][0];
    const coinTotal = changeInDrawer[i][1];
    const coinValue = currencyValues[coinName];
    let coinAmount = (coinTotal / coinValue).toFixed(2);
    let coinsToReturn = 0;

    while (changeRequired >= coinValue && coinAmount > 0) {
      changeRequired -= coinValue;
      changeRequired = changeRequired.toFixed(2);
      coinAmount--;
      coinsToReturn++;
    }

    if (coinsToReturn > 0) {
      change.push([coinName, coinsToReturn * coinValue]);
    }
  }

  return change;
}

function getTotalChangeInDrawer(changeInDrawer) {
  let total = 0;
  for (let value of changeInDrawer) {
    total += value[1];
  }
  return parseFloat(total).toFixed(2);
}

function getStatus(changeRequired, totalChangeInDrawer) {
  if (changeRequired > totalChangeInDrawer) {
    return STATUS.insufficientFunds;
  } else if (changeRequired === totalChangeInDrawer) {
    return STATUS.closed;
  }
  return STATUS.open;
}

checkCashRegister(3.26, 100, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]);
