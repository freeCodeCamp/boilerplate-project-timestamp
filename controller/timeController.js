const timeStamp = (req, res) => {
    const unix = 1652281179197;
    const utc ='Wed, 11 May 2022 15:00:37 GMT';
    res.status(200).json({"unix": unix, "utc": utc});
}

exports.timeStamp = timeStamp;