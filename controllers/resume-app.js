

exports.getHome = (req, res, next) => {
    res.render("resume-app/home", {
        pageTitle: "Resume Builder"
    })
}