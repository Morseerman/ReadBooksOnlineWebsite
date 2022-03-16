module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      no: Number,
      owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      country: String,
      published: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Car = mongoose.model("car", schema);
  return Car;
};
