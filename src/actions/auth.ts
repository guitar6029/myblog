"use server";

export async function register(state, formData) {
    
    
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 4000)
    })
    
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    console.log(`email ${email}, password ${password}, confirmPassword ${confirmPassword}`);

}