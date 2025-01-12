
// Use this pseudocode to implement the bubble sort
function bubbleSort(array) {
	// n := length(array)
	// repeat
	//  swapped = false
	//  for i := 1 to n - 1 inclusive do
	//
	//     /* if this pair is out of order */
	//     if A[i - 1] > A[i] then
	//
	//       /* swap them and remember something changed */
	//       swap(A[i - 1], A[i])
	//       swapped := true
	//
	//     end if
	//   end for
	// until not swapped
}


function bubbleSort(array) {
	// this variable will be used to track whether or not we
	// made a swap on the previous pass. If we did not make
	// any swap on the previous pass, then the array must
	// already be sorted
	let swapped = true;

	// this while will keep doing passes if a swap was made
	// on the previous pass
	while (swapped) {
		swapped = false; // reset swap to false

		// this for will perform a single pass
		for (let i = 0; i < array.length; i++) {
			// if the two value are not ordered...
			if (array[i] > array[i + 1]) {
				// swap the two values
				[array[i],array[i+1]] = [array[i+1],array[i]]

				// since you made a swap, remember that you did so
				// b/c we should perform another pass after this one
				swapped = true;
			}
		}
	}

	return array;
}


