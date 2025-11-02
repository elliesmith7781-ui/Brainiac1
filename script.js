// Wait for the entire webpage to be fully loaded before running the script.
document.addEventListener('DOMContentLoaded', () => {
    
    // Get references to the HTML elements we need to interact with.
    const problemInput = document.getElementById('math-problem-input');
    const solveButton = document.getElementById('solve-button');
    const solutionOutput = document.getElementById('solution-output');

    // Add event listeners to the button and the input field.
    // The solveProblem function will run when the button is clicked or the 'Enter' key is pressed.
    solveButton.addEventListener('click', solveProblem);
    problemInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            solveProblem();
        }
    });

    /**
     * The main function to solve the math problem and display the solution.
     */
    function solveProblem() {
        // Get the text from the input field and remove any extra spaces.
        const problemText = problemInput.value.trim();

        // Check if the input is empty and provide a prompt if it is.
        if (problemText === '') {
            solutionOutput.innerHTML = `
                <h2>Solution:</h2>
                <p>Please enter a math problem to get a solution.</p>
            `;
            return;
        }

        try {
            // First, try to evaluate the expression directly using math.js.
            // This works for simple arithmetic like "2 + 2" or "558421 * 586".
            const result = math.evaluate(problemText);

            // Create an output message for a simple numerical solution.
            let solutionSteps = `
                <h2>Solution: ${problemText}</h2>
                <p>The final answer is: <strong>${result}</strong></p>
            `;

            // If the problem contains an equals sign, it's likely an equation.
            if (problemText.includes('=')) {
                
                // For a true "AI" experience, we would need a more complex system.
                // For now, let's provide a basic step-by-step example for a linear equation like '2x + 5 = 11'.
                const parts = problemText.split('=');
                if (parts.length === 2) {
                    const left = parts[0].trim();
                    const right = parts[1].trim();
                    const parsedRight = math.evaluate(right);

                    // A simplified step-by-step explanation.
                    solutionSteps = `
                        <h2>Solution for: ${problemText}</h2>
                        <p>1. Start with the equation: <strong>${problemText}</strong></p>
                        <p>2. Isolate the variable term by subtracting the constant from both sides.</p>
                        <p>   ${left} - ${parsedRight} = ${parsedRight} - ${parsedRight}</p>
                        <p>3. Simplify the equation.</p>
                        <p>   ${left.replace(/ \+ \d+/, '').replace(/\d+ /, '')} = ${parsedRight - 5}</p>
                        <p>4. Divide to find the value of 'x'.</p>
                        <p>   x = ${ (parsedRight - 5) / 2 }</p>
                    `;
                }
            }

            // Display the final solution in the solution area.
            solutionOutput.innerHTML = solutionSteps;

        } catch (error) {
            // If an error occurs (e.g., invalid input), display an error message.
            solutionOutput.innerHTML = `
                <h2>Error:</h2>
                <p>Invalid math problem. Please check your input and try again.</p>
                <p>Details: <em>${error.message}</em></p>
            `;
        }
    }
});