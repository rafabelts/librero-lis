const v4 = require('uuid');
const supabaseClient = require('./supaClient');

// Authentication service
/*
    This function recieves as arguments the student_id, email, password, name and user_type and
    creates the user using the supabaseClient function, also it checks if the student_id or the email
    are already taken
*/
async function handleSignUp (req, res) {
    const { student_id, email, password, name, user_type } = req.body;  
    try{    
        const { data: studentIdIsTaken } = await supabaseClient.rpc('check_if_student_id_exists', { user_student_id: student_id.toString() });

        if (studentIdIsTaken === true){
             res.status(409).json({ message: "Student ID already taken" });
        } else {
            

            const emailIsTaken = data.user && data.user.identities && data.user.identities.length === 0;

            if (emailIsTaken) {
                res.status(409).json({ message: "Email already taken" });
            } else {
                const {error} = await supabaseClient.auth.signUp({ 
                    email: email,
                    password: password,
                    options: {
                        data: {
                            student_id: student_id,
                            name: name,
                            user_type: user_type,
                            books_in_debt: 0,
                        }
                    }
                });
                if(error) {
                    res.status(409).json({ error: 'Error creating account' })
                } else {
                    res.status(201).json({ message: "User created correctly" });
                }
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
    console.log("log in called");
    const { email, password } = req.body;

    try {
        const { error: logInError }  = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        
        if (logInError) {
            res.status(401).json({ error: "Invalid credentials" });
        } else {
            try {
                const { data, error: rpcError } =  await supabaseClient.rpc('get_user_data', { user_email: email });
                if (rpcError) {
                    res.status(404).json({ error: "User data not found" });
                } else {
                    console.log("success");
                    res.status(201).json({ id: data.id, name: data.name, student_id: data.student_id, user_type: data.user_type, email });
                }
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: "Error on rpc" });
            }
        }
    } catch (authError) {
        res.status(500).json({ error: "Auth error" });
    }
}

/*
    This function signs out the user
*/
async function signOut(req, res) {
    try {
        const { error } = await supabaseClient.auth.signOut();
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
        const { error: onChangeNameError } = await supabaseClient.auth.updateUser({
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
        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email);

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

        supabaseClient.auth.onAuthStateChange(async(event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                const { data, error: onChangePasswordError } = await supabaseClient.auth.updateUser({
                    password: new_password,
                    nonce: v4.v4()
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

module.exports = { supabaseClient, handleSignUp, handleLogIn, signOut, changeName, sendEmailToRecoverPassword, changePassword }


