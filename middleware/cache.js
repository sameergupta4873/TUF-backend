const { getCache, setCache } = require("../redis/index");

const findAllSubmissionsOnCache = async (req, res, next) => {
  let submissions = await getCache("submissions-all");

  if (submissions && submissions != "null") {
    res.status(200).send({
      status: "success",
      message: "get all submissions success from cache",
      submissions: submissions,
    });
    return;
  }
  next();
};

module.exports = {
  findAllSubmissionsOnCache,
};
