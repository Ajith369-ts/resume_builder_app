
exports.error = (req, res, next) => {
    res.status(404).render("404error", {
        pageTitle: "Page Not Found!"
    });
}