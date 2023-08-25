export default function totalPhoneBill(params) {
    // Define the cost of calls and SMS
    const callCost = 2.75;
    const smsCost = 0.65;
    
    // Set the initial cost to 0
    let userCosts = 0;
    
    // Split the input into an array of strings
    const arr = params.split(",");
    
    // Iterate through each item in the array
    for(let i = 0; i < arr.length; i++) {
      // If the item is a call, add the call cost to the total
      if(arr[i].trim() === 'call') {
        userCosts += callCost;
      } 
      // If the item is an SMS, add the SMS cost to the total
      else if(arr[i].trim() === 'sms') {
        userCosts += smsCost;
      }
    }
    
    // Return the total cost with 'R' appended to the front and fixed to 2 decimal places
    return "R" + userCosts.toFixed(2);
  }
  
  