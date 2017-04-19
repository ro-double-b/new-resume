const db = require('../database/db.js');

const weekWeekID = 5;
const tootWeekID = 4;

function submitFinalsResult(req, res) {
  getSubmissionFinal(req.body.user)
  .then((entry) => {
    if (entry === null) { // entry has not been made for that users this week
      createFinalSubmission(req.body.user, req.body.winnerTopThreeID, req.body.runnerUpTopThreeID, req.body.topThreeID, req.body.conID)
      .then(() => {
        res.send('submitted');
      });
    } else { // entry has already been made and will update
      entry.updateAttributes({
        finalWinnerID: req.body.winnerTopThreeID,
        finalRunnerUpID: req.body.runnerUpTopThreeID,
        finalTopThreeID: req.body.topThreeID,
        finalConID: req.body.conID
      })
      .then(() => {
        res.send('submitted');
      });
    }
  });
}

function getSubmissionFinal(username) {
  return db.UserSelections.findOne({
    where: {
      username,
      finalWinnerID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalRunnerUpID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalTopThreeID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalConID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
  });
}

function createFinalSubmission(username, finalWinnerID, finalRunnerUpID, finalTopThreeID, finalConID) {
  return db.UserSelections.create({
    username,
    finalWinnerID,
    finalRunnerUpID,
    finalTopThreeID,
    finalConID,
  });
}
function submitWeeklySelection(req, res) {
  console.log(req.body.user)
  getSubmissionWeekly(req.body.user, weekWeekID)
  .then((entry) => {
    if (entry === null) { // entry has not been made for that users this week
      createWeeklySubmission(req.body.user, req.body.winnerID, req.body.runnerUpID, req.body.bottomID, req.body.eliminatedID)
      .then(() => {
        res.send('submitted');
      });
    } else { // entry has already been made and will update
      entry.updateAttributes({
        weeklyWinnerID: req.body.winnerID,
        weeklyRunnerUpID: req.body.runnerUpID,
        weeklyBottomID: req.body.bottomID,
        weeklyEliminatedID: req.body.eliminatedID,
      })
      .then(() => {
        res.send('submitted');
      });
    }
  });
}

function getSubmissionWeekly(username) {
  return db.UserSelections.findOne({
    where: {
      username,
      weekID: weekWeekID,
    },
  });
}

function createWeeklySubmission(username, weeklyWinnerID, weeklyRunnerUpID, weeklyBottomID, weeklyEliminatedID) {
  return db.UserSelections.create({
    username,
    weekID: weekWeekID,
    weeklyWinnerID,
    weeklyRunnerUpID,
    weeklyBottomID,
    weeklyEliminatedID,
  });
}

function submitTootBootSelection(req, res) {
  getSubmissionTootBoot(req.body.user, tootWeekID)
  .then((entry) => {
    if (entry === null) { // entry has not been made for that users this week
      createTootBootSubmission(req.body.user, req.body.selection)
      .then(() => {
        res.send('submitted');
      });
    } else { // entry has already been made and will update
      entry.updateAttributes({
        tootSelectionArr: req.body.selection,
      })
      .then(() => {
        res.send('submitted');
      });
    }
  });
}

function getSubmissionTootBoot(username) {
  return db.UserSelections.findOne({
    where: {
      username,
      weekID: tootWeekID,
    },
  });
}

function createTootBootSubmission(username, tootSelectionArr) {
  return db.UserSelections.create({
    username,
    weekID: tootWeekID,
    tootSelectionArr,
  });
}

module.exports = {
  submitWeeklySelection,
  submitFinalsResult,
  submitTootBootSelection,
};
