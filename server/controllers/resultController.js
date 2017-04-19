const db = require('../database/db.js');
const weeklyPoints = 25;
const tootPoints = 5;
const eliminated = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
const topThreePoints = 100;
const winnerPoints = 100;

// send results to the client side
// will need to update based on if there are massive amounts of users
function sendRanking(req, res) {
  getRanking()
  .then((ranking) => {
    res.send(ranking);
  });
}

function getRanking() {
  return db.UserTotals.findAll();
}

// submit weekly results
function getWeeklyResult(weekID) {
  return db.Results.findOne({
    where: {
      weekID,
    },
  });
}

function submitWeeklyResult(req, res) {
  getWeeklyResult(req.body.weekID)
  .then((entry) => {
    if (entry === null) {
      createWeeklyResult(req.body.weekID, req.body.winnerID, req.body.runnerUpID, req.body.bottomID, req.body.eliminatedID)
      .then(() => {
        updateWeeklyTotals(res);
      });
    } else {
      entry.updateAttributes({
        weeklyWinnerID: req.body.winnerID,
        weeklyRunnerUpID: req.body.runnerUpID,
        weeklyBottomID: req.body.bottomID,
        weeklyEliminatedID: req.body.eliminatedID,
      })
      .then(() => {
        updateWeeklyTotals(res);
      });
    }
  });
}

function createWeeklyResult(weekID, winnerID, runnerUpID, bottomID, eliminatedID) {
  return db.Results.create({
    weekID,
    weeklyWinnerID: winnerID,
    weeklyRunnerUpID: runnerUpID,
    weeklyBottomID: bottomID,
    weeklyEliminatedID: eliminatedID,
  });
}

function getWeeklyResults() {
  return db.Results.findAll();
}

function getUsers() {
  return db.Users.findAll({
  });
}
function getUserWeeklySelection(username) {
  return db.UserSelections.findAll({
    where: {
      username,
    },
  });
}

function updateWeeklyTotals(res) {
  getWeeklyResults()
  .then((allResults) => {
    getUsers() // get every user
    .then((allUsers) => {
      allUsers.forEach((user) => { // iterate over each user
        const username = user.dataValues.username;
        const total = [0, 0, 0, 0];
        getUserWeeklySelection(username)
        .then((allUserSelectionsArr) => {     
          allResults.forEach((weeklyResult, weekIndex) => {
            allUserSelectionsArr.forEach((oneUserWeekSelection) => {
              let weeklyTotal = 0;
              const oneWeekResult = weeklyResult.dataValues;
              const oneUserSelect = oneUserWeekSelection.dataValues;
              // check to make srue the week is correct

              // WEEK ONE \\

              if (oneUserSelect.weekID === 1) {
                // check to see if you guessed correctily
                if (oneUserSelect.weeklyWinnerID === 8) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneUserSelect.weeklyRunnerUpID === 4 || oneUserSelect.weeklyRunnerUpID === 10) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                total[0] = weeklyTotal;
              }

              // // WEEK TWO \\

              else if (oneUserSelect.weekID === 2) {
                // check to see if you guessed correctily
                if (oneUserSelect.weeklyWinnerID === 13) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneUserSelect.weeklyBottomID === 7) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneUserSelect.weeklyEliminatedID === 6) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                total[1] = weeklyTotal;
              }

              //  // WEEK THREE \\

              else if (oneUserSelect.weekID === 3) {
                // check to see if you guessed correctily
                if (oneUserSelect.weeklyWinnerID === 12) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneUserSelect.weeklyBottomID === 1) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneUserSelect.weeklyEliminatedID === 7) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                total[2] = weeklyTotal;
              }
              //  // WEEK FOUR \\

              else if (oneUserSelect.weekID === 4) {
                // check to see if you guessed correctily
                if (oneUserSelect.weeklyWinnerID === 10 || oneUserSelect.weeklyWinnerID === 11) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneUserSelect.weeklyBottomID === 12) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneUserSelect.weeklyEliminatedID === 3) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                total[3] = weeklyTotal;
              }

            });
          });
        });
        getTotal(username)
        .then((entry) => {
          const newWeeklyTotal = total.reduce((a, b) => {
            return a + b;
          }, 0);
          if (entry === null) {
            createWeeklyTotal(username, total, newWeeklyTotal)
            .then(() => {
              res.send('submitted');
            });
          } else {
            let weeklyToot = 0;
            if (entry.tootTotalsArr !== null) {
              weeklyToot = entry.tootTotalsArr.reduce((a, b) => {
                return a + b;
              }, 0);
            }
            let finalTotal = 0;
            if (entry.finalTotalsArry !== null) {
              finalTotal = entry.finalTotalsArry;
            }
            const newTotal = newWeeklyTotal + weeklyToot + finalTotal;
            entry.updateAttributes({
              weeklyTotalsArr: total,
              totalPoints: newTotal,
            })
            .then(() => {
              res.send('submitted');
            });
          }
        });
      });
    });
  });
}

