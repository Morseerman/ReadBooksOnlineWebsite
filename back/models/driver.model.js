module.exports = mongoose => {
  var schema = mongoose.Schema(

    {
      no: Number,
      name: String,
      email: String,
      published: Boolean
    },
    { timestamps: true }
  );
  
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
  const Driver = mongoose.model("driver", schema);
  return Driver;
};