import { supabase } from "./server.js";

const handleSignUp = async (student_id, email, password, name, user_type) => {
    try {
        const {data, error} = await supabase.auth.signUp({ 
            email: email,
            password: password,
            options: {
                data: {
                    student_id: student_id,
                    name: name,
                    user_type: user_type,
                }
            }
        });

        if(error) {
            console.error("Error: ", error);
        } else {
            console.log("Success");
        }

    } catch (error) {
        console.error("Error: ", error);
    }
};


export { handleSignUp };
