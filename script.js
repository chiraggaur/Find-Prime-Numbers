function getPrimesInRange(start, end) {
  const primes = [];
  function isPrime(num) {
    if (num < 2) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }
  for (let num = start; num <= end; num++) {
    if (isPrime(num)) {
      primes.push(num);
    }
  }
  return primes;
}

function calculatePrimes() {
  const startRange = parseInt(document.getElementById("start").value);
  const endRange = parseInt(document.getElementById("end").value);

  const startTimeAllInstances = performance.now();
  const primesInRange = getPrimesInRange(startRange, endRange);
  const endTimeAllInstances = performance.now();

  const totalTimeAllInstances = endTimeAllInstances - startTimeAllInstances;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p>Time taken for all instances: ${totalTimeAllInstances.toFixed(
    4
  )} ms</p>`;

  const detailsTableDiv = document.getElementById("detailsTable");
  detailsTableDiv.innerHTML = `
      <h2>Table 1: Details</h2>
      <table>
          <thead>
              <tr>
                  <th>Prime Number</th>
                  <th>Time to Check (ms)</th>
                  <th>Time to Find (ms)</th>
              </tr>
          </thead>
          <tbody>
              ${primesInRange
                .map((num) => {
                  const startTimeCheck = performance.now();
                  const isPrime = getPrimesInRange(num, num);
                  const endTimeCheck = performance.now();
                  const startTimeFind = performance.now();
                  getPrimesInRange(num, num);
                  const endTimeFind = performance.now();
                  return `<tr>
                              <td>${num}</td>
                              <td>${(endTimeCheck - startTimeCheck).toFixed(
                                4
                              )}</td>
                              <td>${(endTimeFind - startTimeFind).toFixed(
                                4
                              )}</td>
                          </tr>`;
                })
                .join("")}
          </tbody>
      </table>
     
      <h2>Table 2: All Numbers in Range</h2>
      <table>
          <thead>
              <tr>
                  <th>Number</th>
        <th>Is Prime?</th>
        <th>Time (ms)</th>
              </tr>
          </thead>
          <tbody>
              ${generateNumberRows(startRange, endRange)}
          </tbody>
      </table>
  `;

  openPopup();
}

function generateNumberRows(start, end) {
  let rows = "";
  for (let i = start; i <= end; i++) {
    const { isPrime, time } = checkIsPrime(i);
    rows += `<tr><td>${i}</td><td>${isPrime}</td><td>${time.toFixed(
      2
    )}</td></tr>`;
  }
  return rows;
}

function checkIsPrime(num) {
  const startTime = performance.now();

  if (num < 2) {
    return { isPrime: "No", time: 0 };
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return { isPrime: "No", time: performance.now() - startTime };
    }
  }

  const endTime = performance.now();
  return { isPrime: "Yes", time: endTime - startTime };
}
function openPopup() {
  document.getElementById("detailsPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("detailsPopup").style.display = "none";
}
