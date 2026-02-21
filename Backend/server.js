// require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
