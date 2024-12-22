export const checkPasswordStrength = (password) => {
    // Initialize variables
    let strength = 0;
    let tips = "";

    // Check password length
    if (password.length < 8) {
        tips += "Make the password longer. ";
    } else {
        strength += 1;
    }

    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        strength += 1;
    } else {
        tips += "Use both lowercase and uppercase letters. ";
    }

    // Check for numbers
    if (password.match(/\d/)) {
        strength += 1;
    } else {
        tips += "Include at least one number. ";
    }

    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) {
        strength += 1;
    } else {
        tips += "Include at least one special character. ";
    }

    // Return results
    if (strength < 2) {
        return { 
            tip: "Easy to guess. " + tips,
            strength
        };
    } else if (strength === 2) {
        return {
            tip: "Medium difficulty. " + tips,
            strength
        }
    } else if (strength === 3) {
        return {
            tip: "Difficult. " + tips,
            strength
        }
    } else {
        return {
            tip: "Extremely difficult. " + tips,
            strength
        }
    }
}