function getTotal(username) {
  return db.UserTotals.findOne({
    where: {
      username,
    },
  });
}

function createWeeklyTotal(username, totalArr, sumTotal) {
  return db.UserTotals.create({
    username,
    weeklyTotalsArr: totalArr,
    totalPoints: sumTotal,
  });
}

function submitFinalsResult(req, res) {
  getFinalsResult()
  .then((entry) => {
    if (entry === null) {
      createFinalsResult(req.body.winnerID, req.body.runnerUpID, req.body.topThreeID, req.body.conID)
      .then(() => {
        updateFinalsTotals(res);
      });
    } else {
      entry.updateAttributes({
        winnerTopThreeID: req.body.winnerID,
        runnerUpTopThreeID: req.body.runnerUpID,
        topThreeID: req.body.topThreeID,
      })
      .then(() => {
        updateFinalsTotals(res);
      });
    }
  });
}

function getFinalsResult() {
  return db.Results.findOne({
    where: {
      finalWinnerID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalRunnerUpID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalTopThreeID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalConID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
  });
}
function createFinalsResult(finalWinnerID, finalRunnerUpID, finalTopThreeID, finalConID) {
  return db.Results.create({
    finalWinnerID,
    finalRunnerUpID,
    finalTopThreeID,
    finalConID,
  });
}

function updateFinalsTotals(res) {
  getFinalsResult()
  .then((allResults) => {
    getUsers() // get every user
    .then((allUsers) => {
      allUsers.forEach((user) => { // iterate over each user
        const username = user.dataValues.username;
        getUserFinalsSelection(username)
        .then((finalUserSelection) => {
          let total = 0;
          const userFinalSelectionObj = finalUserSelection[0].dataValues;
          const finalResultObj = allResults[0].dataValues;
          if (userFinalSelectionObj.winnerTopThreeID === finalResultObj.winnerTopThreeID) {
            total = total + winnerPoints;
          }
          if (userFinalSelectionObj.winnerTopThreeID === finalResultObj.winnerTopThreeID ||
              userFinalSelectionObj.winnerTopThreeID === finalResultObj.runnerUpTopThreeID ||
              userFinalSelectionObj.winnerTopThreeID === finalResultObj.topThreeID) {
            total = total + topThreePoints;
          }
          if (userFinalSelectionObj.runnerUpTopThreeID === finalResultObj.winnerTopThreeID ||
              userFinalSelectionObj.runnerUpTopThreeID === finalResultObj.runnerUpTopThreeID ||
              userFinalSelectionObj.runnerUpTopThreeID === finalResultObj.topThreeID) {
            total = total + topThreePoints;
          }
          if (userFinalSelectionObj.topThreeID === finalResultObj.winnerTopThreeID ||
              userFinalSelectionObj.topThreeID === finalResultObj.runnerUpTopThreeID ||
              userFinalSelectionObj.topThreeID === finalResultObj.topThreeID) {
            total = total + topThreePoints;
          }
          if (userFinalSelectionObj.finalConID === finalResultObj.finalConID) {
            total = total + topThreePoints;
          }
          getTotal(username)
          .then((entry) => {
            if (entry === null) {
              createFinalTotal(username, total)
              .then(() => {
                res.send('submitted');
              });
            } else {
              let weeklyToot = 0;
              if (entry.tootToalsArr !== null) {
                weeklyToot = entry.tootTotalsArr.reduce((a, b) => {
                  return a + b;
                }, 0);
              }
              let weeklyTotal = 0;
              if (entry.weeklyTotalsArr !== null) {
                weeklyTotal = entry.finalTotalsArr.reduce((a, b) => {
                  return a + b;
                }, 0);
              }
              const newTotal = total + weeklyToot + weeklyTotal;
              entry.updateAttributes({
                finalTotalsArry: total,
                totalPoints: newTotal,
              })
              .then(() => {
                res.send('submitted');
              });
            }
          });
        });
      });
    });
  });
}

function getUserFinalsSelection(username) {
  return db.Results.findAll({
    where: {
      finalWinnerID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalRunnerUpID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalTopThreeID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalConID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
  });
}

function createFinalTotal(username, total) {
  return db.Totals.create({
    username,
    finalTotalsArr: total,
    totalPoints: total,
  });
}

function submitTootResult(req, res) {
  getTootResult(req.body.weekID)
  .then((entry) => {
    if (entry === null) {
      createTootResult(req.body.weekID, req.body.selectionRaven, req.body.selectionRaja)
      .then(() => {
        updateTootTotals(res);
      });
    } else {
      entry.updateAttributes({
        tootRavenSelectionArr: req.body.selectionRaven,
        tootRajaSelectionArr: req.body.selectionRaja,
      })
      .then(() => {
        updateTootTotals(res);
      });
    }
  });
}
function getTootResult(weekID) {
  return db.Results.findOne({
    where: {
      weekID,
    },
  });
}

function createTootResult(weekID, tootRavenSelectionArr, tootRajaSelectionArr) {
  return db.Results.create({
    weekID,
    tootRavenSelectionArr,
    tootRajaSelectionArr,
  });
}

function updateTootTotals(res) {
  getTootResults()
  .then((allResults) => {
    getUsers() // get every user
    .then((allUsers) => {
      allUsers.forEach((user) => { // iterate over each user
        const username = user.dataValues.username;
        const total = [0, 0, 0, 0];
        getUserTootSelection(username)
        .then((selections) => {
          allResults.forEach((weekResult, tootIndex) => {
            let weeklyTotal = 0;
            selections.forEach((oneUserWeekSelection) => {
              const oneWeekResult = weekResult.dataValues;
              const oneUserSelect = oneUserWeekSelection;
              // check to see if weeks match
              if (oneUserSelect.weekID === 1) {
                const ravenSelection = [true, true, true, true, true, true, true, true, true, true, true, true, false, 14];
                const rajaSelection = [true, true, true, true, true, true, true, true, true, false, true, true, false, 14];
                oneUserSelect.tootSelectionArr.forEach((singleUserToot, indexWeek) => {
                  if (singleUserToot === ravenSelection[indexWeek]) {
                    weeklyTotal = weeklyTotal + tootPoints;
                  }
                  if (singleUserToot === rajaSelection[indexWeek]) {
                    weeklyTotal = weeklyTotal + tootPoints;
                  }
                  total[0] = weeklyTotal;
                });
              }

              if (oneUserSelect.weekID === 2) {
                const ravenSelection = [false, true, true, false, true, false, false, true, true, false, true, true, true, false];
                const rajaSelection = [false, true, true, false, true, false, false, true, true, false, true, true, true, false];
                oneUserSelect.tootSelectionArr.forEach((singleUserToot, indexWeek) => {
                  if (singleUserToot === ravenSelection[indexWeek]) {
                    weeklyTotal = weeklyTotal + tootPoints;
                  }
                  if (singleUserToot === rajaSelection[indexWeek]) {
                    weeklyTotal = weeklyTotal + tootPoints;
                  }
                  total[1] = weeklyTotal;
                });
              }

              if (oneUserSelect.weekID === 3) {
                const ravenSelection = [false, false, true, true, false, 6, false, true, true, true, true, true, true, false];
                const rajaSelection = [false, false, true, true, false, 6, false, true, true, false, true, true, true, false];
                oneUserSelect.tootSelectionArr.forEach((singleUserToot, indexWeek) => {
                  if (singleUserToot === ravenSelection[indexWeek]) {
                    weeklyTotal = weeklyTotal + tootPoints;
                  }
                  if (singleUserToot === rajaSelection[indexWeek]) {
                    weeklyTotal = weeklyTotal + tootPoints;
                  }
                  total[2] = weeklyTotal;
                });
              }

            });
          });
        });
        getTotal(username)
        .then((entry) => {
          const newSumTotal = total.reduce((a, b) => {
            return a + b;
          }, 0);
          if (entry === null) {
            createTootTotal(username, total, newSumTotal)
            .then(() => {
              res.send('submitted');
            });
          } else {
            let weeklyTotal = 0;
            if (entry.weeklyTotalsArr !== null) {
              weeklyTotal = entry.weeklyTotalsArr.reduce((a, b) => {
                return a + b;
              }, 0);
            }
            let finalTotal = 0;
            if (entry.finalTotalsArry !== null) {
              finalTotal = entry.finaltotalsArr;
            }
            const newTotal = newSumTotal + weeklyTotal + finalTotal;
            entry.updateAttributes({
              tootTotalsArr: total,
              totalPoints: newTotal,
            })
            .then(() => {
              res.send('submitted');
            });
          }
        });
      });
    });
  });
}


function getTootResults() {
  return db.Results.findAll();
}

function getUserTootSelection(username) {
  return db.UserSelections.findAll({
    where: {
      username,
    },
  });
}
function createTootTotal(username, totalArr, sumTotal) {
  return db.UserTotals.create({
    username,
    tootTotalsArr: totalArr,
  });
}

module.exports = {
  submitWeeklyResult,
  sendRanking,
  submitTootResult,
  submitFinalsResult,
};
