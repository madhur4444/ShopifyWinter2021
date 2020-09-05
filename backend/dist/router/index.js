"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function router(app) {
    app.route("/").get((req, res) => {
        res.send("Started");
    });
}
exports.default = router;
//# sourceMappingURL=index.js.map