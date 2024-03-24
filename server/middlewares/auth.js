import { supabase } from "../server.js";

// Authentication functions


/*
    This function recieves as arguments the student_id, email, password, name and user_type and
    creates the user using the supabase function, also it checks if the student_id or the email
    are already taken
*/
async function handleSignUp (req, res) {
    const { student_id, email, password, name, user_type } = req.body;  
    try{    
        const { data: studentIdIsTaken} = await supabase.rpc('student_id_exists', { studentid: student_id });

        if (studentIdIsTaken === true){
             res.status(409).json({ message: "Student ID already taken" });
        } else {
            const {data} = await supabase.auth.signUp({ 
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

            const emailIsTaken = data.user && data.user.identities && data.user.identities.length === 0;

            if (emailIsTaken) {
                res.status(409).json({ message: "Email already taken" });
            } else {
                res.status(201).json({ message: "User created correctly" });
            }
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e });
    }
}


/*
    This function logs in the user using its email and password
*/
async function handleLogIn (req, res) {
    const { email, password } = req.body;
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            res.status(401).json({ error: "Invalid credentials" });
        } else {
            res.status(201).json({ succes: "Log in succesful" })
            console.log(201);
        }

    } catch (e) {
        res.status(500).json({error: "Server error"});
    }
}

/*
    This function checks if the user is already logged on
*/
async function userSessionStatus(req, res){
    const { data, error } = await supabase.auth.getUser();

    try {
        if (error){ 
            res.status(404).json({ error: "User not found or not logged in" });
        } else {
            res.status(201).json({ message: "User logged in" });
        } 
    } catch(e) {
        res.status(500).json({ error: "Server error" });
    }

}

/*
    This function signs out the user
*/
async function signOut(req, res) {
    const { error } = await supabase.auth.signOut();
        
    try {
        if(error) {
            res.status(500).json({ error: "Internal error" });
        } else {
            res.status(201).json({ succes: "Sign out succesful" });
        }
    } catch (e) {
        res.status(500).json({ error: "Internal error" });
    }
}

export { handleSignUp, handleLogIn, userSessionStatus, signOut };
