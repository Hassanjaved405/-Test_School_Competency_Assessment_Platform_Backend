"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionDifficulty = exports.AssessmentStep = exports.CompetencyLevel = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["STUDENT"] = "student";
    UserRole["SUPERVISOR"] = "supervisor";
})(UserRole || (exports.UserRole = UserRole = {}));
var CompetencyLevel;
(function (CompetencyLevel) {
    CompetencyLevel["A1"] = "A1";
    CompetencyLevel["A2"] = "A2";
    CompetencyLevel["B1"] = "B1";
    CompetencyLevel["B2"] = "B2";
    CompetencyLevel["C1"] = "C1";
    CompetencyLevel["C2"] = "C2";
})(CompetencyLevel || (exports.CompetencyLevel = CompetencyLevel = {}));
var AssessmentStep;
(function (AssessmentStep) {
    AssessmentStep[AssessmentStep["STEP_1"] = 1] = "STEP_1";
    AssessmentStep[AssessmentStep["STEP_2"] = 2] = "STEP_2";
    AssessmentStep[AssessmentStep["STEP_3"] = 3] = "STEP_3";
})(AssessmentStep || (exports.AssessmentStep = AssessmentStep = {}));
var QuestionDifficulty;
(function (QuestionDifficulty) {
    QuestionDifficulty["EASY"] = "easy";
    QuestionDifficulty["MEDIUM"] = "medium";
    QuestionDifficulty["HARD"] = "hard";
})(QuestionDifficulty || (exports.QuestionDifficulty = QuestionDifficulty = {}));
//# sourceMappingURL=index.js.map