const express = require("express");
const cors = require("cors");

require("dotenv").config();
// const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OFFICIAL_EMAIL = "tanisha1304.be23@chitkara.edu.in";

function fibonacci(n) {
  let a = 0, b = 1;
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(a);
    let next = a + b;
    a = b;
    b = next;
  }

  return result;
}

function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function hcf(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

function lcm(arr) {
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
}

async function aiResponse(question) {
  const q = question.toLowerCase();

  const capitals = {
    "andhra pradesh": "Amaravati",
    "arunachal pradesh": "Itanagar",
    "assam": "Dispur",
    "bihar": "Patna",
    "chhattisgarh": "Raipur",
    "goa": "Panaji",
    "gujarat": "Gandhinagar",
    "haryana": "Chandigarh",
    "himachal pradesh": "Shimla",
    "jharkhand": "Ranchi",
    "karnataka": "Bengaluru",
    "kerala": "Thiruvananthapuram",
    "madhya pradesh": "Bhopal",
    "maharashtra": "Mumbai",
    "manipur": "Imphal",
    "meghalaya": "Shillong",
    "mizoram": "Aizawl",
    "nagaland": "Kohima",
    "odisha": "Bhubaneswar",
    "punjab": "Chandigarh",
    "rajasthan": "Jaipur",
    "sikkim": "Gangtok",
    "tamil nadu": "Chennai",
    "telangana": "Hyderabad",
    "tripura": "Agartala",
    "uttar pradesh": "Lucknow",
    "uttarakhand": "Dehradun",
    "west bengal": "Kolkata",
    "delhi": "Delhi"
  };

  for (const state in capitals) {
    if (q.includes(state)) {
      return capitals[state];
    }
  }

  return "Unknown";
}

app.get("/", (req, res) => {
  res.status(200).send("BFHL API is running");
});



app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

app.post("/bfhl", async (req, res) => {
  const body = req.body;
  const keys = Object.keys(body);

  if (keys.length !== 1) {
    return res.status(400).json({
      is_success: false,
      error: "Exactly one key is allowed"
    });
  }

  const key = keys[0];
  let data;

 if (key === "fibonacci") {
  data = fibonacci(body.fibonacci);

} else if (key === "prime") {
  data = body.prime.filter(isPrime);

} else if (key === "hcf") {
  data = hcf(body.hcf);

} else if (key === "lcm") {
  data = lcm(body.lcm);

}
else if (key === "AI") {
  data = await aiResponse(body.AI);
}
 else {
  return res.status(400).json({
    is_success: false,
    error: "Invalid key"
  });
}

  res.json({
    is_success: true,
    official_email: OFFICIAL_EMAIL,
    data: data
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});

// Keep Railway container alive
setInterval(() => {
  // no-op
}, 1000 * 60);

