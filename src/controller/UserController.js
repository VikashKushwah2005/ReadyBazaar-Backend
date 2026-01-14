const getUserProfileByjwt = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

module.exports = {
    getUserProfileByjwt
};