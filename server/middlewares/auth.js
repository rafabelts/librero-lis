import { supabase } from "../index.js";
import {v4 as uuidv4} from 'uuid';

// Authentication service

/*
    This function recieves as arguments the student_id, email, password, name and user_type and
    creates the user using the supabase function, also it checks if the student_id or the email
    are already taken
*/
async function handleSignUp (req, res) {
    const { student_id, email, password, name, user_type } = req.body;  
    try{    
        const { data: studentIdIsTaken } = await supabase.rpc('check_if_student_id_exists', { user_student_id: student_id.toString() });

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
        console.log(e);
        res.status(500).json({ error: "Error creating account" });
    }
}


/*
    This function logs in the user using its email and password
*/

async function handleLogIn(req, res) {
    const { email, password } = req.body;

    try {
        const { error: logInError }  = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (logInError) {
            res.status(401).json({ error: "Invalid credentials" });
        } else {
            try {
                const { data, error: rpcError } =  await supabase.rpc('get_user_data', { user_email: email });
                if (rpcError) {
                    res.status(404).json({ error: "User data not found" });
                } else {
                    res.status(201).json({ id: data.id, name: data.name, student_id: data.student_id, user_type: data.user_type, email });
                }
            } catch (error) {
                res.status(500).json({ error: "Error on rpc" });
            }
        }
    } catch (authError) {
        res.status(500).json({ error: "Auth error" });
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

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') console.log('SIGNED_IN', session)
        });
    } catch(e) {
        res.status(500).json({ error: "Internal error" });
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

async function changeName(req, res) {
    const { name } = req.body;
    try {
        const { error: onChangeNameError } = await supabase.auth.updateUser({
            data: { name: name }
        });
        if (onChangeNameError) {
            res.status(505).json({ error: "Cannot change user's name" });
        } else {
            res.status(201).json({ success: "User's name changed successfuly" });
        }
    } catch(error){
        res.status(500).json({ error: "Internal error" });
    }
}

async function sendEmailToRecoverPassword(req, res) {
    const { email } = req.body;
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);

        if(error) {
            res.status(505).json({ error: "Cannot send email" });
        } else {
            console.log(data);
            res.status(201).json({ success: "Email to confirm recovery sent" });
        }
    } catch(error) {
        res.status(500).json({ error: "Internal error" });
    }
} 

async function changePassword(req, res) {
    const { new_password } = req.body;
    try {

        supabase.auth.onAuthStateChange(async(event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                const { data, error: onChangePasswordError } = await supabase.auth.updateUser({
                    password: new_password,
                    nonce: uuidv4()
                });
                if (onChangePasswordError) {
                    console.log(onChangePasswordError);
                    res.status(505).json({ error: "Cannot change user's password" });
                } else {
                    console.log(data);
                    res.status(201).json({ success: "User's password changed successfuly" });
                }
            }
        },);
    } catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal error" });
    }
}

export { handleSignUp, handleLogIn, userSessionStatus, signOut, changeName, sendEmailToRecoverPassword, changePassword };
