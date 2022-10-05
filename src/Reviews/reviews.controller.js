const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "review_id",
  "content",
  "score",
  "critic_id",
  "movie_id",
  "created_at",
  "updated_at",
];

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  // console.log("params ", req.params);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

async function read(req, res) {
  const { review } = res.locals;
  res.json({ review });
}

async function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter((field) => {
    return !VALID_PROPERTIES.includes(field);
  });

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function update(req, res) {
  const { review } = res.locals;
  let newReview = req.body.data;
  const updatedReview = {
    ...review,
    ...newReview,
  };
  // console.log("updated ", updatedReview);
  await reviewsService.update(updatedReview);
  const data = await reviewsService.addedCritics(updatedReview);
  // console.log(data);
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.destroy(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(reviewExists),
    update,
  ],
  read: [asyncErrorBoundary(reviewExists), read],
  delete: [asyncErrorBoundary(reviewExists), destroy],
};
