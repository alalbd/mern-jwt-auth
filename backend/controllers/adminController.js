// Dashboard
const dashboard = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// Post data for admin user only
const postlist = (req, res) => {
  const data = [
    { name: "Nokia N96", brand: "Nokia" },
    { name: "Samsung Galaxy S1", brand: "Samsung" },
  ];

  res.status(200).json({
    success: true,
    data: data,
  });
};

// Export
module.exports = {
  dashboard,
  postlist,
};
