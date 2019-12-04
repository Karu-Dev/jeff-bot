//Hardcoded input
const banks = [
  (lemon = {
    name: "lemon",
    minLoan: 100,
    maxLoan: 500,
    maxReturnTime: 4,
    color: "blue",
    requiresBankAccount: true,
    requiredCreditHistory: false,
    loanURL: "https://google.com"
  }),
  (purple = {
    name: "green",
    minLoan: 50,
    maxLoan: 200,
    maxReturnTime: 2,
    color: "green",
    requiresBankAccount: true,
    requiredCreditHistory: false,
    loanURL: "https://google.com"
  }),
  (lombards = {
    name: "lombards",
    minLoan: 5,
    maxLoan: 200,
    maxReturnTime: 10,
    color: "red",
    requiresBankAccount: false,
    requiredCreditHistory: false,
    loanURL: "https://google.com"
  }),
  (sms = {
    name: "sms",
    minLoan: 100,
    maxLoan: 450,
    maxReturnTime: 4,
    color: "blue",
    requiresBankAccount: true,
    requiredCreditHistory: false,
    loanURL: "https://google.com"
  }),
  (faxCredit = {
    name: "faxCredit",
    minLoan: 1000,
    maxLoan: 5000,
    maxReturnTime: 24,
    color: "blue",
    requiresBankAccount: true,
    requiredCreditHistory: true,
    loanURL: "https://google.com"
  }),
  (pepeCredit = {
    name: "pepeCredit",
    minLoan: 10,
    maxLoan: 500,
    maxReturnTime: 12,
    color: "blue",
    requiresBankAccount: true,
    requiredCreditHistory: true,
    loanURL: "https://google.com"
  }),
  (kappaCredit = {
    name: "kappaCredit",
    minLoan: 10,
    maxLoan: 5000,
    maxReturnTime: 24,
    color: "blue",
    requiresBankAccount: true,
    requiredCreditHistory: true,
    loanURL: "https://google.com"
  }),
  (sadCredit = {
    name: "faxCredit",
    minLoan: 10,
    maxLoan: 100,
    maxReturnTime: 2,
    color: "red",
    requiresBankAccount: false,
    requiredCreditHistory: false,
    loanURL: "https://google.com"
  }),
  (xdCredit = {
    name: "xdCredit",
    minLoan: 10,
    maxLoan: 50000000,
    maxReturnTime: 240,
    color: "blue",
    requiresBankAccount: false,
    requiredCreditHistory: false,
    loanURL: "https://google.com"
  })
];
let bankScores = {};

module.exports = results = (
  firstAnswer,
  secondAnswer,
  thirdAnswer,
  fourthAnswer,
  fifthAnswer
) => {
  for (const bank of banks) {
    if (
      firstAnswer > bank.minLoan &&
      firstAnswer < bank.maxLoan &&
      secondAnswer < bank.maxReturnTime
    ) {
      bankScores[bank.name] = 1;
    } else {
      bankScores[bank.name] = -100;
    }
    //Checks to see if bank requires an active account.
    if (bank.requiresBankAccount) {
      if (!fourthAnswer) {
        bankScores[bank.name] = -100;
      }
    } else {
      if (fourthAnswer) {
        bankScores[bank.name]++;
      }
    }
    //Checks to see if bank requires a credit history

    if (bank.requiredCreditHistory) {
      if (!fifthAnswer) {
        bankScores[bank.name] = -100;
      }
    } else {
      if (fifthAnswer) {
        bankScores[bank.name]++;
      }
    }

    //Checks for any aditional bonus factors

    if (bank.color === thirdAnswer) {
      bankScores[bank.name]++;
    }
  }
  let outputBanks = {};
  let bankScoreKeys = Object.keys(bankScores);
  for (const key of bankScoreKeys) {
    if (bankScores[key] > 0) {
      for (const bank of banks) {
        if (bank.name === key) {
          outputBanks[key] = {
            name: key,
            link: bank.loanURL
          };
        }
      }
    }
  }
  return outputBanks;
};